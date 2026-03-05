/* FluidSynth - A Software Synthesizer
 *
 * Copyright (C) 2003  Peter Hanappe and others.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public License
 * as published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301, USA
 */

#include "fluid_sys.h"


#if READLINE_SUPPORT
#include <readline/readline.h>
#include <readline/history.h>
#endif

#ifdef DBUS_SUPPORT
#include "fluid_rtkit.h"
#endif

#if HAVE_PTHREAD_H && !defined(_WIN32)
// Do not include pthread on windows. It includes winsock.h, which collides with ws2tcpip.h from fluid_sys.h
// It isn't need on Windows anyway.
#include <pthread.h>
#endif

/* WIN32 HACK - Flag used to differentiate between a file descriptor and a socket.
 * Should work, so long as no SOCKET or file descriptor ends up with this bit set. - JG */
#ifdef _WIN32
#define FLUID_SOCKET_FLAG      0x40000000
#else
#define FLUID_SOCKET_FLAG      0x00000000
#define SOCKET_ERROR           -1
#define INVALID_SOCKET         -1
#endif

/* SCHED_FIFO priority for high priority timer threads */
#define FLUID_SYS_TIMER_HIGH_PRIO_LEVEL         10



struct _fluid_timer_t
{
    long msec;

    // Pointer to a function to be executed by the timer.
    // This field is set to NULL once the timer is finished to indicate completion.
    // This allows for timed waits, rather than waiting forever as fluid_timer_join() does.
    fluid_timer_callback_t callback;
    void *data;
    int cont;
    int auto_destroy;
};



static fluid_log_function_t fluid_log_function[LAST_LOG_LEVEL] =
{
    fluid_default_log_function,
    fluid_default_log_function,
    fluid_default_log_function,
    fluid_default_log_function,
#ifdef DEBUG
    fluid_default_log_function
#else
    NULL
#endif
};
static void *fluid_log_user_data[LAST_LOG_LEVEL] = { NULL };

static const char fluid_libname[] = "fluidsynth";

/**
 * Installs a new log function for a specified log level.
 * @param level Log level to install handler for.
 * @param fun Callback function handler to call for logged messages
 * @param data User supplied data pointer to pass to log function
 * @return The previously installed function.
 */
fluid_log_function_t
fluid_set_log_function(int level, fluid_log_function_t fun, void *data)
{
    fluid_log_function_t old = NULL;

    if((level >= 0) && (level < LAST_LOG_LEVEL))
    {
        old = fluid_log_function[level];
        fluid_log_function[level] = fun;
        fluid_log_user_data[level] = data;
    }

    return old;
}

/**
 * Default log function which prints to the stderr.
 * @param level Log level
 * @param message Log message
 * @param data User supplied data (not used)
 */
void
fluid_default_log_function(int level, const char *message, void *data)
{
    FILE *out;

#if defined(_WIN32)
    out = stdout;
#else
    out = stderr;
#endif

    switch(level)
    {
    case FLUID_PANIC:
        FLUID_FPRINTF(out, "%s: panic: %s\n", fluid_libname, message);
        break;

    case FLUID_ERR:
        FLUID_FPRINTF(out, "%s: error: %s\n", fluid_libname, message);
        break;

    case FLUID_WARN:
        FLUID_FPRINTF(out, "%s: warning: %s\n", fluid_libname, message);
        break;

    case FLUID_INFO:
        FLUID_FPRINTF(out, "%s: %s\n", fluid_libname, message);
        break;

    case FLUID_DBG:
        FLUID_FPRINTF(out, "%s: debug: %s\n", fluid_libname, message);
        break;

    default:
        FLUID_FPRINTF(out, "%s: %s\n", fluid_libname, message);
        break;
    }
}

/**
 * Print a message to the log.
 * @param level Log level (#fluid_log_level).
 * @param fmt Printf style format string for log message
 * @param ... Arguments for printf 'fmt' message string
 * @return Always returns #FLUID_FAILED
 */
