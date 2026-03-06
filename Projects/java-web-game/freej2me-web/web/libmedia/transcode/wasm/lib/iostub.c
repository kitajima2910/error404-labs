#include <stdio.h>
#include <unistd.h>
#include <sys/types.h>
#include <stdarg.h>
#include <string.h>
#include <emscripten.h>

// provide easier printf implementation (without the complexity of wasi writev..)
// and stub unneeded libc/wasi functions so they don't need to call js

// ehh wait.. __stdio_write overwrite doensn't work as it should
// that'd need to flush the buffer

// generally note we're not using stable apis here..

extern void EM_IMPORT(log_msg) log_msg(char *buf, size_t len);

int vprintf(const char *restrict fmt, va_list ap)
{
    char buf[2048] = {};
	int ret;
	ret = vsnprintf(buf, 2048, fmt, ap);

    log_msg(buf, strlen(buf));

	return ret;
}

int iprintf(const char *restrict fmt, ...)
{
    int ret;
	va_list ap;
	va_start(ap, fmt);
	ret = vprintf(fmt, ap);
	va_end(ap);
	return ret;
}

int printf(const char *restrict fmt, ...)
{
    int ret;
	va_list ap;
	va_start(ap, fmt);
	ret = vprintf(fmt, ap);
	va_end(ap);
	return ret;
}

size_t __stdio_write(FILE *f, const unsigned char *buf, size_t len)
{
    return len;
}

int __stdio_close(FILE *f)
{
    return 1;
}

off_t __stdio_seek(FILE *f, off_t off, int whence)
{
	return off;
}

size_t __stdio_read(FILE *f, unsigned char *c, size_t s) {
	return 0;
}

int puts(const char *s)
{
  int len = strlen(s);
  log_msg(s, len);
  return len;
}

char *getenv(const char *name)
{
	return NULL;
}

int rename(const char *old, const char *new)
{
	return 0;
}

__wasi_errno_t __wasi_clock_time_get(
    __wasi_clockid_t id,
    __wasi_timestamp_t precision,
    __wasi_timestamp_t *time
) {
	*time = 12345678UL;
}

// needed for tzset?
__wasi_errno_t __wasi_fd_close(__wasi_fd_t fd) {

}

