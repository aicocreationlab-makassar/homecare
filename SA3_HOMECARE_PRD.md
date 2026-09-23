# PRD — SA3 Home Care Local Assessment & Admin Dashboard

## 1. Ringkasan Produk

**Nama proyek:** SA3 Home Care — Website Assessment & Local Admin Dashboard  
**Tipe:** Prototype/demo operasional berbasis frontend statis  
**Teknologi wajib:** HTML5, CSS3, Vanilla JavaScript, IndexedDB, AOS Animation (dibundel lokal), tanpa framework, tanpa backend  
**Target:** Desktop, tablet, Android, iPhone, browser modern  
**Referensi website existing:** https://jasaperawatbandung.com/  
**Arah UI:** mempertahankan identitas, informasi, tone, dan struktur utama SA3 Home Care; dimodernisasi menjadi tampilan home-care/rumah-sakit swasta yang clean, premium, human, dan terpercaya.

---

## 2. Masalah yang Ingin Diselesaikan

Website SA3 Home Care saat ini berfungsi terutama sebagai website informasi dan pintu konsultasi. Form booking yang terlihat di website masih sederhana: nama, telepon, email, tanggal, subjek, dan layanan. CTA konsultasi juga mengarah ke WhatsApp.

Masalah operasional yang ingin didemokan oleh prototype ini:

1. Informasi calon pasien terlalu sedikit sehingga admin masih perlu bertanya ulang via WhatsApp.
2. Assessment calon pasien belum terasa sebagai data terstruktur yang bisa ditinjau admin.
3. Admin membutuhkan dashboard yang menampilkan leads/pasien, status, kebutuhan layanan, tingkat urgensi non-klinis, lokasi, dan detail assessment.
4. Setelah assessment, user tetap harus bisa lanjut ke WhatsApp tanpa mengetik ulang semua detail.
5. Klien harus bisa “merasakan” workflow digital end-to-end walau aplikasi masih berjalan lokal dan belum memakai backend.

---

## 3. Kondisi Website Existing yang Harus Dipertahankan

Konten utama yang harus tetap terwakili:

- Brand SA3 Home Care.
- Motto: **“Kami Ada Sepenuh Hati Untuk Anda.”**
- Positioning sebagai layanan home care sejak 2016.
- Jaringan layanan tenaga kesehatan profesional.
- Navigasi utama: Home, Tentang Kami, Layanan Kami, Kontak Kami, Blog.
- CTA konsultasi/WhatsApp.
- Section hero.
- Section Tentang Kami.
- Section layanan.
- Section alasan memilih SA3 Home Care.
- Section testimonial.
- Section kontak/footer.

Layanan yang harus tetap tersedia di halaman layanan dan pada pilihan assessment:

1. Perawatan Pre/Post Hospital.
2. Pendampingan Lansia / Caregiver.
3. Perawatan Pasien Stroke.
4. Visit Dokter dan Perawat.
5. Konsultasi Dokter Medis.
6. Bidan, Bayi, dan Ibu Hamil.
7. Pemeriksaan Lab di Rumah.
8. Perawatan Luka.
9. Fisioterapi / Terapi ROM.
10. Pemasangan Infus, Kateter, NGT.
11. Hipnoterapi.
12. Penyewaan / Pembelian Alat Kesehatan.
13. Layanan lain / konsultasi kebutuhan khusus.

> Catatan: konten lama dipertahankan secara makna, tetapi copywriting boleh diperbaiki supaya lebih ringkas, profesional, dan konsisten tanpa mengubah klaim inti bisnis.

---

## 4. Sasaran Produk

### Sasaran utama

- User dapat mengisi assessment kebutuhan home care secara jelas dalam 3–6 menit.
- Data assessment tersimpan otomatis ke database lokal browser.
- Admin dapat membuka dashboard lokal dan langsung melihat data assessment tersebut.
- User memperoleh ringkasan assessment dan tombol “Kirim ke WhatsApp”.
- Pesan WhatsApp sudah terisi otomatis berdasarkan assessment.
- UI terlihat cukup profesional untuk dipresentasikan sebagai calon sistem operasional bisnis.

