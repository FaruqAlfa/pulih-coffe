# Pulih Coffee — Landing Page & Order System

Website landing page dan sistem katalog pemesanan sederhana untuk **Pulih Coffee**. Mengusung konsep *cozy, clean, youthful, dan aesthetic* dengan perpaduan warna Coffee Brown (`#6F4538`), Soft Pink (`#F3C6D3`), dan Latte Cream (`#FFF8F2`).

Website ini **100% statis tanpa database dan tanpa backend**. Seluruh interaksi keranjang, kalkulasi harga, pilihan pembayaran, dan pembuatan pesan WhatsApp diproses langsung di sisi browser pelanggan.

---

## 📁 Struktur Berkas

```text
pulih-coffee/
├── index.html                  # Halaman utama landing page & modal checkout
├── css/
│   └── style.css               # Desain, tema warna (CSS Variables), dan responsivitas
├── js/
│   └── script.js               # Konfigurasi toko, data menu, logika keranjang & WhatsApp
├── assets/
│   ├── images/
│   │   ├── hero-coffee.jpeg        # Foto produk utama pada Hero section
│   │   ├── pulih-ButteScothLatte.jpeg # Foto produk Butterscotch
│   │   ├── pulih-aren.jpeg         # Foto produk Gula Aren
│   │   ├── pulih-matcha.jpeg       # Foto produk Matcha
│   │   ├── cireng-ayam-suwir-goreng.jpeg # Foto Cireng Ayam Suwir Goreng (isi 6)
│   │   ├── cireng-ayam-suwir-frozen.jpeg # Foto Cireng Ayam Suwir Frozen (isi 7)
│   │   ├── cireng-kuah-creamy-goreng.jpeg # Foto Cireng Kuah Creamy Goreng (isi 4)
│   │   ├── cireng-kuah-creamy-frozen.jpeg # Foto Cireng Kuah Creamy Frozen (isi 5)
│   │   ├── coffee-atmosphere.jpg   # Foto suasana pada section Tentang Kami
│   │   └── logo-pulih.png          # Logo brand Pulih Coffee
│   └── icons/
└── README.md
```

---

## ⚙️ Panduan Kustomisasi Pemilik Toko

