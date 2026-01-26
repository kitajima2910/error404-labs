/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/
*/

#include <stdio.h>

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

float lonnhat(float a[], int n)
{
    float max = a[0];
    for (int i = 1; i < n; i++)
    {
        if (a[i] > max)
        {
            max = a[i];
        }
    }
    return max;
}

int main()
{

    int n;
    float a[MAX];

    while (1)
    {
        printf("\nNhap n = ");
        scanf("%d", &n);

        if (n < 1 || n > MAX)
        {
            printf("\nVui long nhap 1 <= n <= %d!", MAX);
            continue;
        }

        break;
    }

    nhap(a, n);

    printf("\nMang da nhap: ");
    xuat(a, n);

    float max = lonnhat(a, n);
    printf("\nPhan tu lon nhat trong mang la: %8.3f", max);

    return 0;
}