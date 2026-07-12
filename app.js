/**
 * Core Application Logic - El Mutawakkil Frozen Foods (مجمدات المتوكل)
 * Pure Vanilla JavaScript for Simplified High-End Catalog-Only Layout
 */

// 1. Static Product Catalog with premium realistic Egyptian prices
const DEFAULT_PRODUCTS = [
  {
    id: 'b1',
    name: 'برجر بقري جامبو المتوكل',
    category: 'burger',
    price: 190,
    weight: 'علبة 8 قطع - 1 كيلو جرام',
    description: 'برجر مجهز من أنقى قطعيات اللحم البقري الصافي بتتبيلة المتوكل السرية المميزة، مثالي للشواء والتحضير السريع.',
    image: 'src/assets/images/frozen_burger_1783712971539.jpg',
    isPopular: true
  },
  {
    id: 'b2',
    name: 'برجر المتوكل العائلي الاقتصادي',
    category: 'burger',
    price: 240,
    weight: 'علبة 20 قطعة - 1.5 كيلو جرام',
    description: 'علبة التوفير الكبرى متبلة بخلطة بهارات الحارة الشهية، ممتازة لوجبات الأطفال السريعة وسريعة التحضير في المنزل.',
    image: 'src/assets/images/frozen_burger_1783712971539.jpg',
    isPopular: false
  },
  {
    id: 'k1',
    name: 'كفتة الحاتي المتبلة للشوي',
    category: 'kofta',
    price: 195,
    weight: 'طبق 1 كيلو جرام',
    description: 'كفتة سيخ بلدي فاخرة على أصولها، غنية بالنكهة الشرقية الطبيعية ورائحة الشواء والضأن لتمنحك متعة كفتة الحاتي الحقيقية.',
    image: 'src/assets/images/frozen_kofta_1783712984069.jpg',
    isPopular: true
  },
  {
    id: 'k2',
    name: 'كفتة داوود باشا بالبهارات',
    category: 'kofta',
    price: 165,
    weight: 'طبق 800 جرام',
    description: 'كرات كفتة شهية متماسكة غنية بالتوابل، جاهزة للوضع مباشرة في الصلصة والتحضير السريع في دقائق معدودة.',
    image: 'src/assets/images/frozen_kofta_1783712984069.jpg',
    isPopular: false
  },
  {
    id: 'l1',
    name: 'كبدة بقري شرائح (بانيه بالردة)',
    category: 'liver',
    price: 215,
    weight: 'طبق 1 كيلو جرام',
    description: 'شرائح كبدة بقري مقطعة بسمك مثالي لتجهيز كبدة بانيه بالردة أو بالردة والثوم، مغسولة ومعبأة بأعلى معايير السلامة.',
    image: 'src/assets/images/frozen_liver_1783712998793.jpg',
    isPopular: true
  },
  {
    id: 'l2',
    name: 'كبدة عصافيري إسكندراني حارة',
    category: 'liver',
    price: 180,
    weight: 'طبق 800 جرام',
    description: 'قطع كبدة صغيرة جداً مقطعة بعناية (عصافيري)، ممتازة لعمل أحلى السندوتشات الإسكندراني بالثوم والليمون والفلفل الحامي.',
    image: 'src/assets/images/frozen_liver_1783712998793.jpg',
    isPopular: false
  },
  {
    id: 'f1',
    name: 'بطاطس بوم فريت شركات ممتازة',
    category: 'fries',
    price: 145,
    weight: 'كيس عائلي كبير 2.5 كيلو جرام',
    description: 'بطاطس بوم فريت نصف مقلية ومقرمشة، جودة المطاعم الفاخرة، مقرمشة من الخارج وهشة من الداخل دون امتصاص زيت.',
    image: 'src/assets/images/frozen_fries_1783713011657.jpg',
    isPopular: true
  },
  {
    id: 'f2',
    name: 'بطاطس كريسبي متبلة حارة',
    category: 'fries',
    price: 80,
    weight: 'كيس 1 كيلو جرام',
    description: 'أصابع بطاطس متبلة ببهارات حارة وتوابل رائعة، جاهزة للقلي الفوري لتعطيك نكهة مقرمشة ممتازة يعشقها الأطفال والكبار.',
    image: 'src/assets/images/frozen_fries_1783713011657.jpg',
    isPopular: false
  }
];

