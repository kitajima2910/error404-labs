#include <stdio.h>
#include <math.h>

#define EPSILON 1e-6

// Hàm so sánh equal
int equal(double a, double b)
{
    return fabs(a - b) <= EPSILON * fmax(1.0, fmax(fabs(a), fabs(b)));
    // return fabs(a - b) <= EPSILON;
}

int main()
{
    // double a = 0.1;
    // double b = 0.2;

    // // Tính độ chênh lệch tuyệt đối giữa hai số
    // printf("fabs(a - b) = %.20f\n", fabs(a - b));

    // // Lấy giá trị tuyệt đối lớn hơn của hai số
    // printf("fmax(fabs(a), fabs(b)) = %.20f\n", fmax(fabs(a), fabs(b)));

    // // Lấy cái lớn hơn giữa 1.0 và giá trị tuyệt đối lớn hơn của hai số
    // printf("fmax(1.0, fmax(fabs(a), fabs(b))) = %.20f\n", fmax(1.0, fmax(fabs(a), fabs(b))));

    // // Nhân EPS với kết quả trên để tính sai số cho phép
    // double tolerance = EPSILON * fmax(1.0, fmax(fabs(a), fabs(b)));
    // printf("tolerance = %.20f\n", tolerance);

    // if (equal(a + b, 0.3))
    // {
    //     printf("True\n");
    // }
    // else
    // {
    //     printf("False\n");
    // }

    double a = 1.41421356;
    double b = 1.41421356;
    double c = 2;

    if (equal(a * a + b * b, c * c))
    {
        printf("True\n");
    }
    else
    {
        printf("False\n");
    }

    if (a * a + b * b == c * c)
    {
        printf("True\n");
    }
    else
    {
        printf("False\n");
    }

    return 0;
}