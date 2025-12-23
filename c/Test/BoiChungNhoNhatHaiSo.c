#include <stdio.h>

long long UCLN(long long a, long long b) {
	// UCLN(a, b) = UCLN(b, a % b)
	for(; b;) {
		long long r = a % b;
		a = b;
		b = r;
	}
	return a;
}

double BCNN(long long a, long long b) {
	// BCNN(a, b) = |a.b| / UCLN(a, b)
	long long tichGiaTriTuyetDoi = a * b < 0 ? (a * b) * -1 : a * b;
	long long UCLNAB = UCLN(a, b);
	return (1.0 * tichGiaTriTuyetDoi) / UCLNAB;
}

int main() {
	long long a, b;
	scanf("%lld %lld", &a, &b);
	printf("%.0lf", BCNN(a, b));
	return 0;
}