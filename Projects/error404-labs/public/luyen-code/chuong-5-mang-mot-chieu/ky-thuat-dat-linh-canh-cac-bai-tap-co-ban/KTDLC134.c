/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/
*/

#include <stdio.h>
#include <float.h>

#define MAX 1000

void nhap(float a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("\nNhap a[%d] = ", i);
        scanf("%f", &a[i]);
    }
}

void xuat(float a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%8.3f", a[i]);
    }
}

// Tìm giá trị lớn nhất bằng kỹ thuật đặt lính canh
float lonnhat(float a[], int n)
{
    float max = a[0];

    // Lính canh: số rất lớn
    a[n] = FLT_MAX;

    int i = 1;
    while (a[i] != FLT_MAX)
    {
        if (a[i] > max)
        {
            max = a[i];
        }
        i++;
    }

    return max;
}

int main()
{
    int n;
    // DƯ 1 PHẦN TỬ CHO LÍNH CANH
    float a[MAX + 1];

    do
    {
        printf("\nNhap n = ");
        scanf("%d", &n);

        if (n < 1 || n > MAX)
            printf("\nVui long nhap 1 <= n <= %d!", MAX);

    } while (n < 1 || n > MAX);

    nhap(a, n);

    printf("\nMang da nhap: ");
    xuat(a, n);

    float max = lonnhat(a, n);
    printf("\nPhan tu lon nhat trong mang la: %8.3f", max);

    return 0;
}
