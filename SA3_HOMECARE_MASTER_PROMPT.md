# MASTER PROMPT — Build SA3 Home Care Local Prototype

Gunakan prompt ini ke coding agent/AI builder yang akan membuat project secara utuh.

---

## PROMPT

Anda adalah senior frontend engineer + product designer yang sangat teliti. Bangun **prototype website SA3 Home Care** yang benar-benar dapat dijalankan menggunakan **HTML5, CSS3, dan Vanilla JavaScript saja**. Jangan gunakan React, Vue, Angular, Next, Nuxt, Bootstrap, Tailwind, jQuery, Node backend, PHP, database server, Firebase, Supabase, atau framework lain.

Project ini adalah **local prototype** untuk mendemokan workflow bisnis home care: calon pasien mengisi assessment pada website, data tersimpan ke IndexedDB di browser lokal, admin dapat melihat data di dashboard lokal, lalu user dapat mengirim ringkasan assessment ke WhatsApp.

### 1. Sumber dan identitas website

Gunakan website existing sebagai sumber struktur konten dan identitas bisnis:

`https://jasaperawatbandung.com/`

Pertahankan brand SA3 Home Care, makna konten, tone pelayanan, motto **“Kami Ada Sepenuh Hati Untuk Anda”**, daftar layanan, section Tentang Kami, alasan memilih SA3, testimonial, kontak, dan navigasi utama. Jangan melakukan rebrand total dan jangan membuat website terasa seperti brand baru.

Namun, modernisasi visual supaya kualitasnya setara website rumah sakit swasta/home care premium: clean, human, medical, spacious, reliable, premium tetapi tidak dingin.

UI public harus mengambil inspirasi dari reference image yang diberikan:
- white canvas yang bersih;
- teal/medical green gradient;
- rounded cards;
- hero image besar dengan overlay;
- typography modern dengan sedikit serif editorial pada kata accent bila cocok;
- section title besar tetapi tidak berlebihan;
- card layout yang rapi;
- banyak whitespace;
- CTA jelas;
- visual photography yang hangat dan manusiawi.

UI admin harus mengikuti reference dashboard:
- left sidebar desktop;
- clean topbar;
- KPI cards;
- table assessment;
- status badge/chips;
- activity visualization;
- patient detail yang terstruktur;
- border tipis, whitespace banyak, radius modern;
- mobile version tidak memaksa desktop table.

### 2. Warna

Pertahankan tone brand hijau/teal/medical dari existing SA3, tetapi gunakan design token modern. Mulai dengan:

```css
:root {
  --brand-900: #0B4F55;
  --brand-800: #0E6269;
  --brand-700: #0F7A81;
  --brand-600: #15959A;
  --brand-100: #E7F5F4;
  --accent-500: #62B66F;
  --ink-900: #122029;
  --ink-700: #41535C;
  --surface: #FFFFFF;
  --surface-soft: #F5F9F9;
  --border: #DDE8E8;
  --danger: #C64545;
  --warning: #B7791F;
  --success: #198754;
}
```

Jika logo/aset existing menunjukkan warna primer yang berbeda, sesuaikan tokens agar lebih dekat ke warna asli brand. Jangan gunakan palet biru rumah sakit generik jika membuat identitas SA3 hilang.

### 3. Halaman yang harus dibuat

Public:

- `index.html`
- `tentang.html`
- `layanan.html`
- `assessment.html`
- `assessment-success.html`
- `kontak.html`
- `blog.html`

Admin:

- `admin/login.html`
- `admin/dashboard.html`
- `admin/patients.html`
- `admin/patient-detail.html`
- `admin/settings.html`

Semua link harus benar-benar berfungsi.

### 4. Struktur homepage

Buat homepage modern tetapi tetap recognizable sebagai evolusi website existing:

1. Header/navbar sticky.
2. Hero large image/overlay.
3. Headline fokus home care, professional, fast response.
4. CTA utama: **Isi Assessment Kebutuhan**.
5. CTA secondary: **Lihat Layanan**.
6. WhatsApp quick CTA.
7. Trust/value strip: sejak 2016, respon cepat, tenaga profesional, layanan area luas.
8. Section “Mengapa SA3 Home Care”.
9. Services grid.
10. Flow “Cara mendapatkan layanan”.
11. Assessment CTA banner.
12. Tentang Kami snapshot.
13. Testimonials.
14. Coverage/area pelayanan.
15. Blog highlights.
16. Contact CTA.
17. Footer.

