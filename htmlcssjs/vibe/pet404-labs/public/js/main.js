// Main Application Logic

document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initHeader();
  renderProducts();
  renderBestSellers();
  initCarousel();
  initCartSidebar();
  initSearchOverlay();
  initScrollAnimations();
  initMobileMenu();
  initAccountDropdown();
  // Initialize auth manager (client-side mock)
  if (window.auth && typeof window.auth.init === "function") {
    window.auth.init();
  }
});

// Header scroll effect + active nav on scroll
function initHeader() {
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-list a");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    // Scrolled class
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

    // Active nav based on scroll position
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// Render products grid
function renderProducts() {
  const grid = document.getElementById("products-grid");
  if (!grid) return;

  grid.innerHTML = products
    .map(
      (product) => `
    <div class="product-card">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="product-wishlist" onclick="toggleWishlist(this)">
          <i class='bx bx-heart'></i>
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${generateStars(product.rating)}</span>
          <span class="count">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ""}
        </div>
        <div class="product-actions">
          <button class="btn btn-view" onclick="modal.open(products.find(p => p.id === ${product.id}))">
            Xem chi tiết
          </button>
          <button class="btn btn-add" onclick="cart.addItem(products.find(p => p.id === ${product.id}))">
            <i class='bx bx-cart-add'></i> Thêm
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Render best sellers carousel
function renderBestSellers() {
  const track = document.getElementById("carousel-track");
  if (!track) return;

  track.innerHTML = bestSellers
    .map(
      (product) => `
    <div class="carousel-item">
      <div class="product-card">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        </div>
        <div class="product-info">
          <span class="product-category">${product.category}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-rating">
            <span class="stars">${generateStars(product.rating)}</span>
            <span class="count">(${product.reviews})</span>
          </div>
          <div class="product-price">
            <span class="price-current">${formatPrice(product.price)}</span>
          </div>
          <div class="product-actions">
            <button class="btn btn-view" onclick="modal.open(products.find(p => p.id === ${product.id}))">
              Xem chi tiết
            </button>
            <button class="btn btn-add" onclick="cart.addItem(products.find(p => p.id === ${product.id}))">
              <i class='bx bx-cart-add'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// Horizontal Auto-scroll Carousel
function initCarousel() {
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  if (!track) return;

  // Clone items for seamless loop
  const items = Array.from(track.children);
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  let scrollSpeed = 0.6;
  let currentScroll = 0;
  let isPaused = false;
  let animId;

  function autoScroll() {
    if (!isPaused) {
      currentScroll += scrollSpeed;
      // Reset for seamless loop
      if (currentScroll >= track.scrollWidth / 2) {
        currentScroll = 0;
      }
      track.scrollLeft = currentScroll;
    }
    animId = requestAnimationFrame(autoScroll);
  }

  // Pause on hover
  track.addEventListener("mouseenter", () => {
    isPaused = true;
  });
  track.addEventListener("mouseleave", () => {
    isPaused = false;
  });

  // Manual prev/next
  const SCROLL_STEP = 320;
  prevBtn?.addEventListener("click", () => {
    isPaused = true;
    currentScroll = Math.max(0, currentScroll - SCROLL_STEP);
    track.scrollLeft = currentScroll;
    setTimeout(() => {
      isPaused = false;
    }, 1000);
  });

  nextBtn?.addEventListener("click", () => {
    isPaused = true;
    currentScroll += SCROLL_STEP;
    if (currentScroll >= track.scrollWidth / 2) currentScroll = 0;
    track.scrollLeft = currentScroll;
    setTimeout(() => {
      isPaused = false;
    }, 1000);
  });

  autoScroll();
}

// Cart sidebar toggle
function initCartSidebar() {
  const cartBtn = document.getElementById("cart-btn");
  const cartClose = document.getElementById("cart-close");
  const cartSidebar = document.getElementById("cart-sidebar");
  const cartOverlay = document.getElementById("cart-overlay");

  function openCart() {
    cartSidebar?.classList.add("active");
    cartOverlay?.classList.add("active");
    document.body.style.overflow = "hidden";
    cart.renderCart();
  }

  function closeCart() {
    cartSidebar?.classList.remove("active");
    cartOverlay?.classList.remove("active");
    document.body.style.overflow = "";
  }

  cartBtn?.addEventListener("click", openCart);
  cartClose?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);
}

// Search overlay
function initSearchOverlay() {
  const searchBtn = document.getElementById("search-btn");
  const searchClose = document.getElementById("search-close");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");

  function openSearch() {
    searchOverlay?.classList.add("active");
    setTimeout(() => searchInput?.focus(), 100);
  }

  function closeSearch() {
    searchOverlay?.classList.remove("active");
    if (searchInput) searchInput.value = "";
  }

  searchBtn?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);

  searchOverlay?.addEventListener("click", (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });
}

// Mobile menu
function initMobileMenu() {
  const menuIcon = document.getElementById("menu-icon");
  const closeMenu = document.getElementById("close-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-list a");

  function openMenu() {
    navMenu?.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeMenuFn() {
    navMenu?.classList.remove("active");
    document.body.style.overflow = "";
  }

  menuIcon?.addEventListener("click", openMenu);
  closeMenu?.addEventListener("click", closeMenuFn);

  // Active nav on click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      closeMenuFn();
    });
  });
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  }, observerOptions);

  // Observe elements
  document
    .querySelectorAll(
      ".product-card, .feature-card, .blog-card, .section-title",
    )
    .forEach((el) => {
      el.classList.add("scroll-reveal");
      observer.observe(el);
    });
}

// Account dropdown
function initAccountDropdown() {
  const accountBtn = document.getElementById("account-btn");
  const dropdown = document.getElementById("account-dropdown");
  const logoutBtn = document.getElementById("acct-logout-btn");

  if (!accountBtn || !dropdown) return;

  function openDropdown() {
    dropdown.classList.add("active");
    accountBtn.classList.add("active");
  }

  function closeDropdown() {
    dropdown.classList.remove("active");
    accountBtn.classList.remove("active");
  }

  function toggleDropdown(e) {
    e.stopPropagation();
    if (dropdown.classList.contains("active")) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }

  accountBtn.addEventListener("click", toggleDropdown);

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!accountBtn.contains(e.target) && !dropdown.contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });

  // Logout action (delegates to auth manager)
  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    closeDropdown();
    if (window.auth && typeof window.auth.logout === "function") {
      window.auth.logout();
    } else {
      cart.showNotification("Đã đăng xuất thành công!");
    }
  });

  // Prevent dropdown from closing when clicking inside it
  dropdown.addEventListener("click", (e) => e.stopPropagation());
}

// Wishlist toggle
function toggleWishlist(btn) {
  btn.classList.toggle("active");
  const icon = btn.querySelector("i");

  if (btn.classList.contains("active")) {
    icon.classList.remove("bx-heart");
    icon.classList.add("bxs-heart");
    cart.showNotification("Đã thêm vào yêu thích!");
  } else {
    icon.classList.remove("bxs-heart");
    icon.classList.add("bx-heart");
  }
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
