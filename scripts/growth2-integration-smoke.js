async (page) => {
  const origin='http://127.0.0.1:5178/';
  const results=[], failures=[];
  const check=(condition,message)=>{if(!condition)throw new Error(message);};
  page.setDefaultTimeout(8000);
  await page.addInitScript(()=>{
    window.__growth2Copied=''; window.__growth2FailCopy=false;
    Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{if(window.__growth2FailCopy)throw new Error('simulated clipboard failure');window.__growth2Copied=value;}}});
  });
  const run=async(name,action)=>{try{await action();results.push(name);}catch(error){failures.push({name,message:error.message});}};
  await run('fullwidth search, detail, setting, copy and manual fallback',async()=>{
    await page.goto(origin);await page.reload();
    const search=page.getByRole('textbox',{name:'名前・用途でパターンを検索'});await search.fill('　ＢＯＸ　ＰＬＯＴ　');
    await page.getByRole('heading',{level:3,name:'箱ひげ図',exact:true}).waitFor();
    await page.locator('a.pattern-card').click();await page.getByRole('heading',{level:2,name:'箱ひげ図',exact:true}).waitFor();
    await page.locator('.settings-section select').selectOption('alternate');
    const prompt=await page.getByRole('textbox',{name:'AIへの指示文'}).inputValue();check(prompt.includes('別の架空値'),'prompt option');
    await page.getByRole('button',{name:'指示文をコピー',exact:true}).click();
    check(await page.evaluate(()=>window.__growth2Copied)===prompt,'exact prompt copied');
    await page.evaluate(()=>{window.__growth2FailCopy=true;});await page.getByRole('button',{name:'指示文をコピー',exact:true}).click();
    const selected=await page.getByRole('textbox',{name:'AIへの指示文'}).evaluate(node=>({focus:node===document.activeElement,start:node.selectionStart,end:node.selectionEnd,length:node.value.length}));
    check(selected.focus&&selected.start===0&&selected.end===selected.length,'manual copy selection');
  });
  await run('mobile pattern view and iframe',async()=>{
    await page.setViewportSize({width:375,height:900});
    check(await page.evaluate(()=>document.documentElement.scrollWidth<=document.documentElement.clientWidth+1),'main overflow');
    await page.getByRole('button',{name:'スマホ',exact:true}).click();
    const width=await page.locator('iframe').evaluate(node=>node.getBoundingClientRect().width);check(width<=375,'mobile iframe');
    await page.setViewportSize({width:1440,height:1000});
  });
  await run('graphic preview silhouettes',async()=>{
    await page.getByRole('textbox',{name:'名前・用途でパターンを検索'}).fill('Sankey Diagram');
    await page.getByRole('heading',{level:3,name:'量の流れを太さで示す図',exact:true}).waitFor();
    check(await page.locator('a.pattern-card .thumbnail svg').count()===1,'new visual preview');
    await page.locator('a.pattern-card').click();
    await page.screenshot({path:'output/playwright/growth2-catalog-desktop.png',fullPage:true});
    await page.setViewportSize({width:375,height:900});await page.screenshot({path:'output/playwright/growth2-catalog-mobile.png',fullPage:true});
    await page.setViewportSize({width:1440,height:1000});
  });
  await run('existing catalog demo routes',async()=>{
    for(const [id,name] of [['input-mask','入力マスク'],['calendar-grid','カレンダーの日付選択'],['modal','モーダル'],['sidebar','サイドバー']]){
      await page.goto(origin+'#/patterns/'+id);await page.reload();await page.getByRole('heading',{level:2,name,exact:true}).waitFor();await page.frameLocator('iframe').getByRole('heading',{level:1}).first().waitFor();
    }
  });
  return {checks:results.length,passed:results,failures};
}