Jangan menghilangkan konten inti existing. Copy boleh diperbaiki agar lebih professional dan singkat.

### 5. Layanan

Pastikan service data mencakup:

- Perawatan Pre/Post Hospital.
- Pendampingan Lansia / Caregiver.
- Perawatan Pasien Stroke.
- Visit Dokter dan Perawat.
- Konsultasi Dokter Medis.
- Bidan, Bayi, dan Ibu Hamil.
- Pemeriksaan Lab.
- Perawatan Luka.
- Fisioterapi / Terapi ROM.
- Pemasangan Infus, Kateter, NGT.
- Hipnoterapi.
- Penyewaan dan Pembelian Alat Kesehatan.
- Konsultasi kebutuhan lainnya.

Gunakan satu sumber data JS untuk service list agar tidak duplikatif.

### 6. Assessment UX

Halaman assessment adalah fitur paling penting. Buat multi-step wizard yang nyaman di HP.

#### Step 1 — Pemesan
- Nama.
- WhatsApp.
- Hubungan dengan pasien.
- Email optional.

#### Step 2 — Pasien
- Nama pasien.
- Kelompok usia.
- Gender optional.
- Kota/kabupaten.
- Kecamatan/area.
- Alamat optional.

Jangan meminta NIK.

#### Step 3 — Layanan
- Primary service.
- Additional service.
- Durasi: visit, 4h, 8h, 12h, 24h, harian, mingguan, bulanan, belum tahu.
- Tanggal mulai.
- Preferensi jam.

#### Step 4 — Kondisi awal
Gunakan bahasa awam, bukan diagnosis otomatis:
- kondisi/diagnosis yang sudah diketahui keluarga;
- tingkat kemandirian;
- mobilitas;
- bantuan mandi, pakaian, makan, toileting, transfer, berjalan, pengingat obat;
- oksigen, kateter, NGT, infus, trakeostomi, luka, suction, bed pasien, lainnya;
- riwayat jatuh sederhana;
- kesulitan komunikasi;
- catatan keluarga.

#### Step 5 — Lingkungan & preferensi
- rumah/apartemen/hotel/lainnya;
- tangga/lift;
- keluarga ada di lokasi atau tidak;
- preferensi tenaga pria/wanita/tidak ada preferensi;
- bahasa komunikasi;
- kebutuhan khusus.

#### Step 6 — Review & consent
Tampilkan semua ringkasan sebelum submit.

Consent wajib:
- assessment awal bukan diagnosis;
- data digunakan untuk konsultasi/tindak lanjut.

Tambahkan safety callout di halaman assessment:

“Jika kondisi pasien darurat atau memburuk cepat, jangan menunggu respons dari form ini. Segera hubungi layanan darurat atau fasilitas kesehatan terdekat.”

Jangan membuat fitur triage otomatis atau diagnosis.

### 7. Submit behavior — harus benar-benar work

Ketika submit:

1. Validasi semua required fields.
2. Generate ID: `SA3-YYYYMMDD-XXXX`.
3. Build object data lengkap.
4. Save ke IndexedDB database `sa3HomeCareDB` store `assessments`.
5. Set status awal `Baru`.
6. Save activity log.
7. Hapus draft session.
8. Redirect ke `assessment-success.html?id=<ID>`.

Success page harus mengambil data dari IndexedDB berdasarkan query parameter, bukan hanya menggunakan variable memory.

Tampilkan:
- icon success;
- ID assessment;
- summary card;
- tombol Copy Ringkasan;
- tombol **Kirim Hasil Assessment ke WhatsApp**;
- tombol kembali Home.

### 8. WhatsApp

Default WhatsApp admin:

`6282319199534`

Simpan di `js/config.js` agar mudah diganti.

Gunakan:

```js
https://wa.me/6282319199534?text=${encodeURIComponent(message)}
```

Pesan otomatis:

