#include <stdio.h>

void process(long long, long long);

int main() {
	long long CR, CC;
	scanf("%lld %lld", &CR, &CC);
	process(CR, CC);
	return 0;
}

/*

	ij					j
		1 2 3 4 5		
	1	* * * * *		1 2 3 4 5		i = 1
	2	*		*		1		5		j = 1 | j = 5
	3	*		*		1		5		j = 1 | j = 5
	4	* * * * *		1 2 3 4 5		i = 4
*/
void process(long long chieuRong, long long chieuCao) {
	long long i, j;
	for(i = 1; i <= chieuCao; i++) {
		for(j = 1; j <= chieuRong; j++) {
			if(i == 1 || j == 1 || j == 5 || i == chieuCao) {
				printf("*");
			} else {
				printf(" ");
			}
		}
		printf("\n");
	}
}