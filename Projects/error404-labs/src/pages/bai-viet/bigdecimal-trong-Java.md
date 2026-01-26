---
layout: '../../layouts/BlogPostLayout.astro'
title: '💰 BigDecimal trong Java'
date: 2026-01-27
author: Phạm Xuân Hoài
image:
    {
        src: '/images/java/bigdecimal-trong-Java.avif',
        alt: '💰 BigDecimal trong Java',
    }
description: 💰 BigDecimal trong Java (Java 9+) – bài viết chia sẻ cách dùng BigDecimal đúng – đủ – không lỗi thời, từ lý do tồn tại, cách khởi tạo chuẩn valueOf(), xử lý phép chia, làm tròn với RoundingMode, đến so sánh cách cũ vs cách mới, tài liệu vs thực tế. 📌 Phù hợp cho những ai muốn viết code chính xác, sạch, và tránh bug thầm lặng khi xử lý số thập phân.
draft: false
category: Java
---

## Dùng đúng từ đầu để không sửa sai về sau (Java 9+)

BigDecimal không khó.

Cái khó là **dùng sai nhưng không biết mình đang sai**.

Nếu từng:

- Thấy `0.1 + 0.2` ra kết quả lạ
- Bị `ArithmeticException` khi chia
- Bị IDE cảnh báo deprecated mà không hiểu vì sao

👉 Bài này sinh ra để **giải quyết toàn bộ những chỗ đó**.

---

## 1️⃣ Vì sao `double` không phù hợp cho số thập phân “nghiêm túc”?

```java
System.out.println(0.1 + 0.2);
```

Kết quả:

```
0.30000000000000004
```

Đây **không phải bug**, mà là **bản chất**:

- `double` lưu số bằng **nhị phân**
- Nhiều số thập phân trong hệ 10 → **vô hạn trong hệ 2**
- Máy buộc phải làm tròn → sinh sai số

Với nhiều bài toán, sai số này **không đáng kể**.

Nhưng với tiền bạc, nghiệp vụ, thanh toán → **không chấp nhận được**.

---

## 2️⃣ BigDecimal là gì (hiểu đúng để dùng đúng)?

BigDecimal là một **object** dùng để:

- Lưu số thập phân **chính xác tuyệt đối**
- Quản lý rõ ràng **giá trị + số chữ số sau dấu phẩy (scale)**
- Tránh hoàn toàn sai số nhị phân

```java
import java.math.BigDecimal;
import java.math.RoundingMode;
```

📌 Hai đặc điểm cần nhớ:

- BigDecimal **không phải primitive**
- BigDecimal **immutable** (bất biến)

---

## 3️⃣ Khởi tạo BigDecimal – cái nào cũ, cái nào nên dùng

### ❌ Không dùng

```java
new BigDecimal(0.1);
```

`0.1` đã **sai ngay từ double**, BigDecimal chỉ sao chép lại sai số đó.

---

### 📖 Cách hay thấy trong tài liệu

```java
new BigDecimal("0.1");
```

✔️ Chính xác
❌ Nhưng:

- Phụ thuộc String
- Không tiện khi xử lý số
- Ít gặp trong code thực tế

---

### ✅ Cách nên dùng (Java hiện đại)

```java
BigDecimal a = BigDecimal.valueOf(0.1);
BigDecimal b = BigDecimal.valueOf(0.2);
```

- An toàn
- Gọn
- Phổ biến
- Không deprecated

👉 **Nếu không có lý do đặc biệt, hãy dùng `valueOf()`**

---

## 4️⃣ BigDecimal là immutable – hiểu cho đúng

```java
BigDecimal a = BigDecimal.valueOf(10);
a.add(BigDecimal.valueOf(5));

System.out.println(a); // 10
```

Không phải vì add() không chạy,

mà vì **BigDecimal không thay đổi object cũ**.

### Cách đúng

```java
a = a.add(BigDecimal.valueOf(5));
```

Mỗi phép toán → **trả về object mới**.

Điều này giúp:

- An toàn
- Không side-effect
- Dùng tốt trong môi trường nhiều luồng

---

## 5️⃣ Phép toán với BigDecimal

BigDecimal **không dùng toán tử**, mà dùng method:

```java
a.add(b);        // cộng
a.subtract(b);   // trừ
a.multiply(b);   // nhân
```

### Chia – phần dễ lỗi nhất

```java
BigDecimal.valueOf(10).divide(BigDecimal.valueOf(3));
```

👉 Lỗi `ArithmeticException`

Vì:

- 10 / 3 = số vô hạn
- Java **bắt buộc bạn quyết định làm tròn**

