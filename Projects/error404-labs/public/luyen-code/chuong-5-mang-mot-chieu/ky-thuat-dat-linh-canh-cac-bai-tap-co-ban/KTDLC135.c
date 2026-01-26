/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/
*/

#include <stdio.h>
#include <float.h>

#define MAX 1000

// Nhập mảng
void nhap(float a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("\nNhap a[%d] = ", i);
        scanf("%f", &a[i]);
    }
}

// Xuất mảng
void xuat(float a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%8.3f", a[i]);
    }
}

// Kỹ thuật đặt lính canh: tìm giá trị dương đầu tiên
float duongdau(float a[], int n)
{
    // Đặt lính canh (số dương chắc chắn)
    a[n] = FLT_MAX;

    int i = 0;
    while (a[i] <= 0)
    {
        i++;
    }

    // Nếu dừng ở lính canh → không có số dương trong mảng
    if (i == n)
        return -1;

    return a[i];
}

int main()
{
    int n;
    // PHẢI dư 1 phần tử cho lính canh
    float a[MAX + 1];

    // Nhập số lượng phần tử
    do
    {
        printf("\nNhap n = ");
        scanf("%d", &n);

        if (n < 1 || n > MAX)
            printf("\nVui long nhap 1 <= n <= %d!", MAX);

    } while (n < 1 || n > MAX);

    // Nhập mảng
    nhap(a, n);

    // Xuất mảng
    printf("\nMang da nhap: ");
    xuat(a, n);

    // Tìm giá trị dương đầu tiên
    float giaTriDuong = duongdau(a, n);

    if (giaTriDuong != -1)
    {
        printf("\nPhan tu duong dau tien trong mang la: %8.3f", giaTriDuong);
    }
    else
    {
        printf("\nKhong co phan tu duong nao trong mang!");
    }

    return 0;
}
