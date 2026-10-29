import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('output/playwright', { recursive: true });
const groups = ['chart', 'style', 'structure', 'interaction', 'workflow', 'relation', 'browser'];
for (const group of groups) {
  const cases = JSON.parse(readFileSync(`scripts/growth2-${group}-cases.json`, 'utf8'));
  const patterns = cases.map(item => JSON.parse(readFileSync(`src/catalog/patterns/${item.id}.json`, 'utf8')));
  const code = `async (page) => {
    const cases=${JSON.stringify(cases)};
    const patterns=${JSON.stringify(patterns)};
    const origin='http://127.0.0.1:5178/';
    const failures=[], errors=[]; let actions=0, resets=0, settingsChecks=0, layoutChecks=0;
    page.on('pageerror', error=>errors.push(error.message));
    page.setDefaultTimeout(8000);
    await page.emulateMedia({reducedMotion:'reduce'});
    const check=(condition,message)=>{if(!condition)throw new Error(message);};
    for(const item of cases) {
      const pattern=patterns.find(value=>value.id===item.id);
      try {
        await page.setViewportSize({width:1440,height:1000});
        await page.goto(origin+'#/patterns/'+item.id); await page.reload();
        await page.getByRole('heading',{level:2,name:pattern.nameJa,exact:true}).waitFor();
        const frame=page.frameLocator('iframe');
        await frame.getByRole('heading',{level:1}).waitFor();
        const perform=async()=>{
          const checkbox=['legend-toggle','permission-matrix'].includes(item.id);
          const control=frame.getByRole(checkbox?'checkbox':'button',{name:item.action,exact:true});
          await control.focus(); await page.keyboard.press(checkbox?'Space':'Enter');
          await frame.getByText(item.expected,{exact:false}).first().waitFor({timeout:4000});
        };
        await perform(); actions++;
        await page.getByRole('button',{name:'デモをリセット',exact:true}).click();
        await frame.getByRole('heading',{level:1}).waitFor();
        await perform(); resets++;
        for(const option of pattern.controls[0].options){
          await page.locator('.settings-section select').selectOption(option.value);
          await frame.getByRole('heading',{level:1}).waitFor();
          const prompt=await page.getByRole('textbox',{name:'AIへの指示文'}).inputValue();
          check(prompt.includes(option.promptValue), 'prompt setting mismatch');
          const src=await page.locator('iframe').getAttribute('src');
          check(new URLSearchParams(src.split('?')[1]).get('mode')===option.value,'iframe setting mismatch'); settingsChecks++;
        }
        for(const width of [375,768,1440]) {
          await page.setViewportSize({width,height:900});
          for(const option of pattern.controls[0].options){
            await page.goto(origin+'#/demo/'+item.id+'?mode='+option.value);await page.reload();
            await page.getByRole('heading',{level:1}).waitFor();
            await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
            const dimensions=await page.evaluate(()=>({viewport:document.documentElement.clientWidth,content:document.documentElement.scrollWidth}));
            check(dimensions.content<=dimensions.viewport+1,'overflow '+width+' '+option.value+' '+JSON.stringify(dimensions));
            layoutChecks++;
          }
        }
      }catch(error){failures.push({id:item.id,message:error.message});}
    }
    return {group:'${group}',items:cases.length,actions,resets,settingsChecks,layoutChecks,failures,errors};
  }`;
  writeFileSync(`output/playwright/growth2-${group}-smoke.js`, code);
}
