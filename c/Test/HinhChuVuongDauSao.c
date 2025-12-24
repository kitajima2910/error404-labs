#include <stdio.h>

void process(long long);

int main() {
	long long C;
	scanf("%lld", &C);
	process(C);
	return 0;
}

/*

	ij					j
		1 2 3 4 5		
	1	* * * * *		1 2 3 4 5		i >= 1
	2	* * * * *		1 2 3 4 5		i >= 1
	3	* * * *	*		1 2 3 4 5		i >= 1
	4	* * * * *		1 2 3 4 5		i >= 1
	5	* * * * *		1 2 3 4 5		i >= 1
*/
void process(long long canh) {
	long long i, j;
	for(i = 1; i <= canh; i++) {
		for(j = 1; j <= canh; j++) {
			if(j >= 1) {
				printf("*");
			} else {
				printf(" ");
			}
		}
		printf("\n");
	}
}