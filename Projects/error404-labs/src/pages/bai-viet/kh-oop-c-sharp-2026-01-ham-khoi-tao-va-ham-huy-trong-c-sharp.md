---
layout: '../../layouts/BlogPostLayout.astro'
title: '🚀🐣 Hàm Khởi Tạo & Hàm Hủy Trong C# — Sinh Ra & Biến Mất Của Một Đối Tượng ✨💻'
date: 2026-02-07
author: Phạm Xuân Hoài
image:
    {
        src: '/images/kh-oop-c-sharp-2026-01/kh-oop-c-sharp-2026-01-ham-khoi-tao-va-ham-huy-trong-c-sharp.avif',
        alt: '🚀🐣 Hàm Khởi Tạo & Hàm Hủy Trong C# — Sinh Ra & Biến Mất Của Một Đối Tượng ✨💻',
    }
description: 🐣 Hiểu Constructor là gì và chạy khi nào ⚙️ Khởi tạo object với nhiều tham số 🔁 Overload constructor 🧹 Hiểu Destructor hoạt động ra sao trong .NET 🚫 Khi nào KHÔNG cần viết Destructor (thực chiến rất quan trọng). Tất cả được minh họa bằng ví dụ đời thật + code dễ thương + thực hành chiếm 90% 🚀
draft: false
category: KH_OOP_C_SHARP_2026_01
---

# 🎯 MỤC TIÊU

✅ Hiểu Constructor là gì

✅ Biết tạo constructor mặc định & có tham số

✅ Biết overload constructor

✅ Hiểu Destructor (biết để hiểu — ít dùng thực chiến)

✅ Áp dụng vào quản lý object thực tế

---

# 1️⃣ CONSTRUCTOR LÀ GÌ?

---

## 🧠 Định nghĩa

**Constructor = Hàm khởi tạo**

👉 Tự chạy khi tạo object bằng `new`

---

### So sánh dễ hiểu 🍜

| Đời thật                | Code                      |
| ----------------------- | ------------------------- |
| Nấu mì phải có nước sôi | Tạo object phải init data |
| Sinh ra có tên          | Object sinh ra có dữ liệu |

---

# 2️⃣ CÚ PHÁP CONSTRUCTOR

---

```csharp
class SinhVien
{
    public string ten;

    public SinhVien()
    {
        Console.WriteLine("Object được tạo 🎉");
    }
}
```

---

## Test

```csharp
SinhVien sv = new SinhVien();
```

📌 Khi `new` → Constructor chạy.

---

# 3️⃣ CONSTRUCTOR MẶC ĐỊNH

---

## Ví dụ đời thật 👨‍🎓

```csharp
class SinhVien
{
    public string ten;
    public int tuoi;

    // Constructor mặc định
    public SinhVien()
    {
        ten = "Chưa có tên";
        tuoi = 18;
    }

    public void HienThi()
    {
        Console.WriteLine($"{ten} - {tuoi}");
    }
}
```

---

## Test

```csharp
SinhVien sv = new SinhVien();
sv.HienThi();
```

👉 Output:

```
Chưa có tên - 18
```

---

# 4️⃣ CONSTRUCTOR CÓ THAM SỐ

---

## Khi nào dùng?

Khi muốn **truyền dữ liệu ngay lúc tạo object**.

---

### Ví dụ 🎮 Nhân vật game

```csharp
class NhanVat
{
    public string ten;
    public int mau;
    public int satThuong;

    public NhanVat(string _ten, int _mau, int _satThuong)
    {
        ten = _ten;
        mau = _mau;
        satThuong = _satThuong;
    }

    public void TanCong()
    {
        Console.WriteLine(ten + " gây " + satThuong + " sát thương ⚔️");
    }
}
```

---

## Test

```csharp
NhanVat nv = new NhanVat("Kiếm Sĩ", 100, 25);

nv.TanCong();
```

---

# 5️⃣ TỪ KHÓA `this`

Dùng để phân biệt **biến class** và **biến truyền vào**.

---

## Viết lại chuẩn hơn

```csharp
public NhanVat(string ten, int mau, int satThuong)
{
    this.ten = ten;
    this.mau = mau;
    this.satThuong = satThuong;
}
```

📌 `this` = chính object hiện tại.

---

# 6️⃣ OVERLOAD CONSTRUCTOR 🔥

---

## Là gì?

Một class có **nhiều constructor**.

---

## Ví dụ 🚗 Xe

```csharp
class Xe
{
    public string hang;
    public string mau;
    public int tocDo;

    // Constructor 1
    public Xe()
    {
        hang = "Chưa rõ";
    }

    // Constructor 2
    public Xe(string hang)
    {
        this.hang = hang;
    }

    // Constructor 3
    public Xe(string hang, string mau, int tocDo)
    {
        this.hang = hang;
        this.mau = mau;
        this.tocDo = tocDo;
    }

    public void HienThi()
    {
        Console.WriteLine($"{hang} | {mau} | {tocDo}");
    }
}
```

