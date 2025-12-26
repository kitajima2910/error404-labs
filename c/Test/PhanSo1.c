#include <stdio.h>

typedef struct {
	long long tu;
	long long mau;
} PhanSo;

// UCLN(a, b) = UCLN(b, a % b)
long long doUCLN(long long a, long long b) {
	while(b) {
		long long r = a % b;
		a = b;
		b = r;
	}
	return a;
}

int main() {
	
	PhanSo ps;
	
	scanf("%lld %lld", &ps.tu, &ps.mau);
	
	long long UCLN = doUCLN(ps.tu, ps.mau);
	
	ps.tu /= UCLN;
	ps.mau /= UCLN;
	
	printf("%lld/%lld", ps.tu, ps.mau);

//	long long tu, mau;
//	scanf("%lld %lld", &tu, &mau);
//	
//	long long UCLN = doUCLN(tu, mau);
//	
//	tu /= UCLN;
//	mau /= UCLN;
//	
//	printf("%lld/%lld", tu, mau);
	
	return 0;
}