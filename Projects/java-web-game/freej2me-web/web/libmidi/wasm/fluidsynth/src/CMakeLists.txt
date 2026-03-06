# FluidSynth - A Software Synthesizer
#
# Copyright (C) 2003-2010 Peter Hanappe and others.
#
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public License
# as published by the Free Software Foundation; either version 2.1 of
# the License, or (at your option) any later version.
#
# This library is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA
# 02111-1307, USA

# CMake based build system. Pedro Lopez-Cabanillas <plcl@users.sf.net>

# ************ library ************

set ( config_SOURCES ${FluidSynth_BINARY_DIR}/config.h )

set ( libfluidsynth_SOURCES
    utils/fluid_conv.c
    utils/fluid_conv.h
    utils/fluid_hash.c
    utils/fluid_hash.h
    utils/fluid_list.c
    utils/fluid_list.h
    utils/fluid_ringbuffer.c
    utils/fluid_ringbuffer.h
    utils/fluid_settings.c
    utils/fluid_settings.h
    utils/fluidsynth_priv.h
    utils/fluid_sys.c
    utils/fluid_sys.h
    sfloader/fluid_defsfont.c
    sfloader/fluid_defsfont.h
    sfloader/fluid_sfont.h
    sfloader/fluid_sfont.c
    sfloader/fluid_sffile.c
    sfloader/fluid_sffile.h
    sfloader/fluid_samplecache.c
    sfloader/fluid_samplecache.h
    rvoice/fluid_adsr_env.c
    rvoice/fluid_adsr_env.h
    rvoice/fluid_chorus.c
    rvoice/fluid_chorus.h
    rvoice/fluid_iir_filter.c
    rvoice/fluid_iir_filter.h
    rvoice/fluid_lfo.c
    rvoice/fluid_lfo.h
    rvoice/fluid_rvoice.h
    rvoice/fluid_rvoice.c
    rvoice/fluid_rvoice_dsp.c
    rvoice/fluid_rvoice_event.h
    rvoice/fluid_rvoice_event.c
    rvoice/fluid_rvoice_mixer.h
    rvoice/fluid_rvoice_mixer.c
    rvoice/fluid_phase.h
    rvoice/fluid_rev.c
    rvoice/fluid_rev.h
    synth/fluid_chan.c
    synth/fluid_chan.h
    synth/fluid_event.c
    synth/fluid_event.h
    synth/fluid_gen.c
    synth/fluid_gen.h
    synth/fluid_mod.c
    synth/fluid_mod.h
    synth/fluid_synth.c
    synth/fluid_synth.h
    synth/fluid_synth_monopoly.c
    synth/fluid_tuning.c
    synth/fluid_tuning.h
    synth/fluid_voice.c
    synth/fluid_voice.h
    midi/fluid_midi.c
    midi/fluid_midi.h
    midi/fluid_midi_router.c
    midi/fluid_midi_router.h
    midi/fluid_seqbind.c
    midi/fluid_seqbind_notes.cpp
    midi/fluid_seq.c
    midi/fluid_seq_queue.cpp
    bindings/fluid_ladspa.c
    bindings/fluid_ladspa.h
)

set ( public_HEADERS
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/audio.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/event.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/gen.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/ladspa.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/log.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/midi.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/misc.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/mod.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/seq.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/seqbind.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/settings.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/sfont.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/synth.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/types.h
    ${FluidSynth_SOURCE_DIR}/include/fluidsynth/voice.h
    ${FluidSynth_BINARY_DIR}/include/fluidsynth/version.h
)

set ( public_main_HEADER
    ${FluidSynth_BINARY_DIR}/include/fluidsynth.h
)

configure_file ( ${FluidSynth_SOURCE_DIR}/include/fluidsynth/version.h.in
                 ${FluidSynth_BINARY_DIR}/include/fluidsynth/version.h )
configure_file ( ${FluidSynth_SOURCE_DIR}/include/fluidsynth.cmake
                 ${public_main_HEADER} )



add_library ( libfluidsynth-OBJ OBJECT
    ${config_SOURCES}
    ${libfluidsynth_SOURCES}
    ${public_HEADERS}
    ${public_main_HEADER}
    ${VersionFilesOutputVariable}
)

target_include_directories ( libfluidsynth-OBJ PRIVATE
    ${FluidSynth_BINARY_DIR}
    ${FluidSynth_BINARY_DIR}/include
    ${FluidSynth_SOURCE_DIR}/src
    ${FluidSynth_SOURCE_DIR}/src/drivers
    ${FluidSynth_SOURCE_DIR}/src/synth
    ${FluidSynth_SOURCE_DIR}/src/rvoice
    ${FluidSynth_SOURCE_DIR}/src/midi
    ${FluidSynth_SOURCE_DIR}/src/utils
    ${FluidSynth_SOURCE_DIR}/src/sfloader
    ${FluidSynth_SOURCE_DIR}/src/bindings
    ${FluidSynth_SOURCE_DIR}/include
)

if ( LIBFLUID_CPPFLAGS )
  set_target_properties ( libfluidsynth-OBJ
    PROPERTIES COMPILE_FLAGS ${LIBFLUID_CPPFLAGS} )
endif ( LIBFLUID_CPPFLAGS )

# Note: by default this target creates a shared object (or dll). To build a
# static library instead, set the option BUILD_SHARED_LIBS to FALSE.

add_library ( libfluidsynth
    $<TARGET_OBJECTS:libfluidsynth-OBJ>
    ${public_main_HEADER}
    ${public_HEADERS}
)

set_target_properties ( libfluidsynth
    PROPERTIES
    PUBLIC_HEADER "${public_HEADERS}"
    PREFIX "lib"
    OUTPUT_NAME "fluidsynth"
    VERSION ${LIB_VERSION_INFO}
    SOVERSION ${LIB_VERSION_CURRENT}
)

# Since CMake 3.12, OBJECT libraries can be linked to with target_link_libraries().
# See https://cmake.org/cmake/help/latest/command/target_link_libraries.html#linking-object-libraries
# Object Libraries may "link" to other libraries to get usage requirements,
# but since they do not have a link step nothing is done with their object files.
target_link_libraries ( libfluidsynth-OBJ PUBLIC
    ${LIBFLUID_LIBS}
)

# Here are applied/linked the OBJECT library dependencies
target_link_libraries ( libfluidsynth PRIVATE libfluidsynth-OBJ )

# Exported targets.

# build_interface: for the libfluidsynth target when imported from the build directory.
# install_interface: for the target when imported from the installed directory.
target_include_directories(libfluidsynth PUBLIC
    "$<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}/include/;${PROJECT_BINARY_DIR}/include/>"
    "$<INSTALL_INTERFACE:${CMAKE_INSTALL_INCLUDEDIR}>"
)

