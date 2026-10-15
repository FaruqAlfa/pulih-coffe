/**
 * ==========================================================================
 * PULIH COFFEE — script.js
 * Website statis tanpa backend / database.
 * Semua interaksi (katalog, keranjang, kalkulasi harga, checkout, dan
 * integrasi WhatsApp) diproses di sisi klien menggunakan JavaScript murni.
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. KONFIGURASI TOKO & PEMILIK
   Ubah data di bawah ini sesuai informasi usaha Pulih Coffee Anda.
   ========================================================================== */
const STORE_CONFIG = {
  name: 'Pulih Coffee',

  /**
   * Nomor WhatsApp pemilik toko untuk menerima pesanan.
   * FORMAT: Gunakan kode negara internasional TANPA tanda '+', spasi, atau '-'.
   * Contoh Indonesia: '6281234567890' (jika nomor lokal 081234567890).
   *
   * Nomor WhatsApp aktif Pulih Coffee: 085648962991
   */
  whatsappNumber: '6285648962991',

  /**
   * Alamat fisik / lokasi toko offline & titik acuan pengantaran (delivery).
   */
  address: 'Jl. Totok Kerot, Kaliawen Barat, Ngino, Kec. Plemahan, Kabupaten Kediri, Jawa Timur 64155',

  /**
   * Cakupan / wilayah Delivery Order (DO)
   */
  deliveryCoverage: 'Plemahan, Papar, Purwoasri, Kunjang, Pare',

  /**
   * Koordinat geografis toko offline untuk perhitungan jarak & peta interaktif.
   * (Desa Ngino, Kec. Plemahan, Kab. Kediri, Jawa Timur)
   */
  location: {
    lat: -7.699589,
    lng: 112.140587,
    name: 'Pulih Coffee (Toko Offline)'
  },

  /**
   * Tarif ongkir per 1 kilometer: Rp1.000 / km (pembulatan per km ke atas, minimal 1 km = Rp1.000)
   */
  deliveryRatePerKm: 1000,

  /**
   * Jam operasional pelayanan pesanan:
   * - Buka: Setiap Senin – Sabtu mulai jam 06.00 WIB
   * - Senin – Rabu, Jumat: 06.00 – 20.00 WIB
   * - Kamis: 06.00 – 18.00 WIB (tutup lebih awal)
   * - Sabtu: 06.00 – 23.00 WIB (buka sampai malam)
   * - Minggu: Tutup / Libur
   */
  openingHours: 'Senin–Rabu, Jumat: 06.00–20.00 WIB | Kamis: 06.00–18.00 WIB | Sabtu: 06.00–23.00 WIB | Minggu: Tutup',
};

/* ==========================================================================
   2. KATALOG PRODUK (7 MENU: MINUMAN & CAMILAN CIRENG)
   Data menu disimpan dalam array ini agar pemilik dapat mengubah nama,
   deskripsi, harga, maupun file gambar dengan sangat mudah.
   ========================================================================== */
const PRODUCTS = [
  {
    id: 'butterscotch',
    name: 'Butterscotch',
    type: 'minuman',
    category: 'Minuman',
    desc: 'Kopi susu dengan sentuhan rasa butterscotch yang lembut, manis, dan creamy.',
    price: 10000,
    image: 'assets/images/pulih-ButteScothLatte.jpg',
    alt: 'Butterscotch Pulih Coffee',
    badge: 'Minuman'
  },
  {
    id: 'gula-aren',
    name: 'Gula Aren',
    type: 'minuman',
    category: 'Minuman',
    desc: 'Perpaduan klasik kopi dan gula aren asli yang pas dan nikmat.',
    price: 10000,
    image: 'assets/images/pulih-aren.jpg',
    alt: 'Kopi Susu Gula Aren Pulih Coffee',
    badge: 'Minuman'
  },
  {
    id: 'matcha',
    name: 'Matcha',
    type: 'minuman',
    category: 'Minuman',
    desc: 'Minuman matcha yang lembut, creamy, dan menyegarkan.',
    price: 11000,
    image: 'assets/images/pulih-matcha.jpg',
    alt: 'Matcha Pulih Coffee',
    badge: 'Minuman'
  },
  {
    id: 'cireng-ayam-suwir-goreng',
    name: 'Cireng Ayam Suwir Chili Oil Goreng (Isi 6)',
    type: 'makanan',
    category: 'Camilan',
    desc: 'Cireng renyah isi ayam suwir pedas gurih dengan chili oil (isi 6 pcs / siap santap).',
    price: 10000,
    image: 'assets/images/cireng-chili-oil.jpg',
    alt: 'Cireng Ayam Suwir Chili Oil Goreng isi 6 pcs',
    badge: 'Goreng'
  },
  {
    id: 'cireng-ayam-suwir-frozen',
    name: 'Cireng Ayam Suwir Chili Oil Frozen (Isi 7)',
    type: 'makanan',
    category: 'Frozen Food',
    desc: 'Cireng beku isi ayam suwir pedas chili oil (isi 7 pcs / praktis digoreng sendiri di rumah).',
    price: 10000,
    image: 'assets/images/cireng-frozen-chili.jpg',
    alt: 'Cireng Ayam Suwir Chili Oil Frozen isi 7 pcs',
    badge: 'Frozen'
  },
  {
    id: 'cireng-kuah-creamy-goreng',
    name: 'Cireng Kuah Creamy Goreng (Isi 4)',
    type: 'makanan',
    category: 'Camilan',
    desc: 'Cireng goreng gurih renyah disajikan dengan kuah creamy istimewa (isi 4 pcs / siap santap).',
    price: 10000,
    image: 'assets/images/cireng-kuah-creamy.jpg',
    alt: 'Cireng Kuah Creamy Goreng isi 4 pcs',
    badge: 'Goreng'
  },
  {
    id: 'cireng-kuah-creamy-frozen',
    name: 'Cireng Kuah Creamy Frozen (Isi 5)',
    type: 'makanan',
    category: 'Frozen Food',
    desc: 'Paket cireng beku lengkap dengan bumbu kuah creamy lezat (isi 5 pcs / praktis disajikan hangat).',
    price: 10000,
    image: 'assets/images/cireng-kuah-creamy-frozen.jpg',
    alt: 'Cireng Kuah Creamy Frozen isi 5 pcs',
    badge: 'Frozen'
  }
];

/* ==========================================================================
   3. HELPER & FORMATTER
   ========================================================================== */

/**
 * Format angka ke format Rupiah standar Indonesia:
 * Contoh: 15000 -> "Rp15.000"
 */
const idrFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
});

function formatRupiah(amount) {
  if (typeof amount !== 'number' || isNaN(amount)) return 'Rp0';
  // Hapus spasi tipis (non-breaking space) dari beberapa implementasi browser
  return idrFormatter.format(amount).replace(/\s+/g, '');
}

/**
 * Validasi nomor WhatsApp toko (apakah sudah diganti dari placeholder)
 */
function isConfiguredPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.replace(/[^0-9]/g, '');
  // Minimal 9 digit angka dan bukan string placeholder
  return clean.length >= 9 && !phone.toUpperCase().includes('GANTI');
}

/**
 * Format tampilan nomor telepon agar nyaman dibaca di footer
 */
function formatPhoneDisplay(phone) {
  if (!isConfiguredPhone(phone)) return 'Nomor WhatsApp segera diinfokan';
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('62')) {
    return '+62 ' + clean.slice(2).replace(/(\d{3,4})(\d{4})(\d+)?/, (_, p1, p2, p3) => `${p1}-${p2}${p3 ? '-' + p3 : ''}`);
  }
  return clean;
}

/**
 * Sanitasi string sederhana untuk mencegah XSS jika ditampilkan
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   4. STATE MANAJEMEN KERANJANG (IN-MEMORY + OPSIONAL LOCALSTORAGE)
   ========================================================================== */
