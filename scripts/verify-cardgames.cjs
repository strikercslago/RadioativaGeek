const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs');
(async()=>{
 const b=await chromium.launch({headless:true,channel:'chrome'});const p=await b.newPage({reducedMotion:'reduce'});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://localhost:3000',{waitUntil:'networkidle'});const results=[];
 for(const width of [375,430,768,1024,1366,1920]){
  await p.setViewportSize({width,height:1000});await p.locator('#card-games').scrollIntoViewIfNeeded();await p.locator('#card-games img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
  const result=await p.evaluate(()=>({width:innerWidth,pageWidth:document.documentElement.scrollWidth,overflow:[...document.querySelectorAll('#card-games *')].filter(e=>{const r=e.getBoundingClientRect();return !e.closest('.cardgames__sr')&&r.width&&(r.left<0||r.right>innerWidth+1)}).map(e=>e.className),broken:[...document.querySelectorAll('#card-games img')].filter(i=>!i.naturalWidth).length,bg:getComputedStyle(document.querySelector('#card-games')).backgroundImage}));
  if(result.pageWidth>width||result.overflow.length||result.broken)throw Error(JSON.stringify(result));
  const art=await p.locator('img.cardgames__art').evaluate(i=>({src:i.currentSrc,ratio:i.clientWidth/i.clientHeight})); if(!art.src.includes('vitrine-radioativa.png')||(width<1200&&Math.abs(art.ratio-1672/941)>.01))throw Error('Incorrect art or crop'); await p.locator('#card-games').screenshot({path:`tmp/cardgames-${width}.png`});results.push(result);
 }
 const link=p.locator('.cardgames__cta');
 if(await link.getAttribute('href')!=='https://www.lojaradioativa.com.br/'||await link.getAttribute('target')!=='_blank'||await link.getAttribute('rel')!=='noopener noreferrer')throw Error('Bad CTA');
 await p.context().route('https://www.lojaradioativa.com.br/**',r=>r.fulfill({status:200,contentType:'text/html',body:'Official destination test'}));
 const opened=p.waitForEvent('popup');await link.click();const popup=await opened;await popup.waitForLoadState();if(popup.url()!=='https://www.lojaradioativa.com.br/')throw Error('Wrong destination');await popup.close();
 await link.focus();await p.keyboard.press('Tab');await p.keyboard.press('Shift+Tab');if(!await link.evaluate(e=>e===document.activeElement&&getComputedStyle(e).outlineStyle!=='none'))throw Error('Missing focus');
 if(errors.length)throw Error(errors.join('\n'));
 fs.writeFileSync('tmp/cardgames-check.json',JSON.stringify({results,errors,checks:['CTA new tab','secure rel','focus','images','six viewport widths']},null,2));console.log('PASS: six widths, images, no overflow, CTA in new tab, focus, no page errors.');await b.close();
})().catch(e=>{console.error(e);process.exit(1)});



