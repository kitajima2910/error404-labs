# FluidSynth - A Software Synthesizer
#
# Copyright (C) 2003-2023 Peter Hanappe and others.
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

cmake_minimum_required ( VERSION 3.13 )
# 3.1 because of CMAKE_C_STANDARD
# 3.11 because COMPATIBILITY SameMinorVersion in CMakePackageConfigHelpers
# 3.13.5 because it is the latest supported in Windows XP

if(POLICY CMP0075) # CMake version 3.13.5 warns when the policy is not set or value is OLD
  cmake_policy(SET CMP0075 NEW)
endif()

if(POLICY CMP0091) # new in CMake 3.15, defaults to OLD
  cmake_policy(SET CMP0091 NEW)
endif()

if(POLICY CMP0099) # new in CMake 3.17, defaults to OLD
  cmake_policy(SET CMP0099 NEW)
elseif(NOT BUILD_SHARED_LIBS)
  message(WARNING "Your version of CMake is very old. This may cause linking issues if your dependencies are not in your compiler's default search paths.")
endif()

project ( FluidSynth C CXX )
list( APPEND CMAKE_MODULE_PATH ${FluidSynth_SOURCE_DIR}/cmake_admin )

# FluidSynth package name
set ( PACKAGE "fluidsynth" )

# FluidSynth package version
set ( FLUIDSYNTH_VERSION_MAJOR 2 )
set ( FLUIDSYNTH_VERSION_MINOR 4 )
set ( FLUIDSYNTH_VERSION_MICRO 0 )
set ( VERSION "${FLUIDSYNTH_VERSION_MAJOR}.${FLUIDSYNTH_VERSION_MINOR}.${FLUIDSYNTH_VERSION_MICRO}" )
set ( FLUIDSYNTH_VERSION "\"${VERSION}\"" )

# libfluidsynth - Library version
# *** NOTICE ***
# Update library version upon each release (follow these steps in order)
# if any source code changes: REVISION++
# if any interfaces added/removed/changed: REVISION=0
# if any interfaces removed/changed (compatibility broken): CURRENT++
# if any interfaces have been added: AGE++
# if any interfaces have been removed/changed (compatibility broken): AGE=0
# This is not exactly the same algorithm as the libtool one, but the results are the same.
set ( LIB_VERSION_CURRENT 3 )
set ( LIB_VERSION_AGE 3 )
set ( LIB_VERSION_REVISION 0 )
set ( LIB_VERSION_INFO
      "${LIB_VERSION_CURRENT}.${LIB_VERSION_AGE}.${LIB_VERSION_REVISION}" )

option ( BUILD_SHARED_LIBS "Build a shared object or DLL" off )
option ( enable-floats "enable type float instead of double for DSP samples" off )


# the default C standard to use for all targets
set(CMAKE_C_STANDARD 90)

# the default C++ standard to use for all targets
set(CMAKE_CXX_STANDARD 98)