### Sasaran sekunder

- Mengurangi pertanyaan berulang admin.
- Membantu admin memprioritaskan follow-up berdasarkan kebutuhan dan waktu layanan.
- Menjadi blueprint MVP sebelum nanti dipindahkan ke backend sungguhan.

---

## 5. Batasan Prototype Lokal — WAJIB DIPAHAMI

Karena proyek ini **hanya HTML/CSS/JavaScript tanpa backend**, maka penyimpanan menggunakan **IndexedDB** pada browser.

Konsekuensinya:

- Assessment user hanya dapat langsung terlihat di dashboard admin apabila user dan admin menggunakan **browser profile dan origin localhost yang sama**.
- Untuk demo, jalankan seluruh proyek dari server lokal yang sama, misalnya `http://localhost:5500`.
- Jika pasien mengisi dari HP lain dan admin membuka dari laptop lain, data **tidak akan sinkron**. Untuk kondisi tersebut dibutuhkan backend/database online pada fase production.
- Jangan membuka halaman dengan skema `file://` sebagai workflow utama karena perilaku origin/storage bisa berbeda antar browser.

Prototype ini dirancang untuk menunjukkan **workflow produk**, bukan sebagai sistem penyimpanan data kesehatan production-ready.

---

## 6. Persona

### 6.1 Calon Pasien / Keluarga

Karakteristik:
- Umumnya anggota keluarga yang membutuhkan tenaga home care.
- Bisa sedang dalam kondisi terburu-buru.
- Sering menggunakan smartphone.
- Tidak selalu memahami istilah medis.

Kebutuhan:
- Cepat menemukan layanan.
- Form mudah dipahami.
- Tidak perlu mengetik ulang di WhatsApp.
- Mengetahui bahwa assessment bukan diagnosis medis.

### 6.2 Admin SA3 Home Care

Kebutuhan:
- Melihat assessment baru secara cepat.
- Mencari pasien berdasarkan nama/nomor telepon/lokasi.
- Filter berdasarkan layanan/status/tanggal.
- Membuka detail assessment lengkap.
- Mengubah status follow-up.
- Menghubungi pasien via WhatsApp.
- Melihat ringkasan jumlah leads dan status.

---

## 7. Information Architecture

### Public/User

- `/index.html` — Home
- `/tentang.html` — Tentang Kami
- `/layanan.html` — Layanan
- `/assessment.html` — Assessment kebutuhan pasien
- `/kontak.html` — Kontak
- `/blog.html` — Blog/listing artikel (static demo)
- `/assessment-success.html?id=...` — Ringkasan assessment + CTA WhatsApp

### Admin

- `/admin/login.html`
- `/admin/dashboard.html`
- `/admin/patients.html`
- `/admin/patient-detail.html?id=...`
- `/admin/settings.html`

---

## 8. User Journey

### Journey A — Dari homepage

1. User membuka homepage.
2. User memahami value proposition SA3 Home Care.
3. User menekan CTA **“Isi Assessment Kebutuhan”** atau **“Konsultasi Sekarang”**.
4. User masuk ke halaman assessment.
5. User mengisi form bertahap.
6. Sistem validasi data.
7. User menyetujui consent pengiriman data awal.
8. Sistem menyimpan assessment ke IndexedDB.
9. Sistem membuat ID assessment, contoh `SA3-20260924-8F2K`.
10. User diarahkan ke halaman sukses/ringkasan.
11. User menekan **“Kirim Hasil Assessment ke WhatsApp”**.
12. WhatsApp terbuka dengan pesan yang telah tersusun rapi.

### Journey B — Admin

1. Admin login lokal.
2. Dashboard menampilkan KPI dan assessment terbaru.
3. Admin membuka menu Pasien / Assessment.
4. Admin search/filter data.
5. Admin klik satu record.
6. Detail pasien menampilkan data identitas, kebutuhan, kondisi awal, schedule, catatan.
7. Admin mengubah status menjadi `Dihubungi`, `Perlu Follow-up`, `Terjadwal`, `Selesai`, atau `Batal`.
8. Admin menekan tombol WhatsApp untuk menghubungi calon pasien.

