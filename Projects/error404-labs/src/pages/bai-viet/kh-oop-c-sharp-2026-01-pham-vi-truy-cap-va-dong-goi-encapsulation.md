---
layout: '../../layouts/BlogPostLayout.astro'
title: '🔒 Phạm Vi Truy Cập & Đóng Gói — Bí Mật Nội Tâm Của Object 💖'
date: 2026-02-08
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh-oop-c-sharp-2026-01/kh-oop-c-sharp-2026-01-pham-vi-truy-cap-va-dong-goi-encapsulation.avif',
        alt: '🔒 Phạm Vi Truy Cập & Đóng Gói — Bí Mật Nội Tâm Của Object 💖',
    }
description: ✨ Public – Ai cũng xem được ✨ Private – Bí mật riêng tư ✨ Protected – Người nhà mới biết ✨ Encapsulation – Đóng gói để dữ liệu an toàn hơn. Code thực tế + ví dụ đời thật + demo WinForms/Console để hiểu ngay tại lớp 💻 Học xong là biết cách viết class “kín cổng cao tường” chuẩn dev xịn 🔒
draft: false
category: KH_OOP_C_SHARP_2026_01
---

# 🎯 MỤC TIÊU

✅ Hiểu **public / private / protected**

✅ Biết **vì sao không nên public hết**

✅ Hiểu **Encapsulation (Đóng gói)**

✅ Dùng **property (get / set)** đúng cách

✅ Validate dữ liệu trong class

✅ Áp dụng vào mô hình CRUD thực tế

---

# 1️⃣ VẤN ĐỀ KHI PUBLIC HẾT ⚠️

---

## Ví dụ sai (rất hay gặp)

```csharp
class TaiKhoan
{
    public string soTK;
    public string ten;
    public double soDu;
}
```

---

## Main ❌

```csharp
TaiKhoan tk = new TaiKhoan();
tk.soDu = -1000000; // 😱 vỡ hệ thống
```

👉 **Vấn đề:**

- Không kiểm soát dữ liệu
- Ai cũng sửa được
- Code dễ toang khi project lớn

---

# 2️⃣ PHẠM VI TRUY CẬP LÀ GÌ?

---

| Từ khóa   | Ý nghĩa           |
| --------- | ----------------- |
| public    | Ai cũng truy cập  |
| private   | Chỉ trong class   |
| protected | Class + class con |

👉 **Mặc định biến nên là `private`**

---

# 3️⃣ PRIVATE — NỀN TẢNG CỦA OOP 🔒

---

## Ví dụ sửa lại đúng

```csharp
class TaiKhoan
{
    private double soDu;

    public void Nap(double tien)
    {
        soDu += tien;
    }

    public void HienThi()
    {
        Console.WriteLine("Số dư: " + soDu);
    }
}
```

---

## Test

```csharp
TaiKhoan tk = new TaiKhoan();
tk.Nap(5000);
tk.HienThi();

// tk.soDu = 999999 ❌ lỗi ngay
```

👉 **An toàn hơn 100 lần**

---

# 4️⃣ ENCAPSULATION (ĐÓNG GÓI) 📦

---

## Định nghĩa dễ hiểu

> **Không cho sửa trực tiếp dữ liệu**
>
> → Muốn sửa phải đi qua **hàm / property**

---

## Ví dụ đời thật 🏧

- Không ai vào ngân hàng tự sửa số dư
- Phải qua **quầy giao dịch**

👉 OOP cũng vậy.

---

# 5️⃣ PROPERTY (GET / SET) 🔑

---

## Cú pháp chuẩn

```csharp
private double soDu;

public double SoDu
{
    get { return soDu; }
    set { soDu = value; }
}
```

---

## Nhưng… phải VALIDATE 🚨

```csharp
public double SoDu
{
    get { return soDu; }
    set
    {
        if (value >= 0)
            soDu = value;
    }
}
```

---

# 6️⃣ VÍ DỤ ĐỜI THẬT — SINH VIÊN 👨‍🎓

---

## Class SinhVien (chuẩn OOP)

