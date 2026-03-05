#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <fcntl.h>

#include <libavformat/avformat.h>
#include <libavcodec/avcodec.h>
#include <libavutil/opt.h>
#include <libswresample/swresample.h>
#include <libavutil/channel_layout.h>

#include <libswscale/swscale.h>
#include <libavutil/audio_fifo.h>



void av_log_default_callback(void *ptr, int level, const char *fmt, va_list vl)
{
    if (level <= av_log_get_level())
    {
        vprintf(fmt, vl);
    }
}

// gcc -I/usr/include/ffmpeg -lavformat transcode.c -o fft -lavcodec -lavutil -lswresample -lswscale

// limitation: no hdr support
/*
- color format hardcoded..

      x4->params.i_bitdepth           = av_pix_fmt_desc_get(avctx->pix_fmt)->comp[0].depth;

      output->video_ctx->profile = AV_PROFILE_H264_HIGH_10

      that would need different string in codecs
*/

#define AVIO_CTX_BUFSIZE 65536


typedef struct {
    uint8_t *data;
    size_t size;
    size_t pos;
} MemoryBuffer;

typedef struct {
    uint8_t *data;
    size_t size;
    size_t capacity;
} OutputBuffer;

static int read_packet(void *opaque, uint8_t *buf, int buf_size) {
    MemoryBuffer *mem = (MemoryBuffer *)opaque;
    if (mem->pos >= mem->size)
        return AVERROR_EOF;

    int to_copy = FFMIN(buf_size, mem->size - mem->pos);
    memcpy(buf, mem->data + mem->pos, to_copy);
    mem->pos += to_copy;
    return to_copy;
}

int64_t seek_packet(void *opaque, int64_t offset, int whence) {
    MemoryBuffer *mem = (MemoryBuffer *)opaque;
    if (whence == AVSEEK_SIZE) {
        return mem->size;
    } else if (whence == SEEK_SET) {
        mem->pos = offset;
    } else if (whence == SEEK_CUR) {
        mem->pos += offset;
    } else if (whence == SEEK_END) {
        mem->pos = mem->size + offset;
    }
    if (mem->pos < 0 || mem->pos > mem->size) {
        return AVERROR(EINVAL);
    }
    return mem->pos;
}

static int write_packet(void *opaque, const uint8_t *buf, int buf_size) {
    OutputBuffer *output = (OutputBuffer *)opaque;

    if (output->size + buf_size > output->capacity) {
        size_t new_capacity = output->capacity * 2 + buf_size;
        uint8_t *new_data = realloc(output->data, new_capacity);
        if (!new_data) {
            fprintf(stderr, "Failed to reallocate output buffer\n");
            return -1;
        }
        output->data = new_data;
        output->capacity = new_capacity;
    }

    memcpy(output->data + output->size, buf, buf_size);
    output->size += buf_size;
    return buf_size;
}

typedef struct Input {
    AVIOContext *avio_ctx;
    AVFormatContext *fmt_ctx;

    int audio_stream_idx;
    int video_stream_idx;

    AVStream *video_stream;
    AVStream *audio_stream;

    AVCodecContext *audio_ctx;
    AVCodecContext *video_ctx;

    AVPacket *packet;
    AVFrame *frame;

    int has_packet;
} Input;


typedef struct Output {
    AVIOContext *avio_ctx;
    AVFormatContext *fmt_ctx;

    AVStream *video_stream;
    AVStream *audio_stream;

    AVCodecContext *audio_ctx;
    AVCodecContext *video_ctx;

    AVPacket *packet;
    AVFrame *audio_frame;
    AVFrame *video_frame;

    SwrContext *swr_ctx;
    struct SwsContext *sws_ctx;

    AVDictionary *fmt_opts;

    AVAudioFifo *audio_fifo;
    int audio_frame_size;
    uint8_t **converted_audio_samples;
    int converted_audio_samples_size;

    unsigned long long written_audio_samples;
    int header_written;
} Output;

typedef struct State {
    Input *input;
    Output *output;
    OutputBuffer *ob;
} State;


State *make_state() {
    State *state = malloc(sizeof(State));
    memset(state, 0, sizeof(State));

    state->input = malloc(sizeof(Input));
    memset(state->input, 0, sizeof(Input));

    state->output = malloc(sizeof(Output));
    memset(state->output, 0, sizeof(Output));

    return state;
}

