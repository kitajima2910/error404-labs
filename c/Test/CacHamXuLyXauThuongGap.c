#include <stdio.h>
#include <string.h>
#include <ctype.h>
#include <stdlib.h>


// https://www.youtube.com/watch?v=QthxGqn1ea8

int main() {
	
	// Bai 2
	char str[1005];
	
	fgets(str, 1005, stdin);
	str[strlen(str) - 1] = '\0';
	
//	for(int i = 0; i < strlen(str); i++) {
//		if(str[i] >= 'A' && str[i] <= 'Z') {
//			str[i] += 32;
//		}
//	}

	for(int i = 0; i < strlen(str); i++) {
		str[i] = tolower(str[i]);
	}
	
//	strlwr(str);
		
	printf("%s", str);
	
	return 0;
}