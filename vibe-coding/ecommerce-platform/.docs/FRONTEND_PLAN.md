# KẾ HOẠCH TRIỂN KHAI FRONTEND: GIỎ HÀNG TRƯỢT (SLIDE-OUT CART DRAWER)

Tài liệu này đặc tả kế hoạch xây dựng tính năng Giỏ hàng trượt (Slide-out Cart Drawer) cho dự án **TechBite E-commerce** dựa trên tài liệu ý tưởng và luật thiết kế của hệ thống.

---

## 1. Kiến trúc Component & Tổ chức thư mục

Để đảm bảo tính tái sử dụng và tách biệt rõ ràng giữa logic và UI (Dumb Components), cấu trúc thư mục của `apps/frontend` sẽ được tổ chức như sau:

```text
apps/frontend/
├── app/
│   ├── layout.tsx             # Wrap với CartProvider
│   └── page.tsx               # Trang chủ hiển thị danh sách sản phẩm để test
├── components/
│   ├── cart/
│   │   ├── cart-drawer.tsx    # Drawer giỏ hàng trượt từ bên phải
│   │   ├── cart-item-row.tsx  # Hàng hiển thị từng sản phẩm trong giỏ
│   │   └── quantity-counter.tsx # Bộ đếm số lượng [+] / [-]
│   ├── product/
│   │   └── product-card.tsx   # Thẻ sản phẩm (hiển thị grid ở trang chủ)
│   └── ui/
│       ├── toast.tsx          # Component Toast thông báo thành công
│       └── button.tsx         # Button dùng chung
└── context/
    └── cart-context.tsx       # Quản lý trạng thái giỏ hàng (State & Actions)
```

### Sơ đồ luồng dữ liệu (Data & Event Flow)

```mermaid
graph TD
    ProductCard[Product Card] -- Bấm "Thêm vào giỏ" --> CartContext[Cart Context]
    CartContext -- Kích hoạt Toast --> Toast[Toast Notification]
    CartContext -- Mở Drawer & Cập nhật State --> CartDrawer[Cart Drawer]
    CartDrawer -- Bấm [+] / [-] / Xóa --> CartContext
    CartContext -- Tính toán lại --> CartDrawer
```

---

## 2. Quản lý trạng thái (State Management)

Sử dụng React Context API (`CartContext`) để chia sẻ trạng thái giỏ hàng giữa các component mà không cần prop drilling.

### Định nghĩa Kiểu dữ liệu (TypeScript Interfaces)

```typescript
export interface CartItem {
  id: string;
  name: string;
  price: number;        // Giá bán hiện tại (salePrice nếu có)
  originalPrice?: number; // Giá gốc chưa giảm (để hiển thị line-through)
  quantity: number;
  thumbnail: string;
  stock: number;         // Để chặn tăng số lượng vượt quá tồn kho
}

export interface CartContextType {
  cartItems: CartItem[];
  isDrawerOpen: boolean;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleDrawer: (open: boolean) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}
```

---

## 3. Đặc tả UI/UX & Styling

