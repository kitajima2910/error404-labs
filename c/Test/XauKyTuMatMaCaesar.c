#include <stdio.h>
#include <string.h>

int main() {
	
	char text[100];
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	int len = strlen(text);
	
	for(int i = 0; i < len; i++) {
		
		if(text[i] == 'Z') {
			printf("A");
		} else if (text[i] == 'z') {
			printf("a");
		} else if((text[i] >= 'a' && text[i] < 'z') || (text[i] >= 'A' && text[i] < 'Z')) {
			printf("%c", text[i] + 1);
		} else {
			printf("%c", text[i]);
		}
	}
	
	return 0;
}