const STORAGE_KEY = 'pulih_coffee_cart_v2';

/**
 * Struktur Keranjang:
 * { [productId]: quantity }
 */
let cartState = {};

function loadCartFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const valid = {};
    if (typeof parsed === 'object' && parsed !== null) {
      PRODUCTS.forEach(p => {
        const qty = parseInt(parsed[p.id], 10);
        if (Number.isInteger(qty) && qty > 0) {
          valid[p.id] = Math.min(qty, 99); // batas wajar per item
        }
      });
    }
    return valid;
  } catch (err) {
    return {};
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartState));
  } catch (err) {
    // localStorage mungkin dibatasi pada mode private/incognito tertentu
  }
}

function getProductById(id) {
  return PRODUCTS.find(p => p.id === id) || null;
}

function getCartItems() {
  const items = [];
  for (const [id, qty] of Object.entries(cartState)) {
    const product = getProductById(id);
    if (product && qty > 0) {
      items.push({
        product,
        quantity: qty,
        subtotal: product.price * qty
      });
    }
  }
  return items;
}

function getCartItemCount() {
  return Object.values(cartState).reduce((acc, qty) => acc + (qty > 0 ? qty : 0), 0);
}

function getCartTotal() {
  return getCartItems().reduce((acc, item) => acc + item.subtotal, 0);
}

function addToCart(productId, delta = 1) {
  const current = cartState[productId] || 0;
  const next = current + delta;
  if (next <= 0) {
    delete cartState[productId];
  } else {
    cartState[productId] = Math.min(next, 99);
  }
  saveCartToStorage();
  updateUI({ justAddedId: delta > 0 ? productId : null });
}

function setItemQuantity(productId, qty) {
  const parsed = parseInt(qty, 10);
  if (isNaN(parsed) || parsed <= 0) {
    delete cartState[productId];
  } else {
    cartState[productId] = Math.min(parsed, 99);
  }
  saveCartToStorage();
  updateUI();
}

function removeFromCart(productId) {
  if (cartState[productId]) {
    delete cartState[productId];
    saveCartToStorage();
    updateUI();
  }
}

function clearCart() {
  cartState = {};
  saveCartToStorage();
  updateUI();
}

/* ==========================================================================
/* ==========================================================================
   5. RENDER MENU KATALOG
   ========================================================================== */
function renderProductCardHtml(prod) {
  const qty = cartState[prod.id] || 0;
  const inCart = qty > 0;

  return `
    <div class="col">
      <article class="product-card ${inCart ? 'is-in-cart' : ''}" id="card-${prod.id}" data-product-id="${prod.id}">
        <div class="product-media media-frame">
          <img src="${prod.image}" alt="${escapeHtml(prod.alt)}" width="720" height="720" loading="lazy" decoding="async" onerror="window.pulihImgFallback && window.pulihImgFallback(this)">
          ${prod.category ? `<span class="product-cat">${escapeHtml(prod.category)}</span>` : ''}
          ${prod.badge ? `<span class="product-tag"><i class="bi bi-star-fill" aria-hidden="true"></i> ${escapeHtml(prod.badge)}</span>` : ''}
          ${inCart ? `<span class="product-incart" id="incart-${prod.id}"><i class="bi bi-check2" aria-hidden="true"></i> ${qty} di keranjang</span>` : ''}
        </div>
        <div class="product-body">
          <h3 class="product-name">${escapeHtml(prod.name)}</h3>
          <p class="product-desc">${escapeHtml(prod.desc)}</p>
          <span class="product-price">${formatRupiah(prod.price)}</span>
          <div class="product-action" id="action-${prod.id}">
            ${renderProductActionButton(prod, qty)}
          </div>
        </div>
      </article>
    </div>
  `;
}

function renderMenuGrid() {
  const gridMinuman = document.getElementById('gridMinuman');
  const gridMakanan = document.getElementById('gridMakanan');
  const fallbackSingleGrid = document.getElementById('menuGrid');

  const drinks = PRODUCTS.filter(p => p.type === 'minuman');
  const foods = PRODUCTS.filter(p => p.type === 'makanan');

  if (gridMinuman) {
    gridMinuman.innerHTML = drinks.map(renderProductCardHtml).join('');
  }
  if (gridMakanan) {
    gridMakanan.innerHTML = foods.map(renderProductCardHtml).join('');
  }
  if (fallbackSingleGrid && !gridMinuman && !gridMakanan) {
    fallbackSingleGrid.innerHTML = PRODUCTS.map(renderProductCardHtml).join('');
  }
}

/**
 * Filter tab menu: Semua, Minuman, Makanan & Cireng
 */
function initMenuFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const groupMinuman = document.getElementById('groupMinuman');
  const groupMakanan = document.getElementById('groupMakanan');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update active state
      filterBtns.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Tampilkan atau sembunyikan grup kategori
      if (groupMinuman) {
        const show = filter === 'all' || filter === 'minuman';
        groupMinuman.classList.toggle('is-hidden', !show);
        if (show) groupMinuman.removeAttribute('hidden');
        else groupMinuman.setAttribute('hidden', '');
      }

      if (groupMakanan) {
        const show = filter === 'all' || filter === 'makanan';
        groupMakanan.classList.toggle('is-hidden', !show);
        if (show) groupMakanan.removeAttribute('hidden');
        else groupMakanan.setAttribute('hidden', '');
      }
    });
  });
}


function renderProductActionButton(prod, qty) {
  if (qty > 0) {
    return `
      <div class="qty-stepper" role="group" aria-label="Atur jumlah ${escapeHtml(prod.name)}">
        <button type="button" class="qty-btn" data-action="decrease" data-id="${prod.id}" aria-label="Kurangi 1 ${escapeHtml(prod.name)}">
          <i class="bi bi-dash" aria-hidden="true"></i>
        </button>
        <span class="qty-value" aria-live="polite">${qty}</span>
        <button type="button" class="qty-btn" data-action="increase" data-id="${prod.id}" aria-label="Tambah 1 ${escapeHtml(prod.name)}">
          <i class="bi bi-plus" aria-hidden="true"></i>
        </button>
      </div>
    `;
  }
  return `
    <button type="button" class="btn btn-add" data-action="add" data-id="${prod.id}">
      <i class="bi bi-bag-plus" aria-hidden="true"></i>
      <span class="lbl-long">Tambah ke Keranjang</span>
      <span class="lbl-short">Tambah</span>
    </button>
  `;
}

/**
 * Pembaruan tampilan tombol pada kartu menu tanpa render ulang seluruh grid
 */
function updateMenuCardsUI(justAddedId) {
  PRODUCTS.forEach(prod => {
    const card = document.getElementById(`card-${prod.id}`);
    const actionWrap = document.getElementById(`action-${prod.id}`);
    if (!card || !actionWrap) return;

    const qty = cartState[prod.id] || 0;
    const inCart = qty > 0;

    card.classList.toggle('is-in-cart', inCart);
    actionWrap.innerHTML = renderProductActionButton(prod, qty);

    // Update / tambahkan label indikator di gambar
    const media = card.querySelector('.product-media');
    let incartTag = card.querySelector(`#incart-${prod.id}`);

    if (inCart) {
      if (!incartTag && media) {
        incartTag = document.createElement('span');
        incartTag.className = 'product-incart';
        incartTag.id = `incart-${prod.id}`;
        media.appendChild(incartTag);
      }
      if (incartTag) {
        incartTag.innerHTML = `<i class="bi bi-check2" aria-hidden="true"></i> ${qty} di keranjang`;
      }
    } else if (incartTag) {
      incartTag.remove();
    }

    // Animasi denyut ketika baru ditambahkan
    if (justAddedId === prod.id) {
      card.classList.remove('just-added');
      // trigger reflow
      void card.offsetWidth;
      card.classList.add('just-added');
    }
  });
}

