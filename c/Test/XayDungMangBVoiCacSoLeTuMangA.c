#include <stdio.h>

#define MAX 1000

void nhapMang(int n, int a[]) {
	for(int i = 0; i < n; i++) {
		printf("a[%d] = ", i);
		scanf("%d", &a[i]);
	}
}

void xuatMang(int n, int a[]) {
	for(int i = 0; i < n; i++) {
		printf("%4d", a[i]);
	}
}

int nBLe = 0;
void luuGiaTriLe(int n, int a[], int b[]) {
	for(int i = 0; i < n; i++) {
		if(a[i] % 2 == 1) {
			b[nBLe++] = a[i];
		}
	}
}

int nCAm = 0;
void luuGiaAm(int n, int a[], int c[]) {
	for(int i = 0; i < n; i++) {
		if(a[i] < 0) {
			c[nCAm++] = a[i];
		}
	}
}

int main() {
	
	int n;
	
	printf("\nNhap n = ");
	scanf("%d", &n);
	
	int a[MAX];
	
	nhapMang(n, a);
	
	printf("\nXuat mang a: ");
	xuatMang(n, a);
	
	int b[MAX];
	
	luuGiaTriLe(n, a, b);
	
	printf("\nXuat mang b: ");
	xuatMang(nBLe, b);
	
	int c[MAX];
	
	luuGiaAm(n, a, c);
	
	printf("\nXuat mang c: ");
	xuatMang(nCAm, c);
	
	return 0;
}