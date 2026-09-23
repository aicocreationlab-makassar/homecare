import { APP_CONFIG, STATUSES, SERVICES } from './config.js';
import { getAllAssessments,getSetting,setSetting,createAssessment,clearDemoData } from './db.js';
import { localDay } from './common.js';
export async function seedDemo(force=false) {
  if(!APP_CONFIG.demoMode)return;
  if(force) await clearDemoData();
  else if((await getSetting('seedInitialized')) || (await getAllAssessments()).length) return;
  const names=['Ibu Melati','Bapak Surya','Ibu Kenanga','Bapak Awan','Ibu Anggrek','Bapak Langit','Ibu Cempaka','Bapak Bumi'];
  for(let i=0;i<8;i++) {
    const created=new Date();created.setDate(created.getDate()-Math.floor(i/3));
    await createAssessment({id:`SA3-${localDay(created).replaceAll('-','')}-D00${i}`,isDemo:true,createdAt:created.toISOString(),updatedAt:created.toISOString(),status:STATUSES[i%6],contact:{name:`Keluarga Demo ${i+1}`,whatsapp:'6280000000000',email:'',relationship:'Anak'},patient:{name:names[i]+' (Demo)',ageGroup:'70–79 tahun',gender:i%2?'Pria':'Wanita',city:['Bandung','Jakarta','Bandung','Bali'][i%4],district:'Area contoh',address:'Alamat fiktif untuk demonstrasi'},service:{primary:SERVICES[i%4].id,additional:[],duration:'8 jam',startDate:localDay(),preferredTime:'Pagi'},careProfile:{knownCondition:'Contoh data fiktif untuk demo.',independenceLevel:'Butuh bantuan sebagian',mobility:'Tongkat',adlNeeds:['Pendampingan berjalan'],equipmentOrCondition:['Tidak ada'],fallHistory:'Tidak',communicationDifficulty:'Tidak',familyNotes:'Data fiktif. Tidak mewakili pasien sungguhan.'},environment:{placeType:'Rumah',access:'Lantai dasar',familyPresent:'Ya',caregiverPreference:'Tidak ada preferensi',preferredLanguage:'Indonesia',specialNeeds:''},consent:{initialAssessment:true,privacy:true},admin:{note:''}});
  }
  await setSetting('seedInitialized',true);
}
