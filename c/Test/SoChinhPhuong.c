#include <stdio.h>
#include <math.h>
#include <stdbool.h>

bool process(long long);
bool processV2(long long);

int main() {
	
	long long T;
	scanf("%lld", &T);
	
	for(;T--; ) {
		long long n;
		scanf("%lld", &n);
		
//		if(process(n)) {
//			printf("YES");
//		} else {
//			printf("NO");
//		}
		if(processV2(n)) {
			printf("YES");
		} else {
			printf("NO");
		}
		printf("\n");
	}
	
	return 0;
}

bool process(long long n) {
	long long nSQRT = sqrt(n);
	return nSQRT * nSQRT == n;
}

bool processV2(long long n) {
	long long left = 0;
	long long right = 31623; // sqrt(1e9)
	
	for(; left <= right;) {
		long long mid = (left + right) / 2;
		long long square = mid * mid;
		
		if(square == n) {
			return true;
		} else if(square < n) {
			left = mid + 1;
		} else {
			right = mid - 1;
		}
	}
	
	return false;
}