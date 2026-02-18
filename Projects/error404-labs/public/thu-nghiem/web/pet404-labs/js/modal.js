// Modal Functionality
class ProductModal {
  constructor() {
    this.modal = document.getElementById('product-modal');
    this.modalBody = document.getElementById('modal-body');
    this.closeBtn = document.getElementById('modal-close');

    this.initEventListeners();
  }

  initEventListeners() {
    // Close modal when clicking close button
    this.closeBtn?.addEventListener('click', () => this.close());

    // Close modal when clicking outside
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(product) {
    if (!this.modal || !this.modalBody) return;

    this.modalBody.innerHTML = `
      <div class="modal-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="modal-info">
        <span class="modal-category">${product.category}</span>
        <h2 class="modal-title">${product.name}</h2>
        <div class="modal-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span class="count">(${product.reviews} đánh giá)</span>
        </div>
        <div class="modal-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <p class="modal-desc">${product.description}</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" onclick="modal.close()">Đóng</button>
          <button class="btn btn-primary" onclick="cart.addItem(products.find(p => p.id === ${product.id})); modal.close();">
            <i class='bx bx-cart'></i> Thêm vào giỏ
          </button>
        </div>
      </div>
    `;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;

    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize modal
const modal = new ProductModal();
