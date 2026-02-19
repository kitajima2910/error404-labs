class AuthManager {
  constructor() {
    this.usersKey = "pet404_users";
    this.sessionKey = "pet404_user";
    this.users = [];
    this.currentUser = null;

    // VIP Tier Configuration
    this.vipTiers = {
      bronze: { name: "Bronze", minPoints: 0, icon: "🥉", color: "#cd7f32", benefits: ["Giảm 5% mọi đơn hàng", "Tích điểm x1"] },
      silver: { name: "Silver", minPoints: 500, icon: "🥈", color: "#c0c0c0", benefits: ["Giảm 7% mọi đơn hàng", "Freeship đơn từ 200k", "Tích điểm x1.2"] },
      gold: { name: "Gold", minPoints: 1500, icon: "🥇", color: "#fbbf24", benefits: ["Giảm 10% mọi đơn hàng", "Freeship toàn quốc", "Ưu tiên xử lý đơn", "Tích điểm x1.5"] },
      platinum: { name: "Platinum", minPoints: 3000, icon: "💎", color: "#e5e7eb", benefits: ["Giảm 15% mọi đơn hàng", "Freeship + hoàn tiền", "Quà sinh nhật đặc biệt", "Hỗ trợ 24/7 VIP", "Tích điểm x2"] },
      diamond: { name: "Diamond", minPoints: 6000, icon: "👑", color: "#60a5fa", benefits: ["Giảm 20% mọi đơn hàng", "Freeship toàn quốc", "Quà định kỳ", "Giám đốc chăm sóc riêng", "Tích điểm x3", "Early access sản phẩm mới"] }
    };

    // DOM
    this.authModal = null;
    this.loginBtn = null;
    this.accountBtn = null;
    this.accountInitials = null;
    this.accountDropdown = null;
  }

  init() {
    this.authModal = document.getElementById("auth-modal");
    this.loginBtn = document.getElementById("login-btn");
    this.accountBtn = document.getElementById("account-btn");
    this.accountInitials = document.querySelector(".account-initials");
    this.accountDropdown = document.getElementById("account-dropdown");

    this.loginForm = document.getElementById("login-form");
    this.registerForm = document.getElementById("register-form");
    this.authTabs = document.querySelectorAll(".auth-tab");

    this.loadUsers();
    this.loadSession();
    this.bindEvents();
    this.updateHeaderUI();
  }

  loadUsers() {
    try {
      const raw = localStorage.getItem(this.usersKey);
      this.users = raw ? JSON.parse(raw) : this.getDefaultUsers();
      // If no users exist, populate with defaults
      if (this.users.length === 0) {
        this.users = this.getDefaultUsers();
        this.saveUsers();
      }
    } catch (e) {
      this.users = this.getDefaultUsers();
      this.saveUsers();
    }
  }

  getDefaultUsers() {
    return [
      {
        name: "Nguyễn Văn A",
        email: "nguyenvana@pet404.vn",
        password: "123456",
        points: 2450,
        orders: 12,
        wishlist: 5,
        wallet: 2450000,
        coupons: 5,
        tier: "gold"
      },
      {
        name: "Trần Thị B",
        email: "tranthib@pet404.vn",
        password: "123456",
        points: 850,
        orders: 8,
        wishlist: 3,
        wallet: 1250000,
        coupons: 3,
        tier: "silver"
      },
      {
        name: "Admin",
        email: "admin@pet404.vn",
        password: "admin",
        points: 8500,
        orders: 45,
        wishlist: 12,
        wallet: 15000000,
        coupons: 20,
        tier: "diamond"
      },
      {
        name: "Lê Văn C",
        email: "levanc@pet404.vn",
        password: "123456",
        points: 150,
        orders: 2,
        wishlist: 1,
        wallet: 0,
        coupons: 2,
        tier: "bronze"
      }
    ];
  }

  saveUsers() {
    localStorage.setItem(this.usersKey, JSON.stringify(this.users));
  }

  loadSession() {
    try {
      const raw = localStorage.getItem(this.sessionKey);
      if (raw) {
        this.currentUser = JSON.parse(raw);
        // Ensure VIP data exists for existing sessions
        if (this.currentUser) {
          this.currentUser.points = this.currentUser.points ?? 2450;
          this.currentUser.orders = this.currentUser.orders ?? 12;
          this.currentUser.wishlist = this.currentUser.wishlist ?? 5;
          this.currentUser.wallet = this.currentUser.wallet ?? 2450000;
          this.currentUser.coupons = this.currentUser.coupons ?? 5;
          this.currentUser.tier = this.currentUser.tier ?? "gold";
        }
      } else {
        this.currentUser = null;
      }
    } catch (e) {
      this.currentUser = null;
    }
  }

  saveSession() {
    if (this.currentUser) {
      localStorage.setItem(this.sessionKey, JSON.stringify(this.currentUser));
    } else {
      localStorage.removeItem(this.sessionKey);
    }
  }

  bindEvents() {
    // Open modal
    this.loginBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      this.openModal("login");
    });

    // Tabs
    this.authTabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Close
    document
      .getElementById("auth-modal-close")
      ?.addEventListener("click", () => this.closeModal());
    this.authModal?.addEventListener("click", (e) => {
      if (e.target === this.authModal) this.closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
    });

    // Forms
    this.loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document
        .getElementById("login-email")
        .value.trim()
        .toLowerCase();
      const password = document.getElementById("login-password").value;
      this.login(email, password);
    });

    this.registerForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("register-name").value.trim();
      const email = document
        .getElementById("register-email")
        .value.trim()
        .toLowerCase();
      const password = document.getElementById("register-password").value;
      this.register(name, email, password);
    });

    // Wire logout buttons
    const logoutBtns = [
      document.getElementById("acct-logout-btn"),
      document.getElementById("acct-logout-btn-header")
    ];

    logoutBtns.forEach(btn => {
      btn?.addEventListener("click", (e) => {
        e.preventDefault();
        this.logout();
        if (this.accountDropdown) {
          this.accountDropdown.classList.remove("active");
          this.accountBtn?.classList.remove("active");
        }
      });
    });
  }

  openModal(tab = "login") {
    this.authModal?.classList.add("active");
    document.body.style.overflow = "hidden";
    this.switchTab(tab);
    setTimeout(() => {
      const focusEl =
        tab === "login"
          ? document.getElementById("login-email")
          : document.getElementById("register-name");
      focusEl?.focus();
    }, 150);
  }

  closeModal() {
    this.authModal?.classList.remove("active");
    document.body.style.overflow = "";
  }

  switchTab(tab) {
    this.authTabs.forEach((t) =>
      t.classList.toggle("active", t.dataset.tab === tab),
    );
    this.loginForm?.classList.toggle("active", tab === "login");
    this.registerForm?.classList.toggle("active", tab === "register");
  }

  login(email, password) {
    const user = this.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      window.cart?.showNotification?.("Email hoặc mật khẩu không đúng!");
      return;
    }
    // Include all user data including VIP info
    this.currentUser = {
      name: user.name,
      email: user.email,
      points: user.points || 2450,
      orders: user.orders || 12,
      wishlist: user.wishlist || 5,
      wallet: user.wallet || 2450000,
      coupons: user.coupons || 5,
      tier: user.tier || "gold"
    };
    this.saveSession();
    this.updateHeaderUI();
    window.cart?.showNotification?.(`Chào mừng ${user.name || user.email} đã trở lại! 👋`);
    this.closeModal();
  }

  register(name, email, password) {
    if (this.users.find((u) => u.email === email)) {
      window.cart?.showNotification?.("Email đã tồn tại!");
      return;
    }
    const newUser = {
      name,
      email,
      password,
      points: 0,
      orders: 0,
      wishlist: 0,
      wallet: 0,
      coupons: 3,
      tier: "bronze",
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    this.saveUsers();
    this.currentUser = {
      name,
      email,
      points: 0,
      orders: 0,
      wishlist: 0,
      wallet: 0,
      coupons: 3,
      tier: "bronze"
    };
    this.saveSession();
    this.updateHeaderUI();
    window.cart?.showNotification?.("Đăng ký thành công! 🎉 Bạn nhận được 3 mã giảm giá!");
    this.closeModal();
  }

  logout() {
    this.currentUser = null;
    this.saveSession();
    this.updateHeaderUI();
    window.cart?.showNotification?.("Đã đăng xuất thành công!");
  }

  updateHeaderUI() {
    const loginBtn = document.getElementById("login-btn");
    const accountBtn = document.getElementById("account-btn");
    const acctInitials = document.querySelector(".account-initials");
    const vipBadge = document.getElementById("vip-badge");

    if (this.currentUser) {
      if (loginBtn) loginBtn.style.display = "none";
      if (accountBtn) accountBtn.style.display = "inline-flex";

      const initials = this.currentUser.name
        ? this.currentUser.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
        : (this.currentUser.email || "U").slice(0, 2).toUpperCase();

      // Update initials
      if (acctInitials) acctInitials.textContent = initials;

      // Get VIP tier info
      const points = this.currentUser.points || 0;
      const tier = this.getVipTier(points);
      const nextTier = this.getNextVipTier(points);

      // Update VIP badge visibility
      if (vipBadge) {
        vipBadge.classList.toggle("visible", tier.name !== "Bronze");
        vipBadge.textContent = tier.name;
        vipBadge.style.background = `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`;
      }

      // Update dropdown content
      this.updateDropdownUI(this.currentUser, initials, tier, nextTier);
      this.updateMobileAuthUI(true, this.currentUser, initials);
    } else {
      if (loginBtn) loginBtn.style.display = "inline-block";
      if (accountBtn) accountBtn.style.display = "none";
      this.updateMobileAuthUI(false);
    }
  }

  updateMobileAuthUI(isLoggedIn, user = null, initials = "") {
    const mobileAuthSection = document.getElementById("mobile-auth-section");
    if (!mobileAuthSection) return;

    if (isLoggedIn && user) {
      mobileAuthSection.innerHTML = `
        <div class="mobile-user-info">
          <div class="mobile-avatar">${initials}</div>
          <div class="mobile-user-details">
            <span class="mobile-name">${user.name || user.email}</span>
            <div class="mobile-logout-btn" id="mobile-logout-btn">
              <i class='bx bx-log-out'></i> Đăng xuất
            </div>
          </div>
        </div>
      `;

      document.getElementById("mobile-logout-btn")?.addEventListener("click", () => {
        this.logout();
        // Close mobile menu if active
        document.querySelector(".nav-menu")?.classList.remove("active");
        document.body.style.overflow = "";
      });
    } else {
      mobileAuthSection.innerHTML = `
        <a href="#" class="mobile-login-btn" id="mobile-login-btn-nav">Đăng nhập</a>
      `;
      document.getElementById("mobile-login-btn-nav")?.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal("login");
        document.querySelector(".nav-menu")?.classList.remove("active");
        document.body.style.overflow = "";
      });
    }
  }

  getVipTier(points) {
    const tiers = ["diamond", "platinum", "gold", "silver", "bronze"];
    for (const tier of tiers) {
      if (points >= this.vipTiers[tier].minPoints) {
        return this.vipTiers[tier];
      }
    }
    return this.vipTiers.bronze;
  }

  getNextVipTier(points) {
    const tiers = ["bronze", "silver", "gold", "platinum", "diamond"];
    for (const tier of tiers) {
      if (points < this.vipTiers[tier].minPoints) {
        return this.vipTiers[tier];
      }
    }
    return null; // Already at max tier
  }

  updateDropdownUI(user, initials, tier, nextTier) {
    // Update avatar and initials
    const acctAvatar = document.getElementById("acct-avatar");
    const acctVipIcon = document.getElementById("acct-vip-icon");
    if (acctAvatar) acctAvatar.textContent = initials;
    if (acctVipIcon) {
      acctVipIcon.textContent = tier.icon;
      acctVipIcon.style.background = `linear-gradient(135deg, ${tier.color}, ${tier.color}dd)`;
    }

    // Update name and email
    const acctName = document.getElementById("acct-name");
    const acctEmail = document.getElementById("acct-email");
    if (acctName) acctName.textContent = user.name || user.email;
    if (acctEmail) acctEmail.textContent = user.email || "";

    // Update VIP tier badge
    const acctTier = document.getElementById("acct-tier");
    if (acctTier) {
      acctTier.textContent = `${tier.icon} ${tier.name} Member`;
      acctTier.style.color = tier.color;
      acctTier.style.borderColor = `${tier.color}40`;
      acctTier.style.background = `${tier.color}10`;
    }

    // Update expiration date (mock)
    const acctExpire = document.getElementById("acct-expire");
    if (acctExpire) {
      const expireDate = new Date();
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      acctExpire.textContent = `Hết hạn: ${expireDate.toLocaleDateString("vi-VN")}`;
    }

    // Update VIP progress
    const vipProgressSection = document.getElementById("vip-progress-section");
    const vipCurrent = document.getElementById("vip-current");
    const vipNext = document.getElementById("vip-next");
    const vipProgressFill = document.getElementById("vip-progress-fill");
    const vipRemaining = document.getElementById("vip-remaining");

    if (nextTier) {
      const points = user.points || 0;
      const progress = ((points - tier.minPoints) / (nextTier.minPoints - tier.minPoints)) * 100;
      const remaining = nextTier.minPoints - points;

      if (vipProgressSection) vipProgressSection.style.display = "block";
      if (vipCurrent) {
        vipCurrent.textContent = tier.name;
        vipCurrent.style.color = tier.color;
      }
      if (vipNext) vipNext.textContent = nextTier.name;
      if (vipProgressFill) {
        vipProgressFill.style.width = `${Math.min(progress, 100)}%`;
        vipProgressFill.style.background = `linear-gradient(90deg, ${tier.color}, ${nextTier.color || tier.color})`;
      }
      if (vipRemaining) vipRemaining.textContent = remaining.toLocaleString("vi-VN");
    } else {
      if (vipProgressSection) {
        vipProgressSection.innerHTML = `
          <div class="vip-max-tier">
            <i class='bx bx-crown'></i>
            <span>Bạn đã đạt cấp độ cao nhất! 🎉</span>
          </div>
        `;
      }
    }

    // Update wallet
    const walletBalance = document.getElementById("wallet-balance");
    const walletCoupons = document.getElementById("wallet-coupons");
    if (walletBalance) {
      const balance = user.wallet || 0;
      walletBalance.textContent = `${balance.toLocaleString("vi-VN")}đ`;
    }
    if (walletCoupons) {
      const coupons = user.coupons || 0;
      walletCoupons.textContent = `${coupons} mã`;
    }

    // Update stats
    const statOrders = document.getElementById("stat-orders");
    const statPoints = document.getElementById("stat-points");
    const statWishlist = document.getElementById("stat-wishlist");
    if (statOrders) statOrders.textContent = user.orders || 0;
    if (statPoints) statPoints.textContent = (user.points || 0).toLocaleString("vi-VN");
    if (statWishlist) statWishlist.textContent = user.wishlist || 0;

    // Update menu badges
    const menuBadgeOrders = document.getElementById("menu-badge-orders");
    const menuBadgeWishlist = document.getElementById("menu-badge-wishlist");
    if (menuBadgeOrders) menuBadgeOrders.textContent = user.orders || 0;
    if (menuBadgeWishlist) menuBadgeWishlist.textContent = user.wishlist || 0;

    // Update VIP benefits
    const vipBenefits = document.getElementById("vip-benefits");
    if (vipBenefits) {
      const benefitsList = vipBenefits.querySelector(".vip-benefits-list");
      if (benefitsList) {
        benefitsList.innerHTML = tier.benefits.map(benefit =>
          `<li><i class='bx bx-check'></i> ${benefit}</li>`
        ).join("");
      }
    }
  }
}

// Expose a singleton
window.auth = new AuthManager();
