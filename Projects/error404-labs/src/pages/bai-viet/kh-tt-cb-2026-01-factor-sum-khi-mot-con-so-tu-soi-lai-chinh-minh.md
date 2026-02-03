---
layout: '../../layouts/BlogPostLayout.astro'
title: '🧮 Factor Sum – Khi một con số “tự soi lại chính mình” 🔍✨'
date: 2026-02-04
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_tt_cb_2026_01/kh-tt-cb-2026-01-factor-sum-khi-mot-con-so-tu-soi-lai-chinh-minh.avif',
        alt: '🧮 Factor Sum – Khi một con số “tự soi lại chính mình” 🔍✨',
    }
description: Từ việc phân tích thừa số nguyên tố 🔍, cộng dồn ➕ và lặp lại 🔁 cho đến khi con số không còn thay đổi, bài này giúp mình hiểu rõ hơn về điều kiện dừng và cách tư duy thuật toán 🧠.
draft: false
category: KH_TT_CB_2026_01
---

> Có những con số… sau một vòng phân tích,

> **nó lại quay về đúng bản thân nó**.

> Và bài toán này chính là hành trình đi tìm **điểm dừng ấy** 🧡

---

## 🌱 Bài toán

Ta có một số nguyên dương **n**.

Mỗi lần thực hiện phép toán:

- Phân tích **n** thành các **thừa số nguyên tố**
- Cộng **tất cả** các thừa số đó lại (kể cả trùng)

Sau đó:

- Thay thế **n** bằng tổng vừa tính
- Lặp lại quá trình này **cho đến khi kết quả thu được giống với số hiện tại**

👉 Hãy tìm **kết quả cuối cùng**.

---

## ✨ Ví dụ minh họa

### Ví dụ: `n = 24`

```
24 = 2 × 2 × 2 × 3
→ 2 + 2 + 2 + 3 = 9

9 = 3 × 3
→ 3 + 3 = 6

6 = 2 × 3
→ 2 + 3 = 5

5 = 5
→ 5 + = 5 (không đổi) → dừng
```

📌 **Kết quả cuối cùng: 5**

---

## 🔑 Chìa khóa của bài toán

Điểm quan trọng nhất của bài này **không phải**:

- số nguyên tố
- hay phân tích thừa số khó đến đâu

👉 Mà là **đIỀU KIỆN DỪNG**:

> **Khi tổng các thừa số nguyên tố bằng chính số ban đầu**

Hay nói cách khác:

> “Khi con số soi gương và thấy… chính mình” ✨

---

## 🧠 Ý tưởng giải

1. Lặp vô hạn (`while(1)`)
2. Lưu lại giá trị ban đầu của `n`
3. Phân tích `n` thành thừa số nguyên tố và tính tổng
4. Gán lại `n = tổng`
5. Nếu `n` **không đổi** → dừng

---

## 💻 Code hoàn chỉnh (phiên bản dễ hiểu)

```c
int factorSum(int n) {

    while (1) {
        int saveN = n;   // lưu lại giá trị ban đầu
        int sum = 0;

        // phân tích thừa số nguyên tố
        for (int i = 2; i <= n / i; i++) {
            while (n % i == 0) {
                sum += i;
                n /= i;
            }
        }

        // nếu còn lại 1 số nguyên tố lớn hơn 1
        if (n > 1) {
            sum += n;
        }

        n = sum;  // cập nhật n mới

        // nếu không còn thay đổi → dừng
        if (sum == saveN) {
            break;
        }
    }

    return n;
}
```

---

## 🔍 Giải thích từng phần (rất dễ hiểu 🧸)

### 🔹 `saveN`

```c
int saveN = n;
```

👉 Lưu lại **giá trị trước khi biến đổi**
→ dùng để kiểm tra **có thay đổi hay không**

---

### 🔹 Phân tích thừa số nguyên tố

```c
for (int i = 2; i <= n / i; i++) {
    while (n % i == 0) {
        sum += i;
        n /= i;
    }
}
```

- `i` chạy từ 2 đến √n
- Mỗi lần chia được thì:
    - cộng `i` vào tổng
    - chia nhỏ `n` ra

---

### 🔹 Thừa số nguyên tố cuối cùng

```c
if (n > 1) {
    sum += n;
}
```

👉 Nếu sau vòng lặp còn lại 1 số > 1
→ đó chính là **thừa số nguyên tố cuối**

---

### 🔹 Điều kiện dừng ✨ (linh hồn của bài)

```c
if (sum == saveN) {
    break;
}
```

📌 Khi tổng **bằng lại chính nó**
→ không còn thay đổi
→ **dừng vòng lặp**

---

## 🧪 Test nhanh vài trường hợp

| n   | Kết quả |
| --- | ------- |
| 24  | 5       |
| 12  | 7       |
| 6   | 5       |
| 4   | 4       |
| 7   | 7       |

✔ Hoạt động đúng với mọi case

✔ Không bị vòng lặp vô hạn

✔ Đúng chuẩn đề bài

---

## 🌟 Kết luận

- Đây là bài toán **lặp đến điểm ổn định**
- Không cần kiểm tra số nguyên tố
- Không cần xử lý case đặc biệt
- Chỉ cần một điều:

> **So sánh kết quả mới với giá trị cũ**

💬 _Một bài toán nhỏ, nhưng dạy ta một tư duy lớn:_

👉 **Đừng vội tin điều kiện dừng “quen mắt”, hãy đọc kỹ đề** 🧠✨
