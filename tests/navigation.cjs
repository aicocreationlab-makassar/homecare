const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.env.SA3_URL||'http://localhost:5500';
(async()=>{
 const browser=await chromium.launch();
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  for(const [old,expected] of [['/index.html','/'],['/layanan.html?service=lansia','/layanan?service=lansia'],['/assessment-success.html?id=EXAMPLE','/assessment-success?id=EXAMPLE'],['/blog/?artikel=persiapan','/blog?artikel=persiapan'],['/admin/login.html','/admin/login']]){
   const response=await context.request.get(base+old,{maxRedirects:0});assert.equal(response.status(),301);assert.equal(response.headers().location,expected);
  }
  const missing=await context.request.get(base+'/halaman-tidak-ada');assert.equal(missing.status(),404);
  await page.goto(base+'/layanan?service=lansia');await page.locator('#service-search').waitFor();await page.reload();await page.locator('#service-search').waitFor();assert(!page.url().includes('.html'));
  await page.goto(base+'/');await page.locator('.hero h1').waitFor();
  assert.equal(await page.locator('.floating-wa img').getAttribute('src'),'/assets/icons/whatsapp.svg');
  const drawer=page.locator('#mobile-nav-dialog');const toggle=page.locator('.menu-toggle');
  await toggle.click();await page.waitForTimeout(380);assert.equal(await toggle.getAttribute('aria-expanded'),'true');
  const box=await drawer.boundingBox();assert(Math.abs(box.x+box.width-390)<2);assert(box.x>0);
  assert.equal(await page.evaluate(()=>document.body.classList.contains('mobile-menu-open')),true);
  assert.equal(await drawer.evaluate(d=>getComputedStyle(d).transform),'matrix(1, 0, 0, 1, 0, 0)');
  for(let i=0;i<15;i++){await page.keyboard.press('Tab');assert(await drawer.evaluate(d=>d.contains(document.activeElement)));}
  await page.screenshot({path:'tests/mobile-navigation.png'});
  await page.locator('.mobile-nav-close').click();await page.waitForTimeout(350);assert.equal(await drawer.evaluate(d=>d.open),false);
  await toggle.click();await page.waitForTimeout(350);await page.mouse.click(5,400);await page.waitForTimeout(350);assert.equal(await drawer.evaluate(d=>d.open),false);
  await toggle.click();await page.waitForTimeout(350);await page.keyboard.press('Escape');await page.waitForTimeout(350);assert.equal(await toggle.getAttribute('aria-expanded'),'false');
  await toggle.click();await page.waitForTimeout(350);await drawer.locator('a[href="/layanan"]').click();await page.waitForURL('**/layanan');await page.locator('#service-search').waitFor();
  for(const width of [320,360,390,768]){await page.setViewportSize({width,height:700});await page.locator('.menu-toggle').click();await page.waitForTimeout(350);assert(await drawer.evaluate(d=>d.scrollWidth<=d.clientWidth+1));await page.keyboard.press('Escape');await page.waitForTimeout(350);}
  await page.locator('.menu-toggle').click();await page.waitForTimeout(350);await page.setViewportSize({width:1366,height:900});await page.waitForTimeout(100);assert.equal(await drawer.evaluate(d=>d.open),false);assert.equal(await page.evaluate(()=>document.body.classList.contains('mobile-menu-open')),false);
  await page.goto(base+'/admin/login');await page.locator('[name=username]').fill('admin');await page.locator('[name=password]').fill('sa3demo2026');await page.locator('button[type=submit]').click();await page.waitForURL('**/admin/dashboard');await page.locator('.kpi-grid').waitFor();
  await page.setViewportSize({width:390,height:844});await page.locator('#admin-menu').click();await page.waitForTimeout(350);const adminBox=await page.locator('#admin-sidebar').boundingBox();assert(Math.abs(adminBox.x+adminBox.width-390)<2);await page.screenshot({path:'tests/admin-navigation.png'});await page.locator('#admin-sidebar-close').click();assert.equal(await page.locator('#admin-menu').getAttribute('aria-expanded'),'false');
  assert.deepEqual(errors,[]);
  const report={passed:true,checks:['Legacy .html redirects preserve query','Clean URL direct load and reload','Unknown route returns 404','Official local WhatsApp asset','Drawer opens from right and animates','Close button, backdrop, Escape','Keyboard focus remains in modal','No drawer overflow at 320–768px','Desktop resize resets menu','Admin drawer opens from right'],pageErrors:errors};fs.writeFileSync('tests/navigation-report.json',JSON.stringify(report,null,2));console.log(report);
 }catch(e){console.error(e);await page.screenshot({path:'tests/navigation-failure.png'});process.exitCode=1;}finally{await browser.close();}
})();
