#include <stdio.h>

#define NAME "PXH2910"

int main() {
	
	if(fopen(NAME".INP", "r")) {
		freopen(NAME".INP", "r", stdin);
		freopen(NAME".OUT", "w", stdout);
	}
	
	long long C;
	scanf("%lld", &C);
	
	printf("%.2lf", ((C * 9.0 / 5) + 32));
	
	return 0;
}