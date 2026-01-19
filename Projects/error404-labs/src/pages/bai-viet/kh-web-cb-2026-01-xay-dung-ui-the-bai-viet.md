---
layout: '../../layouts/BlogPostLayout.astro'
title: '✨ Xây dựng UI - Thẻ Bài Viết'
date: 2026-01-19
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-the-bai-viet.avif',
        alt: '✨ Xây dựng UI - Thẻ Bài Viết',
    }
description: Học cách xây dựng giao diện web như xếp hình LEGO - mỗi phần một chút, mỗi level một bước, cuối cùng tạo ra sản phẩm thật bằng HTML & CSS.
draft: false
category: KH_WEB_CB_2026_01
---

## 📌 Mục tiêu bài học

Sau bài này, người học sẽ:

- Biết UI là gì
- Biết chia UI thành từng phần nhỏ
- Hiểu HTML là khung, CSS là làm đẹp
- Ghép các phần lại thành **1 giao diện web hoàn chỉnh**

---

## 🧠 Nguyên tắc học trong bài này

> **Không viết lung tung – không học trước tương lai**

> 👉 Học đúng những gì đang có trong code

---

## 🧩 UI CỦA CHÚNG TA GỒM NHỮNG GÌ?

Nhìn vào giao diện, ta thấy có:

1. Tiêu đề
2. Hình ảnh
3. Nội dung chữ
4. Nút bấm

➡️ Mỗi phần sẽ học theo 3 level:

- Level 1: HTML (dựng khung)
- Level 2: CSS (căn chỉnh)
- Level 3: Trang trí (làm đẹp)

---

# 🧱 PHẦN 1 – KHUNG TỔNG (.article)

## 🟢 Level 1 – HTML

```html
<div class="article">...</div>
```

👉 Đây là **cái hộp lớn**, chứa toàn bộ UI.

---

## 🟡 Level 2 – CSS

```css
.article {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
}
```

📌 Giải thích dễ hiểu:

- `width: 100%` → co theo màn hình
- `max-width: 700px` → không quá to
- `margin: 0 auto` → nằm giữa trang

---

## 🔵 Level 3 – Trang trí

👉 Phần này **chưa trang trí**, để tập trung vào bố cục.

---

# 🧱 PHẦN 2 – TIÊU ĐỀ

## 🟢 Level 1 – HTML

```html
<h1 class="title">Học Vẽ & Lập Trình Chuẩn</h1>
```

👉 Thẻ `h1` dùng để làm **tiêu đề lớn**.

---

## 🟡 Level 2 – CSS

👉 Trong code hiện tại **chưa chỉnh CSS cho tiêu đề**
→ Trình duyệt sẽ hiển thị theo mặc định.

📌 Chú ý:

> Không phải lúc nào cũng cần CSS, có chữ là được.

---

## 🔵 Level 3 – Trang trí

👉 Chưa trang trí tiêu đề trong bài này.

---

# 🧱 PHẦN 3 – HÌNH ẢNH

## 🟢 Level 1 – HTML

```html
<div class="card">
    <img src="https://placehold.co/700x400" alt="Ảnh Đẹp" />
</div>
```

👉 `img` dùng để hiển thị hình ảnh.

---

## 🟡 Level 2 – CSS

```css
.article .card {
    width: 100%;
    aspect-ratio: 7 / 4;
    overflow: hidden;
}
```

📌 Giải thích:

- Ảnh tự co theo màn hình
- Không cần ảnh đúng kích thước
- Không bị tràn ra ngoài

---

```css
.article .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

📌 Ảnh luôn lấp đầy khung.

---

## 🔵 Level 3 – Trang trí

👉 Phần này **chưa thêm hiệu ứng**, chỉ đảm bảo ảnh hiển thị đẹp.

---

# 🧱 PHẦN 4 – TIÊU ĐỀ PHỤ

## 🟢 Level 1 – HTML

```html
<h3 class="sub-title">
    Hôm nay bạn sẽ học cách kết hợp tư duy hội họa và lập trình một cách sáng
    tạo.
</h3>
```

👉 `h3` là tiêu đề nhỏ hơn `h1`.

---

## 🟡 Level 2 – CSS

👉 Chưa chỉnh CSS → dùng mặc định.

---

## 🔵 Level 3 – Trang trí

👉 Không trang trí trong bài này.

---

# 🧱 PHẦN 5 – NỘI DUNG MÔ TẢ

## 🟢 Level 1 – HTML

```html
<p class="description">Bạn sẽ học cách biến ý tưởng thành hình ảnh...</p>
```

👉 Dùng để hiển thị đoạn văn.

---

## 🟡 Level 2 – CSS

```css
.article .description {
    color: #cecece;
}
```

📌 Chữ có màu nhạt hơn tiêu đề.

---

## 🔵 Level 3 – Trang trí

👉 Màu chữ giúp dễ nhìn, không gây rối mắt.

---

# 🧱 PHẦN 6 – NÚT BẤM

## 🟢 Level 1 – HTML

```html
<button class="btn">Khám Phá Ngay</button>
```

👉 Tạo nút bấm.

---

## 🟡 Level 2 – CSS

```css
.article .btn {
    padding: 15px 20px;
    background-color: #01bacf;
    border: none;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
}
```

📌 Giải thích:

- `padding` → nút to, dễ bấm
- `cursor: pointer` → biết là bấm được

---

## 🔵 Level 3 – Trang trí (Hover)

```css
.article .btn:hover {
    background-color: orangered;
}
```

👉 Khi đưa chuột vào, nút đổi màu.

---

# 🧩 GHÉP LẠI → UI HOÀN CHỈNH

👉 Khi ghép tất cả phần lại:

- Tiêu đề
- Hình ảnh
- Nội dung
- Nút bấm

➡️ Ta có **1 giao diện giới thiệu khóa học hoàn chỉnh**

---

## 🎯 Kết luận cho người học

> **HTML là khung**

> **CSS là làm đẹp**

> **UI là ghép tất cả lại**

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
        <div class="article">
            <h1 class="title">Học Vẽ & Lập Trình Chuẩn</h1>
            <div class="card">
                <img src="https://placehold.co/700x400" alt="Ảnh Đẹp" />
            </div>
            <h3 class="sub-title">
                Hôm nay bạn sẽ học cách kết hợp tư duy hội họa và lập trình một
                cách sáng tạo.
            </h3>
            <p class="description">
                Bạn sẽ học cách biến ý tưởng thành hình ảnh, từ những nét vẽ cơ
                bản đến các sản phẩm số sinh động, đồng thời áp dụng lập trình
                để tạo chuyển động, tương tác và trò chơi đơn giản. Khóa học
                giúp người học vừa hiểu mỹ thuật, vừa làm chủ tư duy thuật toán,
                phù hợp cho người mới bắt đầu yêu thích sáng tạo và công nghệ.
            </p>
            <button class="btn">Khám Phá Ngay</button>
        </div>
    </body>
</html>
```

```css
/* main.css */
.article {
    width: 100%;
    max-width: 700px;

    /* border: 1px solid #000; */

    margin: 0 auto;
}

.article .card {
    width: 100%;
    aspect-ratio: 7 / 4;
    overflow: hidden;
}

.article .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article .description {
    color: #cecece;
}

.article .btn {
    padding: 15px 20px;
    background-color: #01bacf;
    border: none;
    color: #fff;
    cursor: pointer;
    font-weight: 600;
}

.article .btn:hover {
    background-color: orangered;
}
```

</details>
