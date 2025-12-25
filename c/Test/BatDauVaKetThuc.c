#include <stdio.h>
#include <stdbool.h>

bool process(long long);
bool processV2(long long);
void processV3(long long);

int main() {
	
	long long T;
	scanf("%lld", &T);
	
//	for(;T--; ) {
//		long long n;
//		scanf("%lld", &n);
//		
//		if(processV2(n)) {
//			printf("YES");
//		} else {
//			printf("NO");
//		}
//		printf("\n");
//	}

	processV3(T); // Very Fast
	
	return 0;
}

bool process(long long n) {
	// 12451 -> YES
	// 1000012 -> NO
	
	long long saveFirst, saveLast;
	
	saveFirst = n % 10;
	
	n /= 10;
	
	for(; n; ) {
		
		saveLast = n;
		
		n /= 10;
	}
	
//	printf("%lld %lld", saveFirst, saveLast);
	
	return saveFirst == saveLast;
}

bool processV2(long long n) {
	long long saveFirst, saveLast;
	
	saveFirst = n % 10;
	
	n /= 10;
	
	for(; n >= 10; ) {
		n /= 10;
	}
	
	saveLast = n;
	
	return saveFirst == saveLast;
}

void processV3(long long T) {
	for(; T--; ) {
		char n[12];
		scanf("%s", n);
		
		long long i = 0;
		for(; n[i + 1] != '\0';) i++;
		
		puts(n[0] == n[i] ? "YES" : "NO");
	}
}