---

## 9. Form Assessment — Struktur yang Direkomendasikan

Form harus berupa **multi-step wizard** supaya tidak terasa panjang.

### Step 1 — Data Pemesan

Wajib:
- Nama pemesan.
- Nomor WhatsApp.
- Hubungan dengan pasien: diri sendiri / anak / pasangan / saudara / caregiver / lainnya.

Opsional:
- Email.

### Step 2 — Data Pasien

Wajib:
- Nama pasien.
- Kelompok usia: anak, remaja, dewasa, 60–69, 70–79, 80+.
- Jenis kelamin: pilihan opsional / “tidak ingin menyebutkan”.
- Kota/kabupaten.
- Kecamatan/area.

Opsional:
- Alamat lengkap untuk estimasi jangkauan layanan.

**Jangan meminta NIK** pada prototype.

### Step 3 — Layanan yang Dibutuhkan

- Primary service (single select).
- Kebutuhan tambahan (multi-select).
- Durasi layanan:
  - Visit satu kali.
  - 4 jam.
  - 8 jam.
  - 12 jam.
  - 24 jam.
  - Harian.
  - Mingguan.
  - Bulanan.
  - Belum tahu / perlu rekomendasi.
- Tanggal mulai yang diinginkan.
- Preferensi waktu.

### Step 4 — Kondisi & Kebutuhan Perawatan Awal

Gunakan bahasa awam. Jangan melakukan diagnosis.

- Kondisi utama menurut keluarga / diagnosis yang sudah pernah disampaikan tenaga kesehatan (textarea opsional).
- Kondisi pasien saat ini:
  - Mandiri.
  - Butuh bantuan sebagian.
  - Butuh bantuan hampir seluruh aktivitas.
  - Bedrest.
- Mobilitas:
  - Jalan mandiri.
  - Tongkat.
  - Walker.
  - Kursi roda.
  - Bedrest.
- Bantuan aktivitas sehari-hari yang dibutuhkan (checkbox):
  - Mandi / kebersihan diri.
  - Berpakaian.
  - Makan/minum.
  - Toileting.
  - Berpindah posisi/tempat.
  - Pendampingan berjalan.
  - Pengingat obat sesuai instruksi tenaga kesehatan.
  - Monitoring sederhana sesuai arahan tenaga kesehatan.
- Peralatan/kondisi yang relevan (checkbox):
  - Oksigen.
  - Kateter urine.
  - NGT.
  - Infus.
  - Trakeostomi.
  - Luka / kebutuhan wound care.
  - Suction.
  - Bed pasien.
  - Tidak ada.
  - Lainnya.
- Riwayat jatuh 3 bulan terakhir: ya/tidak/tidak tahu.
- Kesulitan komunikasi: tidak / ringan / signifikan.
- Catatan penting keluarga (textarea).

### Step 5 — Lingkungan & Preferensi Layanan

- Tipe tempat: rumah / apartemen / hotel / lainnya.
- Akses tangga/lift.
- Ada keluarga pendamping di lokasi: ya/tidak.
- Preferensi tenaga (opsional): pria / wanita / tidak ada preferensi.
- Bahasa komunikasi (opsional).
- Kebutuhan khusus lain.

### Step 6 — Konfirmasi

Tampilkan summary sebelum submit:
- Pemesan.
- Pasien.
- Layanan.
- Jadwal.
- Lokasi.
- Kondisi/kebutuhan utama.

Checkbox wajib:

> “Saya memahami bahwa informasi ini merupakan assessment awal untuk membantu tim SA3 Home Care memahami kebutuhan layanan dan bukan diagnosis atau pengganti pemeriksaan tenaga kesehatan.”

Checkbox privacy:

> “Saya menyetujui penggunaan data yang saya kirim untuk keperluan konsultasi dan tindak lanjut layanan.”

### Safety prompt

Di bagian atas assessment tampilkan banner kecil:

> “Jika pasien mengalami kondisi darurat atau memburuk cepat, jangan menunggu respons dari form ini. Segera hubungi layanan darurat atau fasilitas kesehatan terdekat.”