void free_input(Input *input) {
    if (!input) {
        return;
    }

    if (input->frame) {
        av_frame_free(&input->frame);
    }

    if (input->packet) {
        av_packet_free(&input->packet);
    }

    if (input->audio_ctx) {
        avcodec_free_context(&input->audio_ctx);
    }

    if (input->video_ctx) {
        avcodec_free_context(&input->video_ctx);
    }

    if (input->fmt_ctx) {
        avformat_close_input(&input->fmt_ctx);
    }

    if (input->avio_ctx) {
        av_freep(&input->avio_ctx->buffer);
        avio_context_free(&input->avio_ctx);
    }

    free(input);
}

void free_output(Output *output) {
    if (!output) {
        return;
    }

    if (output->audio_fifo) {
        av_audio_fifo_free(output->audio_fifo);
    }

    if (output->fmt_opts) {
        av_dict_free(&output->fmt_opts);
    }

    if (output->audio_frame) {
        av_frame_free(&output->audio_frame);
    }

    if (output->video_frame) {
        av_frame_free(&output->video_frame);
    }

    if (output->packet) {
        av_packet_free(&output->packet);
    }

    if (output->audio_ctx) {
        avcodec_free_context(&output->audio_ctx);
    }

    if (output->video_ctx) {
        avcodec_free_context(&output->video_ctx);
    }

    if (output->swr_ctx) {
        swr_free(&output->swr_ctx);
    }

    if (output->sws_ctx) {
        sws_freeContext(output->sws_ctx);
    }

    if (output->fmt_ctx) {
        avformat_free_context(output->fmt_ctx);
    }

    if (output->avio_ctx) {
        av_freep(&output->avio_ctx->buffer);
        avio_context_free(&output->avio_ctx);
    }

    free(output);
}

void free_state(State *state) {
    if (!state) {
        return;
    }

    if (state->input) {
        free_input(state->input); // should handle null avio?
    }

    if (state->output) {
        free_output(state->output);
    }

    free(state);
}

int load_input(Input *input, MemoryBuffer *mem) {
    int ret = 0;

    uint8_t *avio_in_buffer = av_malloc(AVIO_CTX_BUFSIZE);
    if (!avio_in_buffer) {
        ret = -1;
        goto end;
    }

    input->avio_ctx = avio_alloc_context(avio_in_buffer, AVIO_CTX_BUFSIZE, 0, mem, read_packet, NULL, seek_packet);
    if (!input->avio_ctx) {
        ret = -1;
        goto end;
    }

    input->fmt_ctx = avformat_alloc_context();
    if (!input->fmt_ctx) {
        ret = -1;
        goto end;
    }

    input->fmt_ctx->pb = input->avio_ctx;
    input->fmt_ctx->probesize = input->fmt_ctx->format_probesize = AVIO_CTX_BUFSIZE;

    if (avformat_open_input(&input->fmt_ctx, NULL, NULL, NULL) < 0) {
        fprintf(stderr, "Could not open input\n");
        ret = -1;
        goto end;
    }

    if (avformat_find_stream_info(input->fmt_ctx, NULL) < 0) {
        fprintf(stderr, "Could not find stream info\n");
        ret = -1;
        goto end;
    }

    int video_stream_idx = -1, audio_stream_idx = -1;
    for (unsigned int i = 0; i < input->fmt_ctx->nb_streams; i++) {
        AVStream *stream = input->fmt_ctx->streams[i];
        if (stream->codecpar->codec_type == AVMEDIA_TYPE_VIDEO && video_stream_idx == -1) {
            video_stream_idx = i;
            input->video_stream_idx = video_stream_idx;
            input->video_stream = stream;
        } else if (stream->codecpar->codec_type == AVMEDIA_TYPE_AUDIO && audio_stream_idx == -1) {
            audio_stream_idx = i;
            input->audio_stream_idx = audio_stream_idx;
            input->audio_stream = stream;
        }
    }

    if (input->video_stream) {
        const AVCodec *video_dec = avcodec_find_decoder(input->video_stream->codecpar->codec_id);
        if (!video_dec) {
            fprintf(stderr, "Video decoder not found\n");
            ret = -1;
            goto end;
        }
        input->video_ctx = avcodec_alloc_context3(video_dec);
        if (!input->video_ctx || avcodec_parameters_to_context(input->video_ctx, input->video_stream->codecpar) < 0 ||
            avcodec_open2(input->video_ctx, video_dec, NULL) < 0) {
            fprintf(stderr, "Failed to initialize video decoder\n");
            ret = -1;
            goto end;
        }
    }

    if (input->audio_stream) {
        const AVCodec *audio_dec = avcodec_find_decoder(input->audio_stream->codecpar->codec_id);
        if (!audio_dec) {
            fprintf(stderr, "Audio decoder not found\n");
            ret = -1;
            goto end;
        }
        input->audio_ctx = avcodec_alloc_context3(audio_dec);
        if (!input->audio_ctx || avcodec_parameters_to_context(input->audio_ctx, input->audio_stream->codecpar) < 0 ||
            avcodec_open2(input->audio_ctx, audio_dec, NULL) < 0) {
            fprintf(stderr, "Failed to initialize audio decoder\n");
            ret = -1;
            goto end;
        }
    }

    input->packet = av_packet_alloc();
    input->frame = av_frame_alloc();

    end:
    return ret;
}

