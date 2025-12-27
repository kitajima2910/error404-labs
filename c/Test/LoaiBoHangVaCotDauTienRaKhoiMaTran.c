#include <stdio.h>

void nhapMang(long long rows, long long cols, long long a[rows][cols]);
void xuatMang(long long rows, long long cols, long long a[rows][cols]);
void loaiBoHangCotDauTien(long long rows, long long cols, long long matrix[rows][cols]);

int main() {
	
	long long T;
	scanf("%lld", &T);
	
	for(long long i = 1; i <= T; i++) {
		long long rows, cols;
		scanf("%lld %lld", &rows, &cols);
		
		long long matrix[rows][cols];
		nhapMang(rows, cols, matrix);
		
		printf("Test %lld:\n", i);
		loaiBoHangCotDauTien(rows, cols, matrix);
	}
	
	return 0;
}

void nhapMang(long long rows, long long cols, long long a[rows][cols]) {
	for (long long i = 0; i < rows; i++) {
		for (long long j = 0; j < cols; j++) {
			scanf("%lld", &a[i][j]);
		}
	}
}

void xuatMang(long long rows, long long cols, long long a[rows][cols]) {
	for (long long i = 0; i < rows; i++) {
		for (long long j = 0; j < cols; j++) {
			printf("%lld ", a[i][j]);
		}
		printf("\n");
	}
}


void loaiBoHangCotDauTien(long long rows, long long cols, long long matrix[rows][cols]) {
	for(long long i = 1; i < rows; i++) {
		for(long long j = 1; j < cols; j++) {
			printf("%lld ", matrix[i][j]);
		}
		printf("\n");
	}
}


