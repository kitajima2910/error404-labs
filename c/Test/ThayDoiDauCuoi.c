#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <ctype.h>
#include <stdbool.h>

int main() {
	
	char s[1000];
	fgets(s, 1000, stdin);
	s[strcspn(s, "\n")] = '\0';
	
//	long long frist = 0, last = strlen(s) - 1;
//	
//	char tmp = s[frist];
//	s[frist] = s[last];
//	s[last] = tmp;
//	
//	// 9800 -> 809
//	
//	long long len = strlen(s);
//	if(s[0] == '0') {
//		for(int i = 0; i < len; i++) {
//			s[i] = s[i + 1];
//		}
//	}
//	
//	printf("%s", s);

	
	
	long long len = strlen(s);
	
	if(len == 1) {
		printf("%c", s[0]);
		return 0;
	}
	
//	int printed = 0;
//	
//	if(s[len - 1] != '0') {
////		putchar(s[len - 1]);
//		printf("%c", s[len - 1]);
//		printed = 1;
//	}
//	
//	
//	for(int i = 1; i < len - 1; i++) {
//		if(printed || s[i] != '0') {
//	//		putchar(s[i]);
//			printf("%c", s[i]);	
//			printed = 1;
//		}
//	}
//	
//	if(printed || s[0] != '0') {
//	//		putchar(s[0]);
//			printf("%c", s[0]);	
//		
//	}

	char save[1000];
	int k = 0;
	
	save[k++] = s[len - 1];
	
	for(int i = 1; i < len - 1; i++) {
		save[k++] = s[i];
	}
	
	save[k++] = s[0];
	save[k] = '\0';
	
	int i = 0;
	while(save[i] == '0' && save[i + 1] != '\0') i++;
	
	printf("%s", save + i);
	
	return 0;
}