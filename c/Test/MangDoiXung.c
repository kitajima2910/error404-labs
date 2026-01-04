#include <stdio.h>

void nhapMang(int n, int a[n]);
int kiemTraDoiXung(int n, int a[n]);

int main() {
	
	int T;
	scanf("%d", &T);
	
	while(T--) {
		int n;
		scanf("%d", &n);
		
		int a[n];
		nhapMang(n, a);
		
		int result = kiemTraDoiXung(n, a);
		
		if(result == 1) {
			printf("YES");
		} else {
			printf("NO");
		}
		printf("\n");
	}
	
//	int n = 5;
//	int a[5] = {1, 4, 5, 4, 1};
//	
//	printf("%d", kiemTraDoiXung(n, a));
	
	return 0;
}

void nhapMang(int n, int a[n]) {
	for(int i = 0; i < n; i++) {
		scanf("%d", &a[i]);
	}
}

/*

n = 4
a = { 1 4 4 1 }

a[i] 		= 		a[n - 1]		<=>			1	=	1
a[i+1] 		=		a[n - 2]		<=>			4	=	4

for i = 0; i < n/2; i++
	if a[i] = a[n - ++i] (khong nen ++i se skip) <=> a[i] = a[n - 1 - i]
	else return false
return true


n = 5
a = { 1 4 5 4 1 }

a[i]		=		a[n - 1]		<=>			1	=	1
a[i+1]		=		a[n - 2]		<=>			4	=	4

*/
int kiemTraDoiXung(int n, int a[n]) {
	for(int i = 0; i < n/2; i++) {
		if(!(a[i] == a[n - (i +  1)])) {
			return 0;
		}
	}
	return 1;
}