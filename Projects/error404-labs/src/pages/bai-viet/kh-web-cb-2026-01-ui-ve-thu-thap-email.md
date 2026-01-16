---
layout: '../../layouts/BlogPostLayout.astro'
title: '📘 Xây Dựng UI - Thu Thập E-Mail'
date: 2026-01-16
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-ui-ve-thu-thap-email.avif',
        alt: '📘 Xây Dựng UI - Thu Thập E-Mail',
    }
description: Bài viết hướng dẫn từng bước từ phân tích giao diện, chia bố cục, chia level học cho đến ghép UI hoàn chỉnh. Phù hợp cho người mới học frontend, học sinh – sinh viên và giáo viên dạy lập trình.
draft: false
category: KH_WEB_CB_2026_01
---

👉 **Mục tiêu của bài học**

- Hiểu **UI là gì**
- Biết cách **chia UI thành từng phần**
- Mỗi phần học theo **3 level: HTML → CSS → Trang trí**
- Cuối cùng **ghép lại thành 1 giao diện hoàn chỉnh**

Chúng ta học theo thứ tự rất dễ nhớ:

> **UI → Chia phần → Chia level → Ghép lại**

---

## 🎨 UI là gì? (Nói cho dễ hiểu)

**UI (User Interface)** là **giao diện người dùng** – tức là **những gì mắt mình nhìn thấy** trên website:

- Chữ
- Hình
- Nút bấm
- Ô nhập liệu

💡 Ví dụ:

- Biểu tượng ✉️
- Dòng chữ “Khơi Dậy Sáng Tạo & Tư Duy”
- Ô nhập email + nút “Nhận Tư Vấn”

➡️ Tất cả gọi chung là **UI**

---

# 🧩 Cấu trúc UI tổng thể (Sơ đồ)

```
UI
 ├── Phần 1 – Icon + Tiêu đề
 ├── Phần 2 – Mô tả nội dung
 ├── Phần 3 – Ô nhập + Nút bấm
 └── Phần 4 – Khung nền & canh giữa
```

Mỗi **Phần** đều học theo **3 Level**:

- 🧱 **Level 1 – HTML**: Xây khung
- 🎨 **Level 2 – CSS**: Làm gọn gàng
- ✨ **Level 3 – Trang trí**: Làm đẹp – vui – sinh động

---

# 🧩 PHẦN 1 – ICON + TIÊU ĐỀ

## 🧱 Level 1 – HTML (Xây khung)

Cho icon:

- https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
- https://fontawesome.com/v4/icons/

```html
<div class="icon">
    <i class="fa fa-envelope-o"></i>
</div>

<div class="title">
    <h2>Khơi Dậy Sáng Tạo & Tư Duy</h2>
</div>
```

📌 Giải thích:

- `div` giống như **hộp đồ**
- `h2` là **chữ to (tiêu đề)**
- `i` là **icon hình cái thư**

---

## 🎨 Level 2 – CSS (Sắp xếp gọn gàng)

```css
.icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #5ac6d0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px auto;
}

.title {
    text-align: center;
}
```

📌 Hiểu đơn giản:

- `border-radius: 50%` → làm **hình tròn**
- `margin: auto` → **canh giữa**
- `text-align: center` → chữ nằm giữa

---

## ✨ Level 3 – Trang trí

```css
.icon i {
    color: #5ac6d0;
    font-size: 20px;
}
```

🎯 Kết quả:

- Icon có màu
- Nhìn **dễ thương & rõ ràng**

---

# 🧩 PHẦN 2 – MÔ TẢ NỘI DUNG

## 🧱 Level 1 – HTML

```html
<div class="description">
    <p>
        Vừa vẽ tranh, vừa học lập trình cơ bản qua trò chơi và hoạt động sáng
        tạo mỗi ngày.
    </p>
</div>
```

---

## 🎨 Level 2 – CSS

```css
.description {
    text-align: center;
}
```

📌 Chỉ cần vậy là đủ cho người mới 👍

---

## ✨ Level 3 – Trang trí (tùy chọn)

```css
.description p {
    font-size: 16px;
    color: #333;
}
```

---

# 🧩 PHẦN 3 – Ô NHẬP & NÚT BẤM

## 🧱 Level 1 – HTML

```html
<div class="form">
    <form action="" method="get">
        <input type="text" placeholder="Nhập email" />
        <button>Nhận Tư Vấn</button>
    </form>
</div>
```

📌 Giải thích:

- `input` → ô gõ chữ
- `button` → nút bấm

---

## 🎨 Level 2 – CSS

```css
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
}
```

📌 Hiểu như xếp lego:

- `flex-direction: column` → xếp **từ trên xuống**
- `gap` → khoảng cách giữa các món

---

## ✨ Level 3 – Trang trí

```css
form input {
    padding: 10px;
    border-radius: 5px;
}

form button {
    background-color: #5ac6d0;
    color: white;
    border-radius: 5px;
    padding: 10px;
}
```

🎯 Nhìn giống **website thật**

---

# 🧩 PHẦN 4 – KHUNG NỀN (BAO TẤT CẢ)

## 🧱 Level 1 – HTML

```html
<section class="get-the-invite">
    <!-- tất cả các phần nằm trong đây -->
</section>
```

---

## 🎨 Level 2 – CSS

```css
.get-the-invite {
    background-color: #f2f2f2;
    max-width: 1024px;
    margin: 0 auto;
}
```

📌 `margin: 0 auto` → canh giữa trang web

---

## ✨ Level 3 – Trang trí

```css
.get-the-invite {
    border: 1px solid #000;
}
```

---

# 🧠 TỔNG KẾT CHO HỌC SINH

👉 Khi làm UI, hãy nhớ:

1. **Không làm tất cả cùng lúc**
2. Luôn đi theo thứ tự:

    ```
    HTML → CSS → Trang trí
    ```

3. Mỗi phần làm xong mới sang phần khác
4. UI giống như **xếp hình Lego** 🧩
