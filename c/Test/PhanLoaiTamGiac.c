#include <stdio.h>
#include <math.h>

#define EPS 1e-6

int equal(double a, double b)
{
    return fabs(a - b) < EPS;
}

int main()
{

    double a, b, c;
    scanf("%lf %lf %lf", &a, &b, &c);

    if (!((a + b > c) && (a + c > b) && (b + c > a)))
    {
        printf("Khong phai tam giac");
    }
    else
    {
        if ((a == b) && (b == c))
        {
            printf("Tam giac deu");
        }
        else if ((a * a + b * b == c * c) || (a * a + c * c == b * b) || (b * b + c * c == a * a))
        {
            printf("Tam giac vuong");
        }
        else if ((equal(a * a + b * b, c * c) && equal(a, b)) ||
                 (equal(a * a + c * c, b * b) && equal(a, c)) ||
                 (equal(b * b + c * c, a * a) && equal(b, c)))
        {
            printf("Tam giac vuong can");
        }
        else if ((a == b) || (b == c) || (a == c))
        {
            printf("Tam giac can");
        }
        else
        {
            printf("Tam giac thuong");
        }
    }

    return 0;
}