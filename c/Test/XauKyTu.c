#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
	
	char text[100];
	int upper_count = 0;
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	for(int i = 0; i < strlen(text); i++) {
		if(isupper(text[i])) {
			upper_count++;
		}
		text[i] = tolower(text[i]);
	}
	
	printf("\nSo chu hoa: %d", upper_count);
	printf("\nXau sau bien doi: %s", text);
	
	return 0;
}