int open_output(Output *output, Input *input, OutputBuffer *ob) {
    int ret = 0;
    uint8_t *avio_out_buffer = av_malloc(AVIO_CTX_BUFSIZE);
    if (!avio_out_buffer) {
        ret = -1;
        goto end;
    }

    output->avio_ctx = avio_alloc_context(avio_out_buffer, AVIO_CTX_BUFSIZE, 1, ob, NULL, write_packet, NULL);
    if (!output->avio_ctx) {
        ret = -1;
        goto end;
    }
    if (avformat_alloc_output_context2(&output->fmt_ctx, NULL, "mp4", NULL) < 0) {
        fprintf(stderr, "Could not create output context\n");
        ret = -1;
        goto end;
    }
    output->fmt_ctx->pb = output->avio_ctx;
    output->fmt_ctx->flags |= AVFMT_FLAG_CUSTOM_IO;

    if (input->video_stream) {
        const AVCodec *video_enc = avcodec_find_encoder(AV_CODEC_ID_H264);
        if (!video_enc) {
            fprintf(stderr, "H264 encoder not found\n");
            ret = -1;
            goto end;
        }

        output->video_stream = avformat_new_stream(output->fmt_ctx, video_enc);

        if (!output->video_stream) {
            ret = -1;
            goto end;
        }
        output->video_ctx = avcodec_alloc_context3(video_enc);
        if (!output->video_ctx) {
            ret = -1;
            goto end;
        }
        output->video_ctx->width = input->video_ctx->width;
        output->video_ctx->height = input->video_ctx->height;
        output->video_ctx->pix_fmt = AV_PIX_FMT_YUV420P;
        output->video_ctx->time_base = input->video_stream->time_base;
        output->video_ctx->bit_rate = 0; // eee?? we want crf..
        // this "gop_size" is mandatory..
        output->video_ctx->gop_size = 12; /* emit one intra frame every twelve frames at most */


        if (output->fmt_ctx->oformat->flags & AVFMT_GLOBALHEADER)
            output->video_ctx->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;

        av_opt_set(output->video_ctx->priv_data, "crf", "20", 0);
        av_opt_set(output->video_ctx->priv_data, "tune", "zerolatency", 0);
        av_opt_set(output->video_ctx->priv_data, "preset", "superfast",0);

        if (avcodec_open2(output->video_ctx, video_enc, 0) < 0) {
            fprintf(stderr, "Failed to open video encoder\n");
            ret = -1;
            goto end;
        }
        if (avcodec_parameters_from_context(output->video_stream->codecpar, output->video_ctx) < 0) {
            ret = -1;
            goto end;
        }

        output->video_stream->time_base = output->video_ctx->time_base;
        // so we don't need to rescale?

        // Video scaler setup
        output->sws_ctx = sws_getContext(input->video_ctx->width, input->video_ctx->height, input->video_ctx->pix_fmt,
                output->video_ctx->width,  output->video_ctx->height,  output->video_ctx->pix_fmt,
                                SWS_BILINEAR, NULL, NULL, NULL);
        if (!output->sws_ctx) {
            fprintf(stderr, "Failed to initialize sws context\n");
            ret = -1;
            goto end;
        }

        output->video_frame = av_frame_alloc();
        output->video_frame->width = output->video_ctx->width;
        output->video_frame->height = output->video_ctx->height;
        output->video_frame->format = output->video_ctx->pix_fmt;
        if (av_frame_get_buffer(output->video_frame, 0) < 0) {
            ret = -1;
            goto end;
        }
    }

    if (input->audio_stream) {
        const AVCodec *audio_enc = avcodec_find_encoder(AV_CODEC_ID_AAC);
        if (!audio_enc) {
            fprintf(stderr, "AAC encoder not found\n");
            ret = -1;
            goto end;
        }

        output->audio_stream = avformat_new_stream(output->fmt_ctx, audio_enc);

        if (!output->audio_stream) {
            ret = -1;
            goto end;
        }

        output->audio_ctx = avcodec_alloc_context3(audio_enc);
        if (!output->audio_ctx) {
            ret = -1;
            goto end;
        }

        output->audio_ctx->sample_rate = 48000; // aac only supports this
        av_channel_layout_default(&output->audio_ctx->ch_layout, 2); // and stereo
        output->audio_ctx->sample_fmt = audio_enc->sample_fmts[0];
        output->audio_ctx->time_base = (AVRational){1, output->audio_ctx->sample_rate};

        output->audio_ctx->bit_rate = 0;
        output->audio_ctx->global_quality = 5 * FF_QP2LAMBDA; // what unit?? why isn't this crap documented??????
                                               // is this only for fdk? should we multiply by FF_QP2LAMBDA???
        output->audio_ctx->flags |= AV_CODEC_FLAG_QSCALE;

        av_opt_set(output->audio_ctx->priv_data, "aac_coder", "fast", 0);

        if (output->fmt_ctx->oformat->flags & AVFMT_GLOBALHEADER)
        output->audio_ctx->flags |= AV_CODEC_FLAG_GLOBAL_HEADER;

        if (avcodec_open2(output->audio_ctx, audio_enc, NULL) < 0) {
            fprintf(stderr, "Failed to open audio encoder\n");
            ret = -1;
            goto end;
        }
        if (avcodec_parameters_from_context(output->audio_stream->codecpar, output->audio_ctx) < 0) {
            ret = -1;
            goto end;
        }
        output->audio_stream->time_base = output->audio_ctx->time_base;

        // Audio resampler setup
        swr_alloc_set_opts2(&output->swr_ctx, &output->audio_ctx->ch_layout, output->audio_ctx->sample_fmt, output->audio_ctx->sample_rate,
                                        &input->audio_ctx->ch_layout, input->audio_ctx->sample_fmt, input->audio_ctx->sample_rate,
                                        0, NULL);
        if (!output->swr_ctx || swr_init(output->swr_ctx) < 0) {
            fprintf(stderr, "Failed to initialize swr context\n");
            ret = -1;
            goto end;
        }

        output->audio_fifo = av_audio_fifo_alloc(output->audio_ctx->sample_fmt, output->audio_ctx->ch_layout.nb_channels, 1);
        if (!output->audio_fifo) {
            ret = -1;
            goto end;
        }

        output->audio_frame_size = output->audio_ctx->frame_size;

        output->audio_frame = av_frame_alloc();
        output->audio_frame->nb_samples = output->audio_frame_size;
        output->audio_frame->ch_layout = output->audio_ctx->ch_layout;
        output->audio_frame->format = output->audio_ctx->sample_fmt;
        output->audio_frame->sample_rate = output->audio_ctx->sample_rate;
        if (av_frame_get_buffer(output->audio_frame, 0) < 0) {
            ret = -1;
            goto end;
        }
    }

    av_dict_set(&output->fmt_opts, "movflags", "empty_moov+frag_keyframe+default_base_moof", 0);

    output->packet = av_packet_alloc();

    end:
    return ret;
}


