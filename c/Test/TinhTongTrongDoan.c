#include <stdio.h>

int main() {
	
	long long a, b;
	scanf("%lld %lld", &a, &b);
	
	long long start, end;
	
	if (a < b) {
		start = a;
		end = b;
	} else {
		start = b;
		end = a;
	}
//	
//	long long i, sum = 0;
//	for(i = start; i <= end; i++) {
//		sum += i;
//	}

	/*
		Dung cong thuc tong cap so cong
		S = ((start + end) x (end -  start + 1)) / 2
	*/
	
//	long long sum = ((start + end) * (end -  start + 1)) / 2;	

	/*
		n = (end -  start) / diff + 1
		S = (start + end) × n / 2
	*/
	
	long long n = (end - start) / 1 + 1;
	long long sum = (start + end) * n / 2;
		
	printf("%lld", sum);
	
	return 0;
}