```text
Halo SA3 Home Care, saya sudah mengisi assessment kebutuhan layanan.

ID Assessment: {{id}}
Pemesan: {{contactName}}
Pasien: {{patientName}}
Area: {{city}}, {{district}}
Layanan: {{primaryService}}
Durasi: {{duration}}
Mulai: {{startDate}} {{preferredTime}}
Mobilitas: {{mobility}}
Kebutuhan utama: {{adlNeeds}}
Alat/kondisi relevan: {{equipment}}
Catatan: {{notes}}

Mohon tim SA3 Home Care membantu menindaklanjuti kebutuhan ini. Terima kasih.
```

Semua text harus di-encode aman.

### 9. IndexedDB

Gunakan IndexedDB native.

Database:
- name: `sa3HomeCareDB`
- version: `1`

Stores:
- `assessments`
- `activityLogs`
- `settings`

Buat `js/db.js` modular dengan Promise API.

Data harus tetap ada setelah browser reload.

### 10. Draft assessment

Gunakan `sessionStorage` untuk menyimpan draft multi-step agar user tidak kehilangan seluruh form jika refresh.

Setelah submit sukses, clear draft.

### 11. Admin login

Local demo login:
- username `admin`
- password `sa3demo2026`

Simpan credential di config dan session login di `sessionStorage`.

Ini demo gate, jangan mengklaim secure authentication.

Semua admin page harus redirect ke login jika session tidak ada.

### 12. Dashboard admin

Desktop layout:
- sidebar 240–260px;
- topbar;
- main content;
- clean white/soft background.

Sidebar menu:
- Dashboard.
- Assessment / Pasien.
- Settings.
- Buka Website.
- Logout.

Dashboard cards:
- Assessment Hari Ini.
- Assessment Baru.
- Perlu Follow-up.
- Terjadwal.

Section:
- latest assessments.
- status distribution.
- service distribution.
- quick links.

Gunakan SVG/CSS/Canvas native untuk chart sederhana. Jangan install chart library berat.

### 13. Patients/Assessments admin

Desktop: professional table.
Mobile: card list.

Fields:
- ID.
- pasien.
- pemesan.
- layanan.
- area.
- created time.
- requested schedule.
- status.
- action.

Fitur:
- search.
- filter status.
- filter layanan.
- filter area.
- sort newest/oldest.
- reset filter.
- empty state.

### 14. Patient detail

URL:

`admin/patient-detail.html?id=...`

Tampilkan section:
- identity header + status.
- WhatsApp action.
- contact person.
- patient info.
- service request.
- condition/care profile.
- ADL needs.
- equipment/conditions.
- schedule.
- address.
- family notes.
- admin notes.
- activity timeline.

Admin action:
- ubah status: Baru / Dihubungi / Perlu Follow-up / Terjadwal / Selesai / Batal.
- save admin note.
- copy summary.
- WhatsApp.
- delete dengan modal confirmation.

Semua update harus persisten di IndexedDB setelah reload.

### 15. Demo seed data

Buat `js/seed.js`.

Jika database kosong dan `demoMode=true`, seed 6–10 data pasien FIKTIF agar dashboard langsung terlihat hidup saat demo.

Harus ada settings action:
- Reset Demo Data.
- Clear All Data.

Jangan gunakan data manusia sungguhan.

### 16. AOS animation

Gunakan AOS, tetapi bundle file lokal di:

`assets/vendor/aos/aos.css`
`assets/vendor/aos/aos.js`

Motion subtle saja:
- hero fade-up;
- cards stagger;
- section fade-up.

Jangan animate form field saat user mengetik.

Jika AOS gagal load, konten tetap visible.

Hormati `prefers-reduced-motion`.

### 17. Responsive — sangat penting

Website WAJIB terlihat benar di:
- 320px.
- 360px.
- 375px.
- 390px.
- 768px.
- 1024px.
- 1366px.
- 1440px.

Aturan:
- tidak boleh horizontal overflow;
- mobile nav harus work;
- minimum tap target 44px;
- body text minimum 16px di form;
- form 1 kolom mobile;
- admin sidebar jadi drawer;
- dashboard KPI 2 kolom lalu 1 kolom;
- admin desktop table berubah menjadi cards di mobile;
- filter admin menjadi compact/drawer;
- detail pasien 1 kolom di mobile.

