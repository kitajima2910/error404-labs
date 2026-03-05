message(STATUS "Checking whether system has ANSI C header files")
include(CheckIncludeFiles)

set(STDC_HEADERS 1 CACHE INTERNAL "System has ANSI C header files")
set(HAVE_STRINGS_H 1)
set(HAVE_STRING_H 1)
set(HAVE_FLOAT_H 1)
set(HAVE_STDLIB_H 1)
set(HAVE_STDDEF_H 1)
set(HAVE_STDINT_H 1)
set(HAVE_INTTYPES_H 1)

set(HAVE_UNISTD_H 1)

set(HAVE_SYS_STAT_H 1)
set(HAVE_SYS_TYPES_H 1)
