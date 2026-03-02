#include <stdio.h>
#include <string.h>

int main() {
	
	int ascii[256] = {0};
	char text[1000];
	
	printf("\nInput: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	printf("\nOutput: %s", text);
	
	for(int i = 0; text[i] != '\0'; i++) {
		// printf("\n%c - %d", text[i], text[i]);
		ascii[text[i]]++;
	}
	
	printf("\nResult: ");
	for(int i = 0; i < 256; i++) {
		if(ascii[i] > 0) {
			printf("\n%c - %d", i, ascii[i]);
		}
	}
	
	return 0;
}