---
layout: '../../layouts/BlogPostLayout.astro'
title: '🚀 ĐỐI TƯỢNG & LỚP TRONG C#'
date: 2026-02-06
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh-oop-c-sharp-2026-01/kh-oop-c-sharp-2026-01-doi-tuong-va-lop-trong-c-sharp.avif',
        alt: '🚀 ĐỐI TƯỢNG & LỚP TRONG C#',
    }
description: 🌱 Hiểu Class là “bản thiết kế gốc” 🧸 Biết Object là “phiên bản sống” được tạo ra ⚙️ Tự tay tạo thuộc tính (Property) & hành vi (Method) 💻 Code thực hành chiếm 90% thời gian. Không học theo kiểu lý thuyết khô khan — mà học bằng ví dụ đời thật, code thật, bug cũng thật luôn 😆
draft: false
category: KH_OOP_C_SHARP_2026_01
---

🎯 Mục tiêu:

- Hiểu Class vs Object
- Tạo class thực tế
- Gọi method

---

# 1️⃣ CLASS LÀ GÌ?

📦 Class = Bản thiết kế

Ví dụ:

> Bản thiết kế nhà ≠ Ngôi nhà thật

> Class ≠ Object

---

## Ví dụ đời thật 🚗

**Class:** Xe

**Object:** Xe của A, Xe của B

---

# 2️⃣ TẠO CLASS ĐẦU TIÊN

---

## 🧪 Ví dụ: Sinh viên

### Code:

```csharp
using System;

class SinhVien
{
    // Thuộc tính
    public string ten;
    public int tuoi;
    public double diem;

    // Phương thức
    public void Hoc()
    {
        Console.WriteLine(ten + " đang học bài 📚");
    }

    public void Thi()
    {
        Console.WriteLine(ten + " đang thi 🎯");
    }
}
```

---

# 3️⃣ TẠO OBJECT

---

```csharp
class Program
{
    static void Main()
    {
        SinhVien sv1 = new SinhVien();

        sv1.ten = "Hoài";
        sv1.tuoi = 31;
        sv1.diem = 9.5;

        Console.WriteLine("Tên: " + sv1.ten);
        Console.WriteLine("Tuổi: " + sv1.tuoi);
        Console.WriteLine("Điểm: " + sv1.diem);

        sv1.Hoc();
        sv1.Thi();
    }
}
```

---

## 🧠 Giải thích

| Thành phần     | Ý nghĩa     |
| -------------- | ----------- |
| new SinhVien() | Tạo object  |
| sv1.ten        | Gán dữ liệu |
| sv1.Hoc()      | Gọi hàm     |

---

# 4️⃣ VÍ DỤ ĐỜI THẬT NÂNG CAO 🚗

---

## Class: Xe

```csharp
class Xe
{
    public string hang;
    public string mau;
    public int tocDo;

    public void Chay()
    {
        Console.WriteLine(hang + " đang chạy 🚀");
    }

    public void Phanh()
    {
        Console.WriteLine(hang + " đang phanh 🛑");
    }

    public void HienThi()
    {
        Console.WriteLine($"Hãng: {hang} | Màu: {mau} | Tốc độ: {tocDo}");
    }
}
```

---

## Main

```csharp
Xe xe1 = new Xe();

xe1.hang = "Toyota";
xe1.mau = "Đỏ";
xe1.tocDo = 120;

xe1.HienThi();
xe1.Chay();
xe1.Phanh();
```

---

# 5️⃣ BÀI TẬP CONSOLE — LÀM TỪNG BƯỚC 🧩

---

## 🎯 Đề bài

Tạo class **ĐiệnThoại**

### Thuộc tính:

- ten
- hang
- gia

### Method:

- Goi()
- Nhac()
- HienThi()

---

## ✍️ Bước 1 — Tạo class

```csharp
class DienThoai
{
    public string ten;
    public string hang;
    public double gia;
}
```

---

## ✍️ Bước 2 — Thêm method

```csharp
public void Goi()
{
    Console.WriteLine(ten + " đang gọi 📞");
}

public void Nhac()
{
    Console.WriteLine(ten + " đang phát nhạc 🎵");
}

public void HienThi()
{
    Console.WriteLine($"{ten} | {hang} | {gia}");
}
```

---

## ✍️ Bước 3 — Test trong Main

```csharp
DienThoai dt = new DienThoai();

dt.ten = "iPhone 15";
dt.hang = "Apple";
dt.gia = 30000000;

dt.HienThi();
dt.Goi();
dt.Nhac();
```

---

# 6️⃣ BÀI NÂNG CAO 🔥

---

## 🎯 Yêu cầu

Tạo class **TàiKhoảnNgânHàng**

### Thuộc tính:

- soTK
- tenChuTK
- soDu

### Method:

- NapTien()
- RutTien()
- HienThi()

---

## 💻 Code mẫu

```csharp
class TaiKhoanNganHang
{
    public string soTK;
    public string tenChuTK;
    public double soDu;

    public void NapTien(double tien)
    {
        soDu += tien;
        Console.WriteLine("Nạp thành công 💰");
    }

    public void RutTien(double tien)
    {
        if (tien <= soDu)
        {
            soDu -= tien;
            Console.WriteLine("Rút thành công 🏧");
        }
        else
        {
            Console.WriteLine("Không đủ tiền ❌");
        }
    }

    public void HienThi()
    {
        Console.WriteLine($"{soTK} | {tenChuTK} | {soDu}");
    }
}
```

---

## Test

```csharp
TaiKhoanNganHang tk = new TaiKhoanNganHang();

tk.soTK = "123456";
tk.tenChuTK = "Phạm Xuân Hoài";
tk.soDu = 5000;

tk.NapTien(2000);
tk.RutTien(1000);
tk.HienThi();
```

---

# 7️⃣ PORT WINFORMS 🖥️

---

```csharp
public class SinhVien
{
    public string ten;
    public int tuoi;

    public void HienThi(Label lblTen, Label lblTuoi)
    {
        lblTen.Text = "Tên: " + ten;
        lblTuoi.Text = "Tuổi: " + tuoi;
    }

    public string LayThongTin()
    {
        return "Tên: " + ten + ", Tuổi: " + tuoi;
    }
}
```

---

## UI bạn chèn:

- Label:
    - lblTen: tên
    - lblTuoi: tuổi
    - Đường kẻ ngang (optional)
    - lblThongTin: thông tin

```csharp
SinhVien sv = new SinhVien();

sv.ten = "Phạm Xuân Hoài";
sv.tuoi = 31;

sv.HienThi(lblTen, lblTuoi);
lblThongTin.Text = sv.LayThongTin();
```

![Buoi01DoiTuongVaLopTrongCSharp](/images/kh-oop-c-sharp-2026-01/Buoi01DoiTuongVaLopTrongCSharp.avif)

---

# 📌 TỔNG KẾT

---

## Học được gì?

✅ Class là bản thiết kế

✅ Object là thực thể

✅ Tạo thuộc tính

✅ Viết method

✅ Gọi object
