// Product Data
const products = [
  {
    id: 1,
    name: "Thức Ăn Hạt Cao Cấp Cho Chó",
    category: "Thức Ăn",
    price: 450000,
    originalPrice: 550000,
    rating: 4.8,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
    badge: "Bán Chạy",
    description: "Thức ăn hạt cao cấp với công thức dinh dưỡng đặc biệt, giàu protein và vitamin giúp chó con phát triển khỏe mạnh. Sản phẩm được nhập khẩu từ Mỹ với chất lượng đảm bảo."
  },
  {
    id: 2,
    name: "Pate Mèo Vị Cá Ngừ & Gà",
    category: "Thức Ăn",
    price: 35000,
    originalPrice: 45000,
    rating: 4.9,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
    badge: "Mới",
    description: "Pate mèo thơm ngon với vị cá ngừ và gà tươi, bổ sung đầy đủ dưỡng chất cho mèo cưng. Không chứa chất bảo quản độc hại."
  },
  {
    id: 3,
    name: "Vòng Cổ Chống Rận Cho Chó",
    category: "Phụ Kiện",
    price: 180000,
    originalPrice: 220000,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
    badge: null,
    description: "Vòng cổ chống rận hiệu quả lên đến 8 tháng, bảo vệ chó cưng khỏi ve rận và các loại ký sinh trùng khác. An toàn cho thú cưng."
  },
  {
    id: 4,
    name: "Cát Vệ Sinh Cho Mèo Tofu",
    category: "Vệ Sinh",
    price: 120000,
    originalPrice: 150000,
    rating: 4.6,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop",
    badge: "Giảm Giá",
    description: "Cát vệ sinh làm từ đậu phụ tự nhiên, vón cục tốt, khử mùi hiệu quả. An toàn cho mèo và thân thiện với môi trường."
  },
  {
    id: 5,
    name: "Đồ Chơi Gặm Sạch Răng Cho Chó",
    category: "Đồ Chơi",
    price: 85000,
    originalPrice: 100000,
    rating: 4.5,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1535930891776-0c2dfb7cfb1f?w=400&h=400&fit=crop",
    badge: null,
    description: "Đồ chơi gặm giúp làm sạch răng và massage nướu cho chó. Làm từ cao su tự nhiên, bền và an toàn."
  },
  {
    id: 6,
    name: "Nhà Vệ Sinh Tự Động Cho Mèo",
    category: "Vệ Sinh",
    price: 2500000,
    originalPrice: 3200000,
    rating: 4.9,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400&h=400&fit=crop",
    badge: "Cao Cấp",
    description: "Nhà vệ sinh tự động thông minh với cảm biến hoạt động, tự động dọn dẹp sau khi mèo sử dụng. Tiết kiệm thờigian cho chủ nhân."
  },
  {
    id: 7,
    name: "Sữa Tắm Khô Cho Thú Cưng",
    category: "Chăm Sóc",
    price: 95000,
    originalPrice: 120000,
    rating: 4.4,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=400&fit=crop",
    badge: null,
    description: "Sữa tắm khô không cần nước, tiện lợi khi thú cưng không thể tắm ướt. Hương thơm dịu nhẹ, làm sạch hiệu quả."
  },
  {
    id: 8,
    name: "Balo Vận Chuyển Chó Mèo",
    category: "Phụ Kiện",
    price: 350000,
    originalPrice: 420000,
    rating: 4.7,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop",
    badge: "Hot",
    description: "Balo vận chuyển thú cưng thiết kế thông thoáng, có lưới quan sát và đệm êm ái. Phù hợp cho chó mèo dưới 8kg."
  }
];

// Best Seller Products (subset of products)
const bestSellers = [products[0], products[1], products[3], products[5], products[7]];

// Format price to VND
function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price);
}

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="bx bxs-star"></i>';
  }
  
  if (hasHalfStar) {
    starsHTML += '<i class="bx bxs-star-half"></i>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="bx bx-star"></i>';
  }
  
  return starsHTML;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, bestSellers, formatPrice, generateStars };
}