---

## Test

```csharp
Xe x1 = new Xe();
Xe x2 = new Xe("Toyota");
Xe x3 = new Xe("BMW", "Đen", 200);

x1.HienThi();
x2.HienThi();
x3.HienThi();
```

---

# 7️⃣ BÀI CONSOLE — LÀM TỪNG BƯỚC 🧩

---

## 🎯 Đề bài: Sản phẩm

### Thuộc tính:

- maSP
- tenSP
- gia

---

## ✍️ Bước 1 — Tạo class

```csharp
class SanPham
{
    public string maSP;
    public string tenSP;
    public double gia;
}
```

---

## ✍️ Bước 2 — Constructor mặc định

```csharp
public SanPham()
{
    maSP = "SP001";
    tenSP = "Chưa đặt tên";
    gia = 0;
}
```

---

## ✍️ Bước 3 — Constructor tham số

```csharp
public SanPham(string ma, string ten, double gia)
{
    this.maSP = ma;
    this.tenSP = ten;
    this.gia = gia;
}
```

---

## ✍️ Bước 4 — Method hiển thị

```csharp
public void HienThi()
{
    Console.WriteLine($"{maSP} | {tenSP} | {gia}");
}
```

---

## Test

```csharp
SanPham sp1 = new SanPham();
SanPham sp2 = new SanPham("SP002", "Chuột", 150000);

sp1.HienThi();
sp2.HienThi();
```

---

# 8️⃣ BÀI NÂNG CAO 🔥 QUẢN LÝ TÀI KHOẢN

---

## Yêu cầu

Constructor phải:

- Tạo số dư ban đầu
- Không cho âm tiền

---

## Code

```csharp
class TaiKhoan
{
    public string soTK;
    public string ten;
    public double soDu;

    public TaiKhoan(string soTK, string ten, double soDu)
    {
        this.soTK = soTK;
        this.ten = ten;

        if (soDu < 0)
            this.soDu = 0;
        else
            this.soDu = soDu;
    }

    public void Nap(double tien)
    {
        soDu += tien;
    }

    public void Rut(double tien)
    {
        if (tien <= soDu)
            soDu -= tien;
    }

    public void HienThi()
    {
        Console.WriteLine($"{soTK} | {ten} | {soDu}");
    }
}
```

---

# 9️⃣ DESTRUCTOR (HÀM HỦY) 💀

---

## Là gì?

Chạy khi object bị hủy khỏi bộ nhớ.

---

## Cú pháp

```csharp
class Test
{
    ~Test()
    {
        Console.WriteLine("Object bị hủy 💀");
    }
}
```

---

## Nhưng…

📌 Thực chiến **hiếm dùng** vì:

- .NET có Garbage Collector
- Không biết chính xác khi nào chạy

👉 Note:

> Biết để đọc code, không cần lạm dụng.

---

# 🔟 PORT WINFORMS 🖥️

---

```csharp
public class SanPham
{
    public string ma;
    public string ten;
    public double gia;

    public SanPham()
    {
        ma = "SP001";
        ten = "San Pham Mac Dinh";
        gia = 10_000;
    }

    public SanPham(string ma, string ten, double gia)
    {
        this.ma = ma;
        this.ten = ten;
        this.gia = gia;
    }
}
```

---

## UI bạn chèn

- Label:
    - Tên tiêu đề (constructor default, constructor tham số)
    - lblMa01, lblMa02: mã sản phẩm
    - lblTen01, lblTen02: tên sản phẩm
    - lblGia01, lblGia02: giá sản phẩm

- Button:
    - btnDuLieu01, btnDuLieu02: tải dữ liệu

```csharp
private void btnDuLieu01_Click(object sender, EventArgs e)
{
    SanPham sp = new SanPham();

    lblMa01.Text = "Mã: " + sp.ma;
    lblTen01.Text = "Tên: " + sp.ten;
    lblGia01.Text = "Giá: " + sp.gia;

}

private void btnDuLieu02_Click(object sender, EventArgs e)
{
    SanPham sp = new SanPham("SP002", "San Pham 02", 20000);

    lblMa02.Text = "Mã: " + sp.ma;
    lblTen02.Text = "Tên: " + sp.ten;
    lblGia02.Text = "Giá: " + sp.gia;
}
```

![Buoi02HamKhoiTaoVaHamHuyTrongCSharp](/images/kh-oop-c-sharp-2026-01/Buoi02HamKhoiTaoVaHamHuyTrongCSharp.avif)

---

# 📌 TỔNG KẾT

---

## Học được gì?

✅ Constructor tự chạy khi new

✅ Constructor mặc định

✅ Constructor tham số

✅ Overload constructor

✅ Dùng `this`

✅ Destructor (biết để hiểu)