int
fluid_log(int level, const char *fmt, ...)
{
    if((level >= 0) && (level < LAST_LOG_LEVEL))
    {
        fluid_log_function_t fun = fluid_log_function[level];

        if(fun != NULL)
        {
            char errbuf[1024];

            va_list args;
            va_start(args, fmt);
            FLUID_VSNPRINTF(errbuf, sizeof(errbuf), fmt, args);
            va_end(args);

            (*fun)(level, errbuf, fluid_log_user_data[level]);
        }
    }

    return FLUID_FAILED;
}

void* fluid_alloc(size_t len)
{
    void* ptr = malloc(len);

#if defined(DEBUG) && !defined(_MSC_VER)
    // garbage initialize allocated memory for debug builds to ease reproducing
    // bugs like 44453ff23281b3318abbe432fda90888c373022b .
    //
    // MSVC++ already garbage initializes allocated memory by itself (debug-heap).
    //
    // 0xCC because
    // * it makes pointers reliably crash when dereferencing them,
    // * floating points are still some valid but insanely huge negative number, and
    // * if for whatever reason this allocated memory is executed, it'll trigger
    //   INT3 (...at least on x86)
    if(ptr != NULL)
    {
        memset(ptr, 0xCC, len);
    }
#endif
    return ptr;
}

/**
 * Open a file with a UTF-8 string, even in Windows
 * @param filename The name of the file to open
 * @param mode The mode to open the file in
 */
FILE *fluid_fopen(const char *filename, const char *mode)
{
#if defined(_WIN32)
    wchar_t *wpath = NULL, *wmode = NULL;
    FILE *file = NULL;
    int length;
    if ((length = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, filename, -1, NULL, 0)) == 0)
    {
        FLUID_LOG(FLUID_ERR, "Unable to perform MultiByteToWideChar() conversion for filename '%s'. Error was: '%s'", filename, fluid_get_windows_error());
        errno = EINVAL;
        goto error_recovery;
    }

    wpath = FLUID_MALLOC(length * sizeof(wchar_t));
    if (wpath == NULL)
    {
        FLUID_LOG(FLUID_PANIC, "Out of memory.");
        errno = EINVAL;
        goto error_recovery;
    }

    MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, filename, -1, wpath, length);

    if ((length = MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, mode, -1, NULL, 0)) == 0)
    {
        FLUID_LOG(FLUID_ERR, "Unable to perform MultiByteToWideChar() conversion for mode '%s'. Error was: '%s'", mode, fluid_get_windows_error());
        errno = EINVAL;
        goto error_recovery;
    }

    wmode = FLUID_MALLOC(length * sizeof(wchar_t));
    if (wmode == NULL)
    {
        FLUID_LOG(FLUID_PANIC, "Out of memory.");
        errno = EINVAL;
        goto error_recovery;
    }

    MultiByteToWideChar(CP_UTF8, MB_ERR_INVALID_CHARS, mode, -1, wmode, length);

    file = _wfopen(wpath, wmode);

error_recovery:
    FLUID_FREE(wpath);
    FLUID_FREE(wmode);

    return file;
#else
    return fopen(filename, mode);
#endif
}

/**
 * Wrapper for free() that satisfies at least C90 requirements.
 *
 * @param ptr Pointer to memory region that should be freed
 *
 * @note Only use this function when the API documentation explicitly says so. Otherwise use
 * adequate \c delete_fluid_* functions.
 *
 * @warning Calling ::free() on memory that is advised to be freed with fluid_free() results in undefined behaviour!
 * (cf.: "Potential Errors Passing CRT Objects Across DLL Boundaries" found in MS Docs)
 *
 * @since 2.0.7
 */
void fluid_free(void* ptr)
{
    free(ptr);
}

