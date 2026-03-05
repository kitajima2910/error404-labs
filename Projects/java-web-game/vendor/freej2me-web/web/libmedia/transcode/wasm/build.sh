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


targets=(x264 ffmpeg lib)

mkdir -p build target



clean_x264() {
  if [ -d "$SRC" ]; then
    cd "$SRC"
    make distclean
  fi
}
build_x264() {
  if [ ! -d "$SRC" ]; then
      # git clone --depth 1 --revision fe9e4a7f39d7a9fd208e4592238f9809d5936439 https://code.videolan.org/videolan/x264 "$SRC"
      git clone --depth 1 https://code.videolan.org/videolan/x264 "$SRC"
      cd "$SRC"
      git fetch origin fe9e4a7f39d7a9fd208e4592238f9809d5936439
      git checkout FETCH_HEAD
      patch -N -p1 <"$basedir/patches/x264_cpu_cores.patch"
  fi

  cd "$SRC"

  cflags="$GLOBAL_CFLAGS"
  ldflags="" # -s USE_ZLIB=1
   # for .a?

  # with emscripten, we can't change lib dir directly
  export EM_PKG_CONFIG_PATH=$PREFIX/lib/pkgconfig

  opts=()

  [ -n "$DEBUG" ] && opts+=(--enable-debug)

  if [ ! -f ./config.h ]; then
    emconfigure ./configure --prefix=$PREFIX --host=x86-gnu --enable-static --disable-cli --disable-asm --disable-thread \
      --extra-cflags="$cflags" --extra-ldflags="$ldflags" "${opts[@]}"
  fi

  emmake make install-lib-static
}


clean_ffmpeg() {
  if [ -d "$SRC" ]; then
    cd "$SRC"
    make clean
    rm -f config.h
  fi
}
build_ffmpeg() {
  if [ ! -d "$SRC" ]; then
      git clone --depth 1 --branch n7.1.1 https://github.com/ffmpeg/ffmpeg "$SRC"
  fi

  cflags="$GLOBAL_CFLAGS"
  ldflags="-s USE_ZLIB=1" # -s USE_ZLIB=1
   # for .a?

  # with emscripten, we can't change lib dir directly
  export EM_PKG_CONFIG_PATH=$PREFIX/lib/pkgconfig


  cd "$SRC"

  ff_opts=(
    --enable-pic
    --disable-runtime-cpudetect
    --disable-all
    --disable-autodetect
    --disable-asm
    --disable-network
    --disable-doc
    --disable-pthreads

    --enable-avformat
    --enable-avcodec
    --enable-avutil
    --enable-swresample
    --enable-swscale

    --enable-muxer=mp4
    --enable-encoder={aac,libx264}
    --enable-gpl
    --enable-libx264
    --enable-zlib
  )

  ff_opts+=(--enable-demuxer={mov,wav,mmf,mp3,amr,mpegps,mpegvideo})

  # for adpcm/pcm, pick any.. (mmf is yamaha adpcm)
  ff_opts+=(--enable-decoder={aac{,_fixed,_latm},amr{nb,wb},adpcm_ima_wav,pcm_{mu,a}law,pcm_{u,s}8,pcm_s8_planar,pcm_{u,s}{16,24,32}{le,be},mp2,mp3,mpegvideo,mpeg4,h263})

  # we can't use cross-prefix since it doesn't find pkg-config
  ff_opts+=(--enable-cross-compile --nm=emnm --ar=emar --cc=emcc --cxx=em++ --ranlib=emranlib --strip=emstrip --arch=wasm --target-os=none --extra-cflags="$cflags" --extra-cxxflags="$cflags" --extra-ldflags="$ldflags" --pkg-config-flags="--static")

  [ -n "$DEBUG" ] && ff_opts+=(--disable-stripping) || ff_opts+=(--disable-debug)

  set -e

  if [ ! -f ./config.h ]; then
    emconfigure ./configure --prefix=$PREFIX/ --stdc=c11 --stdcxx=c++11 "${ff_opts[@]}"
  fi

  emmake make
  emmake make install

  set +e

}


clean_lib() {
  rm -rf $basedir/../transcode.wasm $PREFIX/../transcode.wat
}
build_lib() {
  exported_funcs=(_malloc _free)
  exported_funcs+=(_transcode _ob_get_data _ob_get_size _ob_free)
  exported_funcs="${exported_funcs[*]}"

  [ -n "$DEBUG" ] && flags=-g || flags=-O2

  # -Wl,--allow-multiple-definition allows us to override things
  # but.. could break with bsymbolic?

  emcc $flags "$GLOBAL_CFLAGS" -o $basedir/../transcode.wasm $SRC/transcode.c $SRC/iostub.c -I$PREFIX/include $PREFIX/lib/*.a -s USE_ZLIB=1 -sASSERTIONS=0 -sEXPORTED_FUNCTIONS="${exported_funcs// /,}" --no-entry -Wl,--allow-multiple-definition -sINITIAL_HEAP=33554432 -sALLOW_MEMORY_GROWTH=1 -sMEMORY_GROWTH_GEOMETRIC_STEP=0.5

  # wasm2wat $basedir/../transcode.wasm > $PREFIX/../transcode.wat
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



