# KẾ HOẠCH TRIỂN KHAI FRONTEND: GIỎ HÀNG TRƯỢT (SLIDE-OUT CART DRAWER)

---

## 1. PHÂN RÃ COMPONENT (COMPONENT TREE)

Cấu trúc phân rã các component cho tính năng Giỏ Hàng Trượt được tổ chức theo mô hình phân tách rõ ràng giữa Smart (Logic) và Dumb (Presentational) Components:

```text
apps/frontend/components/cart/
└── CartDrawerContainer [SMART]
    ├── Backdrop [DUMB] (Shared UI)
    └── DrawerContent [DUMB]
        ├── DrawerHeader [DUMB]
        │   └── CloseButton [DUMB] (Shared UI)
        ├── CartItemList [DUMB]
        │   ├── EmptyCartState [DUMB]
        │   └── CartItemRow [DUMB]
        │       ├── ProductThumbnail [DUMB] (Shared UI)
        │       └── QuantityCounter [DUMB] (Shared UI)
        └── DrawerFooter [DUMB]
            ├── SummaryInfo [DUMB]
            └── CheckoutButton [DUMB] (Shared UI)
```

### Phân loại chi tiết và Vai trò:
*   **`CartDrawerContainer` [SMART]**:
    *   *Vai trò:* Kết nối với State Management (Zustand/React Context) để lấy dữ liệu giỏ hàng (`cartItems`, `totalPrice`) và trạng thái đóng/mở (`isOpen`). Xử lý gọi API đồng bộ giỏ hàng và xử lý các hàm callback: `onAdd`, `onRemove`, `onUpdateQuantity`, `onCheckout`.
*   **`Backdrop` [DUMB] (Shared UI)**:
    *   *Vai trò:* Hiển thị lớp phủ làm mờ và tối nền trang web bên dưới, nhận sự kiện `onClick` để đóng Drawer.
*   **`DrawerContent` [DUMB]**:
    *   *Vai trò:* Khung chứa chính cho nội dung Drawer, xử lý hiệu ứng trượt (slide-in/out).
*   **`DrawerHeader` [DUMB]**:
    *   *Vai trò:* Hiển thị tiêu đề giỏ hàng, số lượng vật phẩm tổng quan và chứa nút đóng.
*   **`CartItemList` [DUMB]**:
    *   *Vai trò:* Render danh sách các dòng sản phẩm, hỗ trợ cuộn độc lập (`overflow-y-auto`).
*   **`EmptyCartState` [DUMB]**:
    *   *Vai trò:* Hiển thị giao diện trống khi không có sản phẩm nào trong giỏ hàng.
*   **`CartItemRow` [DUMB]**:
    *   *Vai trò:* Hiển thị chi tiết từng sản phẩm trong giỏ (ảnh thumbnail, tên, giá bán, giá gốc, số lượng).
*   **`ProductThumbnail` [DUMB] (Shared UI)**:
    *   *Vai trò:* Hiển thị ảnh sản phẩm tỷ lệ 1:1, xử lý ảnh fallback và nền xám nếu ảnh trong suốt.
*   **`QuantityCounter` [DUMB] (Shared UI)**:
    *   *Vai trò:* Bộ đếm tăng/giảm số lượng với các nút `[+]` và `[-]`.
*   **`DrawerFooter` [DUMB]**:
    *   *Vai trò:* Phần ghim cố định ở đáy, hiển thị chi tiết tạm tính, phí giao hàng và nút thanh toán.
*   **`CheckoutButton` [DUMB] (Shared UI)**:
    *   *Vai trò:* Nút CTA chính thực hiện chuyển hướng đến trang thanh toán.

---

## 2. QUẢN LÝ TRẠNG THÁI (STATE MANAGEMENT)

Hệ thống quản lý trạng thái của tính năng này được chia làm các cấp độ lưu trữ tối ưu:

| Tên State | Kiểu dữ liệu | Phạm vi lưu trữ | Chiến lược lưu trữ & Lý do |
| :--- | :--- | :--- | :--- |
| `cartItems` | `CartItem[]` | Global State | **Zustand** (hoặc React Context) + Sync qua LocalStorage / API.<br>Lý do: Giỏ hàng cần truy cập và cập nhật từ nhiều trang (Product Detail, Product Grid, Header Icon). |
| `isDrawerOpen` | `boolean` | Global State | **Zustand**.<br>Lý do: Bất kỳ hành động "Thêm vào giỏ" ở trang chi tiết sản phẩm hay danh sách sản phẩm đều cần tự động kích hoạt mở Drawer này. |
| `isUpdatingItemId`| `string \| null` | Local State | `useState` tại `CartDrawerContainer`.<br>Lý do: Trạng thái loading tạm thời khi gọi API tăng/giảm số lượng hoặc xóa cho riêng từng item cụ thể để tránh double-trigger. |
| `isCheckingOut` | `boolean` | Local State | `useState` tại `CartDrawerContainer`.<br>Lý do: Trạng thái disable nút Checkout khi đang xử lý tạo phiên giao dịch thanh toán. |

> [!NOTE]
> **URL Query Parameters:** Đối với Cart Drawer, **không** sử dụng URL Query Parameters. Do Drawer là một overlay tương tác nhanh và tạm thời, không phải là một trang tài nguyên độc lập cần chia sẻ liên kết (share link). Việc đẩy trạng thái Drawer lên URL sẽ gây ô nhiễm lịch sử duyệt web (Browser History) của người dùng khi đóng/mở giỏ hàng nhiều lần.

---

## 3. CẤU TRÚC DỮ LIỆU (DATA INTERFACES)

Định nghĩa cấu trúc dữ liệu và Props cho các Component (Tuyệt đối không dùng kiểu `any`):

```typescript
// Định nghĩa cấu trúc sản phẩm trong giỏ hàng
export interface CartItem {
  id: string;
  name: string;
  price: number;            // Giá bán hiện tại (đã áp dụng salePrice)
  originalPrice?: number;   // Giá gốc (dùng để gạch ngang nếu có giảm giá)
  quantity: number;
  thumbnail: string;
  stock: number;            // Tồn kho tối đa của sản phẩm
}

// Props cho component giỏ hàng tổng thể
export interface CartDrawerProps {
  isOpen: boolean;
  cartItems: CartItem[];
  totalPrice: number;
  shippingFee: number;      // 0 biểu thị miễn phí giao hàng
  isUpdatingItemId: string | null;
  isCheckingOut: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

// Props cho từng dòng sản phẩm trong giỏ hàng
export interface CartItemRowProps {
  item: CartItem;
  isUpdating: boolean;
  onUpdateQuantity: (newQuantity: number) => void;
  onRemove: () => void;
}

// Props cho bộ đếm số lượng
export interface QuantityCounterProps {
  quantity: number;
  stock: number;
  isDisabled?: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
}

// Props cho phần hiển thị tổng kết tiền
export interface SummaryInfoProps {
  totalPrice: number;
  shippingFee: number;
}
```