static void encode_video_frame(Output *output, AVFrame *frame) {
    int ret = avcodec_send_frame(output->video_ctx, frame);
    if (ret < 0) return;

    while (ret >= 0) {
        ret = avcodec_receive_packet(output->video_ctx, output->packet);
        if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF)
            break;
        if (ret < 0) {
            fprintf(stderr, "Error encoding video frame\n");
            break;
        }

        // these should be equal
        av_packet_rescale_ts(output->packet, output->video_ctx->time_base, output->video_stream->time_base);

        output->packet->stream_index = output->video_stream->index;
        av_interleaved_write_frame(output->fmt_ctx, output->packet);
        av_packet_unref(output->packet);
    }
}

static void flush_video_encoder(Output *output) {
    encode_video_frame(output, NULL);
}



int handle_video_frame(Input *input, Output *output, AVFrame *frame) {
    int ret = 0;

    // we always reencode, this avoids frame type change messages..
    av_frame_make_writable(output->video_frame);

    if (sws_scale(output->sws_ctx, (const uint8_t * const *) frame->data, frame->linesize, 0, frame->height,
        (uint8_t * const *) output->video_frame->data, output->video_frame->linesize) < 0) {
        ret = -1;
        goto end;
    }
    output->video_frame->pts = frame->pts;
    encode_video_frame(output, output->video_frame);

    end:
    return ret;
}

