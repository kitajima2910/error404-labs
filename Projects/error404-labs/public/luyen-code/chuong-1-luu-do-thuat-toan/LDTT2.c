/*
    Author: Pham Xuan Hoai
    Website: https://www.error404-labs.info.vn/

    ===================== ĐỀ BÀI =====================
    Cho một số nguyên dương n.

    Hãy tính tổng:
        S(n) = 1^2 + 2^2 + 3^2 + ... + n^2

    ===================== GHI CHÚ =====================
    - Bài toán tập trung rèn luyện tư duy thuật toán.
    - Sử dụng vòng lặp để cộng dồn.
    - Giả sử dữ liệu vào hợp lệ (n > 0).
*/

#include <stdio.h>

// Hàm tính tổng bình phương các số từ 1 đến n
int tinhTong(int n)
{
    int tong = 0;

    // Cộng dồn i^2 với i chạy từ 1 đến n
    for (int i = 1; i <= n; i++)
    {
        tong += i * i;
    }

    return tong;
}

int main()
{
    int n;

    // Nhập số nguyên dương n
    scanf("%d", &n);

    // In ra kết quả S(n)
    printf("%d", tinhTong(n));

    return 0;
}
