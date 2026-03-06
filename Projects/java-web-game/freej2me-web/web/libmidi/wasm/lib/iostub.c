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

// XXX EMSCRIPTEN
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

int puts(const char *s)
{
  int len = strlen(s);
  log_msg(s, len);
  return len;
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
