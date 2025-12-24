#include <stdio.h>

void process();

int main() {
	
	process();
	
	return 0;
}

void process() {
	
	int i, j;
	for(i = 1; i <= 9; i++) {
		for(j = 2; j <= 9; j++) {
			printf("%d x %d = %-5d", j, i , j * i);
		}
		printf("\n");
	}
	
}