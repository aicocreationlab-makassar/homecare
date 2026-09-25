# SA3 Home Care — Local Prototype

Website publik dan dashboard admin dengan HTML5, CSS3, dan JavaScript native. Tidak membutuhkan build, framework, backend aplikasi, atau database server.

## Jalankan

Dari folder project, gunakan server statis PowerShell yang mendukung URL bersih:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\serve.ps1
```

Server sederhana seperti Python `http.server` atau Live Server standar tidak menerapkan aturan URL bersih project ini. Gunakan `serve.ps1`, atau hosting dengan rewrite yang sesuai. Selalu gunakan alamat/origin yang sama; `localhost:5500` dan `127.0.0.1:5500` memiliki penyimpanan berbeda.

- Website: http://localhost:5500/
- Admin: http://localhost:5500/admin/login
- Username: `admin`
- Password: `sa3demo2026`

Login ini hanya gerbang demo berbasis sessionStorage, bukan autentikasi production.

## Panduan klien dan URL

Panduan lengkap untuk presentasi dan penggunaan website: [PANDUAN_KLIEN_SA3_HOMECARE.md](PANDUAN_KLIEN_SA3_HOMECARE.md).

Alamat website yang ditetapkan: `https://sa3-homecare.dekatlokal`. Domain dan hosting belum dipublikasikan melalui pekerjaan lokal ini.

- Halaman memakai URL bersih seperti `/layanan`, `/assessment`, dan `/admin/dashboard`.
- File fisik `.html` tetap tersedia; server memetakannya tanpa mengekspos ekstensi di URL.
- Server lokal mengalihkan `.html` ke URL bersih sambil mempertahankan query ID dan pilihan layanan.
- `.htaccess` disertakan untuk Apache/LiteSpeed di document root dengan rewrite diaktifkan. Konfigurasi hosting ini perlu diuji pada server tujuan.
- Server hosting lain perlu menerapkan pemetaan setara. Path yang tidak cocok dengan file nyata harus menghasilkan 404.
- Tautan dan aset menggunakan path dari root domain; project ini ditujukan untuk document root, bukan subfolder hosting.
- Logo WhatsApp menggunakan SVG hijau/putih dari paket resmi Meta 2026. Asal aset dicatat pada `assets/SOURCES.md`.
- Tema ungu–pink diterapkan pada halaman publik dan admin. Menu publik mobile menggunakan dialog dengan animasi dari kanan, backdrop, tombol tutup, dan dukungan keyboard.

## Struktur

```text
website-homecare/
├── index.html, tentang.html, layanan.html, kontak.html, blog.html
├── assessment.html, assessment-success.html
├── admin/
│   └── login.html, dashboard.html, patients.html, patient-detail.html, settings.html
├── assets/
│   ├── images/          # Logo dan foto dari website SA3, disimpan lokal
│   ├── fonts/           # Manrope lokal
│   └── vendor/aos/      # AOS 2.3.4 dan lisensi MIT
├── css/                 # Reset, token, komponen, publik, form, admin, responsive
├── js/                  # Modul data, tampilan, dan alur aplikasi
├── tests/
│   ├── smoke.cjs        # Uji browser end-to-end, memakai konteks terisolasi
│   └── report.json      # Hasil pengujian terakhir
├── serve.ps1            # Server file statis alternatif
└── README.md
```

## Alur demo

1. Buka admin terlebih dahulu untuk melihat 8 assessment fiktif saat database kosong.
2. Buka website pada tab yang sama atau tab lain di browser dan origin yang sama.
3. Pilih **Isi Assessment Kebutuhan**. Isi keenam langkah memakai data fiktif.
4. Coba mundur atau refresh; draft dipulihkan selama sesi tab masih tersedia.
5. Setujui kedua consent lalu simpan. Ringkasan diambil kembali dari IndexedDB berdasarkan ID URL.
6. **Copy Ringkasan** menyalin pesan. Tombol WhatsApp membuka pesan siap kirim; pengiriman tetap dilakukan pengguna di WhatsApp.
7. Buka admin, cari pasien, dan buka detail. Ubah status dan simpan catatan, lalu refresh untuk melihat persistensinya.
8. Pengaturan menyediakan perubahan nomor WhatsApp, reset record demo, dan penghapusan seluruh data dengan konfirmasi ketik `HAPUS`.

Assessment yang disimpan tidak otomatis memesan tenaga atau mengonfirmasi jadwal. Semua layanan perlu dikonfirmasi bersama tim SA3.

## Arsitektur dan konfigurasi

- `js/config.js`: nomor WhatsApp default, credential demo, daftar 13 layanan, dan status.
- `js/db.js`: Promise API IndexedDB `sa3HomeCareDB`, versi 1; stores `assessments`, `activityLogs`, `settings`. Penulisan assessment dan aktivitas memakai satu transaksi.
- `js/assessment-schema.js`: definisi langkah, field, dan ringkasan yang digunakan form, success, dan detail admin.
- `js/seed.js`: 8 pasien fiktif. Seed awal hanya ketika database kosong dan belum diinisialisasi. Clear All Data menonaktifkan seed otomatis; Reset Demo Data mengaktifkan ulang data contoh secara eksplisit dan mempertahankan assessment manual.
- Draft: `sessionStorage.sa3AssessmentDraft`. Login: `sessionStorage.sa3AdminSession`.
- Font, foto, ikon SVG, dan AOS tersedia lokal. Website tidak membutuhkan CDN saat dijalankan.
- Link WhatsApp, email, dan peta membutuhkan aplikasi atau koneksi eksternal ketika dibuka.

## Pengujian

Jalankan server lokal terlebih dahulu. Pengujian memerlukan Playwright sebagai alat pengembangan terpisah; tidak menjadi dependency website.

```powershell
$env:PLAYWRIGHT_MODULE = 'C:\path\to\node_modules\playwright'
node tests/smoke.cjs
node tests/mobile.cjs
node tests/navigation.cjs
```

Uji meliputi login, seed, validasi, draft, submit, WhatsApp encoding, persistence status/catatan, pencarian, filter, delete, clear/reset, link internal, error browser, serta overflow pada 320, 360, 375, 390, 768, 1024, 1366, dan 1440 piksel. Screenshot disimpan di `tests/`.

Uji navigasi tambahan memeriksa redirect `.html`, query yang dipertahankan, refresh alamat bersih, 404, menu dari kanan, tombol tutup, backdrop, Escape, fokus keyboard, serta perubahan ukuran layar.

## Batasan

Data hanya berada di browser dan origin yang digunakan. Tidak ada sinkronisasi dari HP pasien ke laptop admin. Data bisa hilang jika penyimpanan browser dibersihkan. Prototype tidak menyediakan autentikasi aman, enkripsi aplikasi, backup cloud, diagnosis, atau triage otomatis. Gunakan pasien fiktif untuk demo.

Sumber identitas, informasi bisnis, dan aset: [website SA3 Home Care](https://jasaperawatbandung.com/) dan [Tentang Kami](https://jasaperawatbandung.com/tentang-kami/). Referensi tampilan: enam gambar WebP yang disediakan di root workspace. Artikel merupakan konten informasi layanan untuk prototype; testimoni diringkas dari website existing, tanpa menambahkan rating atau statistik buatan. Detail asal aset tersedia pada `assets/SOURCES.md`.
