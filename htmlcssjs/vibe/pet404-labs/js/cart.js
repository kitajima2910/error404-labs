// Cart Functionality with localStorage
class Cart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartCount();
  }

  // Load cart from localStorage
  loadCart() {
    const savedCart = localStorage.getItem('pet404_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem('pet404_cart', JSON.stringify(this.items));
    this.updateCartCount();
  }

  // Add item to cart
  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    this.saveCart();
    this.showNotification('Đã thêm vào giỏ hàng!');
  }

  // Remove item from cart
  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.renderCart();
  }

  // Update item quantity
  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
        this.renderCart();
      }
    }
  }

  // Get total items count
  getItemCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Get total price
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Update cart count badge
  updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      const count = this.getItemCount();
      cartCount.textContent = count;
      cartCount.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Render cart items
  renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;

    if (this.items.length === 0) {
      cartItems.innerHTML = `
        <div class="cart-empty">
          <i class='bx bx-cart'></i>
          <p>Giỏ hàng trống</p>
        </div>
      `;
    } else {
      cartItems.innerHTML = this.items.map(item => `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p class="price">${formatPrice(item.price)}</p>
            <div class="cart-item-quantity">
              <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
          </div>
          <button class="cart-item-remove" onclick="cart.removeItem(${item.id})">
            <i class='bx bx-trash'></i>
          </button>
        </div>
      `).join('');
    }

    if (cartTotal) {
      cartTotal.textContent = formatPrice(this.getTotalPrice());
    }
  }

  // Show notification
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <i class='bx bx-check-circle'></i>
      <span>${message}</span>
    `;
    notification.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--primary-dark);
      color: white;
      padding: 15px 25px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      z-index: 3000;
      animation: slideIn 0.3s ease;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Clear cart
  clear() {
    this.items = [];
    this.saveCart();
  }
}

// Initialize cart
const cart = new Cart();