Tuân thủ nghiêm ngặt các quy tắc trong [STYLEGUIDE.md](file:///.docs/STYLEGUIDE.md) và [IDEA.md](file:///.docs/IDEA.md):

### Bảng màu và các Class Tailwind áp dụng
*   **Nút Thanh toán (CTA):** `bg-orange-600 hover:bg-orange-700 text-white transition-colors duration-200 font-semibold w-full py-3 rounded-lg shadow-lg` (Màu chốt sale duy nhất).
*   **Màu nền Drawer:** Glassmorphism (`bg-white/80 backdrop-blur-md border-l border-slate-200/50`).
*   **Nền che trang web (Backdrop):** `bg-black/40 backdrop-blur-sm transition-opacity duration-300`.
*   **Nút phụ (Xóa, Đóng):** `text-slate-400 hover:text-slate-600 transition-colors` hoặc `bg-slate-100 hover:bg-slate-200`.
*   **Giá hiện tại:** `text-red-600 font-bold`.
*   **Giá cũ:** `text-slate-400 line-through text-sm`.
*   **Phí giao hàng:** `text-green-600 font-medium` (Hiển thị chữ "Miễn phí").

### Hiệu ứng Animation (CSS Transitions / Framer Motion nếu được phép)
*   **Drawer Slide:** Sử dụng Tailwind classes:
    *   Trạng thái đóng: `translate-x-full`
    *   Trạng thái mở: `translate-x-0`
    *   Transition: `transition-transform duration-300 ease-in-out`
*   **Backdrop Fade:**
    *   Trạng thái đóng: `opacity-0 pointer-events-none`
    *   Trạng thái mở: `opacity-100 pointer-events-auto`
    *   Transition: `transition-opacity duration-300`

---

## 4. Luồng xử lý nghiệp vụ (Business Logic Flow)

### 4.1. Thêm vào giỏ (Add to Cart)
1.  Người dùng bấm "Thêm vào giỏ" trên `ProductCard`.
2.  Kiểm tra nếu sản phẩm đã có trong giỏ hàng:
    *   Nếu tổng số lượng sau khi thêm vượt quá `stock` -> Hiển thị Toast cảnh báo hết hàng/đạt giới hạn.
    *   Nếu hợp lệ -> Tăng số lượng lên 1.
3.  Nếu sản phẩm chưa có trong giỏ hàng -> Thêm mới với `quantity: 1`.
4.  Kích hoạt hiển thị Toast thông báo thành công ở góc trên cùng màn hình.
5.  Tự động mở `CartDrawer` để người dùng thấy sản phẩm đã được cập nhật.

### 4.2. Cập nhật số lượng (Quantity Control)
*   Nút `[-]` giảm số lượng. Nếu số lượng về `0`, kích hoạt hành động xóa sản phẩm khỏi giỏ (hoặc hỏi xác nhận).
*   Nút `[+]` tăng số lượng. Vô hiệu hóa (disable) nút `[+]` nếu `quantity === stock` để đảm bảo không vượt quá tồn kho hiện tại.

### 4.3. Phần Tổng kết & Sticky Bottom
*   Vùng chứa danh sách các `CartItem` được cấu trúc cuộn độc lập (`overflow-y-auto max-h-[calc(100vh-280px)]` hoặc tương đương).
*   Phần Tạm tính, Phí giao hàng ("Miễn phí") và nút CTA "Thanh Toán" được ghim cố định ở đáy Drawer (`sticky bottom-0 bg-white border-t border-slate-100 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]`).

---

## 5. Các bước triển khai chi tiết (Implementation Steps)

### Bước 1: Setup State Management & Toast Component
*   Tạo `cart-context.tsx` để xử lý logic thêm/sửa/xóa sản phẩm và lưu trạng thái giỏ hàng vào `localStorage` (hỗ trợ lưu trữ tạm thời trước khi tích hợp với DB ở Backend).
*   Tạo Component `Toast` và custom hook `useToast` để phục vụ thông báo thêm sản phẩm thành công.

### Bước 2: Xây dựng UI Components cơ bản
*   `QuantityCounter`: Nút bấm [-] và [+] với validation theo `stock`.
*   `CartItemRow`: Thiết kế dòng sản phẩm với ảnh thumbnail tỉ lệ 1:1, thông tin giá cả và nút xóa.

### Bước 3: Phát triển CartDrawer Component
*   Xây dựng cấu trúc layout Drawer: Header (Tiêu đề & nút Đóng), Body (Danh sách cuộn), Footer (Sticky tổng tiền & nút Thanh toán).
*   Thêm hiệu ứng transition mở rộng từ cạnh phải và hiệu ứng blur mờ màn hình nền khi Drawer hoạt động.
*   Bắt sự kiện click bên ngoài Drawer (click-outside) để đóng giỏ hàng.

### Bước 4: Xây dựng Trang chủ demo & ProductCard
*   Tải danh sách sản phẩm mẫu (Mock Products) với các trạng thái khác nhau (còn hàng, hết hàng, giảm giá).
*   Thiết kế `ProductCard` chuẩn theo [STYLEGUIDE.md](file:///.docs/STYLEGUIDE.md) (tỷ lệ ảnh 1:1, badge giảm giá, badge "Out of Stock", badge "New").
*   Hiển thị Grid sản phẩm responsive trên mobile (2 cột), tablet (3 cột), và desktop (4-5 cột).

---

## 6. Kế hoạch xác minh & Kiểm thử (Verification Plan)

### Kiểm thử thủ công (Manual Verification)
1.  **Kiểm tra tính năng Drawer:** Bấm vào icon Giỏ hàng trên Header xem Drawer có trượt ra mượt mà và nền trang web có bị mờ/tối đi không. Click vào backdrop xem Drawer có đóng lại không.
2.  **Kiểm tra thêm sản phẩm:** Bấm "Thêm vào giỏ" trên thẻ sản phẩm. Đảm bảo Toast hiện lên lập tức và Drawer trượt ra hiển thị sản phẩm vừa thêm.
3.  **Kiểm tra bộ đếm số lượng:**
    *   Tăng số lượng lên và xem tổng tiền thay đổi tương ứng.
    *   Tăng đến khi đạt `stock` của sản phẩm đó, nút `[+]` phải bị disabled.
    *   Giảm số lượng về 0, sản phẩm phải tự động bị xóa khỏi giỏ hàng.
4.  **Kiểm tra giao diện Responsive:** Co giãn trình duyệt từ kích thước Mobile (375px) đến Desktop (1440px) để kiểm tra layout grid sản phẩm và kích thước Drawer.
