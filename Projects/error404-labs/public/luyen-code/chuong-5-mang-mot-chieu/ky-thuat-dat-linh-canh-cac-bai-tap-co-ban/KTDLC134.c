/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/

    ===================== ĐỀ BÀI =====================
    Cho mảng một chiều các số thực gồm n phần tử.

    Hãy tìm GIÁ TRỊ LỚN NHẤT trong mảng
    bằng cách sử dụng KỸ THUẬT ĐẶT LÍNH CANH (sentinel).

    ===================== GHI CHÚ =====================
    - Bài toán tập trung minh họa thuật toán.
    - Giả sử dữ liệu vào hợp lệ.
    - Mảng không chứa giá trị FLT_MAX.
*/

#include <stdio.h>
#include <float.h>

#define MAX 1000

// Nhập các phần tử của mảng
void nhap(float a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("\nNhap a[%d] = ", i);
        scanf("%f", &a[i]);
    }
}

// Xuất các phần tử của mảng
void xuat(float a[], int n)
{
    for (int i = 0; i < n; i++)
    {
        printf("%8.3f", a[i]);
    }
}

// Tìm giá trị lớn nhất trong mảng
// Sử dụng kỹ thuật đặt lính canh (sentinel)
float lonnhat(float a[], int n)
{
    // Giả sử phần tử đầu tiên là lớn nhất
    float max = a[0];

    // Đặt lính canh tại cuối mảng
    // FLT_MAX đảm bảo vòng lặp luôn dừng
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
    // Dư 1 phần tử cho lính canh
    float a[MAX + 1];

    // Nhập số lượng phần tử của mảng
    do
    {
        printf("\nNhap n = ");
        scanf("%d", &n);

        if (n < 1 || n > MAX)
        {
            printf("\nVui long nhap 1 <= n <= %d!", MAX);
        }

    } while (n < 1 || n > MAX);

    // Nhập mảng
    nhap(a, n);

    // Xuất mảng
    printf("\nMang da nhap: ");
    xuat(a, n);

    // Tìm và in ra giá trị lớn nhất
    printf("\nPhan tu lon nhat trong mang la: %8.3f", lonnhat(a, n));

    return 0;
}