/* ==========================================================================
   6. RENDER OFFCANVAS KERANJANG
   ========================================================================== */
function renderCartUI() {
  const items = getCartItems();
  const count = getCartItemCount();
  const total = getCartTotal();

  // 1. Badge navbar
  const badges = document.querySelectorAll('[data-cart-count]');
  badges.forEach(badge => {
    badge.textContent = count;
    badge.classList.toggle('is-empty', count === 0);
  });

  // 2. Offcanvas header & footer
  const emptyView = document.getElementById('cartEmpty');
  const listView = document.getElementById('cartList');
  const footerView = document.getElementById('cartFooter');
  const summaryText = document.getElementById('cartSummaryText');
  const cartTotalEl = document.getElementById('cartTotal');

  if (summaryText) {
    summaryText.textContent = count > 0 ? `${count} item di dalam keranjang` : 'Belum ada item';
  }

  if (cartTotalEl) {
    cartTotalEl.textContent = formatRupiah(total);
  }

  if (count === 0) {
    if (emptyView) emptyView.hidden = false;
    if (listView) {
      listView.hidden = true;
      listView.innerHTML = '';
    }
    if (footerView) footerView.hidden = true;
  } else {
    if (emptyView) emptyView.hidden = true;
    if (footerView) footerView.hidden = false;
    if (listView) {
      listView.hidden = false;
      listView.innerHTML = items.map(item => `
        <li class="cart-item" data-cart-item="${item.product.id}">
          <div class="cart-thumb media-frame">
            <img src="${item.product.image}" alt="" width="64" height="64" onerror="window.pulihImgFallback && window.pulihImgFallback(this)">
          </div>
          <div class="cart-info">
            <div class="cart-top">
              <h4 class="cart-name">${escapeHtml(item.product.name)}</h4>
              <button type="button" class="cart-remove" data-action="remove" data-id="${item.product.id}" aria-label="Hapus ${escapeHtml(item.product.name)} dari keranjang">
                <i class="bi bi-trash3" aria-hidden="true"></i>
              </button>
            </div>
            <p class="cart-unit">${formatRupiah(item.product.price)} / porsi</p>
            <div class="cart-bottom">
              <div class="qty-stepper sm" role="group" aria-label="Atur jumlah ${escapeHtml(item.product.name)}">
                <button type="button" class="qty-btn" data-action="decrease" data-id="${item.product.id}" aria-label="Kurangi jumlah">
                  <i class="bi bi-dash" aria-hidden="true"></i>
                </button>
                <span class="qty-value" aria-live="polite">${item.quantity}</span>
                <button type="button" class="qty-btn" data-action="increase" data-id="${item.product.id}" aria-label="Tambah jumlah">
                  <i class="bi bi-plus" aria-hidden="true"></i>
                </button>
              </div>
              <strong class="cart-subtotal">${formatRupiah(item.subtotal)}</strong>
            </div>
          </div>
        </li>
      `).join('');
    }
  }

  // 3. Floating cart bar di mobile
  const cartBar = document.getElementById('cartBar');
  const cartBarCount = document.getElementById('cartBarCount');
  const cartBarTotal = document.getElementById('cartBarTotal');

  if (cartBar) {
    if (count > 0) {
      cartBar.classList.add('is-visible');
      document.body.classList.add('has-cartbar');
      if (cartBarCount) cartBarCount.textContent = `${count} item`;
      if (cartBarTotal) cartBarTotal.textContent = formatRupiah(total);
    } else {
      cartBar.classList.remove('is-visible');
      document.body.classList.remove('has-cartbar');
    }
  }
}

/**
 * Gabungan update seluruh UI yang bergantung pada keranjang
 */
function updateUI({ justAddedId = null } = {}) {
  updateMenuCardsUI(justAddedId);
  renderCartUI();

  // Efek animasi bump pada badge keranjang navbar jika bertambah
  if (justAddedId) {
    const badge = document.querySelector('[data-cart-count]');
    if (badge) {
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    }
  }
}

/* ==========================================================================
   7. TOAST NOTIFIKASI
   ========================================================================== */
let toastInstance = null;

function showToast(message, { icon = 'bi-check2' } = {}) {
  const toastEl = document.getElementById('cartToast');
  if (!toastEl || typeof bootstrap === 'undefined') return;

  const textEl = document.getElementById('cartToastText');
  const iconEl = document.getElementById('cartToastIcon');
  if (textEl) textEl.textContent = message;
  if (iconEl) iconEl.className = `bi ${icon}`;

  if (!toastInstance) {
    toastInstance = new bootstrap.Toast(toastEl, { delay: 3000 });
  }
  toastInstance.show();
}

/* ==========================================================================
   8. CHECKOUT & INTEGRASI WHATSAPP
   ========================================================================== */

/**
 * State form checkout sementara di memori browser
 */
const checkoutData = {
  name: '',
  fulfillment: '', // 'pickup' | 'delivery'
  address: '',
  distanceKm: 1.0, // Jarak pengantaran dalam km
  deliveryFee: 1000, // Ongkir (Rp1.000 per 1 km)
  customerCoords: null, // { lat: number, lng: number }
  payment: '', // 'cash' | 'transfer'
  note: ''
};

let currentCheckoutStep = 1;

/**
 * Hitung jarak antara 2 titik koordinat bumi dengan rumus Haversine (hasil dalam km, 1 desimal)
 */
function calculateHaversineDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius bumi dalam kilometer
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const dist = R * c;
  return Math.max(0.1, parseFloat(dist.toFixed(1)));
}

/**
 * Hitung ongkir pengantaran: Rp1.000 per 1 Kilometer.
 * Pembulatan per kilometer penuh ke atas (misal 2.3 km dihitung 3 km = Rp3.000, minimal 1 km = Rp1.000).
 */
function calculateDeliveryFee(distanceKm) {
  if (typeof distanceKm !== 'number' || isNaN(distanceKm) || distanceKm <= 0) {
    return STORE_CONFIG.deliveryRatePerKm;
  }
  const billedKm = Math.max(1, Math.ceil(distanceKm));
  return billedKm * STORE_CONFIG.deliveryRatePerKm;
}

/**
 * Total keseluruhan pesanan (subtotal produk + ongkir jika COD/Diantar)
 */
function getCheckoutGrandTotal() {
  const subtotal = getCartTotal();
  if (checkoutData.fulfillment === 'delivery') {
    const fee = typeof checkoutData.deliveryFee === 'number' ? checkoutData.deliveryFee : calculateDeliveryFee(checkoutData.distanceKm);
    return subtotal + fee;
  }
  return subtotal;
}

/* State & instance peta Leaflet */
let deliveryMap = null;
let storeMarker = null;
let customerMarker = null;
let routeLine = null;
let mapInitialized = false;

/**
 * Inisialisasi peta Leaflet untuk penentuan titik antar & perhitungan jarak
 */
