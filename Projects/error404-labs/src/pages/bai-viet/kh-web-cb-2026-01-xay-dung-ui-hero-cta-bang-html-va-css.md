---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây Dựng UI Hero CTA Bằng HTML & CSS'
date: 2026-01-15
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-hero-cta-bang-html-va-css.avif',
        alt: '🎨 Xây Dựng UI Hero CTA Bằng HTML & CSS',
    }
description: Bài viết hướng dẫn từng bước từ phân tích giao diện, chia bố cục, chia level học cho đến ghép UI hoàn chỉnh. Phù hợp cho người mới học frontend, học sinh – sinh viên và giáo viên dạy lập trình.
draft: false
category: KH_WEB_CB_2026_01
---

## 🎯 Mục tiêu bài học

Sau bài này, bạn sẽ:

- Hiểu **UI là gì**
- Biết cách **chia UI thành từng phần nhỏ**
- Học **HTML (xây khung)** → **CSS (tô màu)** → **Trang trí (đẹp hơn)**
- Ghép tất cả lại thành **1 giao diện hoàn chỉnh như hình trên**

---

## 🔷 UI LÀ GÌ?

👉 **UI (User Interface)** là **giao diện người dùng**
Nói đơn giản:

- Thứ bạn **nhìn thấy** trên website
- Có chữ, nút bấm, hình ảnh, màu sắc

📌 UI trong bài này là một **khối giới thiệu khóa học** (Hero CTA)

---

## 🔷 CHIA UI THÀNH 4 PHẦN

Nhìn UI ta có thể chia như sau:

1. **Phần 1:** Nền + khung lớn
2. **Phần 2:** Tiêu đề
3. **Phần 3:** Mô tả
4. **Phần 4:** Nút bấm

---

# 🧩 PHẦN 1 – KHUNG NỀN (Hero CTA)

## 🧠 Level 1 – HTML (Xây khung)

HTML giống như **xây nhà bằng gạch**

```html
<div class="hero-cta"></div>
```

📌 Giải thích:

- `div`: cái hộp
- `hero-cta`: tên cái hộp (để CSS tìm)

---

## 🎨 Level 2 – CSS (Tô màu & hình nền)

Tải ảnh: <a href="/bg_special.avif" download="bg_special.avif">bg_special.avif</a>

```css
.hero-cta {
    background-image: url('bg_special.avif');
    background-repeat: no-repeat;
    background-position: center top;
    padding-top: 30px;
    padding-bottom: 45px;
}
```

📌 Giải thích cho người mới:

- `background-image`: ảnh nền
- `no-repeat`: không lặp hình
- `padding`: tạo khoảng trống bên trong

---

## ✨ Level 3 – Trang trí

👉 UI nhìn **rộng rãi, dễ thở**, không bị dính sát

---

# 🧩 PHẦN 2 – TIÊU ĐỀ

## 🧠 Level 1 – HTML

```html
<div class="title">
    <h3>Đừng Bỏ Lỡ Cơ Hội Sáng Tạo Này!</h3>
</div>
```

📌 `h3` là chữ tiêu đề (to hơn chữ thường)

---

## 🎨 Level 2 – CSS

```css
.title {
    text-align: center;
    color: white;
}
```

📌 Giải thích:

- `text-align: center`: căn giữa
- `color: white`: chữ màu trắng

---

## ✨ Level 3 – Trang trí

👉 Chữ trắng nổi bật trên nền tối 🌙

---

# 🧩 PHẦN 3 – MÔ TẢ

## 🧠 Level 1 – HTML

```html
<div class="description">
    <p>Tham gia khóa học vẽ chỉ với 10.000 đồng – số lượng ưu đãi có hạn</p>
</div>
```

📌 `p` là đoạn văn bản

---

## 🎨 Level 2 – CSS

```css
.description {
    text-align: center;
    color: white;
    padding-bottom: 20px;
}
```

📌 `padding-bottom`: tạo khoảng cách với nút bên dưới

---

## ✨ Level 3 – Trang trí

👉 Chữ dễ đọc, không bị dính vào nút

---

# 🧩 PHẦN 4 – NÚT BẤM (BUTTON)

## 🧠 Level 1 – HTML

```html
<div class="button">
    <button>Xem Khóa Học Vẽ & Lập Trình</button>
</div>
```

📌 `button` là nút bấm

---

## 🎨 Level 2 – CSS

```css
.button {
    text-align: center;
}

.button button {
    background-color: #db4533;
    border: none;
    color: white;
    padding: 15px 32px;
    border-radius: 5px;
    cursor: pointer;
}
```

📌 Giải thích:

- `background-color`: màu nút
- `border-radius`: bo góc
- `cursor: pointer`: rê chuột có hình bàn tay 🖱️

---

## ✨ Level 3 – Trang trí

👉 Nút **nổi bật – dễ bấm – thu hút ánh nhìn**

---

# 🔗 GHÉP TẤT CẢ LẠI (TỔNG KẾT)

## 🧠 Sơ đồ tư duy

```
UI
 ├── Phần 1: Khung nền
 ├── Phần 2: Tiêu đề
 ├── Phần 3: Mô tả
 └── Phần 4: Nút bấm
```

👉 Mỗi phần đều có:

- **HTML:** tạo hình
- **CSS:** tô màu
- **Trang trí:** làm đẹp