### 18. Accessibility

- semantic HTML.
- form label eksplisit.
- focus visible.
- aria-expanded mobile menu.
- aria-live untuk toast/error.
- alt text.
- kontras cukup.
- keyboard usable.

### 19. Performance

- Tidak ada jQuery.
- Tidak ada Bootstrap/Tailwind.
- Tidak ada framework.
- Lazy load image non-LCP.
- Tentukan width/height image.
- Gunakan WebP jika tersedia.
- Pisahkan CSS/JS secara modular.
- Tidak boleh ada file JS monolitik 2000+ baris jika dapat dipisah logis.

### 20. Folder structure

Gunakan persis atau sangat dekat dengan:

```text
sa3-homecare/
├── index.html
├── tentang.html
├── layanan.html
├── assessment.html
├── assessment-success.html
├── kontak.html
├── blog.html
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── patients.html
│   ├── patient-detail.html
│   └── settings.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── vendor/aos/
├── css/
│   ├── reset.css
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   ├── public.css
│   ├── assessment.css
│   ├── admin.css
│   └── responsive.css
└── js/
    ├── config.js
    ├── db.js
    ├── common.js
    ├── public.js
    ├── assessment.js
    ├── assessment-success.js
    ├── admin-auth.js
    ├── admin-dashboard.js
    ├── admin-patients.js
    ├── admin-patient-detail.js
    ├── admin-settings.js
    └── seed.js
```

### 21. Asset rule

Jika aset existing SA3 Home Care tersedia dari pemilik website, gunakan kembali logo/foto yang relevan supaya klien merasa website barunya masih identik dengan brand lama.

Jangan mengganti semua gambar dengan aesthetic random.

Jika asset belum tersedia di project, buat placeholder lokal yang jelas dan jangan membuat remote image dependency yang mudah mati.

### 22. Local-only constraint

Ini wajib dipahami dalam implementasi:

Frontend-only tidak bisa mengirim data dari browser pasien di HP A ke dashboard admin di laptop B. IndexedDB hanya lokal pada browser/origin tersebut.

Prototype harus tetap mendemokan flow dengan sangat baik pada **same localhost + same browser storage**.

Tambahkan catatan kecil di admin Settings: `Mode: Local Prototype`.

Jangan membuat fake API request atau pura-pura data sudah cloud-sync.

### 23. Privacy

Karena assessment bisa berisi kondisi kesehatan:
- jangan minta NIK;
- jangan menyimpan data yang tidak diperlukan;
- jangan mengklaim data terenkripsi;
- jangan mengklaim sistem production-ready;
- tampilkan consent;
- tampilkan disclaimer assessment awal;
- buat tombol clear data untuk perangkat demo.

### 24. Quality bar

Saya tidak mau hasil sekadar “template HTML”. Hasil harus terasa seperti produk sungguhan.

Sebelum menganggap selesai, lakukan self-review:

1. Apakah homepage terlihat modern dan premium tetapi masih SA3?
2. Apakah form assessment nyaman di HP?
3. Apakah data benar-benar masuk IndexedDB?
4. Apakah record baru muncul di dashboard admin?
5. Apakah reload tidak menghapus data?
6. Apakah status update persisten?
7. Apakah WhatsApp summary benar?
8. Apakah mobile admin usable?
9. Apakah tidak ada broken link?
10. Apakah console bersih dari error utama?
11. Apakah 320px tidak overflow?
12. Apakah semua tombol punya hover/focus/active state?
13. Apakah loading, empty, success, error states tersedia?

### 25. Final delivery instruction

Jangan hanya menulis penjelasan atau pseudo-code. **Buat semua file project lengkap**.

Setelah selesai:
- tampilkan struktur folder;
- jelaskan cara run lokal;
- berikan credential demo;
- jelaskan flow test dari user assessment sampai admin;
- sebutkan limitation local-only dengan singkat;
- pastikan project dapat langsung dibuka via local server tanpa proses build.

**Prioritas tertinggi: functional correctness + responsive UX + visual consistency + clean code.**

---

## END PROMPT
