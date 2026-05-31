# ĐẶC TẢ THIẾT KẾ: GIỎ HÀNG TRƯỢT (SLIDE-OUT CART DRAWER)

---

## 1. HỆ THỐNG LƯỚI & BỐ CỤC (LAYOUT SYSTEM)

- **Cấu trúc Root:**
  - Lớp phủ nền (Backdrop): `fixed inset-0 z-40 bg-black/60 backdrop-blur-sm`
  - Vùng chứa Drawer (Drawer Content): `fixed inset-y-0 right-0 z-50 w-full max-w-md h-screen bg-white shadow-2xl flex flex-col`

- **Sơ đồ Grid/Flexbox các Section chính:**
  - **Khung Drawer:** Chia làm 3 phần chính theo trục dọc:
    - Header (Cố định): `flex items-center justify-between p-4 border-b border-slate-100`
    - Body (Cuộn độc lập): `flex-1 overflow-y-auto p-4`
    - Footer (Cố định ở đáy): `border-t border-slate-100 p-4 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.03)]`
  - **Cart Item Row:** Bố cục hàng ngang:
    - Container: `flex gap-4 py-4 border-b border-slate-100`
    - Chi tiết sản phẩm (Tên, Giá, Counter): `flex-1 flex flex-col justify-between`
    - Quantity & Price Row: `flex items-center justify-between mt-2`

- **Khoảng cách (Spacing) chuẩn:**
  - Padding viền ngoài: `p-4`
  - Khoảng cách giữa các sản phẩm trong list: `space-y-4`
  - Khoảng cách giữa ảnh và nội dung sản phẩm: `gap-4`

---

## 2. ĐẶC TẢ COMPONENT (COMPONENT SPECS)

### `Backdrop` [DUMB]
- **Box Style:** `fixed inset-0 z-40 bg-black/60 backdrop-blur-sm`
- **Typography:** N/A
- **Tương tác:** `cursor-pointer transition-opacity duration-300`

### `DrawerContent` [DUMB]
- **Box Style:** `fixed inset-y-0 right-0 z-50 w-full sm:max-w-md h-screen bg-white shadow-2xl border-l border-slate-100`
- **Typography:** N/A
- **Tương tác (Hiệu ứng trượt):** `transition-transform duration-300 ease-in-out` (`translate-x-0` khi mở, `translate-x-full` khi đóng)

### `DrawerHeader` [DUMB]
- **Box Style:** `flex items-center justify-between p-4 border-b border-slate-100`
- **Typography:**
  - Tiêu đề: `text-lg font-bold text-slate-900 tracking-tight`
  - Số lượng sản phẩm đi kèm: `text-sm font-normal text-slate-500 ml-1.5`
- **Tương tác:** N/A

### `CloseButton` [DUMB]
- **Box Style:** `p-1.5 rounded-lg hover:bg-slate-100`
- **Typography:** N/A
- **Tương tác:** `text-slate-400 hover:text-slate-700 transition-colors duration-200`

### `CartItemList` [DUMB]
- **Box Style:** `flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-200`
- **Typography:** N/A
- **Tương tác:** N/A

### `EmptyCartState` [DUMB]
- **Box Style:** `flex flex-col items-center justify-center h-full py-16 px-4 text-center`
- **Typography:**
  - Icon: `text-slate-300 w-16 h-16`
  - Tiêu đề: `text-base font-semibold text-slate-800 mt-4`
  - Mô tả phụ: `text-sm text-slate-400 mt-2 max-w-xs`
- **Tương tác (Nút mua sắm):** `mt-6 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 active:scale-[0.98] transition-all`

### `CartItemRow` [DUMB]
- **Box Style:** `flex gap-4 py-3.5 border-b border-slate-100 last:border-b-0`
- **Typography:**
  - Tên sản phẩm: `text-sm font-semibold text-slate-800 line-clamp-2 leading-snug`
  - Giá hiện tại: `text-sm font-bold text-red-600`
  - Giá gốc (nếu có): `text-xs text-slate-400 line-through`
- **Tương tác:** `hover:bg-slate-50/50 rounded-lg p-2 -mx-2 transition-colors duration-200`

### `ProductThumbnail` [DUMB]
- **Box Style:** `w-20 h-20 rounded-lg border border-slate-100 bg-slate-50 overflow-hidden relative flex-shrink-0 flex items-center justify-center`
- **Typography:** N/A
- **Tương tác:** N/A

