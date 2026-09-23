import { SERVICES,serviceName } from './config.js';
import { esc } from './common.js';
export const STEPS = [
 {title:'Data pemesan',short:'Pemesan',desc:'Mari berkenalan. Siapa yang dapat kami hubungi?',group:'contact',fields:[
  {key:'name',label:'Nama pemesan',required:true,min:2,autocomplete:'name'},
  {key:'whatsapp',label:'Nomor WhatsApp',type:'tel',required:true,placeholder:'Contoh: 0823 1919 9534',autocomplete:'tel'},
  {key:'relationship',label:'Hubungan dengan pasien',required:true,options:['Diri sendiri','Anak','Pasangan','Saudara','Caregiver','Lainnya']},
  {key:'email',label:'Email (opsional)',type:'email',autocomplete:'email'}]},
 {title:'Informasi pasien',short:'Pasien',desc:'Informasi dasar membantu kami memahami siapa yang akan didampingi.',group:'patient',fields:[
  {key:'name',label:'Nama pasien',required:true,min:2},
  {key:'ageGroup',label:'Kelompok usia',required:true,options:['Anak','Remaja','Dewasa','60–69 tahun','70–79 tahun','80+ tahun']},
  {key:'gender',label:'Jenis kelamin (opsional)',options:['Pria','Wanita','Tidak ingin menyebutkan']},
  {key:'city',label:'Kota / kabupaten',required:true,placeholder:'Contoh: Kota Bandung'},
  {key:'district',label:'Kecamatan / area',required:true,placeholder:'Contoh: Lengkong'},
  {key:'address',label:'Alamat lengkap (opsional)',type:'textarea',full:true}]},
 {title:'Kebutuhan layanan',short:'Layanan',desc:'Pilih kebutuhan awal. Detail layanan dapat didiskusikan bersama tim.',group:'service',fields:[
  {key:'primary',label:'Layanan utama',required:true,options:SERVICES.map(s=>[s.id,s.name]),full:true},
  {key:'additional',label:'Layanan tambahan (opsional)',type:'checks',options:SERVICES.map(s=>[s.id,s.name]),full:true},
  {key:'duration',label:'Durasi layanan',required:true,options:['Visit satu kali','4 jam','8 jam','12 jam','24 jam','Harian','Mingguan','Bulanan','Belum tahu / perlu rekomendasi']},
  {key:'startDate',label:'Tanggal mulai (opsional)',type:'date'},
  {key:'preferredTime',label:'Preferensi jam (opsional)',options:['Pagi','Siang','Sore','Malam','Fleksibel']}]},
 {title:'Kondisi & kebutuhan awal',short:'Kondisi awal',desc:'Ceritakan dengan bahasa sehari-hari. Tidak perlu mengetahui istilah medis.',group:'careProfile',fields:[
  {key:'knownCondition',label:'Kondisi / diagnosis yang sudah diketahui (opsional)',type:'textarea',full:true},
  {key:'independenceLevel',label:'Tingkat kemandirian (opsional)',options:['Mandiri','Butuh bantuan sebagian','Butuh bantuan hampir seluruh aktivitas','Bedrest','Belum tahu']},
  {key:'mobility',label:'Mobilitas (opsional)',options:['Jalan mandiri','Tongkat','Walker','Kursi roda','Bedrest','Belum tahu']},
  {key:'adlNeeds',label:'Bantuan aktivitas sehari-hari (opsional)',type:'checks',options:['Mandi / kebersihan diri','Berpakaian','Makan / minum','Toileting','Berpindah posisi / tempat','Pendampingan berjalan','Pengingat obat sesuai instruksi tenaga kesehatan','Monitoring sesuai arahan tenaga kesehatan'],full:true},
  {key:'equipmentOrCondition',label:'Alat / kondisi yang relevan (opsional)',type:'checks',options:['Oksigen','Kateter urine','NGT','Infus','Trakeostomi','Luka / wound care','Suction','Bed pasien','Tidak ada','Lainnya'],full:true},
  {key:'fallHistory',label:'Riwayat jatuh 3 bulan terakhir (opsional)',options:['Ya','Tidak','Tidak tahu']},
  {key:'communicationDifficulty',label:'Kesulitan komunikasi (opsional)',options:['Tidak','Ringan','Signifikan','Tidak tahu']},
  {key:'familyNotes',label:'Catatan penting keluarga (opsional)',type:'textarea',full:true}]},
 {title:'Lingkungan & preferensi',short:'Preferensi',desc:'Bantu kami menyesuaikan pendampingan dengan kenyamanan keluarga.',group:'environment',fields:[
  {key:'placeType',label:'Tempat layanan (opsional)',options:['Rumah','Apartemen','Hotel','Lainnya']},
  {key:'access',label:'Akses lokasi (opsional)',options:['Lantai dasar','Tangga','Lift','Tangga dan lift','Lainnya']},
  {key:'familyPresent',label:'Keluarga ada di lokasi? (opsional)',options:['Ya','Tidak','Belum pasti']},
  {key:'caregiverPreference',label:'Preferensi tenaga (opsional)',options:['Tidak ada preferensi','Pria','Wanita']},
  {key:'preferredLanguage',label:'Bahasa komunikasi (opsional)',placeholder:'Contoh: Indonesia, Sunda'},
  {key:'specialNeeds',label:'Kebutuhan khusus lainnya (opsional)',type:'textarea',full:true}]},
 {title:'Periksa & konfirmasi',short:'Konfirmasi',desc:'Pastikan informasi sudah sesuai sebelum menyimpan assessment.',group:'consent',fields:[]}
];
export function summaryMarkup(a) {return STEPS.slice(0,5).map(step=>`<section class="summary-group"><h3>${step.title}</h3><dl>${step.fields.map(f=>{let val=a[step.group]?.[f.key];if(step.group==='service' && ['primary','additional'].includes(f.key))val=Array.isArray(val)?val.map(serviceName):serviceName(val);return `<div ${f.full?'class="full-width"':''}><dt>${esc(f.label.replace(' (opsional)',''))}</dt><dd>${esc(Array.isArray(val)?val.join(', ')||'—':val||'—')}</dd></div>`;}).join('')}</dl></section>`).join('');}
