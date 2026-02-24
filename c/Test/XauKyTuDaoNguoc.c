#include <stdio.h>
#include <string.h>

int main() {
	
	char text[100];
	
	printf("\nNhap text: ");
	fgets(text, sizeof(text), stdin);
	text[strcspn(text, "\n")] = '\0';
	
	char textDaoNguoc[100];
	int j = 0;
	
	int len = strlen(text);
	
	for(int i = len - 1; i >= 0; i--) {
		// printf("%c", text[i]);
		textDaoNguoc[j++] = text[i];
	}
	
	textDaoNguoc[j] = '\0';
	
	printf("\ntextDaoNguoc: %s - %d", textDaoNguoc, strlen(textDaoNguoc));
	if(!strcmp(text, textDaoNguoc)){
		printf("\nDay la chuoi doi xung");
	} else {
		printf("\nDay la chuoi khong doi xung");
	}
	
	return 0;
}