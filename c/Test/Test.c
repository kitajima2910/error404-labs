/**
 *
 * Nếu a và b nhỏ (gần 0): sai số cho phép là EPS * 1.0 = EPS
 * Nếu a hoặc b lớn: sai số cho phép tăng theo tỷ lệ, vì sai số làm tròn cũng tăng khi số lớn hơn
 *
 * Để hiểu rõ, cần biết tại sao sai số làm tròn lại tăng khi số lớn hơn.
 *
 * Vấn đề với sai số làm tròn
 * Máy tính lưu số thực với số bit cố định (thường 64 bit). Điều này có nghĩa:
 *
 * Khi số nhỏ:
 * 0.000001 + 0.0000000001
 *        ↑ sai số rất nhỏ
 * Sai số làm tròn ở vị trí thập phân thứ 10, rất nhỏ.
 *
 * Khi số lớn:
 * 1000000 + 0.0001
 *       ↑ sai số lớn hơn
 * Sai số làm tròn ở vị trí hàng đơn vị, lớn hơn nhiều.
 *
 * Ví dụ cụ thể
 * Giả sử EPS = 1e-9:
 * Trường hợp 1: a = 0.000001, b = 0.0000010001
 *
 *  fabs(a - b) = 0.0000000001
 *  fmax(1.0, fmax(fabs(a), fabs(b))) = 1.0
 *  Sai số cho phép = 1e-9 * 1.0 = 1e-9 = 0.000000001
 *
 *  0.0000000001 <= 0.000000001  ✓ TRUE - xem là bằng nhau
 *
 *
 * Trường hợp 2: a = 1000000, b = 1000000.001
 * fabs(a - b) = 0.001
 * fmax(1.0, fmax(fabs(a), fabs(b))) = 1000000
 * Sai số cho phép = 1e-9 * 1000000 = 0.001
 *
 * 0.001 <= 0.001  ✓ TRUE - xem là bằng nhau
 *
 *
 * Tóm lại
 * Số nhỏ: sai số cho phép nhỏ (vì EPS * 1.0)
 * Số lớn: sai số cho phép lớn (vì EPS * 1000000, chẳng hạn)
 *
 * Điều này hợp lý vì sai số làm tròn tự nhiên cũng lớn hơn khi số lớn hơn 🎯
 *
 *
 */

/*

Nguyên tắc VÀNG khi dùng EPS

| Mục đích        | Viết ĐÚNG           |
| --------------- | ------------------- |
| Bằng nhau       | `fabs(x - y) < EPS` |
| Lớn hơn thật sự | `x > y + EPS`       |
| Nhỏ hơn thật sự | `x + EPS < y`       |
| Bằng 0          | `fabs(x) < EPS`     |
| Khác 0          | `fabs(x) > EPS`     |

*/

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