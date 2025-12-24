#include <stdio.h>

void process();

int main() {
	
	process();
	
	return 0;
}

void process() {
	
	int i, j;
	for(i = 2; i <= 9; i++) {
		for(j = 1; j <= 9; j++) {
			printf("%d x %d = %d\n", i, j , i * j);
		}
		printf("\n");
	}
	
}