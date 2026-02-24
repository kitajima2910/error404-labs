---
layout: '../../layouts/BlogPostLayout.astro'
title: '🎨 Xây dựng UI – Products'
date: 2026-02-24
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh_web_cb_2026_01/kh-web-cb-2026-01-xay-dung-ui-products.avif',
        alt: '🎨 Xây dựng UI – Products',
    }
description: 📦 Phần 1 - Nặn một chiếc hộp thần kỳ. 🔘 Phần 2 - Gắn những chiếc huy hiệu tròn xoe. 📝 Phần 3 - Viết những lời chào thật ngọt ngào. 🏙️ Phần 4 - Sắp xếp thành một "khu phố" ngăn nắp.
draft: false
category: KH_WEB_CB_2026_01
---
## 🎨 Tổng quan UI: "Danh sách dịch vụ sáng tạo"

Chúng ta sẽ xây dựng một dãy các ô hình chữ nhật, mỗi ô chứa một biểu tượng, một cái tên và một dòng mô tả.

---

## 📦 Phần 1: Chiếc hộp thần kỳ (The Product Card)

Đây là "viên gạch" đầu tiên. Chúng ta xây xong một ô thì các ô khác chỉ cần copy lại thôi!

### **Level 1: HTML (Khung xương)**

Chúng ta cần một cái thùng để đựng mọi thứ bên trong.

```html
<div class="product-card">
    </div>

```

### **Level 2: CSS (Sắp xếp)**

Làm cho cái thùng này đứng ngay ngắn.

* **Flexbox:** Giúp các đồ vật bên trong xếp thành một hàng dọc thẳng tắp từ trên xuống dưới.
* **Center:** Đưa mọi thứ ra giữa cho đẹp.

### **Level 3: Trang trí (Tô màu)**

* **Background-color:** Tô màu nền xám nhạt (`#F8F8F8`).
* **Padding:** Tạo khoảng trống bên trong để chữ không bị dính vào mép hộp.

---

## 🔘 Phần 2: Huy hiệu hình tròn (The Logo)

Đây là nơi chứa các biểu tượng (Icon) xinh xắn.

### **Level 1: HTML (Khung xương)**

Tạo một cái vòng tròn nhỏ.

```html
<div class="logo">
    <i class="fa fa-paint-brush"></i> </div>

```

### **Level 2: CSS (Sắp xếp)**

* **Width & Height:** Cho chiếc vòng có kích thước bằng nhau ($80px \times 80px$).
* **Display Flex:** Giúp cái icon nằm "chính giữa" vòng tròn.

### **Level 3: Trang trí (Tô màu)**

* **Border-radius: 50%:** Phép thuật biến hình vuông thành **hình tròn**.
* **Border:** Vẽ một đường viền màu xanh quanh vòng tròn.
* **Font-size:** Phóng to cái icon lên cho dễ nhìn.

---

## 📝 Phần 3: Nội dung lời chào (Name & Description)

Phần này để kể cho mọi người biết chúng ta làm gì.

### **Level 1: HTML (Khung xương)**

Dùng 2 cái thẻ `div` để ghi tên và mô tả.

```html
<div class="name">Thiết Kế Đồ Họa</div>
<div class="desc">Sáng tạo hình ảnh, logo...</div>

```

### **Level 2: CSS (Sắp xếp)**

* **Text-align: center:** Cho chữ nằm ngay ngắn ở giữa.
* **Gap:** Tạo khoảng cách để chữ không đè lên hình.

### **Level 3: Trang trí (Tô màu)**

* **Font-weight: 700:** Làm cho tên dịch vụ **In đậm** lên.
* **Color:** Tên thì màu đen đậm, mô tả thì màu xám nhạt hơn một chút.

---

## 🏙️ Phần 4: Khu phố nhộn nhịp (The Product List)

Sau khi có các chiếc hộp (Card), chúng ta sẽ xếp chúng vào một "Khu vườn".

### **Level 1: HTML (Khung xương)**

Dùng một cái túi lớn bao quanh tất cả các chiếc hộp đã làm.

```html
<section class="product-list">
    </section>

```

### **Level 2: CSS (Sắp xếp)**