static void encode_audio_frame(Output *output, AVFrame *frame) {
    int ret = avcodec_send_frame(output->audio_ctx, frame);
    if (ret < 0) return;

    while (ret >= 0) {
        ret = avcodec_receive_packet(output->audio_ctx, output->packet);
        if (ret == AVERROR(EAGAIN) || ret == AVERROR_EOF)
            break;
        if (ret < 0) {
            fprintf(stderr, "Error encoding video frame\n");
            break;
        }

        // these should be equal
        av_packet_rescale_ts(output->packet, output->audio_ctx->time_base, output->audio_stream->time_base);

        output->packet->stream_index = output->audio_stream->index;
        av_interleaved_write_frame(output->fmt_ctx, output->packet);
        av_packet_unref(output->packet);
    }
}

static void flush_audio_encoder(Output *output) {
    encode_audio_frame(output, NULL);
}

int write_samples_from_fifo(Output *output, int final) {
    int ret = 0;

    // we can write only if we have audio_frame_size samples, not more, not less
    // but at the end, we need to pad samples
    while (av_audio_fifo_size(output->audio_fifo) > (final ? 0 : output->audio_frame_size)) {
        int frame_size = av_audio_fifo_size(output->audio_fifo);
        if (output->audio_frame_size < frame_size) {
            frame_size = output->audio_frame_size;
        }

        av_frame_make_writable(output->audio_frame);

        // time_base is 1/sample_rate
        output->audio_frame->pts = output->written_audio_samples;

        if (av_frame_get_buffer(output->audio_frame, 0) < 0) {
            ret = -1;
            goto end;
        }

        if (av_audio_fifo_read(output->audio_fifo, (void **)output->audio_frame->data, frame_size) < frame_size) {
            ret = -1;
            goto end;
        }

        if (frame_size < output->audio_frame_size) {
            int silence_samples = output->audio_frame_size - frame_size;
            ret = av_samples_set_silence(output->audio_frame->data,
                                         frame_size,         // offset (in samples per channel)
                                         silence_samples,    // number of samples to set to silence
                                         output->audio_frame->ch_layout.nb_channels,
                                         output->audio_frame->format);
            if (ret < 0) {
                goto end;
            }

            frame_size = output->audio_frame_size;
        }

        output->written_audio_samples += frame_size;

        encode_audio_frame(output, output->audio_frame);
    }

    end:
    return ret;
}

int handle_audio_frame(Input *input, Output *output, AVFrame *frame) {
    int ret = 0;
    // maybe write samples from fifo
    write_samples_from_fifo(output, 0);

    int out_samples = av_rescale_rnd(swr_get_delay(output->swr_ctx, output->audio_ctx->sample_rate) + frame->nb_samples,
        output->audio_ctx->sample_rate, input->audio_ctx->sample_rate, AV_ROUND_UP);

    if (out_samples > output->converted_audio_samples_size) {
        if (av_samples_alloc_array_and_samples(&output->converted_audio_samples, NULL,
            output->audio_ctx->ch_layout.nb_channels,
            out_samples,
            output->audio_ctx->sample_fmt, 0) < 0) {
            ret = -1;
            goto end;
        }

        output->converted_audio_samples_size = out_samples;
    }

    int actually_converted_samples = swr_convert(output->swr_ctx, output->converted_audio_samples, out_samples, (const uint8_t **)frame->data, frame->nb_samples);
    if (actually_converted_samples < 0) {
        ret = -1;
        goto end;
    }

    if (av_audio_fifo_realloc(output->audio_fifo, av_audio_fifo_size(output->audio_fifo) + actually_converted_samples) < 0) {
        ret = -1;
        goto end;
    }

    if (av_audio_fifo_write(output->audio_fifo, (void **)output->converted_audio_samples, actually_converted_samples) < actually_converted_samples) {
        ret = -1;
        goto end;
    }

    end:
    return ret;
}

