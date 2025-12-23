#include <stdio.h>

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	if (n < 2) {
		printf("0");
		return 0;
	}
	
	if (n == 2) {
		printf("1");
		return 0;
	}
	
	if (n % 2 == 0) {
		printf("0");
		return 0;
	}
	
	long long i;
	for(i = 3; i <= n / i; i = i + 2) {
		if(n % i == 0) {
			printf("0");
			return 0;
		}
	}	
	
	printf("1");
	
	return 0;
	
}
