#!/bin/bash

export EMSDK_QUIET=1
. ${EMSDK_HOME-~/emsdk}/emsdk_env.sh

# use --release to build without debug symbols

DEBUG=1
if [ "$1" = "--release" ]; then
  DEBUG=
  shift
fi

mode=${1-all}

basedir="$(realpath "$(dirname "$0")")"
cd "$basedir"

PREFIX=$(realpath target)

GLOBAL_CFLAGS="-flto"


targets=(fluidsynth lib)

mkdir -p build target


clean_fluidsynth() {
  :
}
build_fluidsynth() {
  extra_flags="$GLOBAL_CFLAGS"
  [ -z "$DEBUG" ] && bt_flag="-DCMAKE_BUILD_TYPE=Release" || bt_flag=

  emcmake cmake $bt_flag -DCMAKE_C_FLAGS_INIT="$extra_flags" -DCMAKE_INSTALL_PREFIX=$PREFIX  -DCMAKE_INSTALL_LIBDIR=lib $SRC
  make
  make install

  cp $SRC/include/fluidsynth.h $PREFIX/include

}

clean_lib() {
  rm -rf $basedir/../libmidi.wasm $PREFIX/../libmidi.wat
}
build_lib() {
  exported_funcs=(_malloc _free)
  exported_funcs+=(_midiplayer_{create,delete,set_sequence,play,write_data,get_position,loop,short_event,stop,seek})
  exported_funcs="${exported_funcs[*]}"

  [ -n "$DEBUG" ] && flags=-g || flags=-O2

  # -Wl,--allow-multiple-definition allows us to override things
  # but.. could break with bsymbolic?

  emcc $flags "$GLOBAL_CFLAGS" -o $basedir/../libmidi.wasm $SRC/*.c -I$PREFIX/include $PREFIX/lib/*.a -s USE_ZLIB=1 -sASSERTIONS=0 -sEXPORTED_FUNCTIONS="${exported_funcs// /,}" --no-entry -Wl,--allow-multiple-definition -sINITIAL_HEAP=16777216 -sALLOW_MEMORY_GROWTH=1

  # wasm2wat $basedir/../libmidi.wasm > $PREFIX/../libmidi.wat
}

if [ "$mode" = "clean" ]; then
  what="$2"

  for target in "${targets[@]}"; do
    [ -n "$what" ] && [[ $what != $target ]] && continue

    cd "$basedir"
    [ -d "build/$target" ] && cd build/$target

    SRC="$basedir/$target"

    clean_$target

    rm -rf "$basedir/build/$target"
  done

  [ -z "$what" ] && rm -rf $basedir/build $basedir/target

else
  for target in "${targets[@]}"; do
    [[ $mode != "all" && $mode != $target ]] && continue

    cd "$basedir"

    mkdir -p build/$target
    cd build/$target

    SRC="$basedir/$target"

    build_$target
  done

fi



