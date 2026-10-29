import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('output/playwright', { recursive: true });
const cases = JSON.parse(readFileSync('scripts/continuation3-cases.json', 'utf8'));
const patterns = cases.map(item => JSON.parse(readFileSync(`src/catalog/patterns/${item.id}.json`, 'utf8')));
const code = `async (page) => {
  const cases=${JSON.stringify(cases)};
  const patterns=${JSON.stringify(patterns)};
  const failures=[], errors=[];
  let actions=0, resets=0, settingsChecks=0, layoutChecks=0;
  const origin='http://127.0.0.1:5178/';
  page.setDefaultTimeout(8000);
  page.on('pageerror',error=>errors.push(error.message));
  await page.emulateMedia({reducedMotion:'reduce'});
  const check=(condition,message)=>{if(!condition)throw new Error(message);};
  for(const item of cases) {
    const pattern=patterns.find(pattern=>pattern.id===item.id);
    try {
      await page.setViewportSize({width:1440,height:1000});
      await page.goto(origin+'#/patterns/'+item.id);await page.reload();
      await page.getByRole('heading',{level:2,name:pattern.nameJa,exact:true}).waitFor();
      const frame=page.frameLocator('iframe');
      await frame.getByRole('heading',{level:1}).waitFor();
      const perform=async()=>{
        const target=frame.getByRole(item.role,{name:item.action,exact:true});
        await target.focus();await page.keyboard.press(item.role==='radio'||item.role==='checkbox'?'Space':'Enter');
        await frame.getByText(item.expected,{exact:false}).first().waitFor();
      };
      await perform();actions++;
      await page.getByRole('button',{name:'デモをリセット',exact:true}).click();
      await frame.getByRole('heading',{level:1}).waitFor();
      await perform();resets++;
      for(const option of pattern.controls[0].options) {
        await page.locator('.settings-section select').selectOption(option.value);
        await frame.getByRole('heading',{level:1}).waitFor();
        const prompt=await page.getByRole('textbox',{name:'AIへの指示文'}).inputValue();
        check(prompt.includes(option.promptValue),'prompt mismatch '+option.value);
        const src=await page.locator('iframe').getAttribute('src');
        check(new URLSearchParams(src.split('?')[1]).get('mode')===option.value,'iframe mode mismatch');settingsChecks++;
      }
      for(const width of [375,768,1440]) {
        await page.setViewportSize({width,height:900});
        for(const option of pattern.controls[0].options) {
          await page.goto(origin+'#/demo/'+item.id+'?mode='+option.value);await page.reload();
          await page.getByRole('heading',{level:1}).waitFor();
          await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
          const size=await page.evaluate(()=>({client:document.documentElement.clientWidth,content:document.documentElement.scrollWidth}));
          check(size.content<=size.client+1,'overflow '+width+' '+option.value+' '+JSON.stringify(size));layoutChecks++;
        }
      }
    }catch(error){failures.push({id:item.id,message:error.message});}
  }
  return {items:cases.length,actions,resets,settingsChecks,layoutChecks,failures,errors};
}`;
writeFileSync('output/playwright/continuation3-smoke.js', code);