* **Grid Layout:** Chia khu vườn thành các ô đất bằng nhau.
* **Repeat Auto-fit:** Máy tính tự tính toán: nếu màn hình rộng thì xếp 3-4 hộp một hàng, màn hình nhỏ (điện thoại) thì tự xuống dòng xếp 1 hàng.
* **Gap: 20px:** Khoảng cách an toàn giữa các chiếc hộp để chúng không "cãi nhau".

### **Level 3: Trang trí (Tô màu)**

* **Max-width: 1024px:** Giữ cho khu vườn không quá rộng, vừa mắt người xem.
* **Margin: 0 auto:** Đưa cả khu vườn ra giữa màn hình máy tính.

---

## 🚀 Tổng kết: Ghép tất cả lại!

Khi chúng ta ghép 4 phần lại, chúng ta có một giao diện hoàn chỉnh. Hãy nhớ quy tắc:

1. **HTML:** Xây khung (như lắp LEGO).
2. **CSS Layout:** Sắp xếp vị trí (đứng, nằm, giữa).
3. **CSS Decor:** Tô màu và làm đẹp (vòng tròn, màu sắc, chữ đậm).

## 🚀 Tham khảo code

<details>
    <summary>Xem code</summary>

```html
<!-- index.html -->
 <!doctype html>
<html>

<head>
    <meta charset="utf-8" />
    <title>Tiêu đề trang web</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="main.css" />
</head>

<body>
    <section class="product-list">
        <div class="product-card">
            <div class="logo">
                <i class="fa fa-paint-brush" aria-hidden="true"></i>
            </div>
            <div class="name">Thiết Kế Đồ Họa</div>
            <div class="desc">Sáng tạo hình ảnh, logo và bộ nhận diện thương hiệu chuyên nghiệp, ấn tượng.</div>
        </div>

        <div class="product-card">
            <div class="logo">
                <i class="fa fa-code" aria-hidden="true"></i>
            </div>
            <div class="name">Lập Trình Web</div>
            <div class="desc">Xây dựng website hiện đại, tối ưu hiệu năng và tương thích trên mọi thiết bị.</div>
        </div>

        <div class="product-card">
            <div class="logo">
                <i class="fa fa-desktop" aria-hidden="true"></i>
            </div>
            <div class="name">Thiết Kế UI/UX</div>
            <div class="desc">Tập trung vào trải nghiệm người dùng, tạo ra giao diện đẹp mắt và dễ sử dụng.</div>
        </div>

        <div class="product-card">
            <div class="logo">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
            </div>
            <div class="name">Vẽ Minh Họa Digital</div>
            <div class="desc">Biến ý tưởng thành những bức vẽ kỹ thuật số sống động và đầy tính nghệ thuật.</div>
        </div>

        <div class="product-card">
            <div class="logo">
                <i class="fa fa-mobile" aria-hidden="true"></i>
            </div>
            <div class="name">Lập Trình Mobile App</div>
            <div class="desc">Phát triển ứng dụng di động mạnh mẽ trên cả hai nền tảng iOS và Android.</div>
        </div>

        <div class="product-card">
            <div class="logo">
                <i class="fa fa-bolt" aria-hidden="true"></i>
            </div>
            <div class="name">Tối Ưu Mã Nguồn</div>
            <div class="desc">Nâng cấp hệ thống, làm sạch code và tối ưu hóa tốc độ tải cho dự án của bạn.</div>
        </div>
    </section>
</body>

</html>
```

```css
/* main.css */
.product-list {
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;

    /* border: 1px solid #ccc; */

    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

}

.product-list .product-card {
    width: 100%;
    max-width: 250px;

    background-color: #F8F8F8;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    gap: 20px;
    padding: 20px 0;

    justify-self: center;
}

.product-list .product-card .logo {
    width: 100%;
    max-width: 80px;
    height: 80px;

    color: #339999;
    font-size: 40px;

    border: 3px solid #339999;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
}

.product-list .product-card .name {
    font-size: 20px;
    font-weight: 700;
    color: #333;
    padding: 0 20px;
}

.product-list .product-card .desc {
    font-size: 16px;
    color: #666;
    text-align: center;
    padding: 0 20px;
}
```

</details>
