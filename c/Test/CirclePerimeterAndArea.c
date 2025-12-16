#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

#define PI 3.14159

int main() {

    double r;
    
    scanf("%lf", &r);
    
    double C = 2 * PI * r;
    double S = PI * r * r;
    
    printf("Perimeter: %.2lf\n", C);
    printf("Area: %.2lf\n", S);
    
    return 0;
}