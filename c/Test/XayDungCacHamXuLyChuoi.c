#include <stdio.h>

int isLower(char c) {
	if(c >= 'a' && c <= 'z') {
		return 1;
	}
	return 0;
}

int isUpper(char c) {
	if(c >= 'A' && c <= 'Z') {
		return 1;
	}
	return 0;
}

int isAlpha(char c) {
	if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
		return 1;
	}
	return 0;
}

int isDigit(char c) {
	if(c >= '0' && c <= '9') {
		return 1;
	}
	return 0;
}

char toLower(char c) {
	if(c >= 'A' && c <= 'Z') {
		c += 32;
	}
	return c;
}

char toUpper(char c) {
	if(c >= 'a' && c <= 'z') {
		c -= 32;
	}
	return c;
}

int strlen(char str[]) {
	int cnt = 0;
	while(str[cnt] != '\0') {
		cnt++;
	}
	return cnt;
}

char* strlwr(char str[]) {
	for(int i = 0; i < strlen(str); i++) {
		if(str[i] >= 'A' && str[i] <= 'Z') {
			str[i] += 32;
		}
	}
	return str;
}

char* strupr(char str[]) {
	for(int i = 0; i < strlen(str); i++) {
		if(str[i] >= 'a' && str[i] <= 'z') {
			str[i] -= 32;
		}
	}
	return str;
}

int min(int a, int b) {
	return a < b ? a : b;
}

int strcmp(char str1[], char str2[]) {
	int lenght1 = strlen(str1);
	int lenght2 = strlen(str2);
	
	// abcd
	// afcde
	for(int i = 0; i < min(lenght1, lenght2); i++) {
		if(str1[i] != str2[i]) {
			if(str1[i] > str2[i]) {
				return 1;
			} else {
				return -1;
			}
		}
	}
	
	if(lenght1 == lenght2) {
		return 0;
	} else if(lenght1 > lenght2) {
		return 1;
	} else {
		return -1;
	}
}

int strcmpi(char str1[], char str2[]) {
	int lenght1 = strlen(str1);
	int lenght2 = strlen(str2);
	strlwr(str1);
	strlwr(str2);
	
	for(int i = 0; i < min(lenght1, lenght2); i++) {
		if(str1[i] != str2[i]) {
			if(str1[i] > str2[i]) {
				return 1;
			} else {
				return -1;
			}
		}
	}
	
	if(lenght1 == lenght2) {
		return 0;
	} else if(lenght1 > lenght2) {
		return 1;
	} else {
		return -1;
	}
}

long long atoll(char str[]) {
	long long res = 0;
	for(int i = 0; i < strlen(str); i++) {
		res = res * 10 + str[i] - '0';
	}
	return res;
}

char* strrev(char str[]) {
	int left = 0, right = strlen(str) - 1;
	while(left < right) {
		char strTMP = str[left];
		str[left] = str[right];
		str[right] = strTMP;
		left++;
		right--;
	}
	return str;
}

int main() {
//	char str1[100] = "3456";
//	char str2[100];
//	fgets(str1, 100, stdin);
//	fgets(str2, 100, stdin);
//	printf("%d", strcmp(str1, str2));
//	printf("%lld", atoll(str1));
//	printf("%s", strrev(str1));
	return 0;
}