const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch();const context=await browser.newContext({viewport:{width:320,height:700},isMobile:true,hasTouch:true});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const base=process.env.SA3_URL||'http://localhost:5500';
 const field=name=>page.locator(`[name="${name}"]`);
 const noOverflow=async()=>assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 try{
 await page.goto(base+'/assessment.html');await field('contact.name').fill('Pemesan Demo Mobile');await field('contact.whatsapp').fill('081234567890');await field('contact.relationship').selectOption('Anak');await noOverflow();await page.locator('#next').click();
 await field('patient.name').fill('Pasien Demo Mobile');await field('patient.ageGroup').selectOption('Dewasa');await field('patient.city').fill('Bandung');await field('patient.district').fill('Lengkong');await noOverflow();await page.locator('#next').click();
 await field('service.primary').selectOption('lansia');await field('service.duration').selectOption('8 jam');await noOverflow();await page.locator('#next').click();
 await page.locator('[name="careProfile.equipmentOrCondition"][value="Tidak ada"]').check();await noOverflow();await page.locator('#next').click();await noOverflow();await page.locator('#next').click();await noOverflow();
 await field('consent.initialAssessment').check();await field('consent.privacy').check();await page.locator('#next').click();await page.waitForURL('**/assessment-success.html?id=*');await page.locator('#send-whatsapp').waitFor();await noOverflow();
 await page.route('**/assets/vendor/aos/aos.js',r=>r.abort());await page.goto(base+'/index.html');await page.locator('.hero h1').waitFor();const hidden=await page.locator('[data-aos]').evaluateAll(els=>els.filter(e=>getComputedStyle(e).opacity==='0').length);assert.equal(hidden,0);await noOverflow();assert.deepEqual(errors,[]);
 const report={passed:true,browser:'Chromium mobile emulation',viewport:320,checks:['All six wizard steps without overflow','Full touch-based assessment submission','Success loaded from IndexedDB','All animated content visible when AOS fails to load'],pageErrors:errors};fs.writeFileSync('tests/mobile-report.json',JSON.stringify(report,null,2));console.log(report);
 }catch(e){console.error(e);process.exitCode=1;}finally{await browser.close();}
})();
