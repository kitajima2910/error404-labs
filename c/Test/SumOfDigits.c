#include <stdio.h>

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	long long sum = 0;
	
	// 1234 => 10
	for(; n;) {
		sum = sum + (n % 10);
		n = n / 10;
	}
	
	printf("%lld", sum);
	
	return 0;
}