function initDeliveryMap() {
  const mapEl = document.getElementById('deliveryMap');
  if (!mapEl) return;

  // Jika Leaflet tidak tersedia (misal offline atau CDN terblokir)
  if (typeof L === 'undefined') {
    const wrapper = document.getElementById('deliveryMapContainer');
    if (wrapper) {
      wrapper.innerHTML = `
        <div class="alert alert-pulih-info mb-0 p-3" style="background:var(--pc-brown-soft); border-radius:12px; font-size:.85rem;">
          <i class="bi bi-info-circle me-1"></i> Mode peta offline: Anda tetap dapat mengatur jarak pengantaran secara akurat menggunakan tombol <strong>GPS</strong> atau tombol <strong>[ - ] [ + ]</strong> di bawah.
        </div>
      `;
    }
    return;
  }

  const storeLat = STORE_CONFIG.location.lat;
  const storeLng = STORE_CONFIG.location.lng;

  // Jika peta sudah pernah diinisialisasi sebelumnya, sesuaikan ukuran tampilan
  if (mapInitialized && deliveryMap) {
    deliveryMap.invalidateSize();
    return;
  }

  // Posisi default titik customer (~1.2 km di timur/selatan toko)
  if (!checkoutData.customerCoords) {
    checkoutData.customerCoords = {
      lat: parseFloat((storeLat - 0.009).toFixed(6)),
      lng: parseFloat((storeLng + 0.007).toFixed(6))
    };
  }

  // Hitung jarak & ongkir awal
  checkoutData.distanceKm = calculateHaversineDistanceKm(
    storeLat,
    storeLng,
    checkoutData.customerCoords.lat,
    checkoutData.customerCoords.lng
  );
  checkoutData.deliveryFee = calculateDeliveryFee(checkoutData.distanceKm);

  try {
    deliveryMap = L.map('deliveryMap', {
      center: [storeLat, storeLng],
      zoom: 14,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(deliveryMap);

    // Marker Toko Offline Pulih Coffee
    const storeIcon = L.divIcon({
      className: 'custom-leaflet-marker marker-store',
      html: '<div class="pin-inner" title="Toko Offline Pulih Coffee"><i class="bi bi-shop"></i></div>',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -20]
    });

    storeMarker = L.marker([storeLat, storeLng], { icon: storeIcon }).addTo(deliveryMap);
    storeMarker.bindPopup(`
      <div class="map-popup-card">
        <strong>☕ Pulih Coffee (Toko Offline)</strong>
        <p class="small mb-0 text-muted-pulih">${escapeHtml(STORE_CONFIG.address)}</p>
      </div>
    `);

    // Marker Pelanggan (dapat digeser / draggable)
    const custIcon = L.divIcon({
      className: 'custom-leaflet-marker marker-customer',
      html: '<div class="pin-inner pin-pulse" title="Titik Antar (Geser Pin Ini)"><i class="bi bi-geo-alt-fill"></i></div>',
      iconSize: [36, 36],
      iconAnchor: [18, 32],
      popupAnchor: [0, -32]
    });

    customerMarker = L.marker(
      [checkoutData.customerCoords.lat, checkoutData.customerCoords.lng],
      { icon: custIcon, draggable: true }
    ).addTo(deliveryMap);

    customerMarker.bindPopup(`
      <div class="map-popup-card text-center">
        <strong>📍 Titik Pengantaran Kamu</strong>
        <p class="small mb-0 text-muted-pulih">Geser pin ini atau ketuk peta sesuai lokasi antarmu</p>
      </div>
    `);

    // Garis rute pengiriman
    routeLine = L.polyline(
      [
        [storeLat, storeLng],
        [checkoutData.customerCoords.lat, checkoutData.customerCoords.lng]
      ],
      {
        color: '#CF7697',
        dashArray: '6, 8',
        weight: 3.5,
        opacity: 0.85
      }
    ).addTo(deliveryMap);

    // Zoom agar toko dan customer terlihat
    const bounds = L.latLngBounds([
      [storeLat, storeLng],
      [checkoutData.customerCoords.lat, checkoutData.customerCoords.lng]
    ]);
    deliveryMap.fitBounds(bounds, { padding: [30, 30] });

    // Event listener geser marker customer
    customerMarker.on('drag', (e) => {
      updateLocationFromCoords(e.target.getLatLng(), false);
    });

    customerMarker.on('dragend', (e) => {
      updateLocationFromCoords(e.target.getLatLng(), true);
    });

    // Event klik pada peta
    deliveryMap.on('click', (e) => {
      customerMarker.setLatLng(e.latlng);
      updateLocationFromCoords(e.latlng, true);
    });

    mapInitialized = true;
  } catch (err) {
    console.warn('Gagal memuat peta Leaflet:', err);
  }

  updateDeliveryUI();
}

/**
 * Sinkronisasi state saat koordinat customer digeser di peta
 */
function updateLocationFromCoords(latlng, autoPan = false) {
  checkoutData.customerCoords = {
    lat: parseFloat(latlng.lat.toFixed(6)),
    lng: parseFloat(latlng.lng.toFixed(6))
  };

  const dist = calculateHaversineDistanceKm(
    STORE_CONFIG.location.lat,
    STORE_CONFIG.location.lng,
    checkoutData.customerCoords.lat,
    checkoutData.customerCoords.lng
  );

  checkoutData.distanceKm = dist;
  checkoutData.deliveryFee = calculateDeliveryFee(dist);

  if (routeLine) {
    routeLine.setLatLngs([
      [STORE_CONFIG.location.lat, STORE_CONFIG.location.lng],
      [checkoutData.customerCoords.lat, checkoutData.customerCoords.lng]
    ]);
  }

  const distInput = document.getElementById('distManualInput');
  if (distInput) distInput.value = dist.toString();

  updateDeliveryUI();
  updateCheckoutFooterTotal();

  if (autoPan && deliveryMap) {
    deliveryMap.panTo([checkoutData.customerCoords.lat, checkoutData.customerCoords.lng]);
  }
}

/**
 * Sinkronisasi state saat pengguna mengubah jarak secara manual (stepper atau input angka)
 */
function updateLocationFromManualDistance(distKm) {
  const d = Math.max(0.1, parseFloat(distKm) || 1.0);
  checkoutData.distanceKm = parseFloat(d.toFixed(1));
  checkoutData.deliveryFee = calculateDeliveryFee(checkoutData.distanceKm);

  // Proyeksikan posisi marker di peta jika ada
  if (deliveryMap && customerMarker) {
    const storeLat = STORE_CONFIG.location.lat;
    const storeLng = STORE_CONFIG.location.lng;
    // Estimasi 1 derajat latitude ~ 111 km
    const latOffset = -(checkoutData.distanceKm / 111.0);
    const newLatLng = L.latLng(storeLat + latOffset, storeLng);
    customerMarker.setLatLng(newLatLng);
    if (routeLine) {
      routeLine.setLatLngs([[storeLat, storeLng], newLatLng]);
    }
    checkoutData.customerCoords = {
      lat: parseFloat(newLatLng.lat.toFixed(6)),
      lng: parseFloat(newLatLng.lng.toFixed(6))
    };
  }

  const distInput = document.getElementById('distManualInput');
  if (distInput && parseFloat(distInput.value) !== checkoutData.distanceKm) {
    distInput.value = checkoutData.distanceKm.toString();
  }

  updateDeliveryUI();
  updateCheckoutFooterTotal();
}

/**
 * Deteksi lokasi pengguna via browser Geolocation API (GPS)
 */
function handleGpsDetection() {
  const btn = document.getElementById('btnDetectGps');
  const btnText = document.getElementById('btnGpsText');

  if (!navigator.geolocation) {
    showGpsAlert('Perangkat / browser kamu tidak mendukung fitur GPS Geolocation.', 'warning');
    return;
  }

  if (btn) btn.disabled = true;
  if (btnText) btnText.textContent = 'Mencari Lokasi...';
  showGpsAlert('<span class="spinner-border spinner-border-sm me-1" role="status"></span> Menghubungkan ke GPS...', 'info');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Gunakan GPS';

      if (customerMarker && deliveryMap) {
        const targetLatLng = L.latLng(lat, lng);
        customerMarker.setLatLng(targetLatLng);
        updateLocationFromCoords(targetLatLng, true);
        deliveryMap.setView(targetLatLng, 15);
      } else {
        checkoutData.customerCoords = {
          lat: parseFloat(lat.toFixed(6)),
          lng: parseFloat(lng.toFixed(6))
        };
        const dist = calculateHaversineDistanceKm(
          STORE_CONFIG.location.lat,
          STORE_CONFIG.location.lng,
          lat,
          lng
        );
        checkoutData.distanceKm = dist;
        checkoutData.deliveryFee = calculateDeliveryFee(dist);
        const distInput = document.getElementById('distManualInput');
        if (distInput) distInput.value = dist.toString();
        updateDeliveryUI();
        updateCheckoutFooterTotal();
      }

      showGpsAlert(
        `<i class="bi bi-check-circle-fill text-success"></i> Lokasi GPS terdeteksi! Estimasi jarak: <strong>${checkoutData.distanceKm} km</strong> (Ongkir: <strong>${formatRupiah(checkoutData.deliveryFee)}</strong>).`,
        'success'
      );
    },
    (error) => {
      if (btn) btn.disabled = false;
      if (btnText) btnText.textContent = 'Gunakan GPS';

      let msg = 'Gagal mengakses GPS. ';
      if (error.code === error.PERMISSION_DENIED) {
        msg += 'Izin lokasi tidak diberikan. Kamu bisa geser pin di peta atau masukkan jarak manual di bawah.';
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        msg += 'Informasi lokasi tidak tersedia. Silakan geser pin di peta atau masukkan jarak manual.';
      } else if (error.code === error.TIMEOUT) {
        msg += 'Waktu permintaan lokasi habis (timeout). Silakan coba lagi atau gunakan input manual.';
      } else {
        msg += 'Silakan geser pin merah di peta atau masukkan jarak secara manual.';
      }
      showGpsAlert(`<i class="bi bi-exclamation-circle text-danger"></i> ${msg}`, 'warning');
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000
    }
  );
}

