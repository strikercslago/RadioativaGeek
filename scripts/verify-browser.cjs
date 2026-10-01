const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page = await browser.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
 const errors=[]; page.on('pageerror',e=>errors.push(e.message)); page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 await page.goto(process.env.TEST_URL || 'http://localhost:3003',{waitUntil:'networkidle'});
 await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70));}window.scrollTo(0,0)});
 await page.waitForTimeout(400);
 await page.screenshot({path:'tmp/desktop-redesign.png',fullPage:true});
 const results=[];
 for(const width of [1440,1280,1024,768,430,390,360,320]){
  await page.setViewportSize({width,height:900});
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.waitForTimeout(150);
  const result=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelectorAll('h1').length,brokenImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src),overflow:[...document.querySelectorAll('main *,header *,footer *')].filter(e=>{const r=e.getBoundingClientRect();return !e.closest('.reviews-lane')&&r.width&&r.right>innerWidth+1&&getComputedStyle(e).position!=='absolute'}).map(e=>e.className).slice(0,8)}));
  results.push(result);
 }
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'tmp/mobile-redesign.png',fullPage:true});
 const menu=page.locator('.menu-button'); await menu.click();
 if(await menu.getAttribute('aria-expanded')!=='true')throw new Error('Menu did not open');
 await page.keyboard.press('Escape');
 if(await menu.getAttribute('aria-expanded')!=='false')throw new Error('Menu did not close');
 await menu.click();await page.locator('#navigation a[href="#produtos"]').click();
 if(await menu.getAttribute('aria-expanded')!=='false')throw new Error('Navigation did not close menu');
 if(await page.locator('.reviews-lane--1 .reviews-group').first().locator('img').count()!==7)throw new Error('Missing review images');
 await page.locator('.hero .button--primary').first().click();
 const dialog=page.locator('.hero dialog');
 if(await dialog.count()) {if(!await dialog.isVisible())throw new Error('Missing-number fallback did not open');await page.keyboard.press('Escape');}
 const links=await page.locator('a').evaluateAll(as=>as.map(a=>({href:a.getAttribute('href'),text:a.textContent.trim()})));
 const invalidAnchors=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));
 await page.emulateMedia({reducedMotion:'reduce'});
 const reducedMotion=await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior);
 console.log(JSON.stringify({results,errors,invalidAnchors,reducedMotion,externalDestinations:[...new Set(links.filter(l=>/^https/.test(l.href)).map(l=>l.href))],checks:['mobile menu / Escape / close on navigation','seven review images','contact fallback / Escape','one H1','no broken images','valid internal links']},null,2));
 fs.writeFileSync('tmp/browser-check.json',JSON.stringify({results,errors,invalidAnchors,reducedMotion},null,2));
 await browser.close();
 if(errors.length||invalidAnchors.length||results.some(r=>r.scrollWidth>r.width||r.overflow.length||r.brokenImages.length||r.h1!==1))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