let PRODUCTS = JSON.parse(localStorage.getItem('almutawakkil_products'));
if (!PRODUCTS || !Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
  PRODUCTS = DEFAULT_PRODUCTS;
  localStorage.setItem('almutawakkil_products', JSON.stringify(PRODUCTS));
}

// Dynamic Store Configuration loaded from localStorage
let STORE_CONFIG = JSON.parse(localStorage.getItem('almutawakkil_config')) || {
  phone: '01097235212',
  facebook: 'https://www.facebook.com/share/1DU7CCWSHr/',
  tiktok: 'https://tiktok.com/@almutawakkil.frozen',
  address: 'جمهورية مصر العربية - دمياط - فارسكور - بجوار مسجد المتوكل',
  schedule: 'يومياً من الساعة 10:00 صباحاً وحتى 11:00 مساءً'
};

// Maintain compatibility with existing references to BRAND_LINKS
const BRAND_LINKS = {
  get phone() { return STORE_CONFIG.phone; },
  get facebook() { return STORE_CONFIG.facebook; },
  get tiktok() { return STORE_CONFIG.tiktok; }
};

let selectedCategory = 'all';

// Document Elements Cache
let elements = {};

function initElementsCache() {
  elements = {
    productsList: document.getElementById('products-list')
  };
}

function applyStoreConfig() {
  // Update header and footer phone numbers
  const headerPhone = document.getElementById('phone-label');
  const footerPhone = document.getElementById('footer-phone-label');
  const callQuickLink = document.getElementById('call-quick-link');
  
  if (headerPhone) headerPhone.textContent = STORE_CONFIG.phone;
  if (footerPhone) footerPhone.textContent = STORE_CONFIG.phone;
  if (callQuickLink) callQuickLink.href = `tel:${STORE_CONFIG.phone}`;
  
  // Update schedule and address displays in the landing page
  const footerSchedule = document.getElementById('footer-schedule');
  const footerAddressLabel = document.getElementById('footer-address-label');
  const liveAddressDisplay = document.getElementById('live-address-display');
  const liveScheduleDisplay = document.getElementById('live-schedule-display');
  const livePhoneCallBtn = document.getElementById('live-phone-call-btn');
  const liveWaChatBtn = document.getElementById('live-wa-chat-btn');
  const footerPhoneCall = document.querySelector('footer a.whatsapp[title="اتصل بنا"]');
  const floatingWaBtn = document.getElementById('wa-chat-btn');
  
  // Update social pages in footer
  const footerFB = document.querySelector('footer a.facebook-link');
  const footerTT = document.querySelector('footer a.tiktok-link');
  if (footerFB) footerFB.href = STORE_CONFIG.facebook;
  if (footerTT) footerTT.href = STORE_CONFIG.tiktok;
  
  // Update social pages in Hero
  const heroFB = document.querySelector('.hero-actions a.btn-facebook');
  const heroFBIcon = document.querySelector('.social-icons-group a.facebook-link');
  const heroTTIcon = document.querySelector('.social-icons-group a.tiktok-link');
  
  if (heroFB) heroFB.href = STORE_CONFIG.facebook;
  if (heroFBIcon) heroFBIcon.href = STORE_CONFIG.facebook;
  if (heroTTIcon) heroTTIcon.href = STORE_CONFIG.tiktok;

  if (footerSchedule) {
    footerSchedule.innerHTML = `مواعيد العمل: <strong style="color: var(--primary);">${STORE_CONFIG.schedule}</strong>`;
  }
  if (footerAddressLabel) {
    footerAddressLabel.textContent = STORE_CONFIG.address;
  }
  if (liveAddressDisplay) {
    liveAddressDisplay.textContent = STORE_CONFIG.address;
  }
  if (liveScheduleDisplay) {
    liveScheduleDisplay.textContent = STORE_CONFIG.schedule;
  }
  if (livePhoneCallBtn) {
    livePhoneCallBtn.href = `tel:${STORE_CONFIG.phone}`;
  }
  if (liveWaChatBtn) {
    const cleanPhone = STORE_CONFIG.phone.startsWith('0') ? '2' + STORE_CONFIG.phone : STORE_CONFIG.phone;
    liveWaChatBtn.href = `https://wa.me/${cleanPhone}`;
  }
  if (footerPhoneCall) {
    footerPhoneCall.href = `tel:${STORE_CONFIG.phone}`;
  }
  if (floatingWaBtn) {
    const cleanPhone = STORE_CONFIG.phone.startsWith('0') ? '2' + STORE_CONFIG.phone : STORE_CONFIG.phone;
    floatingWaBtn.href = `https://wa.me/${cleanPhone}`;
  }
  
  // Pre-fill fields in Admin Panel Store Settings Form
  const formAddress = document.getElementById('cfg-address');
  const formPhone = document.getElementById('cfg-phone');
  const formSchedule = document.getElementById('cfg-schedule');
  const formFacebook = document.getElementById('cfg-facebook');
  const formTiktok = document.getElementById('cfg-tiktok');
  
  if (formAddress) formAddress.value = STORE_CONFIG.address;
  if (formPhone) formPhone.value = STORE_CONFIG.phone;
  if (formSchedule) formSchedule.value = STORE_CONFIG.schedule;
  if (formFacebook) formFacebook.value = STORE_CONFIG.facebook;
  if (formTiktok) formTiktok.value = STORE_CONFIG.tiktok;
}

