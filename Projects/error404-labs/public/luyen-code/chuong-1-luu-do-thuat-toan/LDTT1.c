/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/

    ===================== ĐỀ BÀI =====================
    Cho một số nguyên dương n.

    Hãy tính tổng:
        S(n) = 1 + 2 + 3 + ... + n

    ===================== GHI CHÚ =====================
    - Bài toán tập trung rèn luyện tư duy thuật toán.
    - Giả sử dữ liệu vào hợp lệ (n > 0).
*/

#include <stdio.h>

// Hàm tính tổng các số từ 1 đến n
int tinhTong(int n)
{
    int tong = 0;

    // Cộng dồn từ 1 đến n
    for (int i = 1; i <= n; i++)
    {
        tong += i;
    }

    return tong;
}

int main()
{
    int n;

    // Nhập số nguyên dương n
    scanf("%d", &n);

    // In ra tổng S(n)
    printf("%d", tinhTong(n));

    return 0;
}
