/*
	#MC12. So doi xung
	https://oj.isp88.win/p/MC12
	
	Cac so doi xung:
	    1,  2,  3,..., 9
	   11, 22, 33,...,99
	  121,232,999
	12321
	
	n la so le:
	VD n = 5
	_ _ _ _ _
	| | | | |
	1 2 3 2 1 <- tu doi xung
	chi can chon 3 so dau tien (lay den giua)
	
	cho 1: 1 -> 9 ( 9 cach)
	cho 2: 0 -> 9 (10 cach)
	cho 3: 0 -> 9 (10 cach)
	-> 9 * 10 ^ (n-1)/2
	
	n la so chan:
	VD n = 4
	_ _ _ _
	| | | |
	1 2 2 1
	chi lay 2 so dau tien
	cho 1: 1 -> 9 ( 9 cach)
	cho 2: 0 -> 9 (10 cach)
	-> 9 * 10 ^ (n / 2 - 1) = 9 * 10 ^ (n - 1) / 2

*/

#include <stdio.h>

long long demSoDoiXung(int n) {
	if (n == 1) {
		return 9;
	}
	
	int motNua = (n + 1) / 2;
	long long ketQua = 9;
	int i;
	for (i = 1; i < motNua; i++) {
		ketQua *= 10;
	} 
	
	return ketQua;
}

int main() {
	
	int n;
	while(scanf("%d", &n) != EOF) {
		printf("%lld\n", demSoDoiXung(n));
	}
	
	return 0;
}