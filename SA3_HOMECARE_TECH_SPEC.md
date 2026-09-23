# Technical Specification — SA3 Home Care Local Prototype

## 1. Tujuan Dokumen

Dokumen ini adalah panduan implementasi teknis agar prototype SA3 Home Care dapat benar-benar berjalan menggunakan **HTML, CSS, dan Vanilla JavaScript saja**, tanpa backend dan tanpa framework.

---

## 2. Stack

- HTML5 semantic.
- CSS3 modern: custom properties, Grid, Flexbox, clamp(), container-friendly layouts.
- Vanilla JavaScript ES6+.
- IndexedDB native untuk data assessment.
- sessionStorage untuk sesi admin demo.
- localStorage hanya untuk preferensi UI/config non-sensitive bila dibutuhkan.
- AOS Animation dibundel lokal di `assets/vendor/aos/`.
- SVG inline / Lucide-like SVG icons yang disimpan lokal; jangan bergantung pada icon CDN.

No build step.

---

## 3. Cara Menjalankan

Wajib melalui localhost, contoh:

```bash
python -m http.server 5500
```

Lalu buka:

```text
http://localhost:5500/index.html
http://localhost:5500/admin/login.html
```

Alternatif: VS Code Live Server.

Jangan menjadikan `file://` sebagai cara demo utama.

---

## 4. Folder Structure

