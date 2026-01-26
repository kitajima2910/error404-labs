/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/

    ===================== ĐỀ BÀI =====================
    Cho mảng một chiều các số thực gồm n phần tử.

    Hãy tìm PHẦN TỬ DƯƠNG ĐẦU TIÊN trong mảng
    bằng cách sử dụng KỸ THUẬT ĐẶT LÍNH CANH (sentinel).

    Nếu mảng không có phần tử dương nào,
    hãy thông báo "Không có phần tử dương".

    ===================== GHI CHÚ =====================
    - Bài toán tập trung minh họa thuật toán.
    - Giả sử dữ liệu vào hợp lệ.
    - Mảng không chứa giá trị FLT_MAX.
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

// Tìm phần tử dương đầu tiên bằng kỹ thuật đặt lính canh
float duongdau(float a[], int n)
{
    // Đặt lính canh tại cuối mảng
    // FLT_MAX chắc chắn là số dương
    a[n] = FLT_MAX;

    int i = 0;
    while (a[i] <= 0)
    {
        i++;
    }

    // Nếu dừng tại lính canh → không có số dương
    if (i == n)
        return -1;

    return a[i];
}

int main()
{
    int n;
    // Dư 1 phần tử cho lính canh
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

    // Tìm phần tử dương đầu tiên
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
