---
layout: '../../layouts/BlogPostLayout.astro'
title: '🌟 Số Nguyên Tố Là Gì?'
date: 2026-02-03
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_tt_cb_2026_01/kh-tt-cb-2026-01-so-nguyen-to.avif',
        alt: '🌟 Số Nguyên Tố Là Gì?',
    }
description: Kiểm Tra Số Nguyên Tố Chỉ Với Vài Dòng Code ✨ Có những con số rất đặc biệt… Chúng không thích chia sẻ, chỉ chịu chia cho 1 và chính nó mà thôi 😆 Đó chính là số nguyên tố!
draft: false
category: KH_TT_CB_2026_01
---

### Kiểm Tra Số Nguyên Tố Chỉ Với Vài Dòng Code ✨

> “Có những con số rất đặc biệt…

> Chúng **không thích chia sẻ**, chỉ chịu chia cho **1 và chính nó** mà thôi 😆”

Đó chính là **số nguyên tố**!

---

## 🧠 1. Số nguyên tố là gì?

👉 **Số nguyên tố** là số tự nhiên **lớn hơn 1**,

👉 và **chỉ có đúng 2 ước số**:

- 1
- chính nó

### Ví dụ:

✅ 2, 3, 5, 7, 11 → số nguyên tố

❌ 1, 4, 6, 8, 9 → không phải số nguyên tố

---

## 🎯 2. Bài toán đặt ra

**Viết hàm kiểm tra** xem một số nguyên dương `n` có phải là số nguyên tố hay không.

### Ví dụ:

- `n = 47` → ✅ `true`
- `n = 4` → ❌ `false`

⏱️ Giới hạn:

- `0 ≤ n ≤ 1000`
- Thời gian chạy rất ngắn → cần code **gọn & thông minh**

---

## 💡 3. Ý tưởng giải (rất quan trọng!)

Ta **không cần kiểm tra từ 2 tới n - 1** ❌ (quá chậm!)

👉 Chỉ cần kiểm tra từ:

```
2 → √n
```

✨ Vì nếu `n` **không chia hết** cho số nào ≤ √n

👉 thì **chắc chắn** nó cũng không chia hết cho số lớn hơn.

---

## 🚀 4. Tối ưu thêm một chút cho “dân pro”

- Số **chẵn > 2** → ❌ loại ngay
- Chỉ kiểm tra **số lẻ**
- Tránh dùng `sqrt()` → dùng `i <= n / i` cho an toàn & nhanh hơn

---

## 🧩 5. Code hoàn chỉnh (gọn – đẹp – dễ hiểu)

```c
int isPrime(int n)
{
    if (n < 2) {
        return 0;
    }

    if (n == 2) {
        return 1;
    }

    if (n % 2 == 0) {
        return 0;
    }

    for (int i = 3; i <= n / i; i += 2) {
        if (n % i == 0) {
            return 0;
        }
    }

    return 1;
}
```

---

## 🔍 6. Giải thích ngắn gọn từng bước

🔹 `n < 2` → không phải số nguyên tố

🔹 `n == 2` → số nguyên tố chẵn duy nhất

🔹 `n % 2 == 0` → loại hết số chẵn

🔹 Vòng lặp chỉ chạy tới `√n` và **chỉ số lẻ**

🔹 Không chia hết số nào → 🎉 **là số nguyên tố**

---

## 🧪 7. Kiểm tra thử nhé!

| n   | Kết quả |
| --- | ------- |
| 1   | false   |
| 2   | true    |
| 3   | true    |
| 4   | false   |
| 47  | true    |
| 49  | false   |

✔️ Chuẩn bài!

---

## 💖 8. Kết luận nhẹ nhàng

🌱 Một bài toán nhỏ

🌱 Nhưng giúp ta học được:

- Tư duy tối ưu
- Hiểu bản chất toán học
- Viết code sạch & hiệu quả

> “Lập trình không phải viết cho máy hiểu,
> mà là viết sao cho **con người đọc cũng thấy dễ thương** 🥰”