window.handleStoreConfigSubmit = function() {
  const formAddress = document.getElementById('cfg-address');
  const formPhone = document.getElementById('cfg-phone');
  const formSchedule = document.getElementById('cfg-schedule');
  const formFacebook = document.getElementById('cfg-facebook');
  const formTiktok = document.getElementById('cfg-tiktok');
  
  if (!formAddress || !formPhone || !formSchedule || !formFacebook || !formTiktok) return;
  
  STORE_CONFIG = {
    phone: formPhone.value.trim(),
    facebook: formFacebook.value.trim(),
    tiktok: formTiktok.value.trim(),
    address: formAddress.value.trim(),
    schedule: formSchedule.value.trim()
  };
  
  localStorage.setItem('almutawakkil_config', JSON.stringify(STORE_CONFIG));
  applyStoreConfig();
  renderProducts(); // re-render catalog because cards and social CTAs might refer to phone/social URLs
  showToast('تم حفظ بيانات وعنوان المحل الجديد بنجاح!', 'success');
};

// Initializer
window.addEventListener('DOMContentLoaded', () => {
  trackVisitor();
  initElementsCache();
  applyStoreConfig();
  renderProducts();
  setupEventListeners();
  
  // Set default view active
  showView('home');
});

// Product Catalog Renderer (Using premium horizontal layout!)
function renderProducts() {
  if (!elements.productsList) return;
  
  const filtered = PRODUCTS.filter(prod => {
    return selectedCategory === 'all' || prod.category === selectedCategory;
  });

  if (filtered.length === 0) {
    elements.productsList.innerHTML = `
      <div class="no-results">
        <h4 style="font-weight: 800; margin-bottom: 6px;">لا توجد منتجات في هذا القسم حالياً</h4>
        <p style="font-size: 12px; color: var(--text-light);">جرب تصفح أقسام أخرى أو عرض الكل.</p>
      </div>
    `;
    return;
  }

  elements.productsList.innerHTML = filtered.map(product => {
    const catLabel = product.category === 'burger' ? 'برجر بقري' :
                      product.category === 'kofta' ? 'كفتة تتبيلة الحاتي' :
                      product.category === 'liver' ? 'كبدة مجهزة' : 'بطاطس شركات';

    return `
      <div class="product-horizontal-card" id="store-card-${product.id}">
        ${product.isPopular ? `<span class="product-horizontal-badge">الأكثر طلباً</span>` : ''}
        
        <!-- Image Container -->
        <div class="product-image-container">
          <div class="product-image-price">
            <span class="price-amount">${product.price}</span>
            <span class="price-currency">ج</span>
          </div>
          <img class="product-horizontal-img" src="${product.image}" alt="${product.name}" referrerpolicy="no-referrer">
        </div>
        
        <!-- Details Column -->
        <div class="product-horizontal-info">
          
          <div class="product-info-top">
            <div class="product-meta-row">
              <span class="product-meta-cat">${catLabel}</span>
              ${product.weight ? `<span class="product-meta-weight">${product.weight}</span>` : ''}
            </div>
            <h3 class="product-horizontal-title">${product.name}</h3>
            <p class="product-horizontal-desc">${product.description}</p>
          </div>
          
          <div class="product-info-bottom">
            <div class="product-card-actions" style="width: 100%;">
              <a href="tel:${BRAND_LINKS.phone}" class="btn btn-primary" style="width: 100%; justify-content: center;">
                <span>طلب هاتفياً</span>
              </a>
            </div>
          </div>
          
        </div>
      </div>
    `;
  }).join('');
}

