#include <stdio.h>

#define MAX 5000

void process(long long arr[], long long lenArr);

int main() {
	
	long long T;
	scanf("%lld", &T);
	
	while(T--) {
		long long arr[MAX];
		long long lenArr;
		
		scanf("%lld", &lenArr);
		process(arr, lenArr);
		printf("\n");
	}
	
	return 0;
}

void process(long long arr[], long long lenArr) {
	for(int i = 0; i < lenArr; i++) {
		scanf("%lld", &arr[i]);
	}
	
	for(int i = 0; i < lenArr; i++) {
		if(arr[i] % 2 == 0) {
			printf("%lld ", arr[i]);
		}	
	}
}