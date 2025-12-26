#include <stdio.h>

int main() {
	
	
	long long rows, cols;
	
	scanf("%lld %lld", &rows, &cols);
	
	long long matrix[rows][cols];
	
	for(int i = 0; i < rows; i++) {
		for(int j = 0; j < cols; j++) {
			scanf("%lld", &matrix[i][j]);
		}
	}
	
	for(int j = 0; j < cols; j++) {
		for(int i = 0; i < rows; i++) {
			printf("%lld ", matrix[i][j]);
		}
		printf("\n");
	}
	
	return 0;
}