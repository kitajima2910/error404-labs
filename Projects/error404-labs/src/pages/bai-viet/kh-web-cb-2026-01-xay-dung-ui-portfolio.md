---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây dựng UI - Portfolio'
date: 2026-01-29
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-portfolio.avif',
        alt: '🎨 Xây dựng UI - Portfolio',
    }
description: 🧩 Học làm giao diện web từ con số 0 📐 Biết cách chia UI thành từng phần nhỏ 🧱 Hiểu HTML là khung – CSS là cách sắp xếp & trang trí 🖼️ Tạo lưới hình ảnh gọn gàng, tự động xuống hàng 🧠 Rèn tư duy logic – quan sát – ghép giao diện như xếp LEGO
draft: false
category: KH_WEB_CB_2026_01
---

## 🌱 MỞ ĐẦU – UI KHÔNG PHẢI LÀ CODE

Khi mở một trang web, thứ đầu tiên ta nhìn thấy không phải là code.
Ta thấy:

- Chữ
- Đường kẻ
- Nút
- Hình ảnh
- Cách mọi thứ được sắp xếp với nhau

👉 Tập hợp những thứ đó được gọi là **UI (User Interface)**.

UI không bắt đầu từ code,
UI bắt đầu từ **cách quan sát và chia bố cục**.

Bài viết này tiếp cận UI theo hướng:

> **Nhìn giao diện → chia nhỏ → hiểu từng phần → ghép lại thành một tổng thể**

---

## 🗺️ SƠ ĐỒ TƯ DUY UI

```
UI
 ├── Khung tổng thể
 ├── Tiêu đề & nhấn mạnh
 ├── Thanh danh mục
 └── Khu trưng bày nội dung
```

Mỗi phần đều được tiếp cận theo 3 level:

- **Level 1 – HTML**: tạo hình
- **Level 2 – CSS**: sắp xếp
- **Level 3 – Trang trí**: làm đẹp và tạo cảm giác

---

# 🧱 PHẦN 1 – KHUNG TỔNG THỂ UI

### Nhìn UI như một chiếc bảng lớn

Toàn bộ giao diện được đặt trong một khung duy nhất.

Khung này giúp UI:

- Không bị tràn màn hình
- Có điểm bắt đầu và kết thúc rõ ràng
- Dễ quản lý bố cục bên trong

### HTML – Tạo khu vực

```html
<section class="portfolio">...</section>
```

`section` đóng vai trò như **một vùng không gian riêng**,

mọi thành phần UI đều nằm bên trong vùng này.

---

### CSS – Canh giữa và giới hạn chiều rộng

```css
.portfolio {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
}
```

Ý nghĩa bố cục:

- Giao diện luôn nằm **giữa màn hình**
- Không quá rộng khi màn hình lớn
- Dễ nhìn và cân đối

---

# 🏷️ PHẦN 2 – TIÊU ĐỀ & ĐIỂM NHẤN

### HTML – Nội dung chính và đường nhấn

```html
<h1 class="title">VẼ & LẬP TRÌNH SÁNG TẠO</h1>
<hr />
```

- `h1` đại diện cho nội dung quan trọng nhất
- `hr` tạo điểm nhấn thị giác, tách tiêu đề khỏi phần dưới

---

### CSS – Canh giữa tiêu đề

```css
.portfolio .title {
    text-align: center;
}
```

Tiêu đề được đặt ở trung tâm để:

- Dễ đọc
- Tạo cảm giác cân bằng
- Hướng ánh nhìn người xem vào giữa UI

---

### Trang trí – Đường kẻ có chủ đích

```css
.portfolio hr {
    width: 100px;
    height: 3px;
    background-color: #339999;
    border: none;
    margin-bottom: 20px;
}
```

Đường kẻ:

- Ngắn gọn
- Có màu sắc
- Không chiếm quá nhiều không gian

👉 Đây là **trang trí có kiểm soát**, không làm rối UI.

---

# 🧭 PHẦN 3 – THANH DANH MỤC (TAB)

### HTML – Các mục lựa chọn

```html
<div class="tabs">
    <a class="active">Tất cả</a>
    <a>Vẽ thuật toán</a>
    <a>Lập trình cơ bản</a>
    <a>Game mini</a>
</div>
```

Mỗi `a` đại diện cho:

- Một nhóm nội dung
- Một góc nhìn trong UI

Ở thời điểm này, tab **chưa có hành vi**,

chỉ đóng vai trò **thị giác và bố cục**.

---

### CSS – Xếp tab thành hàng

```css
.portfolio .tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
}
```

Cách sắp xếp này giúp:

- Các tab nằm trên một hàng
- Tự xuống dòng khi không đủ chỗ
- Khoảng cách đều, dễ nhìn

---

### Trang trí – Trạng thái được chọn

```css
.portfolio .tabs a.active {
    color: #339999;
    text-decoration: underline;
}
```

Một tab được chọn cần:

- Khác màu
- Có dấu hiệu nhận biết rõ ràng

👉 UI tốt luôn cho người xem biết: **“mình đang ở đâu”**

---

# 🖼️ PHẦN 4 – KHU TRƯNG BÀY HÌNH ẢNH

### HTML – Nội dung trực quan

```html
<div class="cards-grid">
    <img src="https://placehold.co/350x260" />
    <img src="https://placehold.co/350x260" />
    <img src="https://placehold.co/350x260" />
</div>
```

Hình ảnh là phần:

- Thu hút ánh nhìn
- Thể hiện nội dung nhanh nhất
- Quyết định cảm giác tổng thể của UI

---

### CSS – Xếp lưới linh hoạt

```css
.portfolio .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    padding: 20px;
}
```

Cách xếp này cho phép:

- Màn hình rộng → nhiều cột
- Màn hình hẹp → tự giảm số cột
- Không cần can thiệp thêm logic

👉 Bố cục **tự thích nghi theo không gian**.

---

### Trang trí – Giữ hình ảnh đồng đều

```css
.portfolio .cards-grid img {
    width: 100%;
    aspect-ratio: 350 / 260;
    object-fit: cover;
}
```

Hình ảnh:

- Luôn đầy khung
- Không bị méo
- Giữ cảm giác đồng nhất

---

# 🧩 GHÉP TẤT CẢ LẠI – UI HOÀN CHỈNH

Khi các phần:

- Khung
- Tiêu đề
- Tab
- Lưới hình

được đặt đúng vị trí và đúng vai trò,
ta có một UI hoàn chỉnh chỉ với **HTML và CSS**.

Không cần hiệu ứng phức tạp,
không cần logic xử lý,
chỉ cần **hiểu cấu trúc và bố cục**.

---

## 🎯 KẾT LUẬN

UI không phải là thứ làm một lần cho xong.
UI là quá trình:

> **Nhìn → chia → sắp xếp → tinh chỉnh**

Khi hiểu được cách chia UI thành từng phần nhỏ,
việc xây dựng giao diện trở nên rõ ràng, nhẹ nhàng và có kiểm soát hơn.

---

## 📌 Tham khảo code

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
        <section class="portfolio">
            <h1 class="title">VẼ & LẬP TRÌNH SÁNG TẠO</h1>
            <hr />
            <div class="tabs">
                <a href="#tat-ca" class="active">Tất cả</a>
                <a href="#ve-thuat-toan">Vẽ thuật toán</a>
                <a href="#lap-trinh-co-ban">Lập trình cơ bản</a>
                <a href="#game-mini">Game mini</a>
                <a href="#logic-tu-duy-va-sang-tao">Logic tư duy và sáng tạo</a>
                <a href="#ung-dung-sang-tao">Ứng dụng sáng tạo</a>
            </div>
            <div class="cards-grid">
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
                <img src="https://placehold.co/350x260" alt="Ảnh Đẹp" />
            </div>
        </section>
    </body>
</html>
```

```css
/* main.css */
.portfolio {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    /* border: 1px solid #ccc; */
}

.portfolio .title {
    text-align: center;
}

.portfolio hr {
    width: 100px;
    height: 3px;
    background-color: #339999;
    border: none;
    margin-bottom: 20px;
}

.portfolio .tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 20px;
}

.portfolio .tabs a {
    text-decoration: none;
    color: black;
    font-weight: bold;
    text-transform: capitalize;
}

.portfolio .tabs a.active {
    color: #339999;
    text-decoration: underline;
}

.portfolio .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 20px;
    padding: 20px;
}

.portfolio .cards-grid img {
    width: 100%;
    aspect-ratio: 350 / 260;
    object-fit: cover;
}
```

</details>
