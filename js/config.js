export const APP_CONFIG = { appName: 'SA3 Home Care', whatsappNumber: '6282319199534', demoMode: true, admin: { username: 'admin', password: 'sa3demo2026' }, db: { name: 'sa3HomeCareDB', version: 1 } };
export const STATUSES = ['Baru', 'Dihubungi', 'Perlu Follow-up', 'Terjadwal', 'Selesai', 'Batal'];
export const SERVICES = [
  { id:'hospital', name:'Perawatan Pre/Post Hospital', icon:'heart', desc:'Pendampingan sebelum dan setelah perawatan di rumah sakit, lebih nyaman di rumah.', image:'caregiver.webp' },
  { id:'lansia', name:'Pendampingan Lansia / Caregiver', icon:'people', desc:'Teman sehari-hari yang penuh perhatian untuk orang tua tersayang.', image:'caregiver.webp' },
  { id:'stroke', name:'Perawatan Pasien Stroke', icon:'activity', desc:'Dukungan perawatan yang disesuaikan dengan kebutuhan dan arahan tenaga kesehatan.', image:'stroke.webp' },
  { id:'visit', name:'Visit Dokter dan Perawat', icon:'medical', desc:'Kunjungan tenaga kesehatan profesional ke rumah, villa, atau hotel Anda.', image:'doctor.webp' },
  { id:'konsultasi', name:'Konsultasi Dokter Medis', icon:'chat', desc:'Diskusikan kebutuhan kesehatan keluarga bersama dokter.' },
  { id:'bidan', name:'Bidan, Bayi, dan Ibu Hamil', icon:'heart', desc:'Pendampingan hangat untuk ibu dan buah hati, sejak kehamilan hingga pascapersalinan.', image:'mother.webp' },
  { id:'lab', name:'Pemeriksaan Lab', icon:'medical', desc:'Koordinasikan pemeriksaan laboratorium sesuai kebutuhan keluarga.' },
  { id:'luka', name:'Perawatan Luka', icon:'medical', desc:'Perawatan luka oleh tenaga kesehatan sesuai hasil pemeriksaan.' },
  { id:'fisio', name:'Fisioterapi / Terapi ROM', icon:'activity', desc:'Pendampingan latihan gerak bersama tenaga profesional sesuai kondisi pasien.', image:'therapy.webp' },
  { id:'alat', name:'Pemasangan Infus, Kateter, NGT', icon:'medical', desc:'Layanan tindakan oleh tenaga kesehatan sesuai indikasi dan instruksi medis.' },
  { id:'hipno', name:'Hipnoterapi', icon:'heart', desc:'Konsultasikan kebutuhan layanan hipnoterapi bersama tim kami.' },
  { id:'alkes', name:'Penyewaan dan Pembelian Alat Kesehatan', icon:'home', desc:'Bantuan menemukan alat kesehatan yang sesuai kebutuhan perawatan di rumah.' },
  { id:'lainnya', name:'Konsultasi kebutuhan lainnya', icon:'chat', desc:'Belum yakin layanan yang dibutuhkan? Kami siap mendengarkan.' }
];
export const serviceName = id => SERVICES.find(s => s.id === id)?.name || id || '—';
