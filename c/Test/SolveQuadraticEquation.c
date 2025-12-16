#include <stdio.h>
#include <math.h>

int main() {
	
	double a, b, c;
	scanf("%lf %lf %lf", &a, &b, &c);
	
	// ax2 + bx + c = 0;
	if (a == 0) {
		if (b == 0) {
			if (c == 0) {
				printf("Vo so nghiem");
			} else {
				printf("Vo nghiem");
			}
		} else {
	 		double x = -c / b;
	 		printf("x = %.2lf", x);
		}
	} else {
		double delta = b * b - 4 * a * c;
		if (delta > 0) {
			double x1 = (-b - sqrt(delta)) / (2 * a);
			double x2 = (-b + sqrt(delta)) / (2 * a);
			printf("x1 = %.2lf\n", x1);
			printf("x2 = %.2lf", x2);
		} else if (delta == 0) {
			double x = -b / (2 * a);
			printf("x = %.2lf", x);
		} else if (delta < 0) {
			printf("Vo nghiem");
		}
	}
	
	return 0;
}