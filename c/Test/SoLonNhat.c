#include <stdio.h>

void nhapMang(int n, int a[n]);
void xuatMang(int n, int a[n]);
int timMaxMang(int n, int a[n]);
void inViTriMaxMang(int n, int a[n], int max);

int main() {
	
	int T;
	scanf("%d", &T);
	
	while(T--) {
		int n;
		scanf("%d", &n);
		int a[n];
		
		nhapMang(n, a); // 3 5 9 8 4 2 9
	//	xuatMang(n, a);
		
		// In thu max
		int max = timMaxMang(n, a);
		printf("%d\n", max);
		inViTriMaxMang(n, a, max);
		printf("\n");	
	}
	
	return 0;
}

void nhapMang(int n, int a[n]) {
	for(int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
}

void xuatMang(int n, int a[n]) {
	for(int i = 0; i < n; i++) {
		printf("%d ", a[i]);
	}
}

int timMaxMang(int n, int a[n]) {
	int max = a[0];
	for(int i = 1; i < n; i++) {
		max = a[i] > max ? a[i] : max;
	}
	return max;
}

void inViTriMaxMang(int n, int a[n], int max) {
	for(int i = 0; i < n; i++) {
		if(a[i] != max) {
			continue;
		}
		printf("%d ", i);
	}
}