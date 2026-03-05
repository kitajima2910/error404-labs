
#include <stdlib.h>
#include <string.h>
#include <fluidsynth.h>


typedef struct player_state {
    fluid_settings_t* settings;
    fluid_synth_t* synth;
    fluid_player_t* player;

    int loop_times; // fluidsynth doesn't persist this so we need to
    int tmp_play_set;
} player_state;

int load_font(fluid_synth_t *synth, fluid_settings_t *settings);

player_state* midiplayer_create(int sample_rate) {
    player_state* ps = malloc(sizeof(player_state));
    memset(ps, 0, sizeof(player_state));

    fluid_settings_t *settings = new_fluid_settings();
    ps->settings = settings;

    printf("aa sample %d\n", sample_rate);

    //fluid_settings_setstr(settings, "synth.reverb.active", "yes");
    //fluid_settings_setstr(settings, "synth.chorus.active", "no");
    fluid_settings_setint(settings, "synth.threadsafe-api", 0);
    fluid_settings_setnum(settings, "synth.gain", 0.5);
    fluid_settings_setnum(settings, "synth.sample-rate", sample_rate);
    fluid_settings_setstr(settings, "player.timing-source", "sample");


    fluid_synth_t* synth = new_fluid_synth(settings);
    ps->synth = synth;

    int font = load_font(synth, settings);
    // error checking? nah, failure is not an option ;)

    return ps;
}

// will the pointer to this memory be stored in the js object? or state?
// should we.. reset all? what if stuff is already playing?
// we don't want to queue anything
int midiplayer_set_sequence(player_state *ps, void *buf, int len) {
    delete_fluid_player(ps->player); // the only way to clear playlist
    fluid_synth_system_reset(ps->synth);

    fluid_player_t* player = new_fluid_player(ps->synth);
    ps->player = player;

    fluid_player_add_mem(ps->player, buf, len);

    // we call this so that the midi is parsed at this point
    // and we have the duration

    fluid_player_playlist_load(ps->player, 0);

    return fluid_player_get_total_ticks(ps->player);
}

void midiplayer_play(player_state *ps) {
    fluid_player_play(ps->player); // this just sets the status, possibly loops last item?
    fluid_player_set_loop(ps->player, ps->loop_times);
    ps->tmp_play_set = 1;
}

void midiplayer_stop(player_state *ps) {
    fluid_player_stop(ps->player); // this just sets the status, possibly loops last item?
}

void midiplayer_loop(player_state *ps, int times) {
    // docs say -1 is supported
    ps->loop_times = times;
    fluid_player_set_loop(ps->player, times);
}

void midiplayer_seek(player_state *ps, int ticks) {
    fluid_player_seek(ps->player, ticks);
}

int midiplayer_get_position(player_state *ps) {
    return fluid_player_get_current_tick(ps->player);
}

int midiplayer_write_data(player_state *ps, void *bleft, void *bright, int bsize, unsigned int missed) {
    while (missed > 0) {
        unsigned int towrite = missed > bsize ? bsize : missed;
        fluid_synth_write_float(ps->synth, towrite, bleft, 0, 1, bright, 0, 1);

        if (fluid_player_get_status(ps->player) != FLUID_PLAYER_PLAYING) {
            return 0;
        }

        missed -= towrite;
    }

    // not sure whether buffers are zeroed out, but after writing missed things we need to do it anyway
    memset(bleft, 0, bsize*4);
    memset(bright, 0, bsize*4);


    fluid_synth_write_float(ps->synth, bsize, bleft, 0, 1, bright, 0, 1);

    if (ps->tmp_play_set && fluid_player_get_status(ps->player) != FLUID_PLAYER_PLAYING) {
        return 0;
    }

    return bsize;
}

void midiplayer_short_event(player_state *ps, int status, int data1, int data2) {
    fluid_midi_event_t *evt = new_fluid_midi_event();

    // status
    int type = status & 0xF0;
    fluid_midi_event_set_type(evt, type);
    fluid_midi_event_set_channel(evt, status & 0x0F);

    if (type == 0xe0) { // check for pitch bend
        fluid_midi_event_set_key(evt, ((data2 & 0x7f) << 7) | (data1 & 0x7f));
    } else {
        fluid_midi_event_set_key(evt, data1);
        fluid_midi_event_set_value(evt, data2);
    }

    fluid_synth_handle_midi_event(ps->synth, evt);


    delete_fluid_midi_event(evt);
}

void midiplayer_delete(player_state *ps) {
    delete_fluid_player(ps->player);
    delete_fluid_synth(ps->synth);
    delete_fluid_settings(ps->settings);

    free(ps);
}
