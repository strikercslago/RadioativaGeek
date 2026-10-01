const {chromium,webkit}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('fs');
(async()=>{
 const baseline=fs.existsSync('tmp/backgrounds-before.json') ? JSON.parse(fs.readFileSync('tmp/backgrounds-before.json')) : [];
 const reports=[];const unavailable=[];
 for(const engine of (process.env.TEST_ENGINE ? [process.env.TEST_ENGINE] : ['chrome','webkit'])){
  let browser;try{browser=await (engine==='chrome'?chromium.launch({headless:true,channel:'chrome'}):webkit.launch({headless:true,executablePath:process.env.WEBKIT_EXECUTABLE || undefined}));}catch(e){unavailable.push({engine,error:e.message});continue;}
  for(const width of [375,430,768,1366,1920]){
   const context=await browser.newContext({viewport:{width,height:900},isMobile:width<768,hasTouch:width<768,reducedMotion:'reduce',deviceScaleFactor:1});
   const p=await context.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
   await p.goto('http://localhost:3000',{waitUntil:'networkidle'});
   await p.addStyleTag({content:'section,footer {content-visibility:visible!important}'});
   await p.evaluate(()=>document.fonts.ready);
   const measure=()=>p.evaluate(()=>{const image=document.querySelector('.hero__art img').getBoundingClientRect();const content=document.querySelector('.hero__inner').getBoundingClientRect();return {image:{x:image.x,y:image.y,width:image.width,height:image.height},contentY:content.y}});
   const start=await measure();await p.evaluate(()=>scrollTo(0,180));await p.waitForTimeout(100);const scrolled=await measure();
   if(JSON.stringify(start.image)!==JSON.stringify(scrolled.image)||Math.abs(start.contentY-scrolled.contentY-180)>1)throw Error(`${engine} ${width}: hero moved or content stuck`);
   const layout=await p.evaluate(()=>({width:innerWidth,sections:[...document.querySelectorAll('main>section,header,footer')].map(e=>({name:e.className,height:e.getBoundingClientRect().height,width:e.getBoundingClientRect().width,text:e.textContent}))}));
   if(baseline.length&&engine==='chrome'&&JSON.stringify(layout)!==JSON.stringify(baseline.find(x=>x.width===width)))throw Error(`Layout changed at ${width}`);
   const backgrounds=await p.evaluate(()=>[...document.querySelectorAll('.about,.instagram,.categories,.story,.benefits,.visit')].map(e=>({section:e.className,background:getComputedStyle(e).backgroundImage,size:getComputedStyle(e).backgroundSize})));
   if(backgrounds.some(e=>!e.background.includes(width<768?'-mobile.webp':'-desktop.webp')))throw Error('Wrong responsive texture');
   if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');
   await p.evaluate(()=>scrollTo(0,document.querySelector('.hero').getBoundingClientRect().bottom+scrollY+20));await p.waitForTimeout(100);
   await p.waitForLoadState('networkidle'); await p.waitForTimeout(300); const visible=await p.screenshot();await p.locator('.hero__art').evaluate(e=>e.style.filter='brightness(0)');const hidden=await p.screenshot();
   if(!visible.equals(hidden)){fs.writeFileSync('tmp/clip-visible.png',visible);fs.writeFileSync('tmp/clip-hidden.png',hidden);} if(!visible.equals(hidden))throw Error(`${engine} ${width}: hero image leaked outside section`);
   await p.locator('.hero__art').evaluate(e=>e.style.filter='');
   if(width===375||width===1366){await p.evaluate(()=>scrollTo(0,0));await p.screenshot({path:`tmp/hero-${engine}-${width}.png`});await p.locator('.instagram').screenshot({path:`tmp/background-yellow-${engine}-${width}.png`});await p.locator('.benefits').screenshot({path:`tmp/background-dark-${engine}-${width}.png`});}
   reports.push({engine,width,fixed:true,clipped:true,noOverflow:true,errors,backgrounds});await context.close();
  }
  await browser.close();
 }
 fs.writeFileSync('tmp/backgrounds-check.json',JSON.stringify({reports,unavailable},null,2));console.log(JSON.stringify({checks:reports.map(({engine,width,fixed,clipped,noOverflow,errors})=>({engine,width,fixed,clipped,noOverflow,errors})),unavailable},null,2));
})().catch(e=>{console.error(e);process.exit(1)});




