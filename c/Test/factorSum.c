#include <stdio.h>

int factorSum(int n) {
	
	while(1) {
		int saveN = n;
		int sum = 0;
		
		for(int i = 2; i <= n / i; i++) {
			while(n % i == 0) {
				sum += i;
				n /= i;
			}
		}
		
		if(n > 1) {
			sum += n;
		}
		
		n = sum;
		
		if(sum == saveN) {
			break;
		}
		
	}
	
	return n;
}

int main() {
	
	int n = 24;
	
	printf("%d", factorSum(n));
	
	return 0;
}