Form **tidak boleh mengklaim melakukan triage medis otomatis**.

---

## 10. Behavior Submit Assessment

Ketika tombol `Kirim Assessment` ditekan:

1. Disable button dan tampilkan loading state.
2. Jalankan validasi.
3. Bentuk object assessment.
4. Generate unique ID.
5. Tambahkan `createdAt`, `updatedAt`, `status: "Baru"`.
6. Simpan ke IndexedDB store `assessments`.
7. Tambahkan activity log `Assessment baru masuk`.
8. Tampilkan toast sukses.
9. Redirect ke `assessment-success.html?id=<assessmentId>`.
10. Halaman success mengambil data dari IndexedDB berdasarkan ID.
11. User dapat:
   - Lihat ringkasan.
   - Copy ID assessment.
   - Copy ringkasan.
   - Klik `Kirim ke WhatsApp`.

### Format pesan WhatsApp

Gunakan pesan ringkas, mudah dibaca admin:

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
Alat/kondisi relevan: {{medicalEquipment}}
Catatan: {{notes}}

Mohon tim SA3 Home Care membantu menindaklanjuti kebutuhan ini. Terima kasih.
```

Target WhatsApp default prototype: `6282319199534` dan harus diletakkan di satu file config supaya mudah diganti.

---

## 11. Admin Dashboard

### Visual direction

Dashboard mengacu pada referensi admin:
- Sidebar kiri.
- Topbar minimal.
- KPI cards.
- Data table yang clean.
- Status chips.
- Detail drawer/modal/page.
- Banyak white space.
- Border tipis.
- Rounded 14–18 px.
- Ikon outline.
- Tidak terlihat seperti template bootstrap lama.

### KPI cards

Minimal:
- Assessment Hari Ini.
- Assessment Baru.
- Perlu Follow-up.
- Terjadwal.

Optional:
- Total bulan ini.
- Layanan paling banyak diminta.

### Dashboard sections

1. KPI summary.
2. Assessment terbaru.
3. Breakdown status berupa donut/progress visualization murni CSS/SVG/Canvas.
4. Breakdown layanan populer.
5. Quick action: `Lihat Semua Assessment`.

### Data table

Kolom desktop:
- ID.
- Nama pasien.
- Pemesan.
- Layanan.
- Area.
- Tanggal masuk.
- Jadwal diminta.
- Status.
- Action.

Mobile:
- Jangan memaksa tabel lebar.
- Render menjadi stacked cards per pasien.

### Status

- Baru.
- Dihubungi.
- Perlu Follow-up.
- Terjadwal.
- Selesai.
- Batal.

### Detail pasien

Tampilkan:
- Header identitas + status.
- Tombol WhatsApp.
- Informasi pemesan.
- Informasi pasien.
- Kebutuhan layanan.
- Kondisi awal.
- ADL assistance.
- Alat/peralatan.
- Jadwal & lokasi.
- Catatan keluarga.
- Metadata assessment.
- Activity timeline.

Admin dapat:
- Ubah status.
- Tambah catatan admin lokal.
- Copy summary.
- WhatsApp pasien/pemesan.
- Hapus data dengan dialog konfirmasi.

---

## 12. Search, Sort, Filter

Admin Patients page harus mendukung:

- Search nama pasien.
- Search nama pemesan.
- Search nomor WhatsApp.
- Filter status.
- Filter layanan.
- Filter kota/area.
- Filter rentang tanggal sederhana.
- Sort terbaru/terlama.
- Clear filters.

Hasil harus diperbarui instan tanpa reload.

---

## 13. Admin Login Lokal

Prototype dapat memakai login lokal sederhana.

Default demo:
- username: `admin`
- password: `sa3demo2026`

Aturan:
- Credential diletakkan di `js/config.js` agar mudah diubah.
- Session disimpan di `sessionStorage`, bukan dianggap keamanan production.
- Jika tidak login dan membuka halaman admin, redirect ke login.
- Tampilkan label kecil `Prototype Lokal` di login/settings.

**Catatan:** ini hanya gate untuk demo, bukan autentikasi production.

---

## 14. Data Model

### `Assessment`

```js
{
  id: "SA3-20260924-8F2K",
  createdAt: "2026-09-24T00:00:00+08:00",
  updatedAt: "...",
  status: "Baru",

  contact: {
    name: "",
    whatsapp: "",
    email: "",
    relationship: ""
  },

  patient: {
    name: "",
    ageGroup: "",
    gender: "",
    city: "",
    district: "",
    address: ""
  },

  service: {
    primary: "",
    additional: [],
    duration: "",
    startDate: "",
    preferredTime: ""
  },

  careProfile: {
    knownCondition: "",
    independenceLevel: "",
    mobility: "",
    adlNeeds: [],
    equipmentOrCondition: [],
    fallHistory: "",
    communicationDifficulty: "",
    familyNotes: ""
  },

  environment: {
    placeType: "",
    access: "",
    familyPresent: "",
    caregiverPreference: "",
    preferredLanguage: "",
    specialNeeds: ""
  },

  consent: {
    initialAssessment: true,
    privacy: true
  },

  admin: {
    note: ""
  }
}
```

---

## 15. Local Database

Gunakan IndexedDB native.

- DB: `sa3HomeCareDB`
- Version: `1`
- Stores:
  - `assessments` — keyPath `id`
  - `settings` — keyPath `key`
  - `activityLogs` — keyPath `id`

Wajib buat abstraction ringan di `js/db.js`:

- `initDB()`
- `createAssessment(data)`
- `getAssessment(id)`
- `getAllAssessments()`
- `updateAssessment(id, patch)`
- `deleteAssessment(id)`
- `addActivityLog(log)`
- `getActivityLogs(assessmentId)`
- `clearDemoData()`

---

## 16. UI/UX Design System

### Prinsip

- Medical trust.
- Warm home care.
- Premium but approachable.
- Tidak terlalu “tech startup”.
- User publik lebih emosional/human.
- Admin lebih utilitarian/clean.

### Warna

Gunakan tone existing SA3 (hijau/teal/medical) dan modernisasi lewat design tokens. Implementasi awal boleh memakai:

```css
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
```

Jika warna logo/aset existing berbeda, prioritaskan warna asli brand dan sesuaikan token tanpa mengubah struktur desain.

### Typography

- Sans utama: Inter / Manrope / Plus Jakarta Sans.
- Accent editorial opsional: Georgia atau serif system untuk kata tertentu di heading hero.
- Minimum body size mobile: 16px.
- Jangan gunakan font terlalu tipis.

### Radius

- Cards: 18–24px user page.
- Admin cards: 12–16px.
- Button pill / 12–999px sesuai context.

### Shadows

Sangat halus. Lebih banyak gunakan border dan whitespace daripada shadow berat.

---

## 17. Homepage Modernization

Homepage harus tetap recognizable terhadap struktur existing, tetapi lebih premium.

Urutan direkomendasikan:

1. Sticky navbar.
2. Hero large split/overlay image.
3. Trust bar / experience since 2016 / fast response / professional network.
4. “Mengapa SA3 Home Care”.
5. Services grid.
6. “Bagaimana cara mendapatkan layanan”.
7. Assessment CTA block.
8. About snapshot.
9. Testimonials.
10. Coverage / service areas.
11. Blog highlight.
12. Contact CTA.
13. Footer.

Hero CTA:
- Primary: `Isi Assessment Kebutuhan`.
- Secondary: `Lihat Layanan`.
- Tertiary: WhatsApp icon/text.

---

## 18. AOS & Motion

AOS digunakan ringan:
- Hero text fade-up.
- Service cards stagger.
- Testimonial cards fade-up.
- Section content subtle.

Rules:
- Durasi 450–700ms.
- Jangan animate semua elemen.
- Hormati `prefers-reduced-motion`.
- AOS asset disimpan lokal supaya prototype tetap jalan tanpa internet.

---

## 19. Responsive Requirements

Breakpoints rekomendasi:
- <= 480 px: small mobile.
- 481–767 px: mobile.
- 768–1023 px: tablet.
- 1024–1279 px: laptop.
- >= 1280 px: desktop.

### Mobile user website

- Navbar collapse ke menu drawer.
- CTA tetap terlihat.
- Hero satu kolom.
- Grid cards jadi 1 kolom.
- Form assessment full-width.
- Progress step compact.
- Field tap target >= 44px.
- Sticky bottom CTA boleh digunakan di assessment.

### Mobile admin

- Sidebar jadi slide-over drawer.
- KPI menjadi 2 kolom lalu 1 kolom di layar sangat kecil.
- Table menjadi patient cards.
- Detail page satu kolom.
- Filter ditaruh dalam filter drawer/bottom sheet sederhana.

Tidak boleh ada horizontal overflow pada viewport 320px.

---

## 20. Accessibility

Minimal target WCAG-minded frontend:

- Semua field punya `<label>`.
- Error message terhubung ke field.
- Kontras teks jelas.
- Focus state terlihat.
- Navigation dapat digunakan keyboard.
- `aria-expanded` pada mobile menu.
- `aria-live` untuk toast/form error.
- Alt text bermakna untuk gambar konten.
- Decorative images pakai alt kosong.

---

## 21. Performance

- Hindari library besar.
- Image `loading="lazy"` kecuali hero/LCP.
- Hero gunakan WebP/AVIF bila tersedia.
- Set width/height image untuk mengurangi CLS.
- CSS dan JS dipisah modular.
- Tidak ada jQuery.
- Tidak ada Bootstrap.
- Tidak ada React/Vue.

---

## 22. Demo Data

Sediakan `js/seed.js`.

Saat DB kosong dan `DEMO_MODE === true`, seed 6–10 assessment dummy dengan data fiktif.

Admin settings punya:
- `Reset Demo Data`.
- `Clear All Data` dengan konfirmasi dua langkah.

Jangan masukkan data pasien sungguhan sebagai seed.

---

## 23. Acceptance Criteria

Prototype dianggap selesai jika:

1. Semua public page terbuka tanpa error console kritis.
2. Semua nav link berfungsi.
3. Assessment multi-step bisa maju/mundur tanpa kehilangan data.
4. Required validation bekerja.
5. Assessment tersimpan ke IndexedDB.
6. Setelah submit, summary page mengambil record yang benar.
7. WhatsApp link berisi summary yang sudah di-encode dengan benar.
8. Record baru muncul di admin dashboard tanpa harus menulis ulang data.
9. Search/filter admin berfungsi.
10. Detail pasien menampilkan seluruh assessment.
11. Status pasien dapat diubah dan persisten setelah reload.
12. Admin note persisten.
13. Delete record bekerja dengan confirmation.
14. Responsive pada 320, 375, 390, 768, 1024, 1366, 1440 px.
15. Tidak ada horizontal overflow tidak sengaja.
16. AOS tidak merusak layout jika JS gagal dimuat.
17. `prefers-reduced-motion` dihormati.
18. Mobile menu dapat dibuka/ditutup.
19. UI public mempertahankan identitas SA3 dan konten utama existing.
20. Admin tampak profesional, clean, dan bukan template generik lama.

---

## 24. Non-Goals Fase Prototype

Tidak dikerjakan pada versi HTML/CSS/JS lokal:

- Sinkronisasi antar device.
- Database cloud.
- Auth aman production.
- Role management sungguhan.
- Rekam medis elektronik.
- Diagnosis otomatis.
- AI triage medis.
- Payment gateway.
- WhatsApp Business API automation server-side.
- Notifikasi server.
- File upload medis production.
- Backup cloud.

---

## 25. Production Upgrade Path

Jika prototype disetujui klien, fase production direkomendasikan memindahkan persistence dari IndexedDB ke backend aman (misalnya backend custom / managed DB), menambahkan auth sesungguhnya, audit log, access control, backup, security review, dan privacy handling yang sesuai karena data yang dikumpulkan dapat termasuk data kesehatan.

UI dan model data dari prototype harus dibuat modular supaya migrasi backend tidak mengharuskan redesign besar.