### Cách đúng

```java
BigDecimal result = BigDecimal.valueOf(10)
    .divide(BigDecimal.valueOf(3), 2, RoundingMode.HALF_UP);
```

---

## 6️⃣ RoundingMode – GIẢI THÍCH ĐẦY ĐỦ & RÕ RÀNG

Từ Java 9:

- ❌ `BigDecimal.ROUND_*` → **deprecated**
- ✅ Dùng `RoundingMode` (enum)

### Các `RoundingMode` phổ biến

#### 🔹 `HALF_UP` (PHỔ BIẾN NHẤT)

```java
2.345 → 2.35
```

- > = 5 thì làm tròn lên
- Dễ hiểu
- Thường dùng cho tiền bạc

👉 **Mặc định hợp lý nếu không có yêu cầu đặc biệt**

---

#### 🔹 `HALF_EVEN` (làm tròn ngân hàng)

```java
2.345 → 2.34
2.355 → 2.36
```

- Nếu chữ số cuối là 5 → làm tròn về số chẵn gần nhất
- Giảm sai số tích lũy khi tính nhiều lần

👉 Thường gặp trong hệ thống ngân hàng

---

#### 🔹 `DOWN`

```java
2.349 → 2.34
```

- Cắt bỏ phần dư
- Không bao giờ làm tròn lên

👉 Dùng khi **không được vượt quá giá trị gốc**

---

#### 🔹 `UP`

```java
2.341 → 2.35
```

- Chỉ cần có phần dư → làm tròn lên

👉 Dùng khi cần **đảm bảo không bị thiếu**

---

#### 🔹 `FLOOR`

- Luôn làm tròn **xuống**
- Hướng về **−∞**

```java
-2.31 → -2.32
```

---

#### 🔹 `CEILING`

- Luôn làm tròn **lên**
- Hướng về **+∞**

```java
-2.31 → -2.31
```

---

### Gợi ý chọn nhanh

| Trường hợp         | Nên dùng    |
| ------------------ | ----------- |
| Tiền bạc phổ thông | `HALF_UP`   |
| Ngân hàng          | `HALF_EVEN` |
| Không vượt giá trị | `DOWN`      |
| Không bị thiếu     | `UP`        |

---

## 7️⃣ equals() vs compareTo() – khác nhau ở đâu?

```java
BigDecimal a = BigDecimal.valueOf(10.0);
BigDecimal b = BigDecimal.valueOf(10.00);
```

### equals()

```java
a.equals(b); // false
```

So **cả giá trị + scale**

---

### compareTo()

```java
a.compareTo(b) == 0 // true
```

So **giá trị toán học**

👉 **So số → dùng `compareTo()`**

---

## 8️⃣ So sánh với 0 – cách gọn và đúng

```java
if (a.compareTo(BigDecimal.ZERO) > 0) {
    // a > 0
}
```

Dùng `BigDecimal.ZERO`:

- Không tạo object mới
- Code rõ ràng
- Chuẩn Java

---

## 9️⃣ Ví dụ thực tế: Tính tiền

```java
BigDecimal price = BigDecimal.valueOf(19999.99);
BigDecimal quantity = BigDecimal.valueOf(3);

BigDecimal total = price.multiply(quantity)
                        .setScale(2, RoundingMode.HALF_UP);
```

- multiply → nghiệp vụ
- setScale → yêu cầu hiển thị / lưu trữ
- HALF_UP → dễ hiểu, dễ kiểm soát

---

## 🔟 Khi nào KHÔNG nên dùng BigDecimal?

| Trường hợp | Lý do                         |
| ---------- | ----------------------------- |
| Game       | Chậm                          |
| Animation  | Không cần chính xác tuyệt đối |
| Vật lý     | `double` đủ dùng              |

BigDecimal **chính xác**, nhưng **không rẻ về hiệu năng**.

---

## 1️⃣1️⃣ TÓM TẮT NHANH

### Cũ vs Mới

| Nội dung | Cũ                       | Mới            |
| -------- | ------------------------ | -------------- |
| Khởi tạo | `new BigDecimal(String)` | `valueOf()`    |
| Làm tròn | `ROUND_*`                | `RoundingMode` |
| So sánh  | `equals()`               | `compareTo()`  |

---

## 🎯 KẾT LUẬN

BigDecimal không phải để dùng khắp nơi.
Nhưng **khi đã dùng, phải dùng đúng**.

Nếu chỉ nhớ **3 dòng**:

```
BigDecimal.valueOf()
RoundingMode
compareTo()
```

👉 Bạn đã tránh được **90% lỗi BigDecimal phổ biến** rồi.