```csharp
class SinhVien
{
    private string ten;
    private int tuoi;
    private double diem;

    public string Ten
    {
        get { return ten; }
        set
        {
            if (!string.IsNullOrEmpty(value))
                ten = value;
        }
    }

    public int Tuoi
    {
        get { return tuoi; }
        set
        {
            if (value >= 18)
                tuoi = value;
        }
    }

    public double Diem
    {
        get { return diem; }
        set
        {
            if (value >= 0 && value <= 10)
                diem = value;
        }
    }

    public void HienThi()
    {
        Console.WriteLine($"{ten} | {tuoi} | {diem}");
    }
}
```

---

## Test

```csharp
SinhVien sv = new SinhVien();

sv.Ten = "Hoài";
sv.Tuoi = 31;
sv.Diem = 9.5;

sv.HienThi();
```

---

# 7️⃣ BÀI CONSOLE — LÀM TỪNG BƯỚC 🧩

---

## 🎯 Đề bài: SẢN PHẨM

### Yêu cầu:

- Không cho giá < 0
- Không cho tên rỗng

---

## ✍️ Bước 1 — Khai báo biến private

```csharp
class SanPham
{
    private string ten;
    private double gia;
}
```

---

## ✍️ Bước 2 — Property

```csharp
public string Ten
{
    get { return ten; }
    set
    {
        if (!string.IsNullOrEmpty(value))
            ten = value;
    }
}

public double Gia
{
    get { return gia; }
    set
    {
        if (value >= 0)
            gia = value;
    }
}
```

---

## ✍️ Bước 3 — Method hiển thị

```csharp
public void HienThi()
{
    Console.WriteLine($"{ten} | {gia}");
}
```

---

## Test

```csharp
SanPham sp = new SanPham();

sp.Ten = "Bàn phím";
sp.Gia = -100; // ❌ bị chặn
sp.Gia = 300000;

sp.HienThi();
```

---

# 8️⃣ PROTECTED — MỞ ĐƯỜNG CHO KẾ THỪA 🔓

---

```csharp
class NhanVien
{
    protected double luong;

    public double Luong
    {
        get { return luong; }
    }
}
```

📌 `protected` dùng nhiều ở **Kế thừa**

---

# 9️⃣ BÀI NÂNG CAO 🔥 QUẢN LÝ NHÂN VIÊN

---

## Yêu cầu

- Lương không < 0
- Chỉ tăng lương, không cho giảm trực tiếp

---

## Code

```csharp
class NhanVien
{
    private string ten;
    private double luong;

    public string Ten
    {
        get { return ten; }
        set
        {
            if (!string.IsNullOrEmpty(value))
                ten = value;
        }
    }

    public double Luong
    {
        get { return luong; }
    }

    public void TangLuong(double tien)
    {
        if (tien > 0)
            luong += tien;
    }

    public void HienThi()
    {
        Console.WriteLine($"{ten} | {luong}");
    }
}
```

---

## Test

```csharp
NhanVien nv = new NhanVien();

nv.Ten = "Hoài";
nv.TangLuong(5000);
// nv.luong = -100 ❌ không thể

nv.HienThi();
```

---

# 🔟 PORT WINFORMS 🖥️

---

```csharp
public class SanPham
{
    private string ten;
    private double gia;

    public string Ten
    {
        get { return ten; }
        set { ten = value; }
    }

    public double Gia
    {
        get { return gia; }
        set
        {
            if (value >= 0)
            {
                gia = value;
            }
        }
    }
}
```

---

## UI bạn chèn

- Label:
    - tên sản phẩm, giá sản phẩm (optional)

- TextBox:
    - txtTenSanPham: tên sản phẩm
    - txtGia: giá sản phẩm

- Button:
    - btnXacNhan: xác nhận

```csharp
private void btnXacNhan_Click(object sender, EventArgs e)
{
    SanPham sp = new SanPham();

    // Sử dụng các thuộc tính (properties) để truy cập và gán giá trị
    sp.Ten = txtTenSanPham.Text;
    sp.Gia = double.Parse(txtGia.Text);

    MessageBox.Show($"Tên sản phẩm: {sp.Ten}\nGiá: {sp.Gia}");
}
```

![Buoi03PhamViTruyCapVaDongGoiTrongCSharp](/images/kh-oop-c-sharp-2026-01/Buoi03PhamViTruyCapVaDongGoiTrongCSharp.avif)

---

# 📌 TỔNG KẾT

---

## Học được gì?

✅ Vì sao không public hết

✅ private để bảo vệ dữ liệu

✅ Encapsulation là nền móng OOP

✅ get / set đúng cách

✅ Validate dữ liệu trong class
