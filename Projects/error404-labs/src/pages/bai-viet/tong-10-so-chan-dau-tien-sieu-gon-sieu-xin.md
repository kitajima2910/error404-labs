---
layout: '../../layouts/BlogPostLayout.astro'
title: '🍎 Tổng 10 Số Chẵn Đầu Tiên (Siêu Gọn - Siêu Xịn)'
date: 2026-02-26
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/tong-10-so-chan-dau-tien-sieu-gon-sieu-xin.avif',
        alt: '🍎 Tổng 10 Số Chẵn Đầu Tiên (Siêu Gọn - Siêu Xịn)',
    }
description: Meow~ Hình như mình vừa làm rối tung dòng code này lên rồi... 🙀 Góc làm việc tại Error404-Labs đôi khi lại có những vị khách hoàng thượng ghé thăm và tạo ra vài chiếc lỗi 404 ngoài ý muốn. Nhưng nhìn cái mặt hối lỗi kia kìa, ai mà nỡ giận cơ chứ? Lập trình là phải vui, và đôi khi cũng cần một chút lộn xộn đáng yêu thế này! 🐾💻
draft: false
category: Java
---

### 🎯 Mục tiêu
Tính tổng: $2 + 4 + 6 + 8 + 10 + 12 + 14 + 16 + 18 + 20$

---

### 💡 Tư duy "Gọn & Xịn"
Để giải bài này, mình chỉ cần 2 chiếc "giỏ":
* 📥 **Giỏ `sum`**: Để tích lũy điểm (tổng).
* 🔢 **Giỏ `count`**: Để đếm xem đủ 10 số chưa thì dừng.

**Bí kíp:** Thay vì kiểm tra từng số, mình nhảy bước `i += 2` để luôn chọn đúng anh bạn "số chẵn". Đỡ mệt máy tính, code lại trông cực chuyên nghiệp! 😎

---

### 💻 Code "Dáng Xinh" (Java)

```java
int count = 0; // Đếm số lượng
int sum = 0;   // Tổng tích lũy

// Nhảy 2 bước một lần (i += 2), đếm đủ 10 thì nghỉ!
for (int i = 2; count < 10; i += 2, count++) {
    sum += i;
}

System.out.println("✨ Kết quả: " + sum);
```
---

### ⭐ Tại sao cách này 10 điểm?

1. **Nhanh**: Không cần dùng lệnh `if` để kiểm tra chẵn/lẻ.
2. **Gọn**: Biến đếm và giá trị chạy cùng nhau trong một vòng lặp.
3. **Dễ hiểu**: Đủ 10 số là dừng, không gây nhầm lẫn.

---

### 💌 Lời nhắn

Lập trình là nghệ thuật tối ưu. Thay vì làm phức tạp, hãy làm cho code của bạn "biết nói" nhé!

**Thử thách:** Bạn có thể đổi `for` sang `while` mà vẫn giữ được độ "gọn" này không? Thử ngay! 🔥

#Error404Labs #JavaBasic #CodingIsFun