// View Switcher System
window.showView = function(viewId) {
  const homeView = document.getElementById('home-view');
  const shopView = document.getElementById('shop-view');
  const dashboardView = document.getElementById('dashboard-view');
  const navHome = document.getElementById('nav-home');
  const navShop = document.getElementById('nav-shop');
  const navDashboard = document.getElementById('nav-dashboard');
  
  if (homeView) homeView.classList.remove('active');
  if (shopView) shopView.classList.remove('active');
  if (dashboardView) dashboardView.classList.remove('active');
  
  if (navHome) navHome.classList.remove('active');
  if (navShop) navShop.classList.remove('active');
  if (navDashboard) navDashboard.classList.remove('active');
  
  if (viewId === 'home') {
    if (homeView) homeView.classList.add('active');
    if (navHome) navHome.classList.add('active');
  } else if (viewId === 'shop') {
    if (shopView) shopView.classList.add('active');
    if (navShop) navShop.classList.add('active');
  } else if (viewId === 'dashboard') {
    if (dashboardView) dashboardView.classList.add('active');
    if (navDashboard) navDashboard.classList.add('active');
    renderAdminProducts();
    renderDashboardStats();
    onCategoryChange();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Global helper to open WhatsApp Chat Pop-up widget instantly
window.openWhatsAppChat = function() {
  const waChatBox = document.getElementById('wa-chat-box');
  if (waChatBox) {
    waChatBox.classList.add('show');
    waChatBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
};

// Event Listeners Setup
function setupEventListeners() {
  // Category Filtering tabs
  const tabs = document.querySelectorAll('.category-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedCategory = tab.dataset.category || 'all';
      renderProducts();
    });
  });

  // Interactive Floating WhatsApp Widget Logic
  const waToggleBtn = document.getElementById('wa-toggle-btn');
  const waChatBox = document.getElementById('wa-chat-box');
  const waChatClose = document.getElementById('wa-chat-close');

  if (waToggleBtn && waChatBox) {
    let userInteracted = false;

    // Toggle Chat Box on button click
    waToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      waChatBox.classList.toggle('show');
      userInteracted = true;
    });

    // Close Chat Box on close button click
    if (waChatClose) {
      waChatClose.addEventListener('click', (e) => {
        e.stopPropagation();
        waChatBox.classList.remove('show');
        userInteracted = true;
      });
    }

    // Close when clicking anywhere else on the screen
    document.addEventListener('click', (e) => {
      if (!waChatBox.contains(e.target) && e.target !== waToggleBtn) {
        waChatBox.classList.remove('show');
      }
    });

    // Auto-trigger the friendly chat popup after 2.5 seconds delay for premium UX
    setTimeout(() => {
      if (!userInteracted && waChatBox) {
        waChatBox.classList.add('show');
      }
    }, 2500);
  }

  // Intercept all social link and WhatsApp clicks for tracking
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    const btn = e.target.closest('button');
    
    if (link) {
      const href = link.getAttribute('href') || '';
      if (href.includes('facebook.com')) {
        trackClick('facebook');
      } else if (href.includes('tiktok.com')) {
        trackClick('tiktok');
      } else if (href.includes('wa.me') || href.includes('whatsapp') || href.includes('tel:')) {
        trackClick('whatsapp');
      }
    }
    
    if (btn) {
      if (btn.id === 'wa-toggle-btn' || btn.id === 'wa-chat-btn') {
        trackClick('whatsapp');
      }
    }
  });

  // Handle local image upload from device
  const fileInput = document.getElementById('prod-image-file');
  const uploadWrapper = document.getElementById('image-upload-wrapper');
  const uploadPlaceholder = document.getElementById('upload-placeholder');
  const previewContainer = document.getElementById('upload-preview-container');
  const previewImg = document.getElementById('upload-preview');
  const fileNameEl = document.getElementById('upload-file-name');
  const clearImgBtn = document.getElementById('btn-clear-image');
  const prodImageHidden = document.getElementById('prod-image');

  if (uploadWrapper && fileInput) {
    uploadWrapper.addEventListener('click', (e) => {
      if (e.target.closest('#btn-clear-image')) {
        return; // Don't trigger file dialog if clicking clear button
      }
      fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        showToast('يرجى اختيار ملف صورة صالح!', 'error');
        return;
      }

      // Read image as base64 data URL to store in localStorage
      const reader = new FileReader();
      reader.onload = function(event) {
        const base64Url = event.target.result;
        if (prodImageHidden) prodImageHidden.value = base64Url;
        
        // Show preview in UI
        if (previewImg) previewImg.src = base64Url;
        if (fileNameEl) fileNameEl.textContent = file.name;
        if (uploadPlaceholder) uploadPlaceholder.style.display = 'none';
        if (previewContainer) previewContainer.style.display = 'flex';
      };
      reader.readAsDataURL(file);
    });
  }

  if (clearImgBtn) {
    clearImgBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (fileInput) fileInput.value = '';
      if (prodImageHidden) prodImageHidden.value = '';
      if (previewImg) previewImg.src = '';
      if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
      if (previewContainer) previewContainer.style.display = 'none';
      
      // Fallback to default category image
      window.onCategoryChange();
    });
  }
}