/**
 * An improved strtok, still trashes the input string, but is portable and
 * thread safe.  Also skips token chars at beginning of token string and never
 * returns an empty token (will return NULL if source ends in token chars though).
 * NOTE: NOT part of public API
 * @internal
 * @param str Pointer to a string pointer of source to tokenize.  Pointer gets
 *   updated on each invocation to point to beginning of next token.  Note that
 *   token char gets overwritten with a 0 byte.  String pointer is set to NULL
 *   when final token is returned.
 * @param delim String of delimiter chars.
 * @return Pointer to the next token or NULL if no more tokens.
 */
char *fluid_strtok(char **str, char *delim)
{
    char *s, *d, *token;
    char c;

    if(str == NULL || delim == NULL || !*delim)
    {
        FLUID_LOG(FLUID_ERR, "Null pointer");
        return NULL;
    }

    s = *str;

    if(!s)
    {
        return NULL;    /* str points to a NULL pointer? (tokenize already ended) */
    }

    /* skip delimiter chars at beginning of token */
    do
    {
        c = *s;

        if(!c)	/* end of source string? */
        {
            *str = NULL;
            return NULL;
        }

        for(d = delim; *d; d++)	/* is source char a token char? */
        {
            if(c == *d)	/* token char match? */
            {
                s++;		/* advance to next source char */
                break;
            }
        }
    }
    while(*d);		/* while token char match */

    token = s;		/* start of token found */

    /* search for next token char or end of source string */
    for(s = s + 1; *s; s++)
    {
        c = *s;

        for(d = delim; *d; d++)	/* is source char a token char? */
        {
            if(c == *d)	/* token char match? */
            {
                *s = '\0';	/* overwrite token char with zero byte to terminate token */
                *str = s + 1;	/* update str to point to beginning of next token */
                return token;
            }
        }
    }

    /* we get here only if source string ended */
    *str = NULL;
    return token;
}




#if defined(_WIN32)      /* Windoze specific stuff */

void
fluid_thread_self_set_prio(int prio_level)
{
    if(prio_level > 0)
    {
        SetThreadPriority(GetCurrentThread(), THREAD_PRIORITY_HIGHEST);
    }
}


#elif defined(__OS2__)  /* OS/2 specific stuff */

void
fluid_thread_self_set_prio(int prio_level)
{
    if(prio_level > 0)
    {
        DosSetPriority(PRTYS_THREAD, PRTYC_REGULAR, PRTYD_MAXIMUM, 0);
    }
}

#else   /* POSIX stuff..  Nice POSIX..  Good POSIX. */

void
fluid_thread_self_set_prio(int prio_level)
{
    struct sched_param priority;

    if(prio_level > 0)
    {

        memset(&priority, 0, sizeof(priority));
        priority.sched_priority = prio_level;

        if(pthread_setschedparam(pthread_self(), SCHED_FIFO, &priority) == 0)
        {
            return;
        }

#ifdef DBUS_SUPPORT
        /* Try to gain high priority via rtkit */

        if(fluid_rtkit_make_realtime(0, prio_level) == 0)
        {
            return;
        }

#endif
        FLUID_LOG(FLUID_WARN, "Failed to set thread to high priority");
    }
}

#ifdef FPE_CHECK

/***************************************************************
 *
 *               Floating point exceptions
 *
 *  The floating point exception functions were taken from Ircam's
 *  jMax source code. https://www.ircam.fr/jmax
 *
 *  FIXME: check in config for i386 machine
 *
 *  Currently not used. I leave the code here in case we want to pick
 *  this up again some time later.
 */

/* Exception flags */
#define _FPU_STATUS_IE    0x001  /* Invalid Operation */
#define _FPU_STATUS_DE    0x002  /* Denormalized Operand */
#define _FPU_STATUS_ZE    0x004  /* Zero Divide */
#define _FPU_STATUS_OE    0x008  /* Overflow */
#define _FPU_STATUS_UE    0x010  /* Underflow */
#define _FPU_STATUS_PE    0x020  /* Precision */
#define _FPU_STATUS_SF    0x040  /* Stack Fault */
#define _FPU_STATUS_ES    0x080  /* Error Summary Status */

/* Macros for accessing the FPU status word.  */