function showGpsAlert(html, type = 'info') {
  const alertEl = document.getElementById('gpsAlert');
  if (!alertEl) return;
  alertEl.className = `alert alert-${type} alert-gps mt-2 mb-2`;
  alertEl.innerHTML = html;
  alertEl.classList.remove('d-none');
}

/**
 * Perbarui teks breakdown jarak dan ongkir secara live di form
 */
function updateDeliveryUI() {
  const dist = checkoutData.distanceKm || 1.0;
  const billedKm = Math.max(1, Math.ceil(dist));
  const rate = STORE_CONFIG.deliveryRatePerKm;
  const fee = billedKm * rate;

  const liveDist = document.getElementById('liveDistText');
  const liveRate = document.getElementById('liveRateText');
  const liveFee = document.getElementById('liveFeeAmount');

  if (liveDist) {
    liveDist.textContent = `${dist} km (dihitung ${billedKm} km)`;
  }
  if (liveRate) {
    liveRate.textContent = `${billedKm} km × ${formatRupiah(rate)}`;
  }
  if (liveFee) {
    liveFee.textContent = formatRupiah(fee);
  }
}

function initCheckoutModal() {
  const checkoutModalEl = document.getElementById('checkoutModal');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const form = document.getElementById('checkoutForm');
  const editCartBtn = document.getElementById('editCartBtn');
  const btnBack = document.getElementById('btnBack');
  const btnNext = document.getElementById('btnNext');
  const btnSendWa = document.getElementById('btnSendWa');
  const btnReopenWa = document.getElementById('btnReopenWa');
  const btnFinish = document.getElementById('btnFinish');

  if (!checkoutModalEl) return;

  // Pastikan peta Leaflet menyesuaikan ukuran saat modal dibuka
  checkoutModalEl.addEventListener('shown.bs.modal', () => {
    if (checkoutData.fulfillment === 'delivery') {
      if (!mapInitialized) {
        initDeliveryMap();
      } else if (deliveryMap) {
        deliveryMap.invalidateSize();
      }
    }
  });

  // Buka checkout saat klik "Lanjutkan Pemesanan" dari keranjang
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (getCartItemCount() === 0) {
        showToast('Keranjang masih kosong.', { icon: 'bi-exclamation-circle' });
        return;
      }
      // Tutup offcanvas keranjang
      const offcanvasEl = document.getElementById('cartSheet');
      if (offcanvasEl && typeof bootstrap !== 'undefined') {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();
      }

      setCheckoutStep(1);
      renderMiniOrder();
      const modal = bootstrap.Modal.getOrCreateInstance(checkoutModalEl);
      modal.show();
    });
  }

  // Tombol "Ubah" di ringkasan mini order kembali ke keranjang
  if (editCartBtn) {
    editCartBtn.addEventListener('click', () => {
      const modal = bootstrap.Modal.getInstance(checkoutModalEl);
      if (modal) modal.hide();

      setTimeout(() => {
        const offcanvasEl = document.getElementById('cartSheet');
        if (offcanvasEl && typeof bootstrap !== 'undefined') {
          const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
          offcanvas.show();
        }
      }, 350);
    });
  }

  // Interaksi opsi fulfillment (Ambil di Tempat vs COD / Diantar)
  const fulRadios = document.querySelectorAll('input[name="fulfillment"]');
  const pickupInfo = document.getElementById('pickupInfo');
  const deliveryFields = document.getElementById('deliveryFields');
  const custAddressInput = document.getElementById('custAddress');
  const fulfillmentGroup = document.getElementById('fulfillmentGroup');
  const fulfillmentError = document.getElementById('fulfillmentError');

  fulRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (fulfillmentGroup) fulfillmentGroup.classList.remove('is-invalid');
      if (fulfillmentError) fulfillmentError.classList.remove('is-shown');

      checkoutData.fulfillment = radio.value;

      if (radio.value === 'pickup') {
        if (pickupInfo) pickupInfo.hidden = false;
        if (deliveryFields) deliveryFields.hidden = true;
        if (custAddressInput) custAddressInput.required = false;
      } else if (radio.value === 'delivery') {
        if (pickupInfo) pickupInfo.hidden = true;
        if (deliveryFields) deliveryFields.hidden = false;
        if (custAddressInput) custAddressInput.required = true;

        setTimeout(() => {
          if (!mapInitialized) {
            initDeliveryMap();
          } else if (deliveryMap) {
            deliveryMap.invalidateSize();
          }
        }, 150);

        updateDeliveryUI();
      }

      updateCheckoutFooterTotal();
    });
  });

  // Tombol deteksi GPS
  const btnDetectGps = document.getElementById('btnDetectGps');
  if (btnDetectGps) {
    btnDetectGps.addEventListener('click', handleGpsDetection);
  }

  // Tombol kurangi jarak stepper manual
  const btnDistMinus = document.getElementById('btnDistMinus');
  if (btnDistMinus) {
    btnDistMinus.addEventListener('click', () => {
      const cur = checkoutData.distanceKm || 1.0;
      const next = Math.max(0.1, cur - 1.0);
      updateLocationFromManualDistance(next);
    });
  }

  // Tombol tambah jarak stepper manual
  const btnDistPlus = document.getElementById('btnDistPlus');
  if (btnDistPlus) {
    btnDistPlus.addEventListener('click', () => {
      const cur = checkoutData.distanceKm || 1.0;
      const next = cur + 1.0;
      updateLocationFromManualDistance(next);
    });
  }

  // Input langsung jarak manual
  const distManualInput = document.getElementById('distManualInput');
  if (distManualInput) {
    distManualInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        updateLocationFromManualDistance(val);
      }
    });
  }

  // Interaksi opsi pembayaran (Cash vs Transfer)
  const payRadios = document.querySelectorAll('input[name="payment"]');
  const cashInfo = document.getElementById('cashInfo');
  const transferInfo = document.getElementById('transferInfo');
  const paymentGroup = document.getElementById('paymentGroup');
  const paymentError = document.getElementById('paymentError');

  payRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (paymentGroup) paymentGroup.classList.remove('is-invalid');
      if (paymentError) paymentError.classList.remove('is-shown');

      if (radio.value === 'cash') {
        if (cashInfo) cashInfo.hidden = false;
        if (transferInfo) transferInfo.hidden = true;
      } else if (radio.value === 'transfer') {
        if (cashInfo) cashInfo.hidden = true;
        if (transferInfo) transferInfo.hidden = false;
      }
    });
  });

  // Penghitung karakter catatan
  const noteInput = document.getElementById('custNote');
  const noteCount = document.getElementById('noteCount');
  if (noteInput && noteCount) {
    noteInput.addEventListener('input', () => {
      noteCount.textContent = noteInput.value.length;
    });
  }

  // Handle submit form (Langkah 1 -> Langkah 2)
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateCheckoutStep1()) {
        saveCheckoutStep1Data();
        renderSummaryStep();
        setCheckoutStep(2);
      }
    });
  }

  // Tombol Kembali / Ubah (Langkah 2 -> Langkah 1)
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      setCheckoutStep(1);
    });
  }

  // Tombol Kirim Pesanan via WhatsApp (Langkah 2 -> Buka WA -> Langkah 3)
  if (btnSendWa) {
    btnSendWa.addEventListener('click', () => {
      executeWhatsAppOrder();
    });
  }

  // Tombol Buka WhatsApp Lagi (Langkah 3)
  if (btnReopenWa) {
    btnReopenWa.addEventListener('click', () => {
      executeWhatsAppOrder({ reopenOnly: true });
    });
  }

  // Tombol Selesai & Kosongkan Keranjang (Langkah 3)
  if (btnFinish) {
    btnFinish.addEventListener('click', () => {
      clearCart();
      const modal = bootstrap.Modal.getInstance(checkoutModalEl);
      if (modal) modal.hide();
      form.reset();
      checkoutData.name = '';
      checkoutData.fulfillment = '';
      checkoutData.address = '';
      checkoutData.distanceKm = 1.0;
      checkoutData.deliveryFee = 1000;
      checkoutData.customerCoords = null;
      checkoutData.payment = '';
      checkoutData.note = '';
      if (noteCount) noteCount.textContent = '0';
      if (pickupInfo) pickupInfo.hidden = true;
      if (deliveryFields) deliveryFields.hidden = true;
      if (cashInfo) cashInfo.hidden = true;
      if (transferInfo) transferInfo.hidden = true;
      const gpsAlert = document.getElementById('gpsAlert');
      if (gpsAlert) gpsAlert.classList.add('d-none');
      showToast('Terima kasih! Pesanan kamu sedang menunggu konfirmasi via WhatsApp.', { icon: 'bi-heart-fill' });
    });
  }

  // Update total pada footer modal
  updateCheckoutFooterTotal();
}

