#include <stdio.h>
#include <string.h>

#define MAX 1000

char stack[MAX];
int top = -1;

// Khai bao ham
void push(char c);
char pop();

int main() {
	
	char str[MAX];
	
	fgets(str, MAX, stdin);
	str[strcspn(str, "\n")] = '\0';
	
	int len = strlen(str);
	
	for(int i = 0; i < len; i++) {
	    push(str[i]);
	}
	
	while(top != -1) {
		printf("%c", pop());
	}
	
	return 0;
}

// Day du lieu vao stack
void push(char c) {
	stack[++top] = c;
}

// Lay du lieu ra stack
char pop() {
	return stack[top--];
}