```text
sa3-homecare/
├── index.html
├── tentang.html
├── layanan.html
├── assessment.html
├── assessment-success.html
├── kontak.html
├── blog.html
│
├── admin/
│   ├── login.html
│   ├── dashboard.html
│   ├── patients.html
│   ├── patient-detail.html
│   └── settings.html
│
├── assets/
│   ├── images/
│   │   ├── logo/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── testimonials/
│   │   └── placeholders/
│   ├── icons/
│   └── vendor/
│       └── aos/
│           ├── aos.css
│           └── aos.js
│
├── css/
│   ├── reset.css
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   ├── public.css
│   ├── assessment.css
│   ├── admin.css
│   └── responsive.css
│
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

---

## 5. Config

`js/config.js`

```js
export const APP_CONFIG = {
  appName: 'SA3 Home Care',
  whatsappNumber: '6282319199534',
  demoMode: true,
  admin: {
    username: 'admin',
    password: 'sa3demo2026'
  },
  db: {
    name: 'sa3HomeCareDB',
    version: 1
  }
};
```

Penting: password ini bukan security production.

---

## 6. IndexedDB Schema

### Database

`sa3HomeCareDB`, version `1`.

### Object store 1 — `assessments`

- keyPath: `id`
- indexes:
  - `createdAt`
  - `status`
  - `patientNameNormalized`
  - `whatsappNormalized`
  - `primaryService`
  - `cityNormalized`

Agar pencarian sederhana lebih mudah, simpan field normalized tambahan pada top-level object:

```js
{
  patientNameNormalized: 'siti aminah',
  whatsappNormalized: '08123456789',
  cityNormalized: 'bandung',
  primaryService: 'Pendampingan Lansia'
}
```

### Object store 2 — `activityLogs`

```js
{
  id: 'LOG-...',
  assessmentId: 'SA3-...',
  type: 'created|status_changed|note_updated|whatsapp_clicked|deleted',
  message: '...',
  createdAt: '...'
}
```

Index: `assessmentId`, `createdAt`.

### Object store 3 — `settings`

```js
{ key: 'whatsappNumber', value: '6282319199534' }
```

---

## 7. DB API Contract

`js/db.js` harus meng-export Promise-based functions:

```js
initDB()
createAssessment(assessment)
getAssessment(id)
getAllAssessments()
updateAssessment(id, patch)
deleteAssessment(id)
getAssessmentsByStatus(status)
addActivityLog(log)
getActivityLogs(assessmentId)
getSetting(key)
setSetting(key, value)
clearAllData()
```

Gunakan helper transaction supaya error selalu reject dengan message jelas.

---

## 8. ID Generator

Format:

```text
SA3-YYYYMMDD-XXXX
```

`XXXX` = uppercase random alphanumeric, exclude karakter membingungkan bila bisa (`0/O`, `1/I`).

Pastikan collision check ke IndexedDB sebelum commit.

---

## 9. Assessment State

`assessment.js` menyimpan draft aktif di memory + `sessionStorage` agar refresh tidak langsung menghapus isian.

Contoh key:

```text
sa3AssessmentDraft
```

Setelah submit berhasil, hapus draft.

Jangan gunakan localStorage untuk menyimpan assessment final; final record masuk IndexedDB.

---

## 10. Validation

Validation client-side:

- Nama minimal 2 karakter.
- WhatsApp hanya angka/+/-/spasi saat input lalu normalize.
- Minimal 9 digit setelah normalize.
- Primary service wajib.
- Kota wajib.
- Start date tidak boleh tanggal lampau jika field diisi.
- Consent wajib.

Tampilkan:
- error di bawah field.
- border error.
- focus ke error pertama ketika submit step.
- summary error top bila banyak error.

---

## 11. WhatsApp Builder

Buat helper:

```js
buildWhatsAppMessage(assessment)
buildWhatsAppUrl(number, message)
```

URL:

```js
`https://wa.me/${number}?text=${encodeURIComponent(message)}`
```

Jangan menaruh raw user text langsung ke query tanpa `encodeURIComponent`.

---

## 12. Admin Auth Demo

### Login

Jika credential cocok:

```js
sessionStorage.setItem('sa3AdminSession', JSON.stringify({
  loggedIn: true,
  loginAt: new Date().toISOString()
}));
```

Semua admin page kecuali login memanggil `requireAdmin()`.

Logout menghapus session dan redirect.

---

## 13. Admin Dashboard Logic

Pada load:

1. `requireAdmin()`.
2. `await initDB()`.
3. Seed demo data hanya jika demoMode dan DB kosong.
4. Fetch all assessments.
5. Hitung KPI.
6. Render latest 6.
7. Render status distribution.
8. Render service distribution.

KPI dihitung berdasarkan local time browser.

---

## 14. Patient List Logic

State:

```js
{
  search: '',
  status: 'all',
  service: 'all',
  city: 'all',
  sort: 'newest'
}
```

Flow:
- Fetch once.
- Filter in memory.
- Render.
- Debounce search 150–250ms.

Desktop table + mobile cards boleh dirender dari data yang sama.

---

## 15. Patient Detail Logic

URL:

```text
admin/patient-detail.html?id=SA3-...
```

Jika ID tidak ditemukan:
- render empty/error state.
- CTA kembali ke daftar.

Status update:
- update DB.
- update updatedAt.
- add log.
- update chip UI tanpa full page reload bila memungkinkan.

Admin note:
- textarea.
- save manual button.
- toast sukses.

---

## 16. UI Components

Public components:
- Top contact strip optional desktop.
- Navbar.
- Mobile nav drawer.
- Hero.
- Trust chips.
- Section label pill.
- Service cards.
- Feature/why-us cards.
- Testimonial cards.
- Blog cards.
- CTA banner.
- Footer.
- Floating WhatsApp button.
- Toast.

Assessment components:
- Stepper.
- Form card.
- Input/select/radio/checkbox.
- Choice cards.
- Sticky mobile action bar.
- Review summary.
- Emergency info callout.

Admin components:
- Sidebar.
- Topbar.
- KPI card.
- Filter bar.
- Status chip.
- Data table.
- Mobile patient card.
- Donut chart SVG/CSS.
- Empty state.
- Confirmation modal.
- Toast.

---

## 17. CSS Architecture

### tokens.css

Simpan seluruh design tokens:
- colors.
- spacing.
- radii.
- shadows.
- type scale.
- z-index.
- max-width.

### Naming

Gunakan class predictable, contoh:

```text
.site-header
.navbar
.hero
.section-heading
.service-card
.form-field
.choice-card
.admin-shell
.admin-sidebar
.kpi-card
.data-table
.status-chip
```

Hindari class acak atau utility berlebihan.

---

## 18. Responsive Behavior

### Public

- Max content width 1180–1240px.
- Horizontal gutter: 16px mobile, 24px tablet, 32px desktop.
- Hero desktop min 620px-ish visual depth; mobile auto.
- Section spacing gunakan clamp.

### Admin

- Desktop sidebar 240–260px.
- Tablet sidebar collapsible.
- Mobile sidebar drawer overlay.
- Main content min-width 0.
- Data table hidden below 768px, mobile card list ditampilkan.

### Form

- 2-column input only >= 768px.
- Mobile always 1 column.
- Buttons full-width mobile jika sesuai.

---

## 19. AOS Safety

Initialize hanya jika tersedia:

```js
if (window.AOS) {
  AOS.init({
    duration: 600,
    once: true,
    offset: 40,
    easing: 'ease-out-cubic'
  });
}
```

CSS fallback harus tetap visible.

Jika `prefers-reduced-motion: reduce`, disable transform/transitions besar.

---

## 20. Image Handling

- Gunakan aset milik klien dari website existing bila tersedia/diizinkan.
- Jangan mengubah karakter brand secara drastis.
- Hero image gunakan home-care human interaction, bukan stock corporate generik.
- Konsisten aspect ratio.
- WebP direkomendasikan.
- `object-fit: cover`.

Jika asset belum tersedia, gunakan placeholder lokal dan tandai dengan komentar agar mudah diganti.

---

## 21. Security & Privacy Notes untuk Prototype

- Jangan simpan NIK.
- Jangan masukkan credential/API key rahasia ke JS.
- Jangan mengklaim data terenkripsi hanya karena IndexedDB.
- Jangan gunakan prototype lokal untuk menyimpan data pasien real dalam skala operasional.
- Tambahkan tombol Clear Data untuk perangkat demo.
- Assessment summary WhatsApp harus meminimalkan detail sensitif yang tidak dibutuhkan.

---

## 22. Testing Checklist

### Browser
- Chrome desktop.
- Edge desktop.
- Firefox desktop basic smoke test.
- Chrome Android.
- Safari iPhone bila tersedia.

### Viewport
- 320x568.
- 360x800.
- 375x812.
- 390x844.
- 768x1024.
- 1024x768.
- 1366x768.
- 1440x900.

### Functional
- Submit blank form.
- Back/next step.
- Refresh mid-draft.
- Submit valid.
- Reload success page.
- Open dashboard.
- Update status.
- Search.
- Filter.
- Delete.
- Reload page and verify persistence.
- Clear demo data.
- WhatsApp URL encoding with spaces, `&`, slash, line breaks.

---

## 23. Definition of Done

Selesai hanya jika:
- No broken link.
- No uncaught JS exception pada flow utama.
- No horizontal overflow pada mobile.
- Data persistence verified setelah reload.
- Admin detail selalu sesuai ID.
- User submit → admin data tersedia di IndexedDB yang sama → WhatsApp summary bekerja.
- UI public dan admin konsisten dengan design direction.
