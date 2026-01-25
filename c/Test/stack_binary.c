#include <stdio.h>

#define MAX 1000

typedef struct {
	int data[MAX];
	int top;
} Stack;

void initStack(Stack *s) {
	s->top = -1;
}

int isEmpty(Stack *s) {
	return s->top == -1;
}

int isFull(Stack *s) {
	return s->top == MAX - 1;
}

void push(Stack *s, int r) {
	if(!isFull(s)) {
		s->data[++s->top] = r;
	}
}

int pop(Stack *s) {
	if(!isEmpty(s)) {
		return s->data[s->top--];
	}
	return -1;
}

void stackBin(Stack *s, int n) {
	if(n == 0) {
		printf("0");
		return;
	}
	
	while(n) {
		int r = n % 2;
//		printf("\ndbg r = %d\n", r);
		push(s, r);
		n = n / 2;
	}
	
//	printf("\ndbg len top = %d\n", s.top);
	
	while(!isEmpty(s)) {
		printf("%d", pop(s));
	}
}

int main() {
	
	/*
		int n = 13;
		
		int r; 
		
		r = n % 2;
		n = n / 2;
		printf("%d - %d\n", n, r);
		
		r = n % 2;
		n = n / 2;
		printf("%d - %d\n", n, r);
		
		r = n % 2;
		n = n / 2;
		printf("%d - %d\n", n, r);
		
		r = n % 2;
		n = n / 2;
		printf("%d - %d\n", n, r);
	*/
	Stack s;
	
	initStack(&s);
	
	int n;
	
	scanf("%d", &n);
	
	stackBin(&s, n);
	
	return 0;
}