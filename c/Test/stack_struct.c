#include <stdio.h>
#include <string.h>

#define MAX 1000

typedef struct {
	char data[MAX];
	int top;
} Stack;

// Khai bao ham
void initStack(Stack *s);
void push(Stack *s, char c);
char pop(Stack *s);

int main() {
	
	Stack s;
	char str[MAX];
	
	initStack(&s);
	
	fgets(str, MAX, stdin);
	str[strcspn(str, "\n")] = '\0';
	
	int len = strlen(str);
	
	for(int i = 0; i < len; i++) {
	    push(&s, str[i]);
	}
	
	while(s.top != -1) {
		printf("%c", pop(&s));
	}
	
	return 0;
}

// Config ban dau cho stack
void initStack(Stack *s) {
	s->top = -1;
}

// Day du lieu vao stack
void push(Stack *s, char c) {
	if(s->top < MAX - 1) {
		s->data[++s->top] = c;
	}
}

// Lay du lieu ra stack
char pop(Stack *s) {
	if(s->top >= 0) {
		return s->data[s->top--];
	}
	return '\0';
}