/* get the FPU status */
#define _FPU_GET_SW(sw) __asm__ ("fnstsw %0" : "=m" (*&sw))

/* clear the FPU status */
#define _FPU_CLR_SW() __asm__ ("fnclex" : : )

/* Purpose:
 * Checks, if the floating point unit has produced an exception, print a message
 * if so and clear the exception.
 */
unsigned int fluid_check_fpe_i386(char *explanation)
{
    unsigned int s;

    _FPU_GET_SW(s);
    _FPU_CLR_SW();

    s &= _FPU_STATUS_IE | _FPU_STATUS_DE | _FPU_STATUS_ZE | _FPU_STATUS_OE | _FPU_STATUS_UE;

    if(s)
    {
        FLUID_LOG(FLUID_WARN, "FPE exception (before or in %s): %s%s%s%s%s", explanation,
                  (s & _FPU_STATUS_IE) ? "Invalid operation " : "",
                  (s & _FPU_STATUS_DE) ? "Denormal number " : "",
                  (s & _FPU_STATUS_ZE) ? "Zero divide " : "",
                  (s & _FPU_STATUS_OE) ? "Overflow " : "",
                  (s & _FPU_STATUS_UE) ? "Underflow " : "");
    }

    return s;
}

/* Purpose:
 * Clear floating point exception.
 */
void fluid_clear_fpe_i386(void)
{
    _FPU_CLR_SW();
}

#endif	// ifdef FPE_CHECK


#endif	// #else    (its POSIX)


/***************************************************************
 *
 *               Profiling (Linux, i586 only)
 *
 */

#if WITH_PROFILING
/* Profiling interface between profiling command shell and audio rendering API
  (FluidProfile_0004.pdf- 3.2.2).
  Macros are in defined in fluid_sys.h.
*/

/*
  -----------------------------------------------------------------------------
  Shell task side |    Profiling interface               |  Audio task side
  -----------------------------------------------------------------------------
  profiling       |    Internal     |      |             |      Audio
  command   <---> |<-- profiling -->| Data |<--macros -->| <--> rendering
  shell           |    API          |      |             |      API

*/
/* default parameters for shell command "prof_start" in fluid_sys.c */
unsigned short fluid_profile_notes = 0; /* number of generated notes */
/* preset bank:0 prog:16 (organ) */
unsigned char fluid_profile_bank = FLUID_PROFILE_DEFAULT_BANK;
unsigned char fluid_profile_prog = FLUID_PROFILE_DEFAULT_PROG;

/* print mode */
unsigned char fluid_profile_print = FLUID_PROFILE_DEFAULT_PRINT;
/* number of measures */
unsigned short fluid_profile_n_prof = FLUID_PROFILE_DEFAULT_N_PROF;
/* measure duration in ms */
unsigned short fluid_profile_dur = FLUID_PROFILE_DEFAULT_DURATION;
/* lock between multiple-shell */
fluid_atomic_int_t fluid_profile_lock = 0;
/**/

/*----------------------------------------------
  Profiling Data
-----------------------------------------------*/
unsigned char fluid_profile_status = PROFILE_STOP; /* command and status */
unsigned int fluid_profile_end_ticks = 0;          /* ending position (in ticks) */
fluid_profile_data_t fluid_profile_data[] =        /* Data duration */
{
    {"synth_write_* ------------>", 1e10, 0.0, 0.0, 0, 0, 0},
    {"synth_one_block ---------->", 1e10, 0.0, 0.0, 0, 0, 0},
    {"synth_one_block:clear ---->", 1e10, 0.0, 0.0, 0, 0, 0},
    {"synth_one_block:one voice->", 1e10, 0.0, 0.0, 0, 0, 0},
    {"synth_one_block:all voices>", 1e10, 0.0, 0.0, 0, 0, 0},
    {"synth_one_block:reverb --->", 1e10, 0.0, 0.0, 0, 0, 0},
    {"synth_one_block:chorus --->", 1e10, 0.0, 0.0, 0, 0, 0},
    {"voice:note --------------->", 1e10, 0.0, 0.0, 0, 0, 0},
    {"voice:release ------------>", 1e10, 0.0, 0.0, 0, 0, 0}
};


