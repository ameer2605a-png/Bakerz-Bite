/**
 * Bakerz Bite - Main Single Page Application Engine
 * High-performance, accessible vanilla JavaScript controller.
 * Currency: Pakistani Rupees (PKR / Rs.)
 */

(function () {
  'use strict';

  // Global Application State
  const state = {
    theme: localStorage.getItem('bakerz_theme') || 'light',
    visitorCount: parseInt(localStorage.getItem('bakerz_visitor_count') || '14892', 10),
    activeCategory: 'all',
    searchQuery: '',
    sortBy: 'featured',
    selectedDietary: 'all',
    cart: JSON.parse(localStorage.getItem('bakerz_cart') || '[]'),
    appliedCoupon: JSON.parse(localStorage.getItem('bakerz_coupon') || 'null'),
    activeProductModal: null,
    galleryFilter: 'all',
    currentLightboxIndex: 0,
    filteredGalleryItems: [...BAKERY_DATA.gallery],
    reviews: [...BAKERY_DATA.initialReviews],
    userRatingInput: 5,
    userLocation: '📍 Detecting your bakery zone...',
    selectedPaymentMethod: 'card',
    selectedWalletType: 'jazzcash',
    fulfillmentType: 'pickup'
  };

  // Currency Formatter Helper (Strict PKR formatting: Rs. 450, Rs. 1,200, etc.)
  function formatPKR(amount) {
    const num = Math.round(Number(amount) || 0);
    return `Rs. ${num.toLocaleString('en-PK')}`;
  }

  // Cache DOM Elements
  const DOM = {};

  function initCacheDOM() {
    DOM.preloader = document.getElementById('preloader');
    DOM.themeToggle = document.getElementById('themeToggle');
    DOM.themeIcon = document.getElementById('themeIcon');
    DOM.visitorCount = document.getElementById('visitorCountDisplay');
    DOM.header = document.getElementById('mainHeader');
    DOM.mobileMenuToggle = document.getElementById('mobileMenuToggle');
    DOM.navMenu = document.getElementById('mainNav');
    DOM.navLinks = document.querySelectorAll('.nav-link');

    // Catalog & Filters
    DOM.categoryFilterContainer = document.getElementById('categoryFilters');
    DOM.productsGrid = document.getElementById('productsGrid');
    DOM.productSearchInput = document.getElementById('productSearchInput');
    DOM.clearSearchBtn = document.getElementById('clearSearchBtn');
    DOM.productSortSelect = document.getElementById('productSortSelect');
    DOM.dietaryFilters = document.querySelectorAll('.dietary-filter-pill');
    DOM.resultsCount = document.getElementById('productsResultCount');

    // Merchandise Section Specific
    DOM.merchandiseGrid = document.getElementById('merchandiseGrid');

    // Product Modal
    DOM.productModal = document.getElementById('productDetailsModal');
    DOM.productModalBackdrop = document.getElementById('productModalBackdrop');
    DOM.closeProductModalBtn = document.getElementById('closeProductModalBtn');
    DOM.modalProductContent = document.getElementById('modalProductContent');

    // Cart Drawer
    DOM.cartToggleBtn = document.getElementById('cartToggleBtn');
    DOM.cartDrawer = document.getElementById('cartDrawer');
    DOM.cartBackdrop = document.getElementById('cartBackdrop');
    DOM.closeCartBtn = document.getElementById('closeCartBtn');
    DOM.cartItemsList = document.getElementById('cartItemsList');
    DOM.cartCountBadge = document.getElementById('cartCountBadge');
    DOM.cartSubtotal = document.getElementById('cartSubtotal');
    DOM.cartTax = document.getElementById('cartTax');
    DOM.cartDeliveryRow = document.getElementById('cartDeliveryRow');
    DOM.cartDelivery = document.getElementById('cartDelivery');
    DOM.cartDiscountRow = document.getElementById('cartDiscountRow');
    DOM.cartDiscount = document.getElementById('cartDiscount');
    DOM.cartTotal = document.getElementById('cartTotal');
    DOM.couponInput = document.getElementById('cartCouponInput');
    DOM.applyCouponBtn = document.getElementById('applyCouponBtn');
    DOM.couponFeedback = document.getElementById('couponFeedback');
    DOM.proceedCheckoutBtn = document.getElementById('proceedCheckoutBtn');

    // Checkout Modal
    DOM.checkoutModal = document.getElementById('checkoutModal');
    DOM.checkoutBackdrop = document.getElementById('checkoutBackdrop');
    DOM.closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    DOM.checkoutForm = document.getElementById('checkoutForm');
    DOM.checkoutItemsSummary = document.getElementById('checkoutItemsSummary');
    DOM.checkoutTotalAmount = document.getElementById('checkoutTotalAmount');
    DOM.paymentMethodTabs = document.querySelectorAll('.payment-tab-btn');
    DOM.paymentMethodPanels = document.querySelectorAll('.payment-panel');

    // Confirmation Receipt Modal
    DOM.orderSuccessModal = document.getElementById('orderSuccessModal');
    DOM.orderReceiptDetails = document.getElementById('orderReceiptDetails');
    DOM.closeSuccessBtn = document.getElementById('closeSuccessBtn');

    // FAQ & Site Map Modals
    DOM.faqModal = document.getElementById('faqModal');
    DOM.faqBackdrop = document.getElementById('faqBackdrop');
    DOM.closeFaqBtn = document.getElementById('closeFaqBtn');
    DOM.faqContent = document.getElementById('faqContent');
    DOM.sitemapModal = document.getElementById('sitemapModal');
    DOM.sitemapBackdrop = document.getElementById('sitemapBackdrop');
    DOM.closeSitemapBtn = document.getElementById('closeSitemapBtn');

    // Offers & Deals
    DOM.offersContainer = document.getElementById('offersGridContainer');

    // Gallery & Lightbox
    DOM.galleryGrid = document.getElementById('galleryGrid');
    DOM.galleryFilters = document.querySelectorAll('.gallery-filter-pill');
    DOM.lightboxModal = document.getElementById('lightboxModal');
    DOM.lightboxImage = document.getElementById('lightboxImage');
    DOM.lightboxCaption = document.getElementById('lightboxCaption');
    DOM.lightboxCounter = document.getElementById('lightboxCounter');
    DOM.lightboxClose = document.getElementById('lightboxClose');
    DOM.lightboxPrev = document.getElementById('lightboxPrev');
    DOM.lightboxNext = document.getElementById('lightboxNext');

    // Reviews & Feedback
    DOM.reviewsList = document.getElementById('reviewsList');
    DOM.avgRatingScore = document.getElementById('avgRatingScore');
    DOM.totalReviewsCount = document.getElementById('totalReviewsCount');
    DOM.starsOverallContainer = document.getElementById('starsOverallContainer');
    DOM.feedbackForm = document.getElementById('feedbackForm');
    DOM.starRatingPicker = document.getElementById('starRatingPicker');
    DOM.ratingScoreValue = document.getElementById('ratingScoreValue');

    // Contact Form
    DOM.contactForm = document.getElementById('contactForm');
    DOM.contactAlert = document.getElementById('contactAlert');

    // Geolocation Ticker
    DOM.liveTimeTicker = document.getElementById('liveTimeTicker');
    DOM.liveDateTicker = document.getElementById('liveDateTicker');
    DOM.liveLocationTicker = document.getElementById('liveLocationTicker');

    // Toast Container
    DOM.toastContainer = document.getElementById('toastContainer');
  }

  /* ==========================================================================
     1. PRELOADER & INITIALIZATION
     ========================================================================== */
  function setupPreloader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        dismissPreloader();
      }, 700);
    });

    // Fallback safety timeout
    setTimeout(() => {
      dismissPreloader();
    }, 2200);
  }

  function dismissPreloader() {
    if (DOM.preloader && DOM.preloader.style.display !== 'none') {
      DOM.preloader.classList.add('fade-out');
      setTimeout(() => {
        DOM.preloader.style.display = 'none';
      }, 600);
    }
  }

  /* ==========================================================================
     2. THEME CONTROLS (LIGHT / DARK)
     ========================================================================== */
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bakerz_theme', theme);

    if (DOM.themeToggle) {
      DOM.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Warm Cream' : 'Dark Cocoa'} mode`);
      DOM.themeToggle.setAttribute('title', `Switch to ${theme === 'dark' ? 'Warm Cream' : 'Dark Cocoa'} mode`);
    }

    if (DOM.themeIcon) {
      if (theme === 'dark') {
        // Sun icon for switching back to warm cream light mode
        DOM.themeIcon.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
      } else {
        // Moon icon for dark mode
        DOM.themeIcon.innerHTML = `
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
      }
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`Switched to ${nextTheme === 'dark' ? 'Dark Cocoa 🍫' : 'Warm Cream 🥛'} mode`);
  }

  /* ==========================================================================
     3. VISITOR COUNTER
     ========================================================================== */
  function initVisitorCounter() {
    state.visitorCount += Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('bakerz_visitor_count', state.visitorCount.toString());
    renderVisitorCounter();

    // Realistic live pulse simulation
    setInterval(() => {
      if (Math.random() > 0.55) {
        state.visitorCount += 1;
        localStorage.setItem('bakerz_visitor_count', state.visitorCount.toString());
        renderVisitorCounter();
      }
    }, 25000);
  }

  function renderVisitorCounter() {
    if (DOM.visitorCount) {
      DOM.visitorCount.textContent = state.visitorCount.toLocaleString('en-PK');
    }
  }

  /* ==========================================================================
     4. HEADER, NAVIGATION & SCROLLSPY
     ========================================================================== */
  function setupNavigation() {
    // Glassmorphic header scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 35) {
        DOM.header?.classList.add('scrolled');
      } else {
        DOM.header?.classList.remove('scrolled');
      }
    }, { passive: true });

    // Mobile Hamburger Toggle
    if (DOM.mobileMenuToggle && DOM.navMenu) {
      DOM.mobileMenuToggle.addEventListener('click', () => {
        const isOpen = DOM.navMenu.classList.toggle('open');
        DOM.mobileMenuToggle.classList.toggle('active', isOpen);
        DOM.mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    // Smooth internal scrolling for all 7 sections
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            const headerOffset = (document.getElementById('mainHeader')?.offsetHeight || 60) + 8;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Update active states
            DOM.navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close mobile menu
            if (DOM.navMenu && DOM.navMenu.classList.contains('open')) {
              DOM.navMenu.classList.remove('open');
              DOM.mobileMenuToggle?.classList.remove('active');
              DOM.mobileMenuToggle?.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    });

    setupScrollspy();
  }

  function setupScrollspy() {
    const sectionIds = ['home', 'menu', 'offers', 'gallery', 'merchandise', 'about', 'contact'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -65% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = `#${entry.target.getAttribute('id')}`;
          DOM.navLinks.forEach(link => {
            if (link.getAttribute('href') === currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
  }

  /* ==========================================================================
     5. PRODUCT CATALOG, SEARCH & FILTERS
     ========================================================================== */
  function renderCategoryButtons() {
    if (!DOM.categoryFilterContainer) return;

    DOM.categoryFilterContainer.innerHTML = BAKERY_DATA.categories.map(cat => {
      const isActive = cat.id === state.activeCategory ? 'active' : '';
      return `
        <button type="button" class="category-btn ${isActive}" data-category="${cat.id}">
          <span class="cat-icon">${getCategoryIconSvg(cat.icon)}</span>
          <span class="cat-label">${cat.name}</span>
        </button>
      `;
    }).join('');

    DOM.categoryFilterContainer.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.categoryFilterContainer.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.getAttribute('data-category');
        renderProducts();
      });
    });
  }

  function getCategoryIconSvg(iconName) {
    switch (iconName) {
      case 'cake':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M12 4v3"/><circle cx="12" cy="3" r="1"/></svg>`;
      case 'croissant':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="m4.6 13.4 3-3a6 6 0 0 1 8.8 0l3 3a4 4 0 1 1-5.7 5.6L12 17.3l-1.7 1.7a4 4 0 1 1-5.7-5.6z"/></svg>`;
      case 'cookie':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="10" cy="8" r="1.5"/><circle cx="15" cy="11" r="1"/><circle cx="9" cy="14" r="1.5"/><circle cx="14" cy="16" r="1"/></svg>`;
      case 'pie':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10H12V2z"/></svg>`;
      case 'coffee':
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`;
      default:
        return `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
    }
  }

  function getFilteredProducts() {
    let list = [...BAKERY_DATA.products];

    // Filter by Category
    if (state.activeCategory !== 'all') {
      list = list.filter(item => item.category === state.activeCategory);
    }

    // Filter by Search Query
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      list = list.filter(item => {
        return (
          item.name.toLowerCase().includes(q) ||
          item.shortDesc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.ingredients.some(ing => ing.toLowerCase().includes(q))
        );
      });
    }

    // Filter by Dietary Pill
    if (state.selectedDietary !== 'all') {
      const diet = state.selectedDietary;
      list = list.filter(item => {
        if (diet === 'nut-free') {
          return item.dietary.some(d => d.toLowerCase().includes('nut-free')) ||
                 item.allergens.every(a => !a.toLowerCase().includes('nut'));
        }
        if (diet === 'vegetarian') {
          return item.dietary.some(d => d.toLowerCase().includes('vegetarian'));
        }
        if (diet === 'best-seller') {
          return item.badge && item.badge.toLowerCase().includes('seller');
        }
        return true;
      });
    }

    // Sort order
    switch (state.sortBy) {
      case 'price-low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        break;
    }

    return list;
  }

  function renderProducts() {
    if (!DOM.productsGrid) return;
    const items = getFilteredProducts();

    if (DOM.resultsCount) {
      DOM.resultsCount.textContent = `Showing ${items.length} artisan delight${items.length === 1 ? '' : 's'}`;
    }

    if (items.length === 0) {
      DOM.productsGrid.innerHTML = `
        <div class="empty-products-state">
          <div class="empty-icon">🥐</div>
          <h3>No freshly baked matches found</h3>
          <p>Try clearing your keyword filters or browse another category to explore our oven-fresh bakes.</p>
          <button type="button" class="btn btn-outline" id="resetCatalogFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetCatalogFiltersBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.activeCategory = 'all';
          state.searchQuery = '';
          state.selectedDietary = 'all';
          if (DOM.productSearchInput) DOM.productSearchInput.value = '';
          renderCategoryButtons();
          renderProducts();
        });
      }
      return;
    }

    DOM.productsGrid.innerHTML = items.map(product => {
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <div class="product-quick-overlay">
              <button type="button" class="btn btn-quick-view" data-product-id="${product.id}" aria-label="Quick view of ${product.name}">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Quick View
              </button>
            </div>
          </div>
          <div class="product-content">
            <div class="product-meta-header">
              <span class="product-cat-tag">${formatCategoryName(product.category)}</span>
              <div class="product-rating" title="${product.rating} stars out of 5">
                <span class="star-icon">★</span>
                <span class="rating-num">${product.rating}</span>
                <span class="review-count">(${product.reviewCount})</span>
              </div>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.shortDesc}</p>
            
            <div class="product-card-footer">
              <div class="product-price">${formatPKR(product.price)}</div>
              <div class="product-actions-inline">
                <button type="button" class="btn-icon-btn btn-view-details" data-product-id="${product.id}" title="View Details & Ingredients" aria-label="View details for ${product.name}">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                </button>
                <button type="button" class="btn btn-sm btn-outline btn-order-direct" data-product-id="${product.id}" title="Direct Order / Pay">
                  Order Now
                </button>
                <button type="button" class="btn btn-sm btn-primary btn-add-to-cart" data-product-id="${product.id}" title="Add to Basket">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                  Add
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners on generated cards
    DOM.productsGrid.querySelectorAll('.btn-quick-view, .btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-product-id');
        openProductModal(id);
      });
    });

    DOM.productsGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const id = card.getAttribute('data-id');
          openProductModal(id);
        }
      });
    });

    DOM.productsGrid.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-product-id');
        addToCart(id, 1);
      });
    });

    DOM.productsGrid.querySelectorAll('.btn-order-direct').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-product-id');
        addToCart(id, 1, false);
        openCheckoutModal();
      });
    });
  }

  function renderMerchandiseSection() {
    if (!DOM.merchandiseGrid) return;

    const merchItems = BAKERY_DATA.products.filter(p => p.category === 'merchandise');
    DOM.merchandiseGrid.innerHTML = merchItems.map(item => `
      <div class="product-card" data-id="${item.id}">
        <div class="product-image-wrap">
          <img src="${item.image}" alt="${item.name}" class="product-img" loading="lazy">
          <span class="product-badge">${item.badge || 'Official Merch'}</span>
        </div>
        <div class="product-content">
          <div class="product-meta-header">
            <span class="product-cat-tag">Boutique Merch</span>
            <div class="product-rating">
              <span class="star-icon">★</span>
              <span class="rating-num">${item.rating}</span>
              <span class="review-count">(${item.reviewCount})</span>
            </div>
          </div>
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.shortDesc}</p>
          <div class="product-card-footer">
            <div class="product-price">${formatPKR(item.price)}</div>
            <div class="product-actions-inline">
              <button type="button" class="btn btn-sm btn-outline btn-order-direct" data-product-id="${item.id}">
                Order Now
              </button>
              <button type="button" class="btn btn-sm btn-primary btn-add-to-cart" data-product-id="${item.id}">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    DOM.merchandiseGrid.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          const id = card.getAttribute('data-id');
          openProductModal(id);
        }
      });
    });

    DOM.merchandiseGrid.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-product-id');
        addToCart(id, 1);
      });
    });

    DOM.merchandiseGrid.querySelectorAll('.btn-order-direct').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-product-id');
        addToCart(id, 1, false);
        openCheckoutModal();
      });
    });
  }

  function formatCategoryName(cat) {
    switch (cat) {
      case 'cakes': return 'Signature Cake';
      case 'pastries': return 'Artisan Pastry';
      case 'cookies': return 'Fresh Cookie';
      case 'pies': return 'Rustic Pie';
      case 'merchandise': return 'Boutique Merch';
      default: return 'Specialty';
    }
  }

  function filterByCategory(catId) {
    state.activeCategory = catId;
    renderCategoryButtons();
    renderProducts();
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function setupCatalogControls() {
    const merchBtn = document.getElementById('viewMerchCategoryBtn');
    if (merchBtn) {
      merchBtn.addEventListener('click', () => {
        filterByCategory('merchandise');
      });
    }

    if (DOM.productSearchInput) {
      DOM.productSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim();
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderProducts();
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.productSearchInput.value = '';
        state.searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        renderProducts();
      });
    }

    if (DOM.productSortSelect) {
      DOM.productSortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    if (DOM.dietaryFilters) {
      DOM.dietaryFilters.forEach(pill => {
        pill.addEventListener('click', () => {
          DOM.dietaryFilters.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          state.selectedDietary = pill.getAttribute('data-diet');
          renderProducts();
        });
      });
    }
  }

  /* ==========================================================================
     6. PRODUCT DETAILS & PURE INGREDIENT MODAL
     ========================================================================== */
  function openProductModal(productId) {
    const product = BAKERY_DATA.products.find(p => p.id === productId);
    if (!product || !DOM.productModal) return;

    state.activeProductModal = product;
    let modalQty = 1;

    const allergensList = product.allergens.map(a => `<span class="allergen-pill">${a}</span>`).join('');
    const dietaryList = product.dietary.map(d => `<span class="dietary-badge">${d}</span>`).join('');
    const ingredientsList = product.ingredients.map(ing => `
      <li class="ingredient-item">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        <span>${ing}</span>
      </li>
    `).join('');

    DOM.modalProductContent.innerHTML = `
      <div class="modal-product-grid">
        <div class="modal-product-media">
          <div class="modal-image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="modal-main-img">
            ${product.badge ? `<span class="product-badge modal-badge">${product.badge}</span>` : ''}
          </div>
          <div class="modal-ethos-assurance">
            <div class="assurance-item">
              <span class="assurance-icon">🧈</span>
              <span class="assurance-text"><strong>100% Real Butter</strong> (Normandy 82%+)</span>
            </div>
            <div class="assurance-item">
              <span class="assurance-icon">🌾</span>
              <span class="assurance-text"><strong>Unbleached Flour</strong> (Non-GMO)</span>
            </div>
            <div class="assurance-item">
              <span class="assurance-icon">🥛</span>
              <span class="assurance-text"><strong>Farm Heavy Cream</strong> (Daily Fresh)</span>
            </div>
          </div>
        </div>

        <div class="modal-product-info">
          <div class="modal-category-strip">
            <span class="product-cat-tag">${formatCategoryName(product.category)}</span>
            <div class="product-rating">
              <span class="star-icon">★</span>
              <strong>${product.rating}</strong>
              <span class="review-count">(${product.reviewCount} verified reviews)</span>
            </div>
          </div>

          <h2 class="modal-product-title">${product.name}</h2>
          <div class="modal-price-row">
            <span class="modal-price">${formatPKR(product.price)}</span>
            <span class="modal-portion-tag">${product.portion || 'Freshly Packed'}</span>
          </div>

          <p class="modal-description">${product.description}</p>

          <!-- PURE INGREDIENT TRANSPARENCY -->
          <div class="modal-ingredients-card">
            <h4 class="ingredients-header">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a4 4 0 0 0-4 4c0 1.25.57 2.37 1.46 3.1A5.98 5.98 0 0 0 6 15v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1c0-2.5-1.54-4.66-3.46-5.9A4.01 4.01 0 0 0 16 6a4 4 0 0 0-4-4z"/></svg>
              Pure Ingredient Specifications
            </h4>
            <p class="ingredients-sub">Strictly free of margarine, palm fat, and synthetic chemical conditioners.</p>
            <ul class="ingredients-list">
              ${ingredientsList}
            </ul>
          </div>

          <!-- ALLERGENS & DIETARY BADGES -->
          <div class="modal-allergen-section">
            <div class="allergen-group">
              <span class="allergen-title">Contains Allergens:</span>
              <div class="allergens-wrap">${allergensList}</div>
            </div>
            <div class="allergen-group">
              <span class="allergen-title">Dietary Badges:</span>
              <div class="allergens-wrap">${dietaryList}</div>
            </div>
          </div>

          <!-- QUANTITY & ACTIONS -->
          <div class="modal-purchase-bar">
            <div class="qty-selector">
              <button type="button" class="qty-btn" id="modalQtyMinus" aria-label="Decrease quantity">−</button>
              <span class="qty-value" id="modalQtyVal">${modalQty}</span>
              <button type="button" class="qty-btn" id="modalQtyPlus" aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="btn btn-outline" id="modalAddToCartBtn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Add to Basket
            </button>
            <button type="button" class="btn btn-primary" id="modalOrderNowBtn">
              Order Now / Pay (${formatPKR(product.price)})
            </button>
          </div>
        </div>
      </div>
    `;

    // Quantity Handlers
    const minusBtn = document.getElementById('modalQtyMinus');
    const plusBtn = document.getElementById('modalQtyPlus');
    const valDisplay = document.getElementById('modalQtyVal');
    const orderNowBtn = document.getElementById('modalOrderNowBtn');

    function updateModalPriceDisplay() {
      if (valDisplay) valDisplay.textContent = modalQty;
      if (orderNowBtn) orderNowBtn.textContent = `Order Now / Pay (${formatPKR(product.price * modalQty)})`;
    }

    if (minusBtn && plusBtn) {
      minusBtn.addEventListener('click', () => {
        if (modalQty > 1) {
          modalQty--;
          updateModalPriceDisplay();
        }
      });
      plusBtn.addEventListener('click', () => {
        if (modalQty < 50) {
          modalQty++;
          updateModalPriceDisplay();
        }
      });
    }

    // Modal Add To Cart
    const addBtn = document.getElementById('modalAddToCartBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(product.id, modalQty);
        closeProductModal();
      });
    }

    // Modal Order Now (Direct Checkout)
    if (orderNowBtn) {
      orderNowBtn.addEventListener('click', () => {
        addToCart(product.id, modalQty, false);
        closeProductModal();
        openCheckoutModal();
      });
    }

    // Show modal
    DOM.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!DOM.productModal) return;
    DOM.productModal.classList.remove('active');
    document.body.style.overflow = '';
    state.activeProductModal = null;
  }

  function setupProductModal() {
    if (DOM.closeProductModalBtn) {
      DOM.closeProductModalBtn.addEventListener('click', closeProductModal);
    }
    if (DOM.productModalBackdrop) {
      DOM.productModalBackdrop.addEventListener('click', closeProductModal);
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && DOM.productModal && DOM.productModal.classList.contains('active')) {
        closeProductModal();
      }
    });
  }

  /* ==========================================================================
     7. CART DRAWER & LOGIC
     ========================================================================== */
  function addToCart(productId, quantity = 1, showToastNotification = true) {
    const product = BAKERY_DATA.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity
      });
    }

    saveCart();
    renderCart();

    if (showToastNotification) {
      showToast(`Added ${quantity}x "${product.name}" to your basket! 🥐`);
      if (DOM.cartCountBadge) {
        DOM.cartCountBadge.classList.add('bounce');
        setTimeout(() => DOM.cartCountBadge.classList.remove('bounce'), 500);
      }
    }
  }

  function updateCartItemQty(productId, newQty) {
    if (newQty <= 0) {
      state.cart = state.cart.filter(item => item.id !== productId);
    } else {
      const item = state.cart.find(i => i.id === productId);
      if (item) item.quantity = newQty;
    }
    saveCart();
    renderCart();
  }

  function removeCartItem(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    showToast("Item removed from your basket.");
  }

  function saveCart() {
    localStorage.setItem('bakerz_cart', JSON.stringify(state.cart));
  }

  function renderCart() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    if (DOM.cartCountBadge) {
      DOM.cartCountBadge.textContent = totalItems;
      DOM.cartCountBadge.style.display = totalItems > 0 ? 'inline-flex' : 'none';
    }

    if (!DOM.cartItemsList) return;

    if (state.cart.length === 0) {
      DOM.cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-cart-icon">🛒</div>
          <h4>Your treat basket is empty</h4>
          <p>Treat yourself to a flaky French butter croissant or a Belgian truffle chocolate cake today!</p>
          <button type="button" class="btn btn-outline" id="cartExploreMenuBtn">Browse Daily Bakes</button>
        </div>
      `;
      const btn = document.getElementById('cartExploreMenuBtn');
      if (btn) {
        btn.addEventListener('click', () => {
          toggleCart(false);
          const menu = document.getElementById('menu');
          if (menu) menu.scrollIntoView({ behavior: 'smooth' });
        });
      }
      if (DOM.proceedCheckoutBtn) DOM.proceedCheckoutBtn.disabled = true;
      updateCartTotals(0);
      return;
    }

    if (DOM.proceedCheckoutBtn) DOM.proceedCheckoutBtn.disabled = false;

    DOM.cartItemsList.innerHTML = state.cart.map(item => {
      const itemSubtotal = item.price * item.quantity;
      return `
        <div class="cart-item-row" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h5 class="cart-item-title">${item.name}</h5>
            <span class="cart-item-unit-price">${formatPKR(item.price)} each</span>
            <div class="cart-item-qty-controls">
              <button type="button" class="cart-qty-btn cart-qty-minus" data-id="${item.id}">−</button>
              <span class="cart-qty-num">${item.quantity}</span>
              <button type="button" class="cart-qty-btn cart-qty-plus" data-id="${item.id}">+</button>
            </div>
          </div>
          <div class="cart-item-price-col">
            <span class="cart-item-subtotal">${formatPKR(itemSubtotal)}</span>
            <button type="button" class="cart-item-remove-btn" data-id="${item.id}" title="Remove item" aria-label="Remove ${item.name}">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    DOM.cartItemsList.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = state.cart.find(i => i.id === id);
        if (item) updateCartItemQty(id, item.quantity - 1);
      });
    });

    DOM.cartItemsList.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = state.cart.find(i => i.id === id);
        if (item) updateCartItemQty(id, item.quantity + 1);
      });
    });

    DOM.cartItemsList.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        removeCartItem(id);
      });
    });

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateCartTotals(subtotal);
  }

  function updateCartTotals(subtotal) {
    let discount = 0;
    if (state.appliedCoupon && subtotal > 0) {
      if (state.appliedCoupon.type === 'percentage') {
        discount = subtotal * state.appliedCoupon.value;
      } else if (state.appliedCoupon.type === 'fixed') {
        discount = Math.min(state.appliedCoupon.value, subtotal);
      } else if (state.appliedCoupon.type === 'gift') {
        discount = Math.min(state.appliedCoupon.value, subtotal);
      }
    }

    const discountedSubtotal = Math.max(0, subtotal - discount);
    const tax = subtotal > 0 ? discountedSubtotal * BAKERY_DATA.brand.gstRate : 0;
    const isDelivery = state.fulfillmentType === 'delivery';
    const deliveryFee = (isDelivery && subtotal > 0 && subtotal < BAKERY_DATA.brand.freeDeliveryThreshold)
      ? BAKERY_DATA.brand.deliveryFee
      : 0;
    const total = discountedSubtotal + tax + deliveryFee;

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = formatPKR(subtotal);
    if (DOM.cartTax) DOM.cartTax.textContent = formatPKR(tax);

    if (DOM.cartDeliveryRow && DOM.cartDelivery) {
      if (isDelivery) {
        DOM.cartDeliveryRow.style.display = 'flex';
        DOM.cartDelivery.textContent = deliveryFee === 0 ? 'FREE (Orders > Rs. 3,000)' : formatPKR(deliveryFee);
      } else {
        DOM.cartDeliveryRow.style.display = 'none';
      }
    }

    if (DOM.cartDiscountRow && DOM.cartDiscount) {
      if (discount > 0) {
        DOM.cartDiscountRow.style.display = 'flex';
        DOM.cartDiscount.textContent = `-${formatPKR(discount)} (${state.appliedCoupon.code})`;
      } else {
        DOM.cartDiscountRow.style.display = 'none';
      }
    }

    if (DOM.cartTotal) DOM.cartTotal.textContent = formatPKR(total);

    return { subtotal, discount, tax, deliveryFee, total };
  }

  function toggleCart(forceOpen) {
    if (!DOM.cartDrawer) return;
    const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !DOM.cartDrawer.classList.contains('active');

    if (shouldOpen) {
      DOM.cartDrawer.classList.add('active');
      DOM.cartBackdrop?.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderCart();
    } else {
      DOM.cartDrawer.classList.remove('active');
      DOM.cartBackdrop?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function applyCouponCode(codeStr) {
    const rawCode = (codeStr || (DOM.couponInput ? DOM.couponInput.value : '')).trim().toUpperCase();
    if (!rawCode) return;

    const offer = BAKERY_DATA.offers.find(o => o.code === rawCode);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!offer) {
      if (DOM.couponFeedback) {
        DOM.couponFeedback.className = 'coupon-feedback error';
        DOM.couponFeedback.textContent = 'Invalid promo code. Try SMILE20 or FRESHBAKE!';
      }
      showToast("Invalid promo code. Please check your spelling.", "error");
      return;
    }

    if (subtotal < offer.minOrder) {
      if (DOM.couponFeedback) {
        DOM.couponFeedback.className = 'coupon-feedback error';
        DOM.couponFeedback.textContent = `Requires a minimum order of ${formatPKR(offer.minOrder)}. (Current: ${formatPKR(subtotal)})`;
      }
      showToast(`Requires min order of ${formatPKR(offer.minOrder)}`, "warning");
      return;
    }

    state.appliedCoupon = offer;
    localStorage.setItem('bakerz_coupon', JSON.stringify(offer));

    if (DOM.couponInput) DOM.couponInput.value = offer.code;
    if (DOM.couponFeedback) {
      DOM.couponFeedback.className = 'coupon-feedback success';
      DOM.couponFeedback.textContent = `Promo "${offer.code}" applied! (${offer.discount})`;
    }

    renderCart();
    showToast(`Code "${offer.code}" applied: ${offer.discount}! 🎉`);
  }

  function setupCart() {
    if (DOM.cartToggleBtn) {
      DOM.cartToggleBtn.addEventListener('click', () => toggleCart(true));
    }
    if (DOM.closeCartBtn) {
      DOM.closeCartBtn.addEventListener('click', () => toggleCart(false));
    }
    if (DOM.cartBackdrop) {
      DOM.cartBackdrop.addEventListener('click', () => toggleCart(false));
    }

    if (DOM.applyCouponBtn) {
      DOM.applyCouponBtn.addEventListener('click', () => applyCouponCode());
    }

    if (DOM.couponInput) {
      DOM.couponInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          applyCouponCode();
        }
      });
    }

    if (DOM.proceedCheckoutBtn) {
      DOM.proceedCheckoutBtn.addEventListener('click', () => {
        toggleCart(false);
        openCheckoutModal();
      });
    }
  }

  /* ==========================================================================
     8. CHECKOUT & PAYMENT INTEGRATION MODAL (Card, JazzCash/EasyPaisa, Apple Pay)
     ========================================================================== */
  function openCheckoutModal() {
    if (!DOM.checkoutModal || state.cart.length === 0) {
      showToast("Your treat basket is empty. Add a delicious bake first!", "warning");
      return;
    }

    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totals = updateCartTotals(subtotal);

    DOM.checkoutItemsSummary.innerHTML = state.cart.map(item => `
      <div class="checkout-summary-row">
        <span>${item.quantity}x ${item.name}</span>
        <strong>${formatPKR(item.price * item.quantity)}</strong>
      </div>
    `).join('') + `
      <div class="checkout-summary-divider"></div>
      <div class="checkout-summary-row"><span>Subtotal:</span><span>${formatPKR(totals.subtotal)}</span></div>
      ${totals.discount > 0 ? `<div class="checkout-summary-row discount"><span>Promo Discount:</span><span>-${formatPKR(totals.discount)}</span></div>` : ''}
      <div class="checkout-summary-row"><span>GST (5%):</span><span>${formatPKR(totals.tax)}</span></div>
      ${totals.deliveryFee > 0 ? `<div class="checkout-summary-row"><span>Courier Delivery:</span><span>${formatPKR(totals.deliveryFee)}</span></div>` : ''}
      <div class="checkout-summary-row grand-total"><span>Total to Pay:</span><strong>${formatPKR(totals.total)}</strong></div>
    `;

    if (DOM.checkoutTotalAmount) {
      DOM.checkoutTotalAmount.textContent = formatPKR(totals.total);
    }

    // Update jazzcash amount button
    const jcBtn = document.getElementById('mockJazzcashBtn');
    if (jcBtn) {
      jcBtn.innerHTML = `Confirm & Pay with JazzCash (${formatPKR(totals.total)})`;
    }
    const epBtn = document.getElementById('mockEasypaisaBtn');
    if (epBtn) {
      epBtn.innerHTML = `Confirm & Pay with EasyPaisa (${formatPKR(totals.total)})`;
    }
    const codBtn = document.getElementById('mockCodBtn');
    if (codBtn) {
      codBtn.innerHTML = `Confirm Order — Pay Cash on Delivery (${formatPKR(totals.total)})`;
    }

    DOM.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCheckoutModal() {
    if (!DOM.checkoutModal) return;
    DOM.checkoutModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function setupCheckout() {
    if (DOM.closeCheckoutBtn) {
      DOM.closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
    }
    if (DOM.checkoutBackdrop) {
      DOM.checkoutBackdrop.addEventListener('click', closeCheckoutModal);
    }

    // Payment method tab switching (Card, JazzCash/EasyPaisa, Apple Pay)
    DOM.paymentMethodTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        DOM.paymentMethodTabs.forEach(t => t.classList.remove('active'));
        DOM.paymentMethodPanels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        state.selectedPaymentMethod = tab.getAttribute('data-method');
        const activePanel = document.getElementById(`payment-panel-${state.selectedPaymentMethod}`);
        if (activePanel) activePanel.classList.add('active');
      });
    });

    // Sub-toggle for JazzCash vs EasyPaisa
    const walletToggleBtns = document.querySelectorAll('.wallet-toggle-pill');
    walletToggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        walletToggleBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedWalletType = btn.getAttribute('data-wallet');

        const jcView = document.getElementById('wallet-view-jazzcash');
        const epView = document.getElementById('wallet-view-easypaisa');
        if (state.selectedWalletType === 'jazzcash') {
          if (jcView) jcView.style.display = 'block';
          if (epView) epView.style.display = 'none';
        } else {
          if (jcView) jcView.style.display = 'none';
          if (epView) epView.style.display = 'block';
        }
      });
    });

    // Fulfillment choice radio listener
    const fulfillmentRadios = document.querySelectorAll('input[name="fulfillmentType"]');
    fulfillmentRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        state.fulfillmentType = e.target.value;
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totals = updateCartTotals(subtotal);
        if (DOM.checkoutTotalAmount) {
          DOM.checkoutTotalAmount.textContent = formatPKR(totals.total);
        }
        openCheckoutModal(); // Refresh summary totals
      });
    });

    // Credit Card formatting helpers
    const ccNumInput = document.getElementById('ccNumber');
    if (ccNumInput) {
      ccNumInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = v.match(/.{1,4}/g)?.join(' ') || v;
        e.target.value = formatted;
      });
    }

    const ccExpInput = document.getElementById('ccExp');
    if (ccExpInput) {
      ccExpInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 2) {
          e.target.value = v.substring(0, 2) + '/' + v.substring(2);
        } else {
          e.target.value = v;
        }
      });
    }

    // Form Submission for Credit Card
    if (DOM.checkoutForm) {
      DOM.checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        processOrderSubmission('Credit / Debit Card (Visa / Mastercard)');
      });
    }

    // JazzCash Mock Pay Button
    const jcPayBtn = document.getElementById('mockJazzcashBtn');
    if (jcPayBtn) {
      jcPayBtn.addEventListener('click', () => {
        const phone = document.getElementById('jcMobileNumber')?.value.trim() || '0300-1234567';
        processOrderSubmission(`JazzCash Mobile Wallet (${phone})`);
      });
    }

    // EasyPaisa Mock Pay Button
    const epPayBtn = document.getElementById('mockEasypaisaBtn');
    if (epPayBtn) {
      epPayBtn.addEventListener('click', () => {
        const phone = document.getElementById('epMobileNumber')?.value.trim() || '0345-1234567';
        processOrderSubmission(`EasyPaisa Mobile Wallet (${phone})`);
      });
    }

    // Apple Pay Mock Button
    const applePayBtn = document.getElementById('mockApplePayBtn');
    if (applePayBtn) {
      applePayBtn.addEventListener('click', () => {
        processOrderSubmission('Apple Pay / Google Pay Biometric');
      });
    }

    // Cash on Delivery Mock Button
    const codBtn = document.getElementById('mockCodBtn');
    if (codBtn) {
      codBtn.addEventListener('click', () => {
        processOrderSubmission('Cash on Delivery (COD)');
      });
    }
  }

  function processOrderSubmission(overrideMethod) {
    const submitBtn = document.getElementById('placeOrderSubmitBtn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="spin-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        Authorizing fresh bakery order...
      `;
    }

    setTimeout(() => {
      const orderId = `BB-PK-${Math.floor(100000 + Math.random() * 900000)}`;
      const customerName = document.getElementById('checkoutName')?.value || 'Valued Guest';
      const customerEmail = document.getElementById('checkoutEmail')?.value || 'guest@example.com';
      const fulfillment = document.querySelector('input[name="fulfillmentType"]:checked')?.value || 'pickup';
      const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const totals = updateCartTotals(subtotal);

      renderOrderReceipt({
        orderId,
        customerName,
        customerEmail,
        fulfillment,
        paymentMethod: overrideMethod || 'JazzCash / EasyPaisa / Card',
        items: [...state.cart],
        totals
      });

      if (DOM.checkoutForm) DOM.checkoutForm.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `Complete Order & Pay Now`;
      }

      state.cart = [];
      saveCart();
      renderCart();
      closeCheckoutModal();

      if (DOM.orderSuccessModal) {
        DOM.orderSuccessModal.classList.add('active');
      }

      showToast(`Order #${orderId} confirmed via ${overrideMethod || 'PKR Payment'}! 🎉`);
    }, 1100);
  }

  function renderOrderReceipt(order) {
    if (!DOM.orderReceiptDetails) return;

    const itemsRows = order.items.map(item => `
      <div class="receipt-item-row">
        <span>${item.quantity}x ${item.name}</span>
        <strong>${formatPKR(item.price * item.quantity)}</strong>
      </div>
    `).join('');

    const fulfillmentText = order.fulfillment === 'pickup'
      ? '🏬 In-Store Boutique Pickup (Gulberg III Flagship • Ready in 25 mins)'
      : '🚚 Handcrafted Doorstep Courier Delivery (Estimated 35-45 mins)';

    DOM.orderReceiptDetails.innerHTML = `
      <div class="receipt-header">
        <div class="receipt-badge">Payment Confirmed ✓</div>
        <h3>Order #${order.orderId}</h3>
        <p class="receipt-timestamp">${new Date().toLocaleString('en-PK')}</p>
      </div>

      <div class="receipt-meta-box">
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Digital Receipt to:</strong> ${order.customerEmail}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Fulfillment:</strong> ${fulfillmentText}</p>
        <p><strong>Bakery Kitchen:</strong> Plot 14-C, Artisan Commercial Zone, Gulberg III, Lahore</p>
      </div>

      <div class="receipt-items-container">
        <h5>Ordered Bakery Delights:</h5>
        ${itemsRows}
      </div>

      <div class="receipt-totals-box">
        <div class="receipt-totals-row"><span>Subtotal:</span><span>${formatPKR(order.totals.subtotal)}</span></div>
        ${order.totals.discount > 0 ? `<div class="receipt-totals-row discount"><span>Promo Savings:</span><span>-${formatPKR(order.totals.discount)}</span></div>` : ''}
        <div class="receipt-totals-row"><span>GST (5%):</span><span>${formatPKR(order.totals.tax)}</span></div>
        ${order.totals.deliveryFee > 0 ? `<div class="receipt-totals-row"><span>Courier Fee:</span><span>${formatPKR(order.totals.deliveryFee)}</span></div>` : ''}
        <div class="receipt-totals-row total"><span>Total Paid:</span><strong>${formatPKR(order.totals.total)}</strong></div>
      </div>

      <div class="receipt-footer-note">
        <p>🧈 <em>Baked with 100% Real European Butter, Stone-Ground Flour & Fresh Farm Cream.</em></p>
        <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print Receipt
        </button>
      </div>
    `;

    if (DOM.closeSuccessBtn) {
      DOM.closeSuccessBtn.onclick = () => {
        DOM.orderSuccessModal.classList.remove('active');
      };
    }
  }

  /* ==========================================================================
     9. OFFERS & DEALS SECTION
     ========================================================================== */
  function renderOffers() {
    if (!DOM.offersContainer) return;

    DOM.offersContainer.innerHTML = BAKERY_DATA.offers.map(offer => `
      <div class="offer-card" data-code="${offer.code}">
        <div class="offer-ticket-punch"></div>
        <div class="offer-header">
          <span class="offer-tag">${offer.tag}</span>
          <span class="offer-discount-badge">${offer.discount}</span>
        </div>
        <h3 class="offer-title">${offer.title}</h3>
        <p class="offer-highlight">★ ${offer.highlight}</p>
        <p class="offer-desc">${offer.desc}</p>
        
        <div class="offer-code-bar">
          <div class="offer-code-display">
            <span class="code-label">PROMO CODE:</span>
            <code class="code-val">${offer.code}</code>
          </div>
          <button type="button" class="btn-copy-code" data-code="${offer.code}" title="Copy code to clipboard">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span class="copy-text">Copy</span>
          </button>
        </div>

        <div class="offer-card-footer">
          <button type="button" class="btn btn-outline btn-sm btn-apply-offer-direct" data-code="${offer.code}">
            Apply to Basket
          </button>
          <span class="offer-terms" title="${offer.terms}">View terms</span>
        </div>
      </div>
    `).join('');

    DOM.offersContainer.querySelectorAll('.btn-copy-code').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        navigator.clipboard.writeText(code).then(() => {
          const textEl = btn.querySelector('.copy-text');
          if (textEl) textEl.textContent = 'Copied!';
          showToast(`Code "${code}" copied to clipboard! 📋`);
          setTimeout(() => {
            if (textEl) textEl.textContent = 'Copy';
          }, 2000);
        }).catch(() => {
          showToast(`Code: ${code}`);
        });
      });
    });

    DOM.offersContainer.querySelectorAll('.btn-apply-offer-direct').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-code');
        applyCouponCode(code);
        toggleCart(true);
      });
    });
  }

  /* ==========================================================================
     10. PHOTO GALLERY & LIGHTBOX
     ========================================================================== */
  function renderGallery() {
    if (!DOM.galleryGrid) return;

    let items = state.galleryFilter === 'all'
      ? BAKERY_DATA.gallery
      : BAKERY_DATA.gallery.filter(g => g.category === state.galleryFilter);

    state.filteredGalleryItems = items;

    DOM.galleryGrid.innerHTML = items.map((item, index) => `
      <div class="gallery-item" data-index="${index}">
        <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-cat-pill">${item.categoryName}</span>
          <h4 class="gallery-title">${item.title}</h4>
          <p class="gallery-caption-preview">${item.caption}</p>
          <button type="button" class="gallery-zoom-btn" aria-label="Expand image ${item.title}">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
          </button>
        </div>
      </div>
    `).join('');

    DOM.galleryGrid.querySelectorAll('.gallery-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-index'), 10);
        openLightbox(idx);
      });
    });
  }

  function setupGalleryFilters() {
    if (!DOM.galleryFilters) return;
    DOM.galleryFilters.forEach(pill => {
      pill.addEventListener('click', () => {
        DOM.galleryFilters.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        state.galleryFilter = pill.getAttribute('data-category');
        renderGallery();
      });
    });
  }

  function openLightbox(index) {
    if (!DOM.lightboxModal || !state.filteredGalleryItems[index]) return;
    state.currentLightboxIndex = index;
    updateLightboxContent();
    DOM.lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!DOM.lightboxModal) return;
    DOM.lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = state.filteredGalleryItems[state.currentLightboxIndex];
    if (!item) return;

    if (DOM.lightboxImage) {
      DOM.lightboxImage.src = item.image;
      DOM.lightboxImage.alt = item.title;
    }
    if (DOM.lightboxCaption) {
      DOM.lightboxCaption.innerHTML = `<strong>${item.title}</strong> — ${item.caption}`;
    }
    if (DOM.lightboxCounter) {
      DOM.lightboxCounter.textContent = `${state.currentLightboxIndex + 1} / ${state.filteredGalleryItems.length}`;
    }
  }

  function nextLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex + 1) % state.filteredGalleryItems.length;
    updateLightboxContent();
  }

  function prevLightbox() {
    state.currentLightboxIndex = (state.currentLightboxIndex - 1 + state.filteredGalleryItems.length) % state.filteredGalleryItems.length;
    updateLightboxContent();
  }

  function setupLightbox() {
    if (DOM.lightboxClose) DOM.lightboxClose.addEventListener('click', closeLightbox);
    if (DOM.lightboxNext) DOM.lightboxNext.addEventListener('click', nextLightbox);
    if (DOM.lightboxPrev) DOM.lightboxPrev.addEventListener('click', prevLightbox);

    window.addEventListener('keydown', (e) => {
      if (DOM.lightboxModal && DOM.lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
      }
    });
  }

  /* ==========================================================================
     11. REVIEWS & CUSTOMER FEEDBACK SYSTEM
     ========================================================================== */
  function renderReviews() {
    if (!DOM.reviewsList) return;

    const avg = (state.reviews.reduce((sum, r) => sum + r.rating, 0) / state.reviews.length).toFixed(1);
    if (DOM.avgRatingScore) DOM.avgRatingScore.textContent = avg;
    if (DOM.totalReviewsCount) DOM.totalReviewsCount.textContent = `Based on ${state.reviews.length} verified customer reviews`;

    DOM.reviewsList.innerHTML = state.reviews.map(rev => {
      const stars = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);
      return `
        <div class="review-card">
          <div class="review-header">
            <div class="review-avatar">${rev.avatar || rev.name.substring(0, 2).toUpperCase()}</div>
            <div class="review-user-info">
              <h5 class="review-author">${rev.name} ${rev.verified ? `<span class="verified-badge">✓ Verified Order</span>` : ''}</h5>
              <div class="review-meta">
                <span class="review-stars">${stars}</span>
                <span class="review-date">• ${rev.date}</span>
              </div>
            </div>
          </div>
          ${rev.product ? `<div class="review-product-tag">Loved: <strong>${rev.product}</strong></div>` : ''}
          <p class="review-body">${rev.text}</p>
        </div>
      `;
    }).join('');
  }

  function setupFeedbackSystem() {
    if (DOM.starRatingPicker) {
      const starButtons = DOM.starRatingPicker.querySelectorAll('.star-btn');
      starButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          const val = parseInt(btn.getAttribute('data-value'), 10);
          highlightStars(val);
        });
        btn.addEventListener('mouseleave', () => {
          highlightStars(state.userRatingInput);
        });
        btn.addEventListener('click', () => {
          state.userRatingInput = parseInt(btn.getAttribute('data-value'), 10);
          highlightStars(state.userRatingInput);
          if (DOM.ratingScoreValue) DOM.ratingScoreValue.textContent = `${state.userRatingInput} / 5 Stars`;
        });
      });
    }

    function highlightStars(val) {
      const starButtons = DOM.starRatingPicker?.querySelectorAll('.star-btn');
      starButtons?.forEach(btn => {
        const starVal = parseInt(btn.getAttribute('data-value'), 10);
        btn.classList.toggle('active', starVal <= val);
      });
    }

    if (DOM.feedbackForm) {
      DOM.feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('feedbackName');
        const productSelect = document.getElementById('feedbackProduct');
        const textInput = document.getElementById('feedbackText');

        if (!nameInput || !textInput) return;

        const newReview = {
          id: `rev-${Date.now()}`,
          name: nameInput.value.trim() || 'Foodie Guest',
          avatar: (nameInput.value.trim() || 'FG').substring(0, 2).toUpperCase(),
          rating: state.userRatingInput,
          date: 'Just now',
          product: productSelect ? productSelect.value : 'Artisan Selection',
          verified: true,
          text: textInput.value.trim(),
          helpful: 0
        };

        state.reviews.unshift(newReview);
        renderReviews();

        DOM.feedbackForm.reset();
        state.userRatingInput = 5;
        highlightStars(5);
        if (DOM.ratingScoreValue) DOM.ratingScoreValue.textContent = '5 / 5 Stars';

        showToast("Thank you! Your verified review has been posted! ⭐");
      });
    }
  }

  /* ==========================================================================
     12. CONTACT & CUSTOM CAKE INQUIRY FORM
     ========================================================================== */
  function setupContactForm() {
    if (!DOM.contactForm) return;

    DOM.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || 'Guest';
      const email = document.getElementById('contactEmail')?.value;
      const type = document.getElementById('contactOccasion')?.value || 'Inquiry';

      if (DOM.contactAlert) {
        DOM.contactAlert.style.display = 'block';
        DOM.contactAlert.className = 'contact-alert success';
        DOM.contactAlert.innerHTML = `
          <strong>Thank you, ${name}!</strong> We have received your ${type.toLowerCase()} request. Master Baker Julian will contact you at <em>${email}</em> within 24 hours.
        `;
      }

      DOM.contactForm.reset();
      showToast("Inquiry sent to our master baking team! ✉️");
    });
  }

  /* ==========================================================================
     13. CONTINUOUS GEOLOCATION TICKER & LIVE CLOCK
     ========================================================================== */
  function setupGeolocationTicker() {
    function updateLiveClock() {
      const now = new Date();
      if (DOM.liveTimeTicker) {
        DOM.liveTimeTicker.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      }
      if (DOM.liveDateTicker) {
        DOM.liveDateTicker.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
      }
    }
    updateLiveClock();
    setInterval(updateLiveClock, 1000);

    // HTML5 Geolocation API with reverse geocoding & fallback
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
            if (res.ok) {
              const data = await res.json();
              const city = data.city || data.locality || data.principalSubdivision || 'Lahore';
              const country = data.countryName || 'Pakistan';
              state.userLocation = `📍 Visiting from ${city}, ${country} • Fresh batch just out of the stone oven!`;
            } else {
              state.userLocation = `📍 Gulberg III, Lahore, Pakistan • Artisan Bakery Zone`;
            }
          } catch (err) {
            state.userLocation = `📍 Lahore / Karachi, Pakistan • 100% Real Butter & Farm Cream`;
          }
          if (DOM.liveLocationTicker) DOM.liveLocationTicker.textContent = state.userLocation;
        },
        () => {
          state.userLocation = `📍 Plot 14-C, Gulberg III, Lahore • Warm smiles served daily!`;
          if (DOM.liveLocationTicker) DOM.liveLocationTicker.textContent = state.userLocation;
        },
        { timeout: 8000 }
      );
    } else {
      if (DOM.liveLocationTicker) {
        DOM.liveLocationTicker.textContent = `📍 Plot 14-C, Gulberg III, Lahore • Warm smiles served daily!`;
      }
    }
  }

  /* ==========================================================================
     14. FAQ & SITE MAP MODALS
     ========================================================================== */
  function setupFaqAndSitemapModals() {
    // Populate FAQ modal content
    if (DOM.faqContent && BAKERY_DATA.faqs) {
      DOM.faqContent.innerHTML = BAKERY_DATA.faqs.map((faq, i) => `
        <div class="faq-item" style="margin-bottom: 20px; padding: 18px; background: var(--bg-surface); border: 1px solid var(--border-medium); border-radius: var(--radius-md);">
          <h4 style="font-size: 1.1rem; color: var(--brand-cocoa); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
            <span style="color: var(--brand-amber);">Q${i + 1}.</span> ${faq.q}
          </h4>
          <p style="font-size: 0.94rem; color: var(--text-secondary); line-height: 1.6;">${faq.a}</p>
        </div>
      `).join('');
    }

    // FAQ trigger
    const faqTriggers = document.querySelectorAll('.trigger-faq-modal');
    faqTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openFaqModal();
      });
    });

    if (DOM.closeFaqBtn) DOM.closeFaqBtn.addEventListener('click', closeFaqModal);
    if (DOM.faqBackdrop) DOM.faqBackdrop.addEventListener('click', closeFaqModal);

    function openFaqModal() {
      if (!DOM.faqModal) return;
      DOM.faqModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeFaqModal() {
      if (!DOM.faqModal) return;
      DOM.faqModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Site Map trigger
    const sitemapTriggers = document.querySelectorAll('.trigger-sitemap-modal');
    sitemapTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSitemapModal();
      });
    });

    if (DOM.closeSitemapBtn) DOM.closeSitemapBtn.addEventListener('click', closeSitemapModal);
    if (DOM.sitemapBackdrop) DOM.sitemapBackdrop.addEventListener('click', closeSitemapModal);

    function openSitemapModal() {
      if (!DOM.sitemapModal) return;
      DOM.sitemapModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeSitemapModal() {
      if (!DOM.sitemapModal) return;
      DOM.sitemapModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close on escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeFaqModal();
        closeSitemapModal();
      }
    });
  }

  /* ==========================================================================
     15. TOAST NOTIFICATION UTILITY
     ========================================================================== */
  function showToast(message, type = 'info') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `bakerz-toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'error' ? '⚠️' : type === 'warning' ? '🔔' : '✨'}</span>
        <span class="toast-msg">${message}</span>
      </div>
      <button type="button" class="toast-close" aria-label="Close notification">&times;</button>
    `;

    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  /* ==========================================================================
     PUBLIC API EXPOSURE
     ========================================================================== */
  window.BakerzApp = {
    openProductModal,
    closeProductModal,
    openCheckoutModal,
    addToCart,
    applyCouponCode,
    toggleCart,
    filterByCategory,
    showToast,
    formatPKR
  };

  /* ==========================================================================
     APPLICATION BOOTSTRAP
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initCacheDOM();
    setupPreloader();
    applyTheme(state.theme);
    if (DOM.themeToggle) {
      DOM.themeToggle.addEventListener('click', toggleTheme);
    }
    initVisitorCounter();
    setupNavigation();
    renderCategoryButtons();
    renderProducts();
    renderMerchandiseSection();
    setupCatalogControls();
    setupProductModal();
    setupCart();
    renderCart();
    setupCheckout();
    renderOffers();
    renderGallery();
    setupGalleryFilters();
    setupLightbox();
    renderReviews();
    setupFeedbackSystem();
    setupContactForm();
    setupGeolocationTicker();
    setupFaqAndSitemapModals();

    if (window.BakeryChatbot) {
      window.bakeryChatbotInstance = new window.BakeryChatbot();
    }
  });

})();
