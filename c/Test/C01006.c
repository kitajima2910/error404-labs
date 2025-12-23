#include <stdio.h>

#define NAME "PXH2910"

int main() {
	
	if(fopen(NAME".INP", "r")) {
		freopen(NAME".INP", "r", stdin);
		freopen(NAME".OUT", "w", stdout);
	}
	
	long long a, b;
	scanf("%lld %lld", &a, &b);
	
	if(b == 0) {
		printf("0");
		return 0;
	}
	
	printf("%lld", (a + b));
	printf(" %lld", (a - b));
	printf(" %lld", (a * b));
	printf(" %.2lf", (1.0 * a / b));
	printf(" %lld", (a % b));
	
	return 0;
}