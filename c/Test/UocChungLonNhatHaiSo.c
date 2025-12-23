#include <stdio.h>

int main() {
	
	// UCLN(20, 15) = UCLN(15, 20 % 15) = UCLN(15, 5) = UCLN(5, 15 % 5) = UCLN(5, 0) => UCLN(20, 15) = 5
	long long a, b;
	scanf("%lld %lld", &a, &b);
	
	for(; b;) {
		long long r = a % b;
		a = b;
		b = r;
	}
	
	printf("%lld", a);
	
	return 0;
}