# whether to use gnu extensions
set(CMAKE_C_EXTENSIONS ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Compile with position independent code if the user requested a shared lib, i.e. no PIC if static requested.
# This is cmakes default behavior, but here it's explicitly required due to the use of libfluidsynth-OBJ as object library,
# which would otherwise always be compiled without PIC.
if ( NOT CMAKE_POSITION_INDEPENDENT_CODE )
    set ( CMAKE_POSITION_INDEPENDENT_CODE ${BUILD_SHARED_LIBS} )
endif ( NOT CMAKE_POSITION_INDEPENDENT_CODE )

# the default global visibility level for all target
set ( CMAKE_C_VISIBILITY_PRESET hidden )

# enforce visibility control for all types of cmake targets
if ( POLICY CMP0063 ) # since version 3.3, CMake version 3.21.2 warns when the policy is not set and uses OLD behavior.
  cmake_policy ( SET CMP0063 NEW )
endif ( POLICY CMP0063 )

# Default install directory names, some provided by GNUInstallDirs
include ( DefaultDirs )

# Basic C library checks
include ( CheckCCompilerFlag )
include ( CheckSTDC )
include ( CheckIncludeFile )
include ( CheckSymbolExists )
include ( CheckTypeSize )
check_include_file ( string.h HAVE_STRING_H )
check_include_file ( strings.h HAVE_STRINGS_H )
check_include_file ( stdlib.h HAVE_STDLIB_H )

set(HAVE_STDIO_H 1)
set(HAVE_MATH_H 1)
set(HAVE_ERRNO_H 1)
set(HAVE_STDARG_H 1)
set(HAVE_UNISTD_H 1)
set(HAVE_SYS_MMAN_H 1)
set(HAVE_SYS_TYPES_H 1)
set(HAVE_SYS_TIME_H 1)
set(HAVE_SYS_STAT_H 1)
set(HAVE_FCNTL_H 1)
set(HAVE_SYS_SOCKET_H 1)
set(HAVE_NETINET_IN_H 1)
set(HAVE_NETINET_TCP_H 1)
set(HAVE_ARPA_INET_H 1)
set(HAVE_LIMITS_H 1)
set(HAVE_PTHREAD_H 1)
set(HAVE_SIGNAL_H 1)
set(HAVE_GETOPT_H 1)
set(HAVE_STDINT_H 1)

check_type_size ( "long long" LONG_LONG )
if ( NOT HAVE_LONG_LONG AND NOT MSVC)
    message ( FATAL_ERROR "Your compiler does not support intrinsic type 'long long'. Unable to compile fluidsynth." )
endif ()

include ( CMakePrintHelpers ) # for cmake_print_properties() and cmake_print_variables()
include ( TestBigEndian )
test_big_endian ( WORDS_BIGENDIAN )

unset ( LIBFLUID_CPPFLAGS CACHE )
unset ( LIBFLUID_LIBS CACHE )
unset ( FLUID_CPPFLAGS CACHE )
unset ( FLUID_LIBS CACHE )

if ( CMAKE_COMPILER_IS_GNUCC OR CMAKE_C_COMPILER_ID MATCHES "Clang" OR CMAKE_C_COMPILER_ID STREQUAL "Intel" )
  if ( NOT APPLE AND NOT OS2 AND NOT EMSCRIPTEN )
    set ( CMAKE_EXE_LINKER_FLAGS
          "${CMAKE_EXE_LINKER_FLAGS} -Wl,--as-needed" )
    set ( CMAKE_SHARED_LINKER_FLAGS
          "${CMAKE_SHARED_LINKER_FLAGS} -Wl,--no-undefined" )
  endif ( NOT APPLE AND NOT OS2 AND NOT EMSCRIPTEN )

  # define some warning flags
  set ( CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wall -W -Wpointer-arith -Wcast-qual -Wstrict-prototypes -Wno-unused-parameter -Wdeclaration-after-statement -Werror=implicit-function-declaration" )
  check_c_compiler_flag ( "-Werror=incompatible-pointer-types" HAVE_INCOMPATIBLE_POINTER_TYPES )
  if ( HAVE_INCOMPATIBLE_POINTER_TYPES )
    set ( CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Werror=incompatible-pointer-types" )
  endif ( HAVE_INCOMPATIBLE_POINTER_TYPES )

  set ( CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -W -Wpointer-arith -Wcast-qual -Wno-unused-parameter" )

  # prepend to build type specific flags, to allow users to override
  set ( CMAKE_C_FLAGS_DEBUG "-g ${CMAKE_C_FLAGS_DEBUG}" )

  if ( CMAKE_C_COMPILER_ID STREQUAL "Intel" )
    # icc needs the restrict flag to recognize C99 restrict pointers
    set ( CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -restrict" )
  else () # not intel
    # gcc and clang support bad function cast and alignment warnings; add them as well.
    set ( CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -Wbad-function-cast -Wcast-align" )
    set ( CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wcast-align" )

  endif (CMAKE_C_COMPILER_ID STREQUAL "Intel" )
endif ( CMAKE_COMPILER_IS_GNUCC OR CMAKE_C_COMPILER_ID MATCHES "Clang" OR CMAKE_C_COMPILER_ID STREQUAL "Intel" )

# Check for math

find_library ( HAS_LIBM NAMES "m" )
if ( HAS_LIBM )
  set ( MATH_LIBRARY "m" )
endif ( HAS_LIBM )

set ( LIBFLUID_LIBS ${MATH_LIBRARY} )

unset ( WITH_FLOAT CACHE )
if ( enable-floats )
    set ( WITH_FLOAT 1 )
endif ( enable-floats )

if ( NOT CMAKE_BUILD_TYPE )
    set ( CMAKE_BUILD_TYPE "RelWithDebInfo" CACHE STRING
          "Choose the build type, options: Debug Release RelWithDebInfo MinSizeRel" FORCE )
endif ( NOT CMAKE_BUILD_TYPE )

unset ( ENABLE_DEBUG CACHE )
if ( CMAKE_BUILD_TYPE MATCHES "Debug" )
    set ( ENABLE_DEBUG 1 )
    add_definitions(-DDEBUG) # -D_GLIBCXX_DEBUG) # for additional C++ STL container debugging
endif ( CMAKE_BUILD_TYPE MATCHES "Debug" )

# Additional targets to perform clang-format/clang-tidy
# Get all project files
file(GLOB_RECURSE
     ALL_SOURCE_FILES
     LIST_DIRECTORIES false
     ${FluidSynth_SOURCE_DIR}/*.[chi]
     ${FluidSynth_SOURCE_DIR}/*.[chi]pp
     ${FluidSynth_SOURCE_DIR}/*.[chi]xx
     ${FluidSynth_SOURCE_DIR}/*.cc
     ${FluidSynth_SOURCE_DIR}/*.hh
     ${FluidSynth_SOURCE_DIR}/*.ii
     ${FluidSynth_SOURCE_DIR}/*.[CHI]
     )


# Make sure to link against libm before checking for math functions below
set ( CMAKE_REQUIRED_LIBRARIES "${LIBFLUID_LIBS}" )


# General configuration file
configure_file ( ${FluidSynth_SOURCE_DIR}/src/config.cmake
                 ${FluidSynth_BINARY_DIR}/config.h )

# Process subdirectories
add_subdirectory ( src )

install ( TARGETS libfluidsynth
  RUNTIME DESTINATION ${CMAKE_INSTALL_BINDIR}
  LIBRARY DESTINATION ${CMAKE_INSTALL_LIBDIR}
  ARCHIVE DESTINATION ${CMAKE_INSTALL_LIBDIR}
  PUBLIC_HEADER DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/fluidsynth
)
install ( FILES ${public_main_HEADER} DESTINATION ${CMAKE_INSTALL_INCLUDEDIR} )