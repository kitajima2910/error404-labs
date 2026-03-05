#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <fluidsynth.h>

#include "gm.h"

typedef struct {
    const unsigned char *data;
    unsigned int length;
    unsigned int position;
} MemoryHandle;

void *my_open(const char *filename)
{
    // we ignore the filename and always return a handle to our memory buffer
    MemoryHandle *handle = malloc(sizeof(MemoryHandle));
    if (handle == NULL) {
        return NULL;
    }

    handle->data = gm_sf2;
    handle->length = gm_sf2_len;
    handle->position = 0;

    return handle;
}

int my_read(void *buf, unsigned int count, void *handle)
{
    MemoryHandle *mem_handle = (MemoryHandle *)handle;

    if (mem_handle->position >= mem_handle->length) {
        return FLUID_FAILED;
    }

    unsigned int bytes_to_read = count;
    if (mem_handle->position + bytes_to_read > mem_handle->length) {
        bytes_to_read = mem_handle->length - mem_handle->position;
    }

    memcpy(buf, mem_handle->data + mem_handle->position, bytes_to_read);
    mem_handle->position += bytes_to_read;

    return bytes_to_read;
}

int my_seek(void *handle, long offset, int origin)
{
    MemoryHandle *mem_handle = (MemoryHandle *)handle;
    unsigned int new_position;

    switch (origin) {
        case SEEK_SET:
            new_position = offset;
            break;
        case SEEK_CUR:
            new_position = mem_handle->position + offset;
            break;
        case SEEK_END:
            new_position = mem_handle->length + offset;
            break;
        default:
            return FLUID_FAILED;
    }

    if (new_position > mem_handle->length) {
        return FLUID_FAILED;
    }

    mem_handle->position = new_position;
    return FLUID_OK;
}

int my_close(void *handle)
{
    free(handle);
    return FLUID_OK;
}

long my_tell(void *handle)
{
    MemoryHandle *mem_handle = (MemoryHandle *)handle;
    return mem_handle->position;
}

int load_font(fluid_synth_t *synth, fluid_settings_t *settings) {
    fluid_sfloader_t *my_sfloader = new_fluid_defsfloader(settings);
    fluid_sfloader_set_callbacks(my_sfloader,
                                 my_open,
                                 my_read,
                                 my_seek,
                                 my_tell,
                                 my_close);
    fluid_synth_add_sfloader(synth, my_sfloader);

    return fluid_synth_sfload(synth, "ignored_filename", 0);

}
