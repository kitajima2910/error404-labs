# 🌟 Số Hoàn Hảo (Perfect Numbers)

## 📚 Khái Niệm

Một **số hoàn hảo** là một số tự nhiên bằng tổng các ước số thực sự của nó (các ước số khác chính nó).

### ✨ Ví Dụ Minh Họa

**Số 6 là số hoàn hảo** vì:
- Các ước số của 6: 1, 2, 3, 6
- Các ước số thực sự (không tính 6): 1, 2, 3
- Tổng: 1 + 2 + 3 = 6 ✓

**Số 28 là số hoàn hảo** vì:
- Các ước số thực sự: 1, 2, 4, 7, 14
- Tổng: 1 + 2 + 4 + 7 + 14 = 28 ✓

**Số 10 KHÔNG phải số hoàn hảo** vì:
- Các ước số thực sự: 1, 2, 5
- Tổng: 1 + 2 + 5 = 8 ≠ 10 ✗

---

## 💡 Ý Tưởng Chính

Để kiểm tra xem một số n có phải số hoàn hảo không, ta cần:

1. ➕ Tính tổng tất cả các ước số của n (trừ bản thân n)
2. ⚖️ So sánh tổng đó với n
3. 🎯 Nếu bằng nhau → là số hoàn hảo!

---

## 🔧 Phân Tích Code

### Hàm Kiểm Tra

```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool laSoHoanHao(long long n)
{
    if (n <= 1)
        return false;
    long long sum = 1;
    for (long long i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            sum += i;
            if (i != n / i) // tránh cộng trùng nếu là số chính phương
                sum += n / i;
        }
    }
    return sum == n;
}
```

### 📖 Giải Thích Từng Bước

| Bước | Mô Tả |
|------|-------|
| `if (n <= 1)` | Số ≤ 1 không phải số hoàn hảo |
| `long long sum = 1` | Bắt đầu với 1 vì 1 luôn là ước số |
| `for (long long i = 2; i <= sqrt(n); i++)` | **Tối ưu hóa!** Chỉ cần kiểm tra đến √n |
| `if (n % i == 0)` | Nếu i là ước số của n |
| `sum += i` | Cộng ước số i vào tổng |
| `if (i != n/i)` | Nếu i ≠ n/i, cộng cả n/i vào tổng |
| `return sum == n` | Trả về kết quả so sánh |

### 🚀 Tại Sao Dùng `sqrt(n)`?

Khi ta tìm ước số i, ta cũng tìm được ước số n/i cùng lúc!

**Ví dụ với n = 28:**
- i = 2 → tìm được 2 và 28/2 = 14
- i = 4 → tìm được 4 và 28/4 = 7
- i = 7 → không cần kiểm tra vì 7 > √28

---

## 🖥️ Chương Trình Hoàn Chỉnh

```cpp
#include <iostream>
#include <cmath>
using namespace std;

bool laSoHoanHao(long long n)
{
    if (n <= 1)
        return false;
    long long sum = 1;
    for (long long i = 2; i <= sqrt(n); i++)
    {
        if (n % i == 0)
        {
            sum += i;
            if (i != n / i) // tránh cộng trùng nếu là số chính phương
                sum += n / i;
        }
    }
    return sum == n;
}

int main()
{
    long long n;
    cout << "Nhập n: ";
    cin >> n;
    if (laSoHoanHao(n))
        cout << "So vua nhap la so hoan hao\n";
    else
        cout << "So vua nhap khong phai la so hoan hao\n";
    return 0;
}
```

---

## 📝 Ví Dụ Chạy Chương Trình

**Input:** 6
```
Nhập n: 6
So vua nhap la so hoan hao
```

**Input:** 28
```
Nhập n: 28
So vua nhap la so hoan hao
```

**Input:** 10
```
Nhập n: 10
So vua nhap khong phai la so hoan hao
```

---

## 🎓 Bài Tập Thêm

1. ❓ Tìm 3 số hoàn hảo đầu tiên
2. 🔍 Viết chương trình in ra tất cả số hoàn hảo từ 1 đến 10000
3. 💪 Tối ưu hóa hàm để xử lý số rất lớn

---

## 📌 Kiến Thức Cần Nhớ

- ✅ Số hoàn hảo = tổng các ước số thực sự
- ✅ 6 và 28 là hai số hoàn hảo nhỏ nhất
- ✅ Dùng `sqrt(n)` để tối ưu hóa vòng lặp
- ✅ Phải cẩn thận với trường hợp số chính phương