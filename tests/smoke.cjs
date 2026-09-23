/* Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
   Uses an isolated browser context; never touches the user's stored assessments. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.SA3_URL||'http://localhost:5500';
(async()=>{
 const browser=await chromium.launch();
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();const errors=[];const failures=[];const results=[];
 page.on('pageerror',e=>errors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`);});
 const go=async p=>{await page.goto(`${base}/${p}`);await page.locator('.loading-state').waitFor({state:'detached'});};
 const fill=(name,value)=>page.locator(`[name="${name}"]`).fill(value);
 const select=(name,value)=>page.locator(`[name="${name}"]`).selectOption({label:value});
 const next=()=>page.locator('#next').click();
 const screenshot=async options=>{await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,15));}window.scrollTo(0,0);});await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));await page.screenshot(options);};
 try{
  await go('admin/settings.html');await page.waitForURL('**/admin/login.html');
  await fill('username','admin');await fill('password','wrong');await page.locator('button[type=submit]').click();assert(await page.locator('#login-error').textContent());
  await fill('password','sa3demo2026');await page.locator('button[type=submit]').click();await page.waitForURL('**/admin/dashboard.html');await page.locator('.kpi-grid').waitFor();assert.equal(await page.locator('.donut-inner strong').textContent(),'8');results.push('Login gate, invalid credentials, seed 8 fictitious records');
  await go('assessment.html');await next();assert(await page.locator('[aria-invalid=true]').count()>0);
  await fill('contact.name','Keluarga Uji & Aman');await fill('contact.whatsapp','081234567890');await select('contact.relationship','Anak');await fill('contact.email','demo@example.test');await next();
  await fill('patient.name','Pasien <Uji> & Demo');await select('patient.ageGroup','70–79 tahun');await fill('patient.city','Bandung');await fill('patient.district','Lengkong');await fill('patient.address','Jalan Fiktif / Uji');await page.reload();await page.locator('[name="patient.name"]').waitFor();assert.equal(await page.inputValue('[name="patient.name"]'),'Pasien <Uji> & Demo');
  await page.locator('#previous').click();assert.equal(await page.inputValue('[name="contact.name"]'),'Keluarga Uji & Aman');await next();await next();
  await select('service.primary','Pendampingan Lansia / Caregiver');await select('service.duration','8 jam');await fill('service.startDate','2000-01-01');await next();assert.equal(await page.locator('[name="service.startDate"]').getAttribute('aria-invalid'),'true');
  const day=await page.evaluate(()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;});await fill('service.startDate',day);await select('service.preferredTime','Pagi');await next();
  await select('careProfile.mobility','Tongkat');await page.locator('[name="careProfile.adlNeeds"][value="Pendampingan berjalan"]').check();await page.locator('[name="careProfile.equipmentOrCondition"][value="Tidak ada"]').check();await fill('careProfile.familyNotes','Catatan <script> aman & lengkap / baris 1\nBaris kedua.');await next();
  await select('environment.placeType','Rumah');await fill('environment.preferredLanguage','Indonesia');await next();await next();assert.match(await page.locator('#form-error').textContent(),/persetujuan/);
  await page.locator('[name="consent.initialAssessment"]').check();await page.locator('[name="consent.privacy"]').check();await next();await page.waitForURL('**/assessment-success.html?id=*');await page.locator('#send-whatsapp').waitFor();
  const id=new URL(page.url()).searchParams.get('id');assert.match(id,/^SA3-\d{8}-[A-Z2-9]{4}$/);assert.equal(await page.evaluate(()=>sessionStorage.getItem('sa3AssessmentDraft')),null);
  await page.reload();await page.locator('#send-whatsapp').waitFor();const wa=new URL(await page.locator('#send-whatsapp').getAttribute('href'));assert.equal(wa.hostname,'wa.me');assert.match(wa.searchParams.get('text'),/Pasien <Uji> & Demo/);assert.match(wa.searchParams.get('text'),/Baris kedua/);assert.equal(await page.locator('script:not([src])').count(),0);
  results.push('Blank validation, invalid date, back/next, draft reload, consent, submit, ID format, success reload, escaped text, WhatsApp encoding');
  await go('admin/patients.html');await fill('search','Pasien <Uji>');await page.waitForTimeout(240);assert.match(await page.locator('#result-count').textContent(),/1 dari 9/);await select('status','Selesai');assert.match(await page.locator('#result-count').textContent(),/0 dari 9/);await page.locator('button[type=reset]').click();await page.waitForTimeout(80);assert.match(await page.locator('#result-count').textContent(),/9 dari 9/);
  await go(`admin/patient-detail.html?id=${id}`);await select('status','Dihubungi');await page.locator('#status-form button').click();await page.waitForFunction(()=>document.querySelector('#header-status').textContent.includes('Dihubungi'));await fill('note','Catatan admin uji & aman');await page.locator('#note-form button').click();await page.waitForFunction(()=>document.querySelector('#timeline').textContent.includes('Catatan admin diperbarui'));await page.reload();await page.locator('#note-form').waitFor();assert.equal(await page.inputValue('[name=note]'),'Catatan admin uji & aman');assert.match(await page.locator('#header-status').textContent(),/Dihubungi/);results.push('Admin record visible, search/filter/reset, status + note + activity persistence');
  await go('admin/settings.html');await fill('whatsapp','081234567891');await page.locator('#settings-form button').click();await page.waitForTimeout(100);await go(`assessment-success.html?id=${id}`);assert(new URL(await page.locator('#send-whatsapp').getAttribute('href')).pathname.endsWith('6281234567891'));results.push('WhatsApp settings applied to public summary');
  const routes=['index.html','tentang.html','layanan.html','kontak.html','blog.html','assessment.html',`assessment-success.html?id=${id}`,'admin/login.html','admin/dashboard.html','admin/patients.html',`admin/patient-detail.html?id=${id}`,'admin/settings.html'];
  const widths=[320,360,375,390,768,1024,1366,1440];
  const overflows=[];const brokenLinks=new Set();
  for(const width of widths){await page.setViewportSize({width,height:900});for(const route of routes){await go(route);await page.evaluate(()=>document.fonts.ready);const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,width:innerWidth}));if(overflow.doc>width+1)overflows.push({width,route,...overflow});
    if(width===1440){for(const href of await page.locator('a[href]').evaluateAll(a=>a.map(x=>x.href))){const u=new URL(href);if(u.origin===new URL(base).origin){const file=decodeURIComponent(u.pathname).slice(1)||'index.html';if(!fs.existsSync(file))brokenLinks.add(file);}}}
  }console.log('Viewport checked:',width);}
  assert.deepEqual(overflows,[]);assert.deepEqual([...brokenLinks],[]);results.push('All 12 pages × 8 viewport widths: no horizontal overflow; local navigation files exist');
  await page.setViewportSize({width:390,height:844});await go('index.html');await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');await screenshot({path:'tests/home-mobile.png',fullPage:true});
  await go('admin/dashboard.html');await page.locator('#admin-menu').click();assert.equal(await page.locator('#admin-menu').getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('#admin-menu').getAttribute('aria-expanded'),'false');await screenshot({path:'tests/admin-mobile.png',fullPage:true});
  await go('assessment.html');await screenshot({path:'tests/assessment-mobile.png',fullPage:true});await page.setViewportSize({width:1440,height:1000});await go('index.html');await screenshot({path:'tests/home-desktop.png',fullPage:true});await screenshot({path:'tests/home-hero.png'});await go('admin/dashboard.html');await screenshot({path:'tests/admin-desktop.png',fullPage:true});results.push('Mobile public navigation + admin drawer; screenshot artifacts');
  await go(`admin/patient-detail.html?id=${id}`);await page.locator('#delete-record').click();await page.locator('dialog button[value=cancel]').click();assert(await page.locator('#delete-record').count());await page.locator('#delete-record').click();await page.locator('dialog button[value=confirm]').click();await page.waitForURL('**/admin/patients.html');await go(`assessment-success.html?id=${id}`);assert.match(await page.locator('h1').textContent(),/tidak ditemukan/);
  await go('admin/settings.html');await page.locator('#clear-all').click();await fill('confirmation','HAPUS');await page.locator('dialog button[value=confirm]').click();await page.waitForFunction(()=>document.querySelector('#data-count').textContent.startsWith('0 assessment'));await go('admin/dashboard.html');assert.equal(await page.locator('.donut-inner strong').textContent(),'0');await page.reload();await page.locator('.kpi-grid').waitFor();assert.equal(await page.locator('.donut-inner strong').textContent(),'0');
  await go('admin/settings.html');await page.locator('#reset-demo').click();await page.locator('dialog button[value=confirm]').click();await page.waitForFunction(()=>document.querySelector('#data-count').textContent.startsWith('8 assessment'));results.push('Delete cancel/confirm, missing record handling, clear with typed confirmation, no automatic reseed, manual demo reset');
  await page.locator('#logout').click();await page.waitForURL('**/admin/login.html');await go('admin/patients.html');await page.waitForURL('**/admin/login.html');results.push('Logout and protected-route redirect');
  assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
  const report={passed:true,date:new Date().toISOString(),browser:'Chromium',results,pageErrors:errors,httpFailures:failures};fs.writeFileSync('tests/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));
 }catch(e){await screenshot({path:'tests/failure.png',fullPage:true});console.error(e);console.error({url:page.url(),errors,failures});process.exitCode=1;}
 finally{await browser.close();}
})();