/*----------------------------------------------
  Internal profiling API
-----------------------------------------------*/
/* logging profiling data (used on synthesizer instance deletion) */
void fluid_profiling_print(void)
{
    int i;

    printf("fluid_profiling_print\n");

    FLUID_LOG(FLUID_INFO, "Estimated times: min/avg/max (micro seconds)");

    for(i = 0; i < FLUID_PROFILE_NBR; i++)
    {
        if(fluid_profile_data[i].count > 0)
        {
            FLUID_LOG(FLUID_INFO, "%s: %.3f/%.3f/%.3f",
                      fluid_profile_data[i].description,
                      fluid_profile_data[i].min,
                      fluid_profile_data[i].total / fluid_profile_data[i].count,
                      fluid_profile_data[i].max);
        }
        else
        {
            FLUID_LOG(FLUID_DBG, "%s: no profiling available",
                      fluid_profile_data[i].description);
        }
    }
}

/* Macro that returns cpu load in percent (%)
 * @dur: duration (micro second).
 * @sample_rate: sample_rate used in audio driver (Hz).
 * @n_amples: number of samples collected during 'dur' duration.
*/
#define fluid_profile_load(dur,sample_rate,n_samples) \
        (dur * sample_rate / n_samples / 10000.0)


/* prints cpu loads only
*
* @param sample_rate the sample rate of audio output.
* @param out output stream device.
*
* ------------------------------------------------------------------------------
* Cpu loads(%) (sr: 44100 Hz, sp: 22.68 microsecond) and maximum voices
* ------------------------------------------------------------------------------
* nVoices| total(%)|voices(%)| reverb(%)|chorus(%)| voice(%)|estimated maxVoices
* -------|---------|---------|----------|---------|---------|-------------------
*     250|   41.544|   41.544|     0.000|    0.000|    0.163|              612
*/
static void fluid_profiling_print_load(double sample_rate, fluid_ostream_t out)
{
    unsigned int n_voices; /* voices number */
    static const char max_voices_not_available[] = "      not available";
    const char *pmax_voices;
    char max_voices_available[20];

    /* First computes data to be printed */
    double  total, voices, reverb, chorus, all_voices, voice;
    /* voices number */
    n_voices = fluid_profile_data[FLUID_PROF_ONE_BLOCK_VOICES].count ?
               fluid_profile_data[FLUID_PROF_ONE_BLOCK_VOICES].n_voices /
               fluid_profile_data[FLUID_PROF_ONE_BLOCK_VOICES].count : 0;

    /* total load (%) */
    total =  fluid_profile_data[FLUID_PROF_WRITE].count ?
             fluid_profile_load(fluid_profile_data[FLUID_PROF_WRITE].total, sample_rate,
                                fluid_profile_data[FLUID_PROF_WRITE].n_samples) : 0;

    /* reverb load (%) */
    reverb = fluid_profile_data[FLUID_PROF_ONE_BLOCK_REVERB].count ?
             fluid_profile_load(fluid_profile_data[FLUID_PROF_ONE_BLOCK_REVERB].total,
                                sample_rate,
                                fluid_profile_data[FLUID_PROF_ONE_BLOCK_REVERB].n_samples) : 0;

    /* chorus load (%) */
    chorus = fluid_profile_data[FLUID_PROF_ONE_BLOCK_CHORUS].count ?
             fluid_profile_load(fluid_profile_data[FLUID_PROF_ONE_BLOCK_CHORUS].total,
                                sample_rate,
                                fluid_profile_data[FLUID_PROF_ONE_BLOCK_CHORUS].n_samples) : 0;

    /* total voices load: total - reverb - chorus (%) */
    voices = total - reverb - chorus;

    /* One voice load (%): all_voices / n_voices. */
    all_voices = fluid_profile_data[FLUID_PROF_ONE_BLOCK_VOICES].count ?
                 fluid_profile_load(fluid_profile_data[FLUID_PROF_ONE_BLOCK_VOICES].total,
                                    sample_rate,
                                    fluid_profile_data[FLUID_PROF_ONE_BLOCK_VOICES].n_samples) : 0;

    voice = n_voices ?  all_voices / n_voices : 0;

    /* estimated maximum voices number */
    if(voice > 0)
    {
        FLUID_SNPRINTF(max_voices_available, sizeof(max_voices_available),
                       "%17d", (unsigned int)((100.0 - reverb - chorus) / voice));
        pmax_voices = max_voices_available;
    }
    else
    {
        pmax_voices = max_voices_not_available;
    }

    /* Now prints data */
    fluid_ostream_printf(out,
                         " ------------------------------------------------------------------------------\n");
    fluid_ostream_printf(out,
                         " Cpu loads(%%) (sr:%6.0f Hz, sp:%6.2f microsecond) and maximum voices\n",
                         sample_rate, 1000000.0 / sample_rate);
    fluid_ostream_printf(out,
                         " ------------------------------------------------------------------------------\n");
    fluid_ostream_printf(out,
                         " nVoices| total(%%)|voices(%%)| reverb(%%)|chorus(%%)| voice(%%)|estimated maxVoices\n");
    fluid_ostream_printf(out,
                         " -------|---------|---------|----------|---------|---------|-------------------\n");
    fluid_ostream_printf(out,
                         "%8d|%9.3f|%9.3f|%10.3f|%9.3f|%9.3f|%s\n", n_voices, total, voices,
                         reverb, chorus, voice, pmax_voices);
}