OutputBuffer *transcode(uint8_t *data, size_t size) {
    av_log_set_level(AV_LOG_ERROR);
    av_log_set_flags(AV_LOG_PRINT_LEVEL);

    OutputBuffer *ob = malloc(sizeof(OutputBuffer));
    memset(ob, 0, sizeof(OutputBuffer));

    MemoryBuffer mem = {data, size, 0};

    State *state = make_state();
    state->ob = ob;

    if (load_input(state->input, &mem) < 0) {
        goto fail;
    }

    if (open_output(state->output, state->input, ob) < 0) {
        goto fail;
    }

    Input *input = state->input;
    Output *output = state->output;

    if (avformat_write_header(output->fmt_ctx, &output->fmt_opts) < 0) {
        goto fail;
    }

    while (av_read_frame(input->fmt_ctx, input->packet) >= 0) {
        if (input->video_stream && input->packet->stream_index == input->video_stream_idx) {
            if (avcodec_send_packet(input->video_ctx, input->packet) >= 0) {
                while (avcodec_receive_frame(input->video_ctx, input->frame) >= 0) {
                    if (handle_video_frame(input, output, input->frame) < 0) {
                        goto fail;
                    }
                }
            }
        } else if (input->audio_stream && input->packet->stream_index == input->audio_stream_idx) {
            if (avcodec_send_packet(input->audio_ctx, input->packet) >= 0) {
                while (avcodec_receive_frame(input->audio_ctx, input->frame) >= 0) {
                    if (handle_audio_frame(input, output, input->frame) < 0) {
                        goto fail;
                    }
                }
            }
        }
        av_packet_unref(input->packet);
    }

    if (input->video_stream) {
        avcodec_send_packet(input->video_ctx, NULL);

        while (avcodec_receive_frame(input->video_ctx, input->frame) >= 0) {
            if (handle_video_frame(input, output, input->frame) < 0) {
                goto fail;
            }
        }

        flush_video_encoder(output);
    }

    if (input->audio_stream) {
        avcodec_send_packet(input->audio_ctx, NULL);
        while (avcodec_receive_frame(input->audio_ctx, input->frame) >= 0) {
            if (handle_audio_frame(input, output, input->frame) < 0) {
                goto fail;
            }
        }

        write_samples_from_fifo(output, 1);
        flush_audio_encoder(output);
    }

    // Write trailer
    if (av_write_trailer(output->fmt_ctx) < 0) {
        goto fail;
    }

    ret:
    free_state(state);
    return ob;

    fail:
    ob = NULL;
    goto ret;
}

uint8_t *ob_get_data(OutputBuffer *ob) {
    return ob->data;
}

size_t ob_get_size(OutputBuffer *ob) {
    return ob->size;
}

void ob_free(OutputBuffer *ob) {
    free(ob->data);
    free(ob);
}

#ifndef __EMSCRIPTEN__
int main() {
    char *path = "doom.3gp";

    uint8_t *input_data = malloc(5000000);
    size_t input_size = 0;

    int fd = open(path, O_RDONLY);
    if (fd < 0) {
        perror("Failed to open input file");
        return 1;
    }

    input_size = read(fd, input_data, 5000000);
    close(fd);
    if (input_size <= 0) {
        perror("Failed to read input file");
        free(input_data);
        return 1;
    }

    printf("okfilesize %d\n", input_size);
    fflush(stdout);


    OutputBuffer *ob = transcode(input_data, input_size);

    if (ob) {
        printf("transcode ok, size %d\n", ob->size);
        int fd2 = open("doom.mp4", O_WRONLY|O_CREAT, 0755);
        ftruncate(fd2, 0);
        write(fd2, ob->data, ob->size);
    }


    return 0;
}

#endif