#include <stdio.h>

// So hoan hao:
// 6 = 1 + 2 + 3 (cac uoc so cong lai bang chinh no)

int kiemTraSoHoanHao(int n) {

	if(n <= 1) return 0;

    int tong = 1;
	
	for(int i = 2; i <= n / i ; i++) {
		if(n % i == 0) {
			tong += i; // uoc 1
			
			int doi = n / i; // uoc 2
			
			if(i != doi) {
				tong += doi;
			}
		}
	}
	
	return tong == n;
}

int main() {
	
	int n = 8128;
	
	if(kiemTraSoHoanHao(n)) {
		printf("%d la so hoan hao", n);
	} else {
		printf("%d khong la so hoan hao", n);
	}
	
	return 0;
}