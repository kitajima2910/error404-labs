#include <stdio.h>
#include <string.h>

int main() {
	
	char text[100];
	char textLoaiSpace[100];
	int j = 0;
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	int len = strlen(text);
	
	for(int i = 0; i < len; i++) {
		
		if(text[i] != ' ') {
			// printf("%c", text[i]);
			textLoaiSpace[j++] = text[i];
		}
	}
	
	textLoaiSpace[j] = '\0';
	
	printf("\ntextLoaiSpace: %s", textLoaiSpace);
	
	return 0;
}