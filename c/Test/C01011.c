#include <stdio.h>

#define NAME "PXH2910"

int main() {
	
	if(fopen(NAME".INP", "r")) {
		freopen(NAME".INP", "r", stdin);
		freopen(NAME".OUT", "w", stdout);
	}
	
	long long n;
	scanf("%lld", &n);
	
	printf("%s", (n % 2 == 0 ? "CHAN" : "LE"));
	
	return 0;
}