/*
* prints profiling data (used by profile shell command: prof_start).
* The function is an internal profiling API between the "profile" command
* prof_start and audio rendering API (see FluidProfile_0004.pdf - 3.2.2).
*
* @param sample_rate the sample rate of audio output.
* @param out output stream device.
*
* When print mode is 1, the function prints all the information (see below).
* When print mode is 0, the function prints only the cpu loads.
*
* ------------------------------------------------------------------------------
* Duration(microsecond) and cpu loads(%) (sr: 44100 Hz, sp: 22.68 microsecond)
* ------------------------------------------------------------------------------
* Code under profiling       |Voices|       Duration (microsecond)   |  Load(%)
*                            |   nbr|       min|       avg|       max|
* ---------------------------|------|--------------------------------|----------
* synth_write_* ------------>|   250|      3.91|   2188.82|   3275.00|  41.544
* synth_one_block ---------->|   250|   1150.70|   2273.56|   3241.47|  41.100
* synth_one_block:clear ---->|   250|      3.07|      4.62|     61.18|   0.084
* synth_one_block:one voice->|     1|      4.19|      9.02|   1044.27|   0.163
* synth_one_block:all voices>|   250|   1138.41|   2259.11|   3217.73|  40.839
* synth_one_block:reverb --->| no profiling available
* synth_one_block:chorus --->| no profiling available
* voice:note --------------->| no profiling available
* voice:release ------------>| no profiling available
* ------------------------------------------------------------------------------
* Cpu loads(%) (sr: 44100 Hz, sp: 22.68 microsecond) and maximum voices
* ------------------------------------------------------------------------------
* nVoices| total(%)|voices(%)| reverb(%)|chorus(%)| voice(%)|estimated maxVoices
* -------|---------|---------|----------|---------|---------|-------------------
*     250|   41.544|   41.544|     0.000|    0.000|    0.163|              612
*/
void fluid_profiling_print_data(double sample_rate, fluid_ostream_t out)
{
    int i;

    if(fluid_profile_print)
    {
        /* print all details: Duration(microsecond) and cpu loads(%) */
        fluid_ostream_printf(out,
                             " ------------------------------------------------------------------------------\n");
        fluid_ostream_printf(out,
                             " Duration(microsecond) and cpu loads(%%) (sr:%6.0f Hz, sp:%6.2f microsecond)\n",
                             sample_rate, 1000000.0 / sample_rate);
        fluid_ostream_printf(out,
                             " ------------------------------------------------------------------------------\n");
        fluid_ostream_printf(out,
                             " Code under profiling       |Voices|       Duration (microsecond)   |  Load(%%)\n");
        fluid_ostream_printf(out,
                             "                            |   nbr|       min|       avg|       max|\n");
        fluid_ostream_printf(out,
                             " ---------------------------|------|--------------------------------|----------\n");

        for(i = 0; i < FLUID_PROFILE_NBR; i++)
        {
            unsigned int count = fluid_profile_data[i].count;

            if(count > 0)
            {
                /* data are available */

                if(FLUID_PROF_WRITE <= i && i <= FLUID_PROF_ONE_BLOCK_CHORUS)
                {
                    double load = fluid_profile_load(fluid_profile_data[i].total, sample_rate,
                                                     fluid_profile_data[i].n_samples);
                    fluid_ostream_printf(out, " %s|%6d|%10.2f|%10.2f|%10.2f|%8.3f\n",
                                         fluid_profile_data[i].description, /* code under profiling */
                                         fluid_profile_data[i].n_voices / count, /* voices number */
                                         fluid_profile_data[i].min,              /* minimum duration */
                                         fluid_profile_data[i].total / count,    /* average duration */
                                         fluid_profile_data[i].max,              /* maximum duration */
                                         load);                                  /* cpu load */
                }
                else
                {
                    /* note and release duration */
                    fluid_ostream_printf(out, " %s|%6d|%10.0f|%10.0f|%10.0f|\n",
                                         fluid_profile_data[i].description, /* code under profiling */
                                         fluid_profile_data[i].n_voices / count,
                                         fluid_profile_data[i].min,              /* minimum duration */
                                         fluid_profile_data[i].total / count,    /* average duration */
                                         fluid_profile_data[i].max);             /* maximum duration */
                }
            }
            else
            {
                /* data aren't available */
                fluid_ostream_printf(out,
                                     " %s| no profiling available\n", fluid_profile_data[i].description);
            }
        }
    }

    /* prints cpu loads only */
    fluid_profiling_print_load(sample_rate, out);/* prints cpu loads */
}

