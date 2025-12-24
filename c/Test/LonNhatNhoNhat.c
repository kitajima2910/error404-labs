#include <stdio.h>
#include <limits.h>

void process(long long *max, long long *min);

int main() {
	
	long long max, min;
	process(&max, &min);
	printf("%lld %lld", max, min);
	return 0;
}

void process(long long *max, long long *min) {
	
	long long n;
	
	*max = LLONG_MIN;
	*min = LLONG_MAX;
	
	for(; scanf("%lld", &n) == 1;) {
		*max = n > *max ? n : *max;
		*min = n < *min ? n : *min;
	}
}