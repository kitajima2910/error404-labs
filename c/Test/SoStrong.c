#include <stdio.h>

long long tinhGiaiThua(long long n, long long T);
long long tinhGiaiThuaV2(long long n);

long long fact[10] = {
    1,        // 0!
    1,        // 1!
    2,        // 2!
    6,        // 3!
    24,       // 4!
    120,      // 5!
    720,      // 6!
    5040,     // 7!
    40320,    // 8!
    362880    // 9!
};

int main() {
	
	long long n;
	scanf("%lld", &n);
	
	long long sum = 0;
	long long nClone = n;
	
	while(nClone > 0) {
//		sum += tinhGiaiThua(nClone % 10, 1);
//		sum += tinhGiaiThuaV2(nClone % 10);
//		long long tmp = nClone % 10;
		sum += fact[nClone % 10];
		nClone /= 10;
	}
	
//	if(sum == n) {
//		printf("1");
//	} else {
//		printf("0");
//	}
	printf("%s", sum == n ? "1" : "0");
	
	return 0;
}

long long tinhGiaiThua(long long n, long long T) {
	if(n == 1 || n == 0) {
		return T;
	}
	return tinhGiaiThua(n - 1, T * n);
}

long long tinhGiaiThuaV2(long long n) {
	long long T = 1;
	for(int i = 2; i <= n; i++) {
		T *= i;
	}
	return T;
}