/*
 Returns true if the user cancels the current profiling measurement.
 Actually this is implemented using the <ENTER> key. To add this functionality:
 1) Adds #define FLUID_PROFILE_CANCEL in fluid_sys.h.
 2) Adds the necessary code inside fluid_profile_is_cancel().

 When FLUID_PROFILE_CANCEL is not defined, the function return FALSE.
*/
int fluid_profile_is_cancel_req(void)
{
#ifdef FLUID_PROFILE_CANCEL

#if defined(_WIN32)      /* Windows specific stuff */
    /* Profile cancellation is supported for Windows */
    /* returns TRUE if key <ENTER> is depressed */
    return(GetAsyncKeyState(VK_RETURN) & 0x1);

#elif defined(__OS2__)  /* OS/2 specific stuff */
    /* Profile cancellation isn't yet supported for OS2 */
    /* For OS2, replaces the following  line with the function that returns
    true when the keyboard key <ENTER> is depressed */
    return FALSE; /* default value */

#else   /* POSIX stuff */
    /* Profile cancellation is supported for Linux */
    /* returns true is <ENTER> is depressed */
    {
        /* Here select() is used to poll the standard input to see if an input
         is ready. As the standard input is usually buffered, the user
         needs to depress <ENTER> to set the input to a "ready" state.
        */
        struct timeval tv;
        fd_set fds;    /* just one fds need to be polled */
        tv.tv_sec = 0; /* Setting both values to 0, means a 0 timeout */
        tv.tv_usec = 0;
        FD_ZERO(&fds); /* reset fds */
        FD_SET(STDIN_FILENO, &fds); /* sets fds to poll standard input only */
        select(STDIN_FILENO + 1, &fds, NULL, NULL, &tv); /* polling */
        return (FD_ISSET(0, &fds)); /* returns true if standard input is ready */
    }
#endif /* OS stuff */

#else /* FLUID_PROFILE_CANCEL not defined */
    return FALSE; /* default value */
#endif /* FLUID_PROFILE_CANCEL */
}

