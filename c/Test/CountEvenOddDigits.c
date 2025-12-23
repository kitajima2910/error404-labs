#include <stdio.h>

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	long long even = 0;
	long long odd = 0;
	
	// 12345678
	for(; n > 0;) {
		if ((n % 10) % 2 == 0) {
			even++;
		} else {
			odd++;
		}
		n = n / 10;
	}
	
	printf("%lld %lld", odd, even);
	
	return 0;
}