// ====================================================
// ADMIN DASHBOARD & TRACKING ENGINE LOGIC
// ====================================================

const CATEGORY_DEFAULT_IMAGES = {
  burger: 'src/assets/images/frozen_burger_1783712971539.jpg',
  kofta: 'src/assets/images/frozen_kofta_1783712984069.jpg',
  liver: 'src/assets/images/frozen_liver_1783712998793.jpg',
  fries: 'src/assets/images/frozen_fries_1783713011657.jpg'
};

function trackVisitor() {
  if (!sessionStorage.getItem('almutawakkil_session_active')) {
    sessionStorage.setItem('almutawakkil_session_active', 'true');
    let stats = JSON.parse(localStorage.getItem('almutawakkil_stats') || '{"visitors":0,"facebook":0,"whatsapp":0,"tiktok":0}');
    stats.visitors = (stats.visitors || 0) + 1;
    
    // Tracking visitors for current month
    const currentMonth = new Date().toISOString().slice(0, 7); // e.g. "2026-07"
    if (!stats.monthly_visitors) {
      stats.monthly_visitors = {};
    }
    stats.monthly_visitors[currentMonth] = (stats.monthly_visitors[currentMonth] || 0) + 1;
    
    localStorage.setItem('almutawakkil_stats', JSON.stringify(stats));
  }
}

function trackClick(platform) {
  let stats = JSON.parse(localStorage.getItem('almutawakkil_stats') || '{"visitors":0,"facebook":0,"whatsapp":0,"tiktok":0}');
  stats[platform] = (stats[platform] || 0) + 1;
  localStorage.setItem('almutawakkil_stats', JSON.stringify(stats));
  renderDashboardStats();
}

function renderDashboardStats() {
  const stats = JSON.parse(localStorage.getItem('almutawakkil_stats') || '{"visitors":0,"facebook":0,"whatsapp":0,"tiktok":0}');
  
  const visitorsEl = document.getElementById('stat-visitors');
  const monthVisitorsEl = document.getElementById('stat-month-visitors');
  const facebookEl = document.getElementById('stat-facebook');
  const whatsappEl = document.getElementById('stat-whatsapp');
  const tiktokEl = document.getElementById('stat-tiktok');

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyVisitorsCount = (stats.monthly_visitors && stats.monthly_visitors[currentMonth]) || 0;

  if (visitorsEl) visitorsEl.textContent = stats.visitors || 0;
  if (monthVisitorsEl) monthVisitorsEl.textContent = monthlyVisitorsCount;
  if (facebookEl) facebookEl.textContent = stats.facebook || 0;
  if (whatsappEl) whatsappEl.textContent = stats.whatsapp || 0;
  if (tiktokEl) tiktokEl.textContent = stats.tiktok || 0;
}

