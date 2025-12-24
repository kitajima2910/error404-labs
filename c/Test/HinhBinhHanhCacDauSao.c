#include <stdio.h>

void process(long long);

int main() {
	long long N;
	scanf("%lld", &N);
	process(N);
	return 0;
}

/*

	ij							j
		1 2 3 4 5 6 7 8 9		
	1	~ ~ ~ ~ * * * * *		1~ 2~ 3~ 4~ 5* 6* 7* 8* 9*		j~ <= 4		j* >= 5 && j <= 9	j* >= 6 - i && j <= 2 * 5 - 1
	2	~ ~ ~ * * * * *			1~ 2~ 3~ 4* 5* 6* 7* 8*			j~ <= 3		j* >= 4 && j <= 8	j* >= 6 - i && j <= 2 * 5 - 2
	3	~ ~ * * * *	*			1~ 2~ 3* 4* 5* 6* 7*			j~ <= 2		j* >= 3	&& j <= 7	j* >= 6 - i && j <= 2 * 5 - 3
	4	~ * * * * *				1~ 2* 3* 4* 5* 6*				j~ <= 1		j* >= 2 && j <= 6	j* >= 6 - i && j <= 2 * 5 - 4
	5	* * * * *				1* 2* 3* 4* 5*								j* >= 1 && j <= 5	j* >= 6 - i && j <= 2 * 5 - 5
*/
void process(long long N) {
	long long i, j;
	for(i = 1; i <= N; i++) {
		for(j = 1; j <= 2 * N - 1; j++) {
			if((j >= N + 1 - i) && j <= 2 * N - i) {
				printf("*");
			} else if (j < N + 1 - i) {
				printf("~");
			} else {
				printf(" ");
			}
		}
		printf("\n");
	}
}