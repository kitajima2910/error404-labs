#include <stdio.h>

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	long long sum = 0;
	for(; n;) {
		sum = sum * 10 + (n % 10);
		n = n / 10;
	}
	
	printf("%lld", sum);
	
	return 0;
}