/**
* Returns status used in shell command "prof_start".
* The function is an internal profiling API between the "profile" command
* prof_start and audio rendering API (see FluidProfile_0004.pdf - 3.2.2).
*
* @return status
* - PROFILE_READY profiling data are ready.
* - PROFILE_RUNNING, profiling data are still under acquisition.
* - PROFILE_CANCELED, acquisition has been cancelled by the user.
* - PROFILE_STOP, no acquisition in progress.
*
* When status is PROFILE_RUNNING, the caller can do passive waiting, or other
* work before recalling the function later.
*/
int fluid_profile_get_status(void)
{
    /* Checks if user has requested to cancel the current measurement */
    /* Cancellation must have precedence over other status */
    if(fluid_profile_is_cancel_req())
    {
        fluid_profile_start_stop(0, 0); /* stops the measurement */
        return PROFILE_CANCELED;
    }

    switch(fluid_profile_status)
    {
    case PROFILE_READY:
        return PROFILE_READY; /* profiling data are ready */

    case PROFILE_START:
        return PROFILE_RUNNING;/* profiling data are under acquisition */

    default:
        return PROFILE_STOP;
    }
}

/**
*  Starts or stops profiling measurement.
*  The function is an internal profiling API between the "profile" command
*  prof_start and audio rendering API (see FluidProfile_0004.pdf - 3.2.2).
*
*  @param end_tick end position of the measure (in ticks).
*  - If end_tick is greater then 0, the function starts a measure if a measure
*    isn't running. If a measure is already running, the function does nothing
*    and returns.
*  - If end_tick is 0, the function stops a measure.
*  @param clear_data,
*  - If clear_data is 0, the function clears fluid_profile_data before starting
*    a measure, otherwise, the data from the started measure will be accumulated
*    within fluid_profile_data.
*/
void fluid_profile_start_stop(unsigned int end_ticks, short clear_data)
{
    if(end_ticks)    /* This is a "start" request */
    {
        /* Checks if a measure is already running */
        if(fluid_profile_status != PROFILE_START)
        {
            short i;
            fluid_profile_end_ticks = end_ticks;

            /* Clears profile data */
            if(clear_data == 0)
            {
                for(i = 0; i < FLUID_PROFILE_NBR; i++)
                {
                    fluid_profile_data[i].min = 1e10;/* min sets to max value */
                    fluid_profile_data[i].max = 0;   /* maximum sets to min value */
                    fluid_profile_data[i].total = 0; /* total duration microsecond */
                    fluid_profile_data[i].count = 0;    /* data count */
                    fluid_profile_data[i].n_voices = 0; /* voices number */
                    fluid_profile_data[i].n_samples = 0;/* audio samples number */
                }
            }

            fluid_profile_status = PROFILE_START;	/* starts profiling */
        }

        /* else do nothing when profiling is already started */
    }
    else /* This is a "stop" request */
    {
        /* forces the current running profile (if any) to stop */
        fluid_profile_status = PROFILE_STOP;	/* stops profiling */
    }
}

#endif /* WITH_PROFILING */



#if defined(_WIN32) || defined(__CYGWIN__)
// not thread-safe!
char* fluid_get_windows_error(void)
{
    static TCHAR err[1024];

    FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM,
                  NULL,
                  GetLastError(),
                  MAKELANGID(LANG_ENGLISH, SUBLANG_ENGLISH_US),
                  err,
                  sizeof(err)/sizeof(err[0]),
                  NULL);

#ifdef _UNICODE
    static char ascii_err[sizeof(err)];

    WideCharToMultiByte(CP_UTF8, 0, err, -1, ascii_err, sizeof(ascii_err)/sizeof(ascii_err[0]), 0, 0);
    return ascii_err;
#else
    return err;
#endif
}
#endif