function updateCheckoutFooterTotal() {
  const el = document.getElementById('checkoutTotal');
  const labelEl = document.getElementById('checkoutTotalLabel');
  const subtotal = getCartTotal();

  if (checkoutData.fulfillment === 'delivery') {
    const fee = typeof checkoutData.deliveryFee === 'number' ? checkoutData.deliveryFee : calculateDeliveryFee(checkoutData.distanceKm);
    const grand = subtotal + fee;
    if (el) el.textContent = formatRupiah(grand);
    if (labelEl) labelEl.textContent = `Total (+ ongkir ${formatRupiah(fee)})`;
  } else {
    if (el) el.textContent = formatRupiah(subtotal);
    if (labelEl) labelEl.textContent = 'Total produk';
  }
}

function setCheckoutStep(step) {
  currentCheckoutStep = step;

  const formSection = document.getElementById('checkoutForm');
  const summarySection = document.getElementById('stepSummary');
  const sentSection = document.getElementById('stepSent');
  const modalTitle = document.getElementById('checkoutTitle');

  const btnBack = document.getElementById('btnBack');
  const btnNext = document.getElementById('btnNext');
  const btnSendWa = document.getElementById('btnSendWa');
  const btnReopenWa = document.getElementById('btnReopenWa');
  const btnFinish = document.getElementById('btnFinish');

  // Indikator langkah 1, 2, 3
  const stepIndicators = document.querySelectorAll('[data-step-indicator]');
  stepIndicators.forEach(ind => {
    const s = parseInt(ind.getAttribute('data-step-indicator'), 10);
    ind.classList.remove('is-active', 'is-done');
    ind.removeAttribute('aria-current');
    if (s === step) {
      ind.classList.add('is-active');
      ind.setAttribute('aria-current', 'step');
    } else if (s < step) {
      ind.classList.add('is-done');
    }
  });

  if (step === 1) {
    if (formSection) formSection.hidden = false;
    if (summarySection) summarySection.hidden = true;
    if (sentSection) sentSection.hidden = true;
    if (modalTitle) modalTitle.textContent = 'Atur Pesananmu';

    if (btnBack) btnBack.hidden = true;
    if (btnNext) btnNext.hidden = false;
    if (btnSendWa) btnSendWa.hidden = true;
    if (btnReopenWa) btnReopenWa.hidden = true;
    if (btnFinish) btnFinish.hidden = true;
  } else if (step === 2) {
    if (formSection) formSection.hidden = true;
    if (summarySection) summarySection.hidden = false;
    if (sentSection) sentSection.hidden = true;
    if (modalTitle) modalTitle.textContent = 'Periksa Ringkasan Pesanan';

    if (btnBack) btnBack.hidden = false;
    if (btnNext) btnNext.hidden = true;
    if (btnSendWa) btnSendWa.hidden = false;
    if (btnReopenWa) btnReopenWa.hidden = true;
    if (btnFinish) btnFinish.hidden = true;
  } else if (step === 3) {
    if (formSection) formSection.hidden = true;
    if (summarySection) summarySection.hidden = true;
    if (sentSection) sentSection.hidden = false;
    if (modalTitle) modalTitle.textContent = 'Pesanan Menunggu Konfirmasi';

    if (btnBack) btnBack.hidden = true;
    if (btnNext) btnNext.hidden = true;
    if (btnSendWa) btnSendWa.hidden = true;
    if (btnReopenWa) btnReopenWa.hidden = false;
    if (btnFinish) btnFinish.hidden = false;
  }

  updateCheckoutFooterTotal();
}

function renderMiniOrder() {
  const listEl = document.getElementById('miniOrderList');
  const countEl = document.getElementById('miniOrderCount');
  const items = getCartItems();
  const count = getCartItemCount();

  if (countEl) countEl.textContent = `${count} item`;
  if (listEl) {
    listEl.innerHTML = items.map(item => `
      <li>
        <span>${escapeHtml(item.product.name)} <small class="text-muted-pulih">x${item.quantity}</small></span>
        <span>${formatRupiah(item.subtotal)}</span>
      </li>
    `).join('');
  }
}

function validateCheckoutStep1() {
  let isValid = true;

  // 1. Nama
  const nameInput = document.getElementById('custName');
  if (nameInput) {
    const val = nameInput.value.trim();
    if (val.length < 2) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }
  }

  // 2. Fulfillment
  const fulChecked = document.querySelector('input[name="fulfillment"]:checked');
  const fulfillmentGroup = document.getElementById('fulfillmentGroup');
  const fulfillmentError = document.getElementById('fulfillmentError');
  if (!fulChecked) {
    if (fulfillmentGroup) fulfillmentGroup.classList.add('is-invalid');
    if (fulfillmentError) fulfillmentError.classList.add('is-shown');
    isValid = false;
  } else {
    if (fulfillmentGroup) fulfillmentGroup.classList.remove('is-invalid');
    if (fulfillmentError) fulfillmentError.classList.remove('is-shown');

    // Jika COD / delivery, alamat wajib diisi minimal 10 karakter
    if (fulChecked.value === 'delivery') {
      const addressInput = document.getElementById('custAddress');
      if (addressInput) {
        const addr = addressInput.value.trim();
        if (addr.length < 10) {
          addressInput.classList.add('is-invalid');
          isValid = false;
        } else {
          addressInput.classList.remove('is-invalid');
        }
      }
    }
  }

  // 3. Payment
  const payChecked = document.querySelector('input[name="payment"]:checked');
  const paymentGroup = document.getElementById('paymentGroup');
  const paymentError = document.getElementById('paymentError');
  if (!payChecked) {
    if (paymentGroup) paymentGroup.classList.add('is-invalid');
    if (paymentError) paymentError.classList.add('is-shown');
    isValid = false;
  } else {
    if (paymentGroup) paymentGroup.classList.remove('is-invalid');
    if (paymentError) paymentError.classList.remove('is-shown');
  }

  return isValid;
}