function renderAdminProducts() {
  const tableBody = document.getElementById('admin-products-table-body');
  if (!tableBody) return;

  if (PRODUCTS.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center; padding: 30px; color: var(--text-light); font-weight: 700;">لا توجد منتجات حالياً. أضف منتجاً جديداً من النموذج الجانبي!</td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = PRODUCTS.map(prod => {
    const catLabel = prod.category === 'burger' ? 'برجر بقري' :
                     prod.category === 'kofta' ? 'كفتة حاتي' :
                     prod.category === 'liver' ? 'كبدة مجهزة' : 'بطاطس شركات';

    return `
      <tr id="admin-row-${prod.id}">
        <td style="padding: 12px 8px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${prod.image}" alt="${prod.name}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px;" referrerpolicy="no-referrer">
            <div>
              <div style="font-weight: 800; color: var(--secondary);">${prod.name}</div>
              <div style="font-size: 11px; color: var(--text-light);">${prod.weight || ''}</div>
            </div>
          </div>
        </td>
        <td style="padding: 12px 8px; color: var(--text-light); font-weight: 700;">${catLabel}</td>
        <td style="padding: 12px 8px; font-weight: 950; color: var(--primary);">${prod.price} ج</td>
        <td style="padding: 12px 8px; text-align: center;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            <button class="admin-action-btn edit" onclick="window.editProduct('${prod.id}')">تعديل</button>
            <button class="admin-action-btn delete" onclick="window.deleteProduct('${prod.id}')">حذف</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

window.onCategoryChange = function() {
  const catSelect = document.getElementById('prod-category');
  const imgInput = document.getElementById('prod-image');
  const editId = document.getElementById('edit-product-id').value;
  
  if (catSelect && imgInput) {
    const selectedCat = catSelect.value;
    // Only set default if there is no image or it is currently a default category image
    if (!editId || !imgInput.value || imgInput.value.startsWith('/src/assets/images/') || Object.values(CATEGORY_DEFAULT_IMAGES).includes(imgInput.value)) {
      imgInput.value = CATEGORY_DEFAULT_IMAGES[selectedCat] || '';
    }
  }
};

window.handleProductFormSubmit = function() {
  const nameInput = document.getElementById('prod-name');
  const catSelect = document.getElementById('prod-category');
  const priceInput = document.getElementById('prod-price');
  const weightInput = document.getElementById('prod-weight');
  const descInput = document.getElementById('prod-desc');
  const imgInput = document.getElementById('prod-image');
  const editIdInput = document.getElementById('edit-product-id');

  if (!nameInput || !catSelect || !priceInput || !weightInput || !descInput) return;

  const name = nameInput.value.trim();
  const category = catSelect.value;
  const price = parseFloat(priceInput.value);
  const weight = weightInput.value.trim(); // Optional now
  const description = descInput.value.trim();
  let image = imgInput.value.trim();

  if (!name || isNaN(price) || !description) {
    showToast('يرجى ملء جميع الحقول المطلوبة بشكل صحيح!', 'error');
    return;
  }

  if (!image) {
    image = CATEGORY_DEFAULT_IMAGES[category] || '';
  }

  const editId = editIdInput.value;

  if (editId) {
    const index = PRODUCTS.findIndex(p => p.id === editId);
    if (index !== -1) {
      PRODUCTS[index] = {
        ...PRODUCTS[index],
        name,
        category,
        price,
        weight, // saved as entered, can be empty string
        description,
        image
      };
    }
  } else {
    const newProduct = {
      id: 'custom_' + Date.now(),
      name,
      category,
      price,
      weight, // saved as entered, can be empty string
      description,
      image,
      isPopular: false
    };
    PRODUCTS.unshift(newProduct);
  }

  localStorage.setItem('almutawakkil_products', JSON.stringify(PRODUCTS));

  // Reset form
  document.getElementById('product-form').reset();
  editIdInput.value = '';
  document.getElementById('form-title').innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary); margin-left: 6px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    إضافة منتج جديد
  `;
  document.getElementById('cancel-edit-btn').style.display = 'none';

  // Reset image file preview
  const fileInput = document.getElementById('prod-image-file');
  if (fileInput) fileInput.value = '';
  const uploadPlaceholder = document.getElementById('upload-placeholder');
  const previewContainer = document.getElementById('upload-preview-container');
  if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
  if (previewContainer) previewContainer.style.display = 'none';

  renderProducts();
  renderAdminProducts();
  
  showToast('تم حفظ المنتج بنجاح!', 'success');
};

window.cancelProductEdit = function() {
  document.getElementById('product-form').reset();
  document.getElementById('edit-product-id').value = '';
  document.getElementById('form-title').innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary); margin-left: 6px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    إضافة منتج جديد
  `;
  document.getElementById('cancel-edit-btn').style.display = 'none';
  
  // Reset image file preview
  const fileInput = document.getElementById('prod-image-file');
  if (fileInput) fileInput.value = '';
  const uploadPlaceholder = document.getElementById('upload-placeholder');
  const previewContainer = document.getElementById('upload-preview-container');
  if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
  if (previewContainer) previewContainer.style.display = 'none';

  window.onCategoryChange();
};

window.editProduct = function(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  document.getElementById('edit-product-id').value = product.id;
  document.getElementById('prod-name').value = product.name;
  document.getElementById('prod-category').value = product.category;
  document.getElementById('prod-price').value = product.price;
  document.getElementById('prod-weight').value = product.weight || '';
  document.getElementById('prod-desc').value = product.description;
  document.getElementById('prod-image').value = product.image;

  document.getElementById('form-title').innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary); margin-left: 6px;"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    تعديل المنتج: ${product.name}
  `;
  document.getElementById('cancel-edit-btn').style.display = 'inline-block';
  
  // Show image preview if exists
  const previewImg = document.getElementById('upload-preview');
  const uploadPlaceholder = document.getElementById('upload-placeholder');
  const previewContainer = document.getElementById('upload-preview-container');
  const fileNameEl = document.getElementById('upload-file-name');
  
  if (product.image) {
    if (previewImg) previewImg.src = product.image;
    if (fileNameEl) {
      if (product.image.startsWith('data:image/')) {
        fileNameEl.textContent = 'صورة مرفوعة من الجهاز';
      } else {
        fileNameEl.textContent = 'رابط الصورة';
      }
    }
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'none';
    if (previewContainer) previewContainer.style.display = 'flex';
  } else {
    if (uploadPlaceholder) uploadPlaceholder.style.display = 'block';
    if (previewContainer) previewContainer.style.display = 'none';
  }

  document.getElementById('product-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
};

window.deleteProduct = function(id) {
  showConfirm('هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً؟', () => {
    const rowEl = document.getElementById('admin-row-' + id);
    const cardEl = document.getElementById('store-card-' + id);
    
    if (rowEl) rowEl.classList.add('row-deleting');
    if (cardEl) cardEl.classList.add('card-deleting');
    
    setTimeout(() => {
      PRODUCTS = PRODUCTS.filter(p => p.id !== id);
      localStorage.setItem('almutawakkil_products', JSON.stringify(PRODUCTS));
      
      renderProducts();
      renderAdminProducts();
      showToast('تم حذف المنتج بنجاح!', 'success');
    }, 500);
  });
};

// ====================================================
// CUSTOM TOAST & CONFIRM MODALS
// ====================================================
function showToast(message, type = 'success') {
  const toast = document.getElementById('custom-toast');
  const toastText = document.getElementById('custom-toast-text');
  const toastIcon = document.getElementById('custom-toast-icon');
  
  if (!toast || !toastText || !toastIcon) return;
  
  toastText.textContent = message;
  
  if (type === 'success') {
    toastIcon.style.backgroundColor = '#22c55e';
    toastIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
  } else if (type === 'error') {
    toastIcon.style.backgroundColor = '#ef4444';
    toastIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  } else {
    toastIcon.style.backgroundColor = '#3b82f6';
    toastIcon.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }
  
  toast.style.display = 'flex';
  toast.style.opacity = '1';
  
  // Simple auto-dismiss after 3 seconds
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 300);
  }, 3000);
}

function showConfirm(message, onConfirm) {
  const modal = document.getElementById('custom-confirm-modal');
  const msgEl = document.getElementById('custom-confirm-msg');
  const yesBtn = document.getElementById('custom-confirm-yes');
  const noBtn = document.getElementById('custom-confirm-no');
  
  if (!modal || !msgEl || !yesBtn || !noBtn) return;
  
  msgEl.textContent = message;
  modal.style.display = 'flex';
  
  const handleYes = () => {
    onConfirm();
    closeModal();
  };
  
  const handleNo = () => {
    closeModal();
  };
  
  const closeModal = () => {
    modal.style.display = 'none';
    yesBtn.removeEventListener('click', handleYes);
    noBtn.removeEventListener('click', handleNo);
  };
  
  yesBtn.addEventListener('click', handleYes);
  noBtn.addEventListener('click', handleNo);
}
