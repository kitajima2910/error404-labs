---
layout: '../../layouts/BlogPostLayout.astro'
title: '🏷️ Labels trong Java – Không phải nhãn dán, mà là “lối tắt thông minh” cho vòng lặp'
date: 2026-02-02
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/labels-trong-java-khong-phai-nhan-dan-ma-la-loi-tat-thong-minh-cho-vong-lap.avif',
        alt: '🏷️ Labels trong Java – Không phải nhãn dán, mà là “lối tắt thông minh” cho vòng lặp',
    }
description: 🏷️ Labels trong Java – nghe tưởng cao siêu mà thật ra chỉ là “đặt tên cho lối thoát” 🚪 Giúp break & continue thoát đúng chỗ, không lạc đường giữa rừng loop 🌲🌲 Ít dùng nhưng dùng đúng lúc thì code gọn hẳn, đọc phát hiểu liền 😌 Một cú “à ha!” nho nhỏ cho những ai từng rối não vì vòng lặp lồng nhau 🤯➡️😎
draft: false
category: Java
---

Trong Java, **labels** nghe tên thì tưởng là thứ gì đó cao siêu lắm…

Nhưng thực ra nó giống như **đặt tên cho vòng lặp**, để bạn nói với Java rằng:

> “Ê, tao muốn nhảy ra **đúng chỗ này**, không phải lung tung nha!” 🚀

Nếu bạn từng:

- loop lồng loop 🌀
- `break` mà không biết nó thoát ra vòng nào 😵‍💫
- muốn `continue` một vòng bên ngoài nhưng Java giả vờ không hiểu

👉 thì **labels sinh ra là dành cho bạn**.

---

## 🤔 Labels trong Java là gì?

**Label** là một **tên định danh** (identifier) được đặt **trước một khối lệnh**, thường dùng nhất là trước **vòng lặp**.

📌 Cú pháp siêu đơn giản:

```java
tenLabel:
    statement;
```

Ví dụ:

```java
outerLoop:
for (int i = 0; i < 3; i++) {
    System.out.println("i = " + i);
}
```

👉 `outerLoop` chính là **label**.

---

## 🧠 Labels dùng để làm gì?

👉 **Labels cho phép bạn điều khiển `break` và `continue` một cách chính xác**

Đặc biệt hữu dụng khi bạn có **vòng lặp lồng nhau**.

### Không dùng label:

- `break` → chỉ thoát vòng **gần nhất**
- `continue` → chỉ nhảy vòng **gần nhất**

### Có dùng label:

- `break label;` → thoát **đúng vòng bạn chỉ định**
- `continue label;` → nhảy sang lần lặp tiếp theo của **vòng được đặt label**

✨ Nói ngắn gọn:
**Label = GPS cho break / continue** 🧭

---

## 🔥 Ví dụ 1: Break KHÔNG dùng label (và cái kết hơi buồn)

```java
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            break;
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

📌 Kết quả:

```
i=0, j=0
i=1, j=0
i=2, j=0
```

😐 `break` chỉ thoát **vòng j**, vòng i vẫn chạy tiếp.

---

## 🚀 Ví dụ 2: Break có label – thoát phát là ra luôn

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            break outer;
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

📌 Kết quả:

```
i=0, j=0
```

💥 Gặp `j == 1` là **thoát luôn cả hai vòng**
Không cần cờ boolean, không cần logic rối não 👌

---

## 🔄 Ví dụ 3: Continue có label – nhảy vòng ngoài

```java
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) {
            continue outer;
        }
        System.out.println("i=" + i + ", j=" + j);
    }
}
```

📌 Kết quả:

```
i=0, j=0
i=1, j=0
i=2, j=0
```

✨ Khi `j == 1` → Java **bỏ luôn phần còn lại của vòng i hiện tại**, nhảy sang `i++`

---

## ⚠️ Labels KHÔNG phải dùng kiểu gì cũng được

### ❌ Không dùng label lung tung

```java
label:
System.out.println("Hello"); // ❌ không có tác dụng gì
```

👉 Label **chỉ thực sự có ý nghĩa** khi đi kèm `break` hoặc `continue`.

---

### ❌ Không dùng label như goto

Java **KHÔNG cho phép**:

- nhảy tự do
- phá luồng chương trình bừa bãi

👉 Labels **an toàn**, không biến code thành “mê cung”.

---

## ✅ Khi nào NÊN dùng Labels?

✔ Loop lồng nhiều tầng

✔ Muốn thoát nhanh, rõ ràng

✔ Tránh tạo biến cờ (`boolean found = false`)

✔ Logic đọc vào là hiểu liền

---

## ❌ Khi nào KHÔNG nên dùng?

❌ Code đơn giản, chỉ 1 vòng lặp

❌ Lạm dụng làm code khó đọc

❌ Dùng để “hack logic” thay vì thiết kế lại code

📌 **Rule of thumb**:

> Nếu dùng label mà người khác đọc không hiểu → nên refactor 😄

---

## 🧩 So sánh nhanh

| Trường hợp       | Không label | Có label |
| ---------------- | ----------- | -------- |
| Thoát 1 vòng     | OK          | OK       |
| Thoát nhiều vòng | ❌ rối      | ✅ gọn   |
| Code rõ ràng     | 😵          | 😎       |

---

## 🎯 Tổng kết nhẹ nhàng

- **Label không phải phép màu**
- Nhưng là **vũ khí bí mật** khi xử lý vòng lặp phức tạp
- Dùng đúng chỗ → code gọn, dễ đọc, dễ bảo trì

💡 Hãy nhớ:

> **Label = đặt tên cho lối thoát** 🏷️🚪