function saveCheckoutStep1Data() {
  const nameInput = document.getElementById('custName');
  const fulChecked = document.querySelector('input[name="fulfillment"]:checked');
  const addressInput = document.getElementById('custAddress');
  const payChecked = document.querySelector('input[name="payment"]:checked');
  const noteInput = document.getElementById('custNote');
  const distInput = document.getElementById('distManualInput');

  checkoutData.name = nameInput ? nameInput.value.trim() : '';
  checkoutData.fulfillment = fulChecked ? fulChecked.value : '';
  checkoutData.address = addressInput && checkoutData.fulfillment === 'delivery' ? addressInput.value.trim() : '';
  checkoutData.payment = payChecked ? payChecked.value : '';
  checkoutData.note = noteInput ? noteInput.value.trim() : '';

  if (checkoutData.fulfillment === 'delivery') {
    if (distInput && !isNaN(parseFloat(distInput.value))) {
      checkoutData.distanceKm = Math.max(0.1, parseFloat(parseFloat(distInput.value).toFixed(1)));
    } else if (!checkoutData.distanceKm) {
      checkoutData.distanceKm = 1.0;
    }
    checkoutData.deliveryFee = calculateDeliveryFee(checkoutData.distanceKm);
  } else {
    checkoutData.deliveryFee = 0;
  }
}

function renderSummaryStep() {
  const items = getCartItems();
  const subtotal = getCartTotal();
  const isDelivery = checkoutData.fulfillment === 'delivery';
  const deliveryFee = isDelivery ? (checkoutData.deliveryFee || calculateDeliveryFee(checkoutData.distanceKm)) : 0;
  const grandTotal = subtotal + deliveryFee;

  // Tabel produk
  const itemsTbody = document.getElementById('summaryItems');
  const subtotalTd = document.getElementById('summarySubtotal');
  const deliveryRow = document.getElementById('summaryDeliveryRow');
  const deliveryDistSpan = document.getElementById('summaryDeliveryDist');
  const deliveryFeeTd = document.getElementById('summaryDeliveryFee');
  const totalTd = document.getElementById('summaryTotal');

  if (itemsTbody) {
    itemsTbody.innerHTML = items.map(item => `
      <tr>
        <td>
          <span class="sum-name">${escapeHtml(item.product.name)}</span>
          <span class="sum-unit">${formatRupiah(item.product.price)} / porsi</span>
        </td>
        <td class="text-center">x${item.quantity}</td>
        <td class="text-end">${formatRupiah(item.subtotal)}</td>
      </tr>
    `).join('');
  }

  if (subtotalTd) subtotalTd.textContent = formatRupiah(subtotal);

  if (deliveryRow) {
    deliveryRow.hidden = !isDelivery;
    if (isDelivery) {
      const billedKm = Math.max(1, Math.ceil(checkoutData.distanceKm));
      if (deliveryDistSpan) deliveryDistSpan.textContent = `${checkoutData.distanceKm} km (dihitung ${billedKm} km)`;
      if (deliveryFeeTd) deliveryFeeTd.textContent = formatRupiah(deliveryFee);
    }
  }

  if (totalTd) totalTd.textContent = formatRupiah(grandTotal);

  // Detail penerimaan & pembayaran
  const detailsDl = document.getElementById('summaryDetails');
  const fulLabel = isDelivery ? 'COD / Diantar' : 'Ambil di Tempat';
  const payLabel = checkoutData.payment === 'transfer' ? 'Transfer Bank' : 'Cash / Tunai';

  if (detailsDl) {
    let rows = `
      <div><dt>Nama Pemesan</dt><dd>${escapeHtml(checkoutData.name)}</dd></div>
      <div><dt>Cara Terima</dt><dd>${escapeHtml(fulLabel)}</dd></div>
    `;

    if (isDelivery) {
      const billedKm = Math.max(1, Math.ceil(checkoutData.distanceKm));
      rows += `
        <div><dt>Toko Pengirim</dt><dd>${escapeHtml(STORE_CONFIG.address)}</dd></div>
        <div><dt>Wilayah DO</dt><dd>Plemahan, Papar, Purwoasri, Kunjang, Pare</dd></div>
        <div><dt>Alamat Antar</dt><dd>${escapeHtml(checkoutData.address)}</dd></div>
        <div><dt>Estimasi Jarak</dt><dd>${checkoutData.distanceKm} km (dihitung ${billedKm} km)</dd></div>
        <div><dt>Biaya Ongkir</dt><dd><strong>${formatRupiah(deliveryFee)}</strong> (Tarif Rp1.000 / km)</dd></div>
      `;
      if (checkoutData.customerCoords) {
        const mapsUrl = `https://maps.google.com/?q=${checkoutData.customerCoords.lat},${checkoutData.customerCoords.lng}`;
        rows += `<div><dt>Titik Lokasi</dt><dd><a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="link-maps"><i class="bi bi-geo-alt-fill" aria-hidden="true"></i> Buka Titik Antar di Google Maps <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i></a></dd></div>`;
      }
    } else {
      rows += `<div><dt>Lokasi Pengambilan</dt><dd>${escapeHtml(STORE_CONFIG.address)}</dd></div>`;
    }

    rows += `<div><dt>Metode Bayar</dt><dd>${escapeHtml(payLabel)}</dd></div>`;

    if (checkoutData.note) {
      rows += `<div><dt>Catatan</dt><dd>${escapeHtml(checkoutData.note)}</dd></div>`;
    }

    detailsDl.innerHTML = rows;
  }

  // Catatan khusus di ringkasan
  const delivNote = document.getElementById('summaryDeliveryNote');
  const delivNoteFee = document.getElementById('summaryDeliveryNoteFee');
  const delivNoteKm = document.getElementById('summaryDeliveryNoteKm');
  const transNote = document.getElementById('summaryTransferNote');

  if (delivNote) {
    delivNote.hidden = !isDelivery;
    if (isDelivery) {
      if (delivNoteFee) delivNoteFee.textContent = formatRupiah(deliveryFee);
      if (delivNoteKm) delivNoteKm.textContent = `${checkoutData.distanceKm} km`;
    }
  }
  if (transNote) transNote.hidden = checkoutData.payment !== 'transfer';

  // Peringatan jika nomor WhatsApp belum dikonfigurasi pemilik
  const waAlert = document.getElementById('waConfigError');
  const btnSendWa = document.getElementById('btnSendWa');
  const isConfigured = isConfiguredPhone(STORE_CONFIG.whatsappNumber);

  if (waAlert) waAlert.hidden = isConfigured;
  if (btnSendWa) {
    btnSendWa.disabled = !isConfigured;
    if (!isConfigured) {
      btnSendWa.title = 'Silakan atur STORE_CONFIG.whatsappNumber di js/script.js';
    } else {
      btnSendWa.removeAttribute('title');
    }
  }
}

/**
 * Susun pesan WhatsApp otomatis dan buka link wa.me
 */
function buildWhatsAppMessage() {
  const items = getCartItems();
  const subtotal = getCartTotal();
  const isDelivery = checkoutData.fulfillment === 'delivery';
  const deliveryFee = isDelivery ? (checkoutData.deliveryFee || calculateDeliveryFee(checkoutData.distanceKm)) : 0;
  const grandTotal = subtotal + deliveryFee;

  const fulLabel = isDelivery ? 'COD / Diantar' : 'Ambil di Tempat';
  const payLabel = checkoutData.payment === 'transfer' ? 'Transfer Bank' : 'Cash / Tunai';

  let lines = [
    `Halo ${STORE_CONFIG.name}, saya ingin memesan:`,
    ''
  ];

  items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.product.name} x${item.quantity} — ${formatRupiah(item.subtotal)}`);
  });

  lines.push('');
  lines.push(`Subtotal produk: ${formatRupiah(subtotal)}`);

  if (isDelivery) {
    const billedKm = Math.max(1, Math.ceil(checkoutData.distanceKm));
    lines.push(`Ongkos kirim: ${formatRupiah(deliveryFee)} (${checkoutData.distanceKm} km, dihitung ${billedKm} km @ Rp1.000/km)`);
    lines.push(`*TOTAL PEMBAYARAN: ${formatRupiah(grandTotal)}*`);
  } else {
    lines.push(`*TOTAL PEMBAYARAN: ${formatRupiah(grandTotal)}*`);
  }

  lines.push('');
  lines.push(`Cara menerima pesanan: ${fulLabel}`);

  if (isDelivery) {
    lines.push(`Alamat pengantaran: ${checkoutData.address}`);
    if (checkoutData.customerCoords) {
      lines.push(`Titik peta pengantaran: https://maps.google.com/?q=${checkoutData.customerCoords.lat},${checkoutData.customerCoords.lng}`);
    }
  } else {
    lines.push(`Lokasi pengambilan: ${STORE_CONFIG.address}`);
  }

  lines.push(`Metode pembayaran: ${payLabel}`);

  if (checkoutData.note) {
    lines.push(`Catatan: ${checkoutData.note}`);
  }

  lines.push(`Nama pemesan: ${checkoutData.name}`);
  lines.push('');
  lines.push('Mohon konfirmasi pesanan dan estimasi waktu penyiapan/pengantarannya. Terima kasih!');

  return lines.join('\n');
}

function executeWhatsAppOrder({ reopenOnly = false } = {}) {
  const isConfigured = isConfiguredPhone(STORE_CONFIG.whatsappNumber);
  if (!isConfigured) {
    alert('Perhatian untuk pemilik toko: Nomor WhatsApp belum diatur!\nSilakan buka file "js/script.js" dan isi properti "whatsappNumber" pada STORE_CONFIG.');
    return;
  }

  const cleanPhone = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const messageText = buildWhatsAppMessage();
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

  // Buka WhatsApp di tab / jendela baru
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  if (!reopenOnly) {
    setCheckoutStep(3);
  }
}

/* ==========================================================================
   9. INTERAKSI GLOBAL & EVENT LISTENER
   ========================================================================== */
function initGlobalEvents() {
  // Delegasi event klik untuk tombol produk (tambah, kurangi, hapus)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.getAttribute('data-action');
    const id = btn.getAttribute('data-id');
    const prod = getProductById(id);

    if (action === 'add' && prod) {
      addToCart(id, 1);
      showToast(`${prod.name} ditambahkan ke keranjang.`);
    } else if (action === 'increase' && prod) {
      addToCart(id, 1);
    } else if (action === 'decrease' && prod) {
      addToCart(id, -1);
    } else if (action === 'remove' && prod) {
      removeFromCart(id);
      showToast(`${prod.name} dihapus dari keranjang.`, { icon: 'bi-trash3' });
    }
  });

  // Tombol aksi toast: buka keranjang
  const toastAction = document.getElementById('cartToastAction');
  if (toastAction) {
    toastAction.addEventListener('click', () => {
      const offcanvasEl = document.getElementById('cartSheet');
      if (offcanvasEl && typeof bootstrap !== 'undefined') {
        const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        offcanvas.show();
      }
    });
  }

  // Tombol kosongkan keranjang di offcanvas
  const clearCartBtn = document.getElementById('clearCartBtn');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Yakin ingin mengosongkan keranjang belanja?')) {
        clearCart();
        showToast('Keranjang telah dikosongkan.', { icon: 'bi-trash3' });
      }
    });
  }

  // Tombol "Lihat Menu" saat keranjang kosong
  const cartEmptyMenuBtn = document.getElementById('cartEmptyMenuBtn');
  if (cartEmptyMenuBtn) {
    cartEmptyMenuBtn.addEventListener('click', () => {
      const offcanvasEl = document.getElementById('cartSheet');
      if (offcanvasEl && typeof bootstrap !== 'undefined') {
        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (offcanvas) offcanvas.hide();
      }
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Sticky Navbar shadow on scroll
  const nav = document.getElementById('mainNav');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    if (nav) {
      nav.classList.toggle('is-scrolled', y > 40);
    }
    if (backToTop) {
      backToTop.classList.toggle('is-visible', y > 380);
    }
  }, { passive: true });

  // Tombol kembali ke atas
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Tutup navbar mobile collapse otomatis ketika link diklik
  const navCollapse = document.getElementById('navLinks');
  if (navCollapse) {
    const links = navCollapse.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 992 && typeof bootstrap !== 'undefined') {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // Filter tab menu (Minuman vs Makanan)
  initMenuFilters();

  // Tautkan data toko ke elemen dengan data-store
  populateStoreDetails();

  // Observer animasi reveal saat masuk viewport
  initScrollAnimations();
}

/**
 * Tampilkan data dari STORE_CONFIG ke placeholder footer & link WA
 */
function populateStoreDetails() {
  // Tahun otomatis
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Jam operasional
  const hoursHtml = `
    <div class="store-hours-schedule">
      <div class="hours-item"><span>Senin – Rabu, Jumat:</span> <strong>06.00 – 20.00 WIB</strong></div>
      <div class="hours-item"><span>Kamis:</span> <strong>06.00 – 18.00 WIB</strong></div>
      <div class="hours-item"><span>Sabtu:</span> <strong>06.00 – 23.00 WIB</strong></div>
      <div class="hours-item hours-off"><span>Minggu:</span> <em>Tutup / Libur</em></div>
    </div>
  `;
  document.querySelectorAll('[data-store="openingHours"]').forEach(el => {
    el.innerHTML = hoursHtml;
  });

  // Alamat
  document.querySelectorAll('[data-store="address"]').forEach(el => {
    el.textContent = STORE_CONFIG.address;
  });

  // Tampilan nomor telepon
  document.querySelectorAll('[data-store="whatsappDisplay"]').forEach(el => {
    el.textContent = formatPhoneDisplay(STORE_CONFIG.whatsappNumber);
    if (!isConfiguredPhone(STORE_CONFIG.whatsappNumber)) {
      el.classList.add('is-placeholder');
    }
  });

  // Tautan chat cepat WhatsApp (floating & footer)
  const isConfigured = isConfiguredPhone(STORE_CONFIG.whatsappNumber);
  const cleanPhone = STORE_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const generalMsg = encodeURIComponent(`Halo ${STORE_CONFIG.name}, saya ingin tanya-tanya seputar menu kopi dan pemesanan.`);

  document.querySelectorAll('[data-wa-link]').forEach(el => {
    if (isConfigured) {
      el.setAttribute('href', `https://wa.me/${cleanPhone}?text=${generalMsg}`);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.setAttribute('href', '#cara-pesan');
      el.addEventListener('click', (e) => {
        // Jika belum dikonfigurasi nomor asli, arahkan dengan ramah ke cara pemesanan
        showToast('Nomor WhatsApp pemilik dapat diatur pada file js/script.js', { icon: 'bi-info-circle' });
      });
    }
  });
}

/**
 * Animasi reveal halus saat elemen masuk ke viewport
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  } else {
    // Fallback untuk browser lawas tanpa IntersectionObserver
    elements.forEach(el => el.classList.add('is-visible'));
  }
}

/* ==========================================================================
   10. INISIALISASI SAAT DOM SIAP
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Muat keranjang yang tersimpan sebelumnya
  cartState = loadCartFromStorage();

  // Render katalog menu & keranjang
  renderMenuGrid();
  renderCartUI();

  // Inisialisasi modal checkout & event listener global
  initCheckoutModal();
  initGlobalEvents();
});
