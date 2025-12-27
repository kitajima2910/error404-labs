#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>
#include <stdbool.h>

int main() {
	
	char s[1000];
	fgets(s, 1000, stdin);
	s[strcspn(s, "\n")] = '\0';
	
	long long chuCai = 0, chuSo = 0, kyTuKhac = 0;
	long long len = strlen(s);
	
	for(long long i = 0; i < len; i++) {
		if((s[i] >= 'a' && s[i] <= 'z') || (s[i] >= 'A' && s[i] <= 'Z')) {
			chuCai++;
		} else if(s[i] >= '0' && s[i] <= '9') {
			chuSo++;
		} else {
			kyTuKhac++;
		}
	}
	
	printf("%lld %lld %lld", chuCai, chuSo, kyTuKhac);
	
	return 0;
}