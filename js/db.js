import { APP_CONFIG } from './config.js';
let connection;
export function initDB() {
  if (connection) return connection;
  connection = new Promise((resolve, reject) => {
    const request = indexedDB.open(APP_CONFIG.db.name, APP_CONFIG.db.version);
    request.onupgradeneeded = () => {
      const db = request.result;
      const assessments = db.createObjectStore('assessments', { keyPath:'id' });
      ['createdAt','status','patientNameNormalized','whatsappNormalized','primaryService','cityNormalized'].forEach(key => assessments.createIndex(key,key));
      const logs = db.createObjectStore('activityLogs', { keyPath:'id' });
      logs.createIndex('assessmentId','assessmentId'); logs.createIndex('createdAt','createdAt');
      db.createObjectStore('settings', { keyPath:'key' });
    };
    request.onsuccess = () => { request.result.onversionchange = () => { request.result.close(); connection = null; }; resolve(request.result); };
    request.onerror = () => { connection = null; reject(request.error); };
    request.onblocked = () => { connection = null; reject(new Error('Tutup tab lain lalu coba kembali.')); };
  });
  return connection;
}
async function transaction(stores, mode, callback) {
  const db = await initDB();
  return new Promise((resolve,reject) => {
    const tx = db.transaction(stores,mode); let result;
    tx.oncomplete = () => resolve(result instanceof IDBRequest ? result.result : result);
    tx.onerror = () => reject(tx.error || new Error('Data tidak berhasil disimpan.'));
    tx.onabort = () => reject(tx.error || new Error('Penyimpanan dibatalkan.'));
    try { result = callback(tx); } catch(error) { tx.abort(); reject(error); }
  });
}
const logRecord = (assessmentId,type,message) => ({ id:crypto.randomUUID(), assessmentId,type,message,createdAt:new Date().toISOString() });
const normalize = a => ({...a,patientNameNormalized:a.patient.name.toLowerCase(),whatsappNormalized:a.contact.whatsapp.replace(/\D/g,''),primaryService:a.service.primary,cityNormalized:a.patient.city.toLowerCase()});
export const getAssessment = id => transaction(['assessments'],'readonly',tx => tx.objectStore('assessments').get(id));
export const getAllAssessments = () => transaction(['assessments'],'readonly',tx => tx.objectStore('assessments').getAll());
export async function getAssessmentsByStatus(status) { return (await getAllAssessments()).filter(a=>a.status===status); }
export const getActivityLogs = id => transaction(['activityLogs'],'readonly',tx => tx.objectStore('activityLogs').index('assessmentId').getAll(id));
export const addActivityLog = log => transaction(['activityLogs'],'readwrite',tx=>tx.objectStore('activityLogs').add({...logRecord(log.assessmentId,log.type,log.message),...log}));
export const getSetting = async key => (await transaction(['settings'],'readonly',tx=>tx.objectStore('settings').get(key)))?.value;
export const setSetting = (key,value) => transaction(['settings'],'readwrite',tx=>tx.objectStore('settings').put({key,value}));
export async function createAssessment(a) {
  return transaction(['assessments','activityLogs'],'readwrite',tx=>{
    tx.objectStore('assessments').add(normalize(a));
    tx.objectStore('activityLogs').add(logRecord(a.id,'created','Assessment baru masuk'));
  });
}
export async function updateAssessment(id,patch,type='status_changed',message='Status diperbarui') {
  return transaction(['assessments','activityLogs'],'readwrite',tx=>{
    const store=tx.objectStore('assessments'); const request=store.get(id);
    request.onsuccess=()=>{ if(!request.result) {tx.abort();return;} store.put(normalize({...request.result,...patch,updatedAt:new Date().toISOString()})); tx.objectStore('activityLogs').add(logRecord(id,type,message)); };
  });
}
export async function deleteAssessment(id) {
  return transaction(['assessments','activityLogs'],'readwrite',tx=>{
    tx.objectStore('assessments').delete(id);
    const request=tx.objectStore('activityLogs').index('assessmentId').openCursor(id);
    request.onsuccess=()=>{ const cursor=request.result; if(cursor){cursor.delete();cursor.continue();} };
  });
}
export const clearAllData = () => transaction(['assessments','activityLogs','settings'],'readwrite',tx=>{
  ['assessments','activityLogs','settings'].forEach(s=>tx.objectStore(s).clear());
  tx.objectStore('settings').put({key:'seedInitialized',value:true});
});
export async function clearDemoData() { for(const a of await getAllAssessments()) if(a.isDemo) await deleteAssessment(a.id); }
