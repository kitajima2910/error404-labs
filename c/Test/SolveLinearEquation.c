#include <stdio.h>

int main() {
	
	long double a, b;
	
	scanf("%Lf %Lf", &a, &b);
	
	// ax + b = 0
	if (a == 0) {
		if (b == 0) {
			printf("Vo so nghiem");
		} else {
			printf("Vo nghiem");
		}
	} else {
		long double x = -b / a;
		printf("x = %.2Lf", x);	
	}
	
	return 0;
}