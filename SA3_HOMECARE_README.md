# SA3 Home Care — Handoff Notes

Dokumen paket:

1. `SA3_HOMECARE_PRD.md` — product requirements lengkap.
2. `SA3_HOMECARE_TECH_SPEC.md` — spesifikasi implementasi frontend/local database.
3. `SA3_HOMECARE_MASTER_PROMPT.md` — prompt siap tempel ke coding agent.

## Inti Arsitektur Demo

```text
User Assessment
      ↓
Validation
      ↓
IndexedDB (browser lokal)
      ↓
Success Summary
      ├──→ WhatsApp prefilled message
      └──→ Admin Dashboard membaca IndexedDB yang sama
```

## Important Limitation

Dengan HTML/CSS/JS saja tanpa backend, assessment dari HP pasien tidak akan otomatis muncul di laptop admin yang berbeda. Untuk demo, user page dan admin page harus berjalan dari localhost/origin dan browser storage yang sama.

Jika klien menyetujui flow prototype, tahap production tinggal mengganti layer persistence IndexedDB menjadi backend/database online tanpa harus mengubah seluruh UI.

## Suggested Demo Script ke Klien

1. Buka homepage.
2. Tunjukkan tampilan brand SA3 yang tetap familiar tetapi lebih modern.
3. Klik “Isi Assessment Kebutuhan”.
4. Isi assessment pasien dummy.
5. Submit.
6. Tunjukkan halaman ringkasan dan tombol WhatsApp.
7. Buka admin dashboard.
8. Tunjukkan record assessment yang baru masuk.
9. Buka detail pasien.
10. Ubah status menjadi “Dihubungi”.
11. Refresh halaman untuk membuktikan data masih tersimpan.
12. Tunjukkan bahwa flow ini siap dinaikkan ke database online jika disetujui.
