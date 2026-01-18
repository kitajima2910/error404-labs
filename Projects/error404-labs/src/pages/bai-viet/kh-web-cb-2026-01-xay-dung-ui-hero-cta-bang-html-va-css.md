---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây dựng UI - Hero (tiếp theo)'
date: 2026-01-15
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-hero-cta-bang-html-va-css.avif',
        alt: '🎨 Xây dựng UI - Hero (tiếp theo)',
    }
description: Bài viết hướng dẫn từng bước từ phân tích giao diện, chia bố cục, chia level học cho đến ghép UI hoàn chỉnh. Phù hợp cho người mới học frontend, học sinh – sinh viên và giáo viên dạy lập trình.
draft: false
category: KH_WEB_CB_2026_01
---

## 🧠 UI LÀ GÌ? (nói cực dễ hiểu)

**UI (User Interface)** là:

- Những gì **con mắt nhìn thấy**
- Những gì **tay bấm được**
- Những gì giúp người dùng **biết phải làm gì tiếp theo**

Ví dụ:

- Chữ to → đọc
- Chữ nhỏ → hiểu thêm
- Nút → bấm

👉 Trong bài này, ta học UI bằng **1 giao diện đơn giản nhất**:
**Hero Section** (phần đầu trang web).

---

# 🧩 CÁCH HỌC UI ĐÚNG CHO NGƯỜI MỚI

Chúng ta học theo sơ đồ **từ lớn → nhỏ → ghép lại**:

```
UI
├── Phần 1
│   ├── Level 1: HTML
│   ├── Level 2: CSS
│   └── Level 3: Trang trí
├── Phần 2
│   ├── Level 1: HTML
│   ├── Level 2: CSS
│   └── Level 3: Trang trí
├── Phần 3
│   ├── Level 1: HTML
│   ├── Level 2: CSS
│   └── Level 3: Trang trí
└── Phần 4
    ├── Level 1: HTML
    ├── Level 2: CSS
    └── Level 3: Trang trí
```

👉 **Luật học:**

> UI → chia phần → chia level → ghép lại

---

# 🟦 PHẦN 1 – HERO (KHUNG LỚN CỦA UI)

## 🎯 Phần này là gì?

- Là **cái khung to nhất**
- Chứa tất cả nội dung bên trong

---

### 🔹 Level 1 – HTML (XÂY KHUNG)

```html
<div class="hero">...</div>
```

🧒 Giải thích:

- `div` = cái hộp
- `hero` = hộp lớn nhất

👉 HTML chỉ quan tâm: **có hộp gì?**

---

### 🔹 Level 2 – CSS (KÍCH THƯỚC & VỊ TRÍ)

```css
.hero {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
}
```

🧠 Hiểu đơn giản:

- Rộng theo màn hình
- Không quá to
- Luôn nằm giữa

---

### 🔹 Level 3 – TRANG TRÍ (ẢNH NỀN)

Tải ảnh: <a href="/bg_special.avif" download>bg_special.avif</a>

```css
.hero {
    background-image: url('bg_special.avif');
    background-repeat: no-repeat;
    background-position: center top;
}
```

🎨 Ý nghĩa:

- Ảnh nền giúp UI đẹp hơn
- Làm chữ nổi bật

---

# 🟩 PHẦN 2 – TITLE (TIÊU ĐỀ)

## 🎯 Phần này làm gì?

- Thu hút người xem
- Là câu đầu tiên người ta đọc

---

### 🔹 Level 1 – HTML

```html
<h2 class="title">Đừng Bỏ Lỡ Cơ Hội Sáng Tạo Này!</h2>
```

🧒 Hiểu:

- `h2` = chữ to
- Title = câu quan trọng nhất

---

### 🔹 Level 2 – CSS

```css
.hero .title {
    text-align: center;
    color: white;
    padding-top: 30px;
}
```

🧠 Vì sao?

- Căn giữa → dễ nhìn
- Chữ trắng → nổi trên nền
- Có khoảng trống → không bị ngộp

---

### 🔹 Level 3 – TRANG TRÍ

🎨 Title tốt cần:

- Ngắn
- Rõ
- Dễ nhớ

---

# 🟨 PHẦN 3 – DESCRIPTION (MÔ TẢ)

## 🎯 Phần này làm gì?

- Giải thích cho title
- Nói rõ hơn nội dung

---

### 🔹 Level 1 – HTML

```html
<p class="description">
    Tham gia khóa học vẽ chỉ với 10.000 đồng – số lượng ưu đãi có hạn
</p>
```

🧒 Hiểu:

- `p` = đoạn chữ
- Giải thích thêm cho người đọc

---

### 🔹 Level 2 – CSS

```css
.hero .description {
    text-align: center;
    color: white;
    padding-bottom: 20px;
}
```

🧠 Tác dụng:

- Dễ đọc
- Dẫn mắt xuống nút bấm

---

### 🔹 Level 3 – TRANG TRÍ

🎨 Description:

- Không cần dài
- Đọc 3 giây là hiểu

---

# 🟥 PHẦN 4 – BUTTON (NÚT BẤM)

## 🎯 Phần này làm gì?

- Cho người dùng **hành động**
- Là phần quan trọng nhất

---

### 🔹 Level 1 – HTML

```html
<button class="btn">Xem Khóa Học Vẽ & Lập Trình</button>
```

🧒 Hiểu:

- Button = nút
- Có nút → mới bấm được

---

### 🔹 Level 2 – CSS

```css
.hero .btn {
    background-color: #db4533;
    color: white;

    border: none;
    padding: 15px 32px;
    border-radius: 5px;

    cursor: pointer;
    margin-bottom: 50px;
}
```

🧠 Vì sao đẹp?

- Màu đỏ → nổi
- To → dễ bấm
- Bo góc → thân thiện

---

### 🔹 Level 3 – TRANG TRÍ

🎯 Nút tốt cần:

- Nhìn là muốn bấm
- Biết bấm để làm gì

---

# 🧠 GHÉP LẠI – TƯ DUY UI CHUẨN

```
UI
→ Phần 1: Khung hero
→ Phần 2: Tiêu đề
→ Phần 3: Mô tả
→ Phần 4: Nút bấm
→ Mỗi phần đều đi qua:
   HTML → CSS → Trang trí
```

---

# ✅ TỔNG KẾT CHO NGƯỜI MỚI

✔ UI không khó

✔ Chỉ cần chia đúng phần

✔ Hiểu từng level là làm được

---

## 🎉 Tham khảo code

<details>
    <summary>Xem code</summary>

```html
<!-- index.html -->
<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Tiêu đề trang web</title>
        <link rel="stylesheet" href="main.css" />
    </head>

    <body>
        <div class="hero">
            <h2 class="title">Đừng Bỏ Lỡ Cơ Hội Sáng Tạo Này!</h3>
            <p class="description">Tham gia khóa học vẽ chỉ với 10.000 đồng – số lượng ưu đãi có hạn</p>
            <button class="btn">Xem Khóa Học Vẽ & Lập Trình</button>
        </div>
    </body>
</html>
```

```css
/* main.css */
.hero {
    width: 100%;
    max-width: 1024px;

    border: 1px solid #000;

    margin: 0 auto;

    background-image: url('bg_special.avif');
    background-repeat: no-repeat;
    background-position: center top;
}

.hero .title {
    text-align: center;
    color: white;
    padding-top: 30px;
}

.hero .description {
    text-align: center;
    color: white;
    padding-bottom: 20px;
}

.hero .btn {
    display: flex;
    justify-self: center;
    background-color: #db4533;
    border: none;
    color: white;
    padding: 15px 32px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 50px;
}
```

</details>
