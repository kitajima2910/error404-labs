#include <stdio.h>

#define NAME "PXH2910"

int main() {
	
	if(fopen(NAME".INP", "r")) {
		freopen(NAME".INP", "r", stdin);
		freopen(NAME".OUT", "w", stdout);
	}
	
	long long n;
	scanf("%lld", &n);
	
	/*
	 1 nam = 365 ngay (nam nhuan 366)
	 ? nam = 350 ngay
	 => nam = 350 * 1 / 365
	 
	 1 tuan = 7 ngay
	 ? tuan = 350 ngay
	 => tuan = 350 * 1 / 7
	*/ 
	
	long long luuSoNgay = n;
	
	long long nam = luuSoNgay / 365;
	luuSoNgay = luuSoNgay % 365;
	
	long long tuan = luuSoNgay / 7;
	luuSoNgay = luuSoNgay % 7;
	
	printf("%lld %lld %lld", nam, tuan, luuSoNgay);
	
	return 0;
}