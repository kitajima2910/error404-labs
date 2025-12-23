#include <stdio.h>

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	long long count = 0;
	
	// 1234 => 4
	for(; n > 0; ) {
		count++;
		n = n / 10;		
	}
	
	printf("%lld", count);
	
	return 0;
}