### 1. Mengatur Nomor WhatsApp, Alamat Toko Offline, dan Tarif Delivery
Buka berkas [js/script.js](file:///d:/Projects/pulih-coffe/js/script.js) dan ubah bagian `STORE_CONFIG` di paling atas:

```javascript
const STORE_CONFIG = {
  name: 'Pulih Coffee',

  // Nomor WhatsApp pemilik (085648962991)
  whatsappNumber: '6285648962991',

  // Alamat fisik / lokasi toko offline Pulih Coffee
  address: 'Jl. Totok Kerot, Kaliawen Barat, Ngino, Kec. Plemahan, Kabupaten Kediri, Jawa Timur 64155',

  // Cakupan wilayah Delivery Order (DO)
  deliveryCoverage: 'Plemahan, Papar, Purwoasri, Kunjang, Pare',

  // Koordinat lokasi toko untuk kalkulasi jarak peta & GPS
  location: {
    lat: -7.699589,
    lng: 112.140587,
    name: 'Pulih Coffee (Toko Offline)'
  },

  // Tarif ongkos kirim per kilometer (COD / Diantar)
  deliveryRatePerKm: 1000,

  // Jam operasional toko:
  // Senin – Rabu, Jumat: 06.00 – 20.00 WIB | Kamis: 06.00 – 18.00 WIB | Sabtu: 06.00 – 23.00 WIB | Minggu: Tutup
  openingHours: 'Senin–Rabu, Jumat: 06.00–20.00 WIB | Kamis: 06.00–18.00 WIB | Sabtu: 06.00–23.00 WIB | Minggu: Tutup'
};
```

### 2. Fitur Pengantaran (Delivery Order) Berdasarkan Jarak & Wilayah
Ketika pelanggan memilih opsi **COD / Diantar**:
- **Cakupan Wilayah DO**: Melayani wilayah **Plemahan, Papar, Purwoasri, Kunjang, Pare**.
- Ongkir otomatis dihitung **Rp1.000 per 1 kilometer** dari toko offline di *Jl. Totok Kerot, Kaliawen Barat, Ngino, Plemahan, Kediri*.
- Terdapat **peta interaktif (Leaflet OSM)**: pelanggan dapat menggeser pin merah atau mengetuk peta untuk menentukan titik rumah/tujuan mereka.
- Terdapat tombol **Gunakan GPS**: mendeteksi titik koordinat pelanggan secara instan dan menghitung jarak menggunakan rumus *Haversine*.
- Terdapat tombol stepper manual `[ - ] [ + ]` dan input angka untuk mengatur jarak tempuh secara langsung.
- Ongkir otomatis dimasukkan ke dalam total pembayaran, ditampilkan di rincian ringkasan, dan disertakan dalam format pesan WhatsApp (lengkap dengan info wilayah DO dan tautan Google Maps titik antar).

### 3. Mengubah Menu, Harga, dan Deskripsi
Semua 7 menu disimpan dalam array `PRODUCTS` pada [js/script.js](file:///d:/Projects/pulih-coffe/js/script.js):

```javascript
const PRODUCTS = [
  {
    id: 'butterscotch',
    name: 'Butterscotch',
    category: 'Minuman',
    desc: 'Kopi susu dengan sentuhan rasa butterscotch yang lembut, manis, dan creamy.',
    price: 10000,
    image: 'assets/images/pulih-ButteScothLatte.jpeg',
    alt: 'Butterscotch Pulih Coffee',
    badge: 'Best Seller'
  },
  // ... varian cireng & minuman lainnya
];
```
> **Catatan:** Format harga menggunakan angka bulat (contoh `10000`). Sistem akan otomatis memformatnya menjadi `Rp10.000` di seluruh tampilan dan pesan WhatsApp.

### 4. Mengganti Foto Produk & Logo dengan Foto Asli
Jika foto belum diunggah, sistem otomatis menampilkan placeholder elegan (*"Foto segera hadir"*). Anda cukup menambahkan/mengganti file di folder `assets/images/` dengan nama-nama berikut (rasio 1:1 / persegi disarankan):
- **`pulih-ButteScothLatte.jpeg`** — Foto menu Butterscotch.
- **`pulih-aren.jpeg`** — Foto menu Kopi Susu Gula Aren.
- **`pulih-matcha.jpeg`** — Foto menu Matcha.
- **`cireng-ayam-suwir-goreng.jpeg`** — Foto Cireng Ayam Suwir Chili Oil Goreng (isi 6).
- **`cireng-ayam-suwir-frozen.jpeg`** — Foto Cireng Ayam Suwir Chili Oil Frozen (isi 7).
- **`cireng-kuah-creamy-goreng.jpeg`** — Foto Cireng Kuah Creamy Goreng (isi 4).
- **`cireng-kuah-creamy-frozen.jpeg`** — Foto Cireng Kuah Creamy Frozen (isi 5).
- **`hero-coffee.jpeg`** — Rasio ideal 4:5 (portrait) untuk foto utama di bagian atas.
- **`coffee-atmosphere.jpg`** — Rasio 4:5 (portrait) untuk foto suasana kedai.
- **`logo-pulih.png`** — Rasio 1:1 (persegi) format PNG transparan untuk logo brand di navbar dan footer.

---

## 🛒 Alur Pemesanan Pelanggan

1. Pelanggan memilih menu dan menekan tombol **Tambah ke Keranjang**.
2. Jumlah produk dapat diatur melalui tombol stepper (`-` / `+`) baik pada kartu menu maupun di dalam offcanvas keranjang.
3. Pelanggan menekan **Lanjutkan Pemesanan** untuk membuka modal checkout:
   - Mengisi Nama.
   - Memilih cara menerima pesanan:
     - **Ambil di Tempat**: Tanpa ongkos kirim, lokasi pengambilan di toko offline.
     - **COD / Diantar**: Pengantaran dengan tarif Rp1.000/km dari toko di Jl. Totok Kerot, Ngino, Plemahan. Pelanggan mengisi alamat, menentukan titik di peta atau GPS, dan ongkir dihitung otomatis secara transparan.
   - Memilih metode pembayaran: **Cash / Tunai** atau **Transfer Bank**.
   - Menambahkan catatan opsional (cth. *less sugar*, jam ambil).
4. Pelanggan memeriksa **Ringkasan Pesanan** (daftar item, subtotal produk, biaya ongkos kirim berdasarkan jarak, total pembayaran akhir, dan detail titik antar).
5. Pelanggan menekan **Kirim Pesanan via WhatsApp**:
   - Sistem membuka obrolan WhatsApp pemilik dengan pesan rapi berisi rincian pesanan, alamat, ongkir per jarak, total harga, dan tautan Google Maps.
   - Status di website menampilkan pesan bahwa pesanan **menunggu konfirmasi langsung oleh pemilik** melalui chat.

---

## 🚀 Cara Menjalankan Website Secara Lokal

Anda dapat membuka langsung berkas `index.html` di browser favorit Anda, atau menggunakan server lokal sederhana:

```bash
# Menggunakan Python
python -m http.server 8080

# Lalu buka di browser:
http://localhost:8080
```
