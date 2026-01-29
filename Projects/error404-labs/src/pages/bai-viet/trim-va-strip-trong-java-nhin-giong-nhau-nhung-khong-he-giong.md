---
layout: '../../layouts/BlogPostLayout.astro'
title: '✂️ `trim()` và `strip()` trong Java – Nhìn giống nhau, nhưng không hề giống'
date: 2026-01-29
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/trim-va-strip-trong-java-nhin-giong-nhau-nhung-khong-he-giong.avif',
        alt: '✂️ `trim()` và `strip()` trong Java – Nhìn giống nhau, nhưng không hề giống',
    }
description: 🧵 Xử lý chuỗi trong Java tưởng đơn giản nhưng lại dễ dính bug ngầm. trim() và strip() nhìn thì giống nhau, nhưng khác biệt nằm ở cách Java hiểu “khoảng trắng”. 💡 Một khác biệt nhỏ, nhưng ảnh hưởng lớn nếu bạn làm việc với dữ liệu thực tế, web hoặc đa ngôn ngữ.
draft: false
category: Java
---

Khi làm việc với **chuỗi (String)** trong Java, gần như ai cũng từng dùng qua `trim()`.
Nhưng từ **Java 11**, Java cho thêm một anh em mới: **`strip()`**.

Nhìn bề ngoài thì… giống nhau y chang:
👉 đều xóa khoảng trắng đầu và cuối chuỗi.
Nhưng nếu dùng không đúng chỗ, **kết quả có thể khiến bạn ngơ ngác**.

Bài này không đi theo kiểu định nghĩa khô khan, mà là **giải thích để dùng cho đúng – và tránh bug**.

---

## 🧠 Bản chất vấn đề: “khoảng trắng” là gì?

Nghe thì đơn giản, nhưng **khoảng trắng không chỉ là dấu space `' '`**.

Ngoài space thường, còn có:

- tab
- xuống dòng
- và… **cả đống whitespace Unicode** (hay gặp khi xử lý dữ liệu web, copy text, đa ngôn ngữ)

Và đây chính là nơi `trim()` và `strip()` bắt đầu khác nhau.

---

## ✂️ `trim()` – Cũ, quen, nhưng có giới hạn

`trim()` xuất hiện từ **Java 1.0**, nghĩa là nó đã có mặt từ thời Java còn rất “nguyên thủy”.

```java
String s = "   Hello Java   ";
System.out.println(s.trim());
```

Kết quả:

```
Hello Java
```

Nhìn thì ổn, nhưng vấn đề nằm ở **cách nó xóa khoảng trắng**.

### ⚠️ `trim()` chỉ xóa:

- Các ký tự có mã **ASCII ≤ 32**
- Chủ yếu là space, tab, newline

👉 Điều đó có nghĩa là:

- Nếu chuỗi chứa **Unicode whitespace**
- `trim()` sẽ **bó tay**

Ví dụ thực tế:

```java
String s = "\u2003Hello\u2003"; // khoảng trắng Unicode
System.out.println(s.trim());
```

Kết quả:

```
␣␣Hello␣␣
```

😐 Chuỗi **không bị xóa gì cả**.

---

## ✨ `strip()` – Cách làm đúng trong thời hiện đại

Từ **Java 11**, Java giới thiệu `strip()` để giải quyết vấn đề trên.

```java
String s = "   Hello Java   ";
System.out.println(s.strip());
```

Kết quả:

```
Hello Java
```

Nghe giống `trim()`, nhưng khác ở chỗ:

👉 `strip()` dựa trên **chuẩn Unicode**
👉 Xóa **toàn bộ whitespace hợp lệ**, không quan tâm ASCII hay không

Ví dụ lại với Unicode:

```java
String s = "\u2003Hello\u2003";
System.out.println(s.strip());
```

Kết quả:

```
Hello
```

✔️ Đúng thứ ta mong đợi.

---

## ➕ Bonus: `stripLeading()` và `stripTrailing()`

Java 11 còn cho thêm 2 hàm rất tiện:

```java
String s = "   Hello Java   ";

s.stripLeading();   // "Hello Java   "
s.stripTrailing();  // "   Hello Java"
```

Rất hữu ích khi:

- format text
- parse input
- xử lý dữ liệu trước khi lưu

---

## 🧪 Tình huống thực tế dễ dính bug

Bạn đọc dữ liệu từ:

- file
- API
- copy/paste từ web
- input người dùng

```java
if (username.trim().equals("admin")) {
    // login
}
```

👉 Với dữ liệu có Unicode whitespace, đoạn code trên **có thể fail mà không hiểu vì sao**.

Chỉ cần đổi sang:

```java
if (username.strip().equals("admin")) {
    // login
}
```

Là xong.

---

## 🧠 So sánh nhanh cho dễ nhớ

| Tiêu chí          | `trim()` | `strip()` |
| ----------------- | -------- | --------- |
| Có từ Java        | 1.0      | 11        |
| Dựa trên          | ASCII    | Unicode   |
| Xóa space thường  | ✅       | ✅        |
| Xóa Unicode space | ❌       | ✅        |
| Phù hợp hiện nay  | 😐       | ✅        |

---

## 🎯 Kết luận gọn gàng

- Nếu bạn đang dùng **Java 11 trở lên**
  👉 **Hãy dùng `strip()`**
- `trim()` không sai, nhưng **không còn đủ tốt** cho dữ liệu hiện đại
- Dữ liệu càng “ngoài đời” (web, user input, đa ngôn ngữ)
  👉 `strip()` càng an toàn

---

## 📝 Một câu chốt cho dễ nhớ

> **`trim()` phù hợp cho Java ngày xưa, `strip()` là cách Java nên dùng hôm nay.**