### `QuantityCounter` [DUMB]
- **Box Style:** `flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden`
- **Typography:**
  - Con số: `w-8 text-center text-sm font-semibold text-slate-700 select-none`
- **Tương tác:**
  - Nút bấm `[+]` và `[-]`: `w-8 h-8 flex items-center justify-center text-slate-500 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors`

### `DrawerFooter` [DUMB]
- **Box Style:** `sticky bottom-0 bg-white border-t border-slate-100 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] space-y-4`
- **Typography:** N/A
- **Tương tác:** N/A

### `SummaryInfo` [DUMB]
- **Box Style:** `flex flex-col gap-2.5`
- **Typography:**
  - Hàng tạm tính / vận chuyển: `flex justify-between items-center text-sm text-slate-500`
  - Giá trị tạm tính: `font-medium text-slate-800`
  - Nhãn miễn phí vận chuyển: `font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs`
  - Dòng tổng tiền: `flex justify-between items-center pt-2.5 border-t border-slate-100`
  - Nhãn tổng tiền: `text-base font-bold text-slate-900`
  - Số tiền tổng: `text-lg font-extrabold text-red-600`
- **Tương tác:** N/A

### `CheckoutButton` [DUMB]
- **Box Style:** `w-full py-3.5 px-4 bg-orange-600 text-white rounded-xl shadow-md shadow-orange-600/10 flex items-center justify-center gap-2`
- **Typography:** `text-base font-bold tracking-wide`
- **Tương tác:** `hover:bg-orange-700 hover:shadow-orange-700/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all duration-200`

---

## 3. RÀNG BUỘC MÀU SẮC (COLOR CONSTRAINTS)

- **Backdrop:** `bg-black/60 backdrop-blur-sm`
- **Nền chính & Khung:** `bg-white`, `bg-slate-50` (nền ảnh)
- **Nút Chốt Sale chính (Thanh toán):** `bg-orange-600 hover:bg-orange-700 text-white`
- **Nút phụ / Nút tương tác:**
  - Nút đóng / Nút đếm: `text-slate-400 hover:text-slate-700 hover:bg-slate-100`
  - Nút xóa sản phẩm: `text-slate-400 hover:text-red-500 hover:bg-red-50`
- **Trạng thái vận chuyển miễn phí:** `text-emerald-600 bg-emerald-50`
- **Màu sắc chữ:**
  - Tiêu đề, chữ chính: `text-slate-900`
  - Nội dung phụ, nhãn: `text-slate-500`
  - Mờ nhạt: `text-slate-400`
- **Giá tiền:**
  - Giá bán hiện tại: `text-red-600 font-bold`
  - Giá gốc (gạch ngang): `text-slate-400 line-through`

---

## 4. MOCK DATA (DỮ LIỆU HIỂN THỊ)

### Danh sách sản phẩm mẫu (`cartItems`):

1. **Sản phẩm 1 (Có giảm giá):**
   - Tên: `Chuột Không Dây Logitech MX Master 3S - Graphite`
   - Giá bán hiện tại: `2.490.000₫`
   - Giá gốc: `2.990.000₫`
   - Số lượng: `1`
   - Tồn kho (Stock): `5`
   - Hình ảnh: `https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=150&h=150&q=80`

2. **Sản phẩm 2 (Giá gốc, mua số lượng nhiều):**
   - Tên: `Bàn Phím Cơ Keychron K2 V2 (RGB Aluminium - Gateron Brown Switch)`
   - Giá bán hiện tại: `1.850.000₫`
   - Số lượng: `2`
   - Tồn kho (Stock): `3`
   - Hình ảnh: `https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=150&h=150&q=80`

3. **Sản phẩm 3 (Giá cao, có giảm giá):**
   - Tên: `Tai Nghe Chụp Tai Chống Ồn Sony WH-1000XM5`
   - Giá bán hiện tại: `6.990.000₫`
   - Giá gốc: `8.490.000₫`
   - Số lượng: `1`
   - Tồn kho (Stock): `2`
   - Hình ảnh: `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&h=150&q=80`

### Tóm tắt thanh toán mẫu:
- **Tạm tính:** `13.180.000₫` (Tính toán: 2.490.000 + (1.850.000 * 2) + 6.990.000)
- **Phí giao hàng:** `Miễn phí` (Hiển thị giá trị số: `0₫`)
- **Tổng cộng:** `13.180.000₫`
