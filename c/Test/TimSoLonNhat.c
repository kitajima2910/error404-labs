#include <stdio.h>
#include <limits.h>

long long process();

int main() {
	
	printf("%lld", process());
	
	return 0;
}

long long process() {
	
	long long n;
	
	long long max = LLONG_MIN;
	
	for(; scanf("%lld", &n) == 1;) {
		max = n > max ? n : max;	
	}
	
	return max;
}