async (page) => {
  const results = [], failures = [], errors = [];
  page.setDefaultTimeout(6000);
  page.on('pageerror', error => errors.push(error.message));
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const go = async (id, mode) => {
    await page.goto('http://127.0.0.1:5178/#/demo/' + id + '?mode=' + mode);
    await page.reload();
    await page.getByRole('heading', { level: 1 }).waitFor();
  };
  const text = async value => page.getByText(value, { exact: false }).first().waitFor();
  const run = async (name, action) => { try { await action(); results.push(name); } catch (error) { failures.push({ name, message: error.message }); } };

  await run('box plot: median and quartile geometry', async () => {
    await go('box-plot','base');
    check(await page.locator('tbody tr').nth(2).locator('td').textContent() === '50', 'median');
    check(await page.locator('svg rect').getAttribute('width') === '105', 'quartile box width');
    await page.getByRole('button',{name:'例を切り替える'}).click();
    check(await page.locator('svg rect').getAttribute('width') === '135', 'alternate quartiles');
  });
  await run('bubble: area scaling', async () => {
    await go('bubble-chart','base');
    check(await page.locator('svg circle').first().getAttribute('r') === '12', 'sqrt(16)*3');
    await page.getByRole('button',{name:'例を切り替える'}).click();
    check(await page.locator('svg circle').first().getAttribute('r') === '9', 'sqrt(9)*3');
  });
  await run('gantt: inclusive end day', async () => {
    await go('gantt-chart','base');
    check(await page.locator('svg rect').first().getAttribute('width') === '62', 'two days inclusive');
    await text('10/2');
  });
  await run('legend: all hidden and recovery', async () => {
    await go('legend-toggle','both');
    await page.getByRole('checkbox',{name:'Aを表示'}).uncheck();
    await page.getByRole('checkbox',{name:'Bを表示'}).uncheck();
    await text('表示中：なし'); check(await page.locator('table').count() === 0,'hidden table');
    await page.getByRole('checkbox',{name:'Bを表示'}).check();
    await text('表示中：B'); check(await page.locator('thead th').count()===2,'B only column');
  });
  await run('image fit: computed settings and position',async()=>{
    await go('object-fit','cover');
    check(await page.locator('img').evaluate(node=>getComputedStyle(node).objectFit)==='cover','cover');
    await page.getByRole('button',{name:'位置を切り替える'}).click();
    check((await page.locator('img').evaluate(node=>getComputedStyle(node).objectPosition)).startsWith('0%'),'left');
  });
  await run('writing mode: vertical scroll area',async()=>{
    await page.setViewportSize({width:375,height:900});
    await go('writing-mode','vertical');
    await page.getByRole('button',{name:'本文量を切り替える'}).click();
    const layout=await page.getByRole('region',{name:'組版の本文'}).evaluate(node=>({mode:getComputedStyle(node.querySelector('p')).writingMode,width:node.clientWidth,scroll:node.scrollWidth}));
    check(layout.mode==='vertical-rl','vertical mode');check(layout.scroll>layout.width,'internal horizontal scrolling');
    await page.setViewportSize({width:1440,height:1000});
  });
  await run('contrast: normal threshold',async()=>{
    await go('contrast-checker','normal');await text('基準以上');
    await page.getByRole('button',{name:'配色を切り替える'}).click();await text('基準未満');
  });
  await run('contrast: large text threshold',async()=>{
    await go('contrast-checker','large');await page.getByRole('button',{name:'配色を切り替える'}).click();
    await text('判定基準：3 : 1');
    check(await page.locator('.g2-panel').evaluate(node=>getComputedStyle(node).fontSize)==='24px','large size');
  });
  await run('range: empty, unicode, equal, boundaries',async()=>{
    await go('cross-field-validation','valid'); const minimum=page.getByRole('textbox',{name:'最小件数'});const maximum=page.getByRole('textbox',{name:'最大件数'});
    await minimum.fill('');await text('0〜100の整数');
    await minimum.fill('８');await text('0〜100の整数');
    await minimum.fill('8');await maximum.fill('8');await text('8〜8件の有効な範囲');
    await minimum.fill('0');await maximum.fill('100');await text('0〜100件の有効な範囲');
    await maximum.fill('101');await text('0〜100の整数');
    await maximum.fill('0');await minimum.fill('1');await text('最小は最大以下');
  });
  await run('month: empty and restricted month',async()=>{
    await go('month-input','autumn');const input=page.getByLabel('対象の年月');
    await input.fill('');await text('許可範囲内');
    await input.fill('2026-08');await text('許可範囲内');
    await input.fill('2026-11');await text('選択：2026-11');
  });
  await run('number: zero, percent, invalid formats',async()=>{
    await go('number-format','percent');const input=page.getByRole('textbox',{name:'半角の数値'});
    await input.fill('0');await text('表示：0%');await input.fill('0.125');await text('表示：12.5%');
    for(const value of ['', '１', '1,234', '1e2', 'Infinity']){await input.fill(value);await text('半角の十進数を入力');}
  });
  await run('paste: multibyte, malformed, row limit, edit after confirm',async()=>{
    await go('paste-preview','tab');const input=page.getByRole('textbox',{name:'架空の2列表現'});
    await input.fill('');await text('内容を入力');
    await input.fill('ノート\t-1');await text('0〜100の整数');
    await input.fill(Array.from({length:6},()=> 'ノート\t2').join('\n'));await text('5行以内');
    await input.fill('あいう\t0\n赤い図\t100');await page.getByRole('button',{name:'内容を確定する'}).click();await text('2行を確定しました');
    await input.fill('青い図\t2');await text('未確定');check(await page.getByRole('button',{name:'内容を確定する'}).isEnabled(),'confirm enabled after edit');
  });
  await run('pivot: totals and zero',async()=>{
    await go('pivot-table','sum');check(await page.locator('tfoot td').last().textContent()==='10','sum 10');
    await page.getByRole('button',{name:'追加例を切り替える'}).click();check(await page.locator('tfoot td').last().textContent()==='15','sum 15');
    await go('pivot-table','count');check(await page.locator('tfoot td').last().textContent()==='4','4 records');
  });
  await run('transpose: headers and data preserve',async()=>{
    await go('table-transpose','rows');check(await page.locator('tbody th[scope=row]').count()===3,'three tools');
    await page.getByRole('button',{name:'行列を入れ替える'}).click();check(await page.locator('thead th').count()===4,'4 columns');check(await page.locator('tbody tr').first().textContent()==='件数102030','count row preserved');
  });
  await run('seats: unavailable, single, multiple',async()=>{
    await go('seat-selection','single');check(await page.getByRole('button',{name:'A2 予約済み'}).isDisabled(),'reserved');
    await page.getByRole('button',{name:'A1 空き',exact:true}).click();await page.getByRole('button',{name:'B1 空き',exact:true}).click();await text('選択：B1');
    await go('seat-selection','multiple');await page.getByRole('button',{name:'A1 空き',exact:true}).click();await page.getByRole('button',{name:'B1 空き',exact:true}).click();await text('選択：A1・B1');
    await page.getByRole('button',{name:'A1 選択中',exact:true}).click();await text('選択：B1');
  });
  await run('slots: 60-minute end and unavailable',async()=>{
    await go('time-slot-picker','60');check(await page.getByRole('button',{name:'10:00 利用不可'}).isDisabled(),'unavailable');
    await page.getByRole('button',{name:'11:00 空き'}).click();await text('選択：11:00〜12:00');
  });
  await run('permissions: dependencies and preserving view',async()=>{
    await go('permission-matrix','dependent');await page.getByRole('checkbox',{name:'ノートを編集'}).check();check(await page.getByRole('checkbox',{name:'ノートを閲覧'}).isDisabled(),'view locked');
    await page.getByRole('checkbox',{name:'ノートを編集'}).uncheck();check(await page.getByRole('checkbox',{name:'ノートを閲覧'}).isChecked(),'view preserved');
    await go('permission-matrix','independent');await page.getByRole('checkbox',{name:'ノートを編集'}).check();check(!await page.getByRole('checkbox',{name:'ノートを閲覧'}).isChecked(),'independent view');
  });
  await run('dependent settings: preserve disabled value',async()=>{
    await go('settings-dependency','on');await page.getByRole('combobox',{name:'間隔'}).selectOption('60');await page.getByRole('button',{name:'通知を有効にする'}).click();check(await page.getByRole('combobox',{name:'間隔'}).isDisabled(),'disabled');
    await page.getByRole('button',{name:'通知を有効にする'}).click();check(await page.getByRole('combobox',{name:'間隔'}).inputValue()==='60','preserved');
  });
  await run('pan: boundary and reset position',async()=>{
    await go('pan-controls','40');const right=page.getByRole('button',{name:'図を右へ'});await right.click();await right.click();check(await right.isDisabled(),'x bound');await text('横 80px');
    await page.getByRole('button',{name:'中央へ戻す'}).click();await text('横 0px / 縦 0px');
  });
  await run('shortcut: scoped keys and input exclusion',async()=>{
    await go('shortcut-hints','b');await page.getByRole('region',{name:'ショートカット操作の枠'}).focus();await page.keyboard.press('Alt+b');await text('書式：太字');
    await page.getByRole('textbox',{name:'入力を試す'}).focus();await page.keyboard.press('Alt+b');await text('書式：太字');
  });
  await run('cursor: last page and history',async()=>{
    await go('cursor-pagination','2');const next=page.getByRole('button',{name:'次の位置へ'});for(let count=0;count<3;count++)await next.click();await text('末尾');check(await next.isDisabled(),'last disabled');
    await page.getByRole('button',{name:'前の位置へ'}).click();await text('メモ5');
  });
  await run('cross-page selection: persistent and clear',async()=>{
    await go('cross-page-selection','0');await page.getByRole('button',{name:'今の2件を選ぶ'}).click();await page.getByRole('button',{name:'次へ',exact:true}).click();await text('全体の選択 2件 / このページ 0件');
    await page.getByRole('button',{name:'全6件を選ぶ'}).click();await text('全体の選択 6件 / このページ 2件');await page.getByRole('button',{name:'全解除'}).click();await text('全体の選択 0件');
  });
  await run('attachments: cap and restore available sample',async()=>{
    await go('attachment-list','2');const add=page.getByRole('button',{name:'サンプルを追加'});await add.click();await add.click();check(await add.isDisabled(),'cap');await text('合計 10KB');
    await page.getByRole('button',{name:'draft.txtを対象から外す'}).click();check(await add.isEnabled(),'space available');await text('合計 8KB');
  });
  await run('upload constraints: size and format separate',async()=>{
    await go('upload-constraints','5');await page.getByRole('button',{name:'draft.mdの例'}).click();await text('形式は対象内');await text('容量が上限を超えています');
    await page.getByRole('button',{name:'diagram.svgの例'}).click();await text('この形式は対象外');await text('容量は上限内');
  });
  await run('delivery: failure retry and completion',async()=>{
    await go('delivery-receipt','failure');const next=page.getByRole('button',{name:'次の状態へ'});await next.click();await text('送信失敗');await next.click();await text('送信済み');await next.click();await text('到達済み');await next.click();await text('既読');check(await next.isDisabled(),'read is terminal');
  });
  await run('collapsed breadcrumb: keyboard location focus',async()=>{
    await go('collapsed-breadcrumb','collapsed');await page.getByRole('button',{name:'中間の階層を表示'}).click();await page.getByRole('button',{name:'資料',exact:true}).click();
    check(await page.getByRole('heading',{name:'資料の内容'}).evaluate(node=>node===document.activeElement),'content focused');
  });
  await run('anchor: heading below sticky header',async()=>{
    await go('anchor-offset','64');await page.getByRole('button',{name:'2番目の見出しへ'}).click();const location=await page.getByRole('heading',{name:'2番目',exact:true}).evaluate(node=>({heading:node.getBoundingClientRect().top,container:node.closest('[role=region]').getBoundingClientRect().top,focused:node===document.activeElement}));
    check(location.focused,'heading focused');check(location.heading-location.container>=44,'not under sticky header');
  });
  await run('flowchart: selected branch and restoration',async()=>{
    await go('flowchart','yes');await text('はい → 確認');await page.getByRole('button',{name:'答えを切り替える'}).click();await text('いいえ → 補足');
  });
  await run('state machine: allowed failure transitions',async()=>{
    await go('state-machine','failure');check(await page.getByRole('button',{name:'終了',exact:true}).isDisabled(),'cannot finish idle');await page.getByRole('button',{name:'開始',exact:true}).click();await page.getByRole('button',{name:'終了',exact:true}).click();await text('現在：失敗');await page.getByRole('button',{name:'待機へ戻す'}).click();await text('現在：待機');
  });
  await run('organization: child list collapse',async()=>{
    await go('organization-chart','open');check(await page.locator('svg rect').count()===5,'five nodes');await page.getByRole('button',{name:'下位の区画を切り替える'}).click();check(await page.locator('svg rect').count()===3,'children hidden');
  });
  await run('network: ring and star adjacency',async()=>{
    await go('network-graph','ring');await page.getByRole('button',{name:'Bを選ぶ'}).click();await text('直接つながる項目：A・C');await go('network-graph','star');await page.getByRole('button',{name:'Bを選ぶ'}).click();await text('直接つながる項目：A');
  });
  await run('dependencies: parallel prerequisites',async()=>{
    await go('dependency-graph','parallel');check(await page.getByRole('button',{name:'確認を完了'}).isDisabled(),'confirmation locked');await page.getByRole('button',{name:'調査を完了'}).click();await page.getByRole('button',{name:'文章を完了'}).click();check(await page.getByRole('button',{name:'確認を完了'}).isDisabled(),'both required');await page.getByRole('button',{name:'図を完了'}).click();check(await page.getByRole('button',{name:'確認を完了'}).isEnabled(),'all prerequisites met');
  });
  await run('swimlane: mobile layout and terminal state',async()=>{
    await page.setViewportSize({width:375,height:900});await go('swimlane','horizontal');check(await page.locator('.g2-lanes').evaluate(node=>getComputedStyle(node).gridTemplateColumns.split(' ').length)===1,'one column');const next=page.getByRole('button',{name:'工程を進める'});await next.click();await next.click();check(await next.isDisabled(),'terminal');await page.setViewportSize({width:1440,height:1000});
  });
  await run('cycle: wrap and reverse',async()=>{
    await go('cycle-diagram','forward');const next=page.getByRole('button',{name:'次の手順'});for(let index=0;index<3;index++)await next.click();await text('現在：観察');await go('cycle-diagram','reverse');await page.getByRole('button',{name:'次の手順'}).click();await text('現在：確認');
  });
  await run('sankey: conserved flow and proportional widths',async()=>{
    await go('sankey-diagram','equal');check(await page.locator('svg path').first().getAttribute('stroke-width')==='18','6*3');await page.getByRole('button',{name:'分配を切り替える'}).click();check(await page.locator('svg path').first().getAttribute('stroke-width')==='9','3*3');check(await page.locator('svg path').nth(1).getAttribute('stroke-width')==='27','9*3');const values=await page.locator('tbody td:last-child').allTextContents();check(values.map(Number).reduce((sum,value)=>sum+value,0)===12,'flow conservation');
  });
  await run('parallel coordinates: series and data rows',async()=>{
    await go('parallel-coordinates','both');check(await page.locator('tbody tr').count()===2,'both rows');await page.getByRole('button',{name:'Bの表示を切り替える'}).click();check(await page.locator('tbody tr').count()===1,'one row');check(await page.locator('svg polyline').count()===1,'one series');
  });
  await run('venn: union and intersection',async()=>{
    await go('venn-diagram','intersection');await text('共通部分：4・5');await page.getByRole('button',{name:'集合を切り替える'}).click();await text('和集合：1・2・3・4・5・6・7・8・9');await page.getByRole('button',{name:'集合を切り替える'}).click();await text('共通部分：4・5');
  });
  await run('floating label: empty, input and accessible name',async()=>{
    await go('floating-label','empty');const input=page.getByRole('textbox',{name:'架空のメモ'});await input.fill('あいう');await input.blur();check(await page.locator('label[for=floating-note]').evaluate(node=>getComputedStyle(node).top)==='6px','label stays above value');
    await input.fill('');await input.blur();check(await page.locator('label[for=floating-note]').evaluate(node=>getComputedStyle(node).top)==='20px','empty label');
  });
  await run('autosize: cap, shrink and resize',async()=>{
    await go('autosize-textarea','160');const input=page.getByRole('textbox',{name:'架空のメモ'});await page.getByRole('button',{name:'長い例を入れる'}).click();check(await input.evaluate(node=>node.getBoundingClientRect().height)===160,'maximum 160');
    await page.getByRole('button',{name:'短い例に戻す'}).click();check(await input.evaluate(node=>node.getBoundingClientRect().height)===64,'shrinks to 64');await input.fill('あ'.repeat(300));await page.setViewportSize({width:375,height:900});await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));check(await input.evaluate(node=>node.getBoundingClientRect().height)<=160,'resize cap');await page.setViewportSize({width:1440,height:1000});
  });
  await run('virtual list: bounded DOM and absolute position',async()=>{
    await go('virtual-list','500');check(await page.locator('li').count()<=9,'bounded initial DOM');await page.getByRole('button',{name:'一覧の末尾へ'}).click();await text('末尾の記録を表示中');check(await page.locator('li').count()<=9,'bounded final DOM');check(await page.locator('li').last().getAttribute('aria-posinset')==='500','last absolute position');check(await page.locator('li').last().getAttribute('aria-setsize')==='500','set size');
  });
  await run('infinite list: manual completion and automatic observer',async()=>{
    await go('infinite-scroll','manual');const next=page.getByRole('button',{name:'次の4件を表示'});await next.click();await next.click();await text('表示 12 / 12件・末尾');check(await next.isDisabled(),'complete guard');await go('infinite-scroll','auto');await text('表示 8 / 12件');await page.getByRole('region',{name:'続きが増える一覧'}).evaluate(node=>{node.scrollTop=node.scrollHeight;});await text('表示 12 / 12件・末尾');
  });
  await run('gutter: stable value with overflow',async()=>{
    await go('scrollbar-gutter','stable');const region=page.getByRole('region',{name:'幅を比較する本文'});check(await region.evaluate(node=>getComputedStyle(node).scrollbarGutter)==='stable','stable gutter');await page.getByRole('button',{name:'文章量を切り替える'}).click();check(await region.evaluate(node=>node.scrollHeight>node.clientHeight),'long text scrolls');
  });
  await run('overscroll: synthetic wheel containment',async()=>{
    for(const mode of ['contain','auto']){await go('overscroll-containment',mode);await page.getByRole('button',{name:'内側の末尾へ'}).click();const outer=page.getByRole('region',{name:'外側の本文枠'});const inner=page.getByRole('region',{name:'内側の一覧'});await outer.evaluate(node=>{node.scrollTop=0;});const box=await inner.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.wheel(0,250);await page.waitForTimeout(150);const top=await outer.evaluate(node=>node.scrollTop);check(mode==='contain'?top===0:top>0,'wheel chaining '+mode+' '+top);}
  });
  await run('relative time: fixed timezone and upper bound',async()=>{
    await go('relative-time','relative');check((await page.locator('time').textContent()).replace(/\s/g,'')==='30分前','30 minutes before reference');const next=page.getByRole('button',{name:'記録を5分進める'});for(let index=0;index<6;index++)await next.click();check(await next.isDisabled(),'reference upper bound');check(await page.locator('time').getAttribute('datetime')==='2026-10-29T03:30:00.000Z','JST reference instant');await go('relative-time','absolute');await page.getByRole('button',{name:'記録を5分進める'}).click();check((await page.locator('time').textContent()).includes('12:05'),'JST absolute');
  });
  await run('picture: viewport sources and fixed fallback',async()=>{
    await page.setViewportSize({width:375,height:900});await go('responsive-image','responsive');await page.waitForFunction(()=>document.querySelector('img')?.naturalWidth===180);await page.setViewportSize({width:1440,height:1000});await page.waitForFunction(()=>document.querySelector('img')?.naturalWidth===360);await page.setViewportSize({width:375,height:900});await go('responsive-image','fixed');await page.waitForFunction(()=>document.querySelector('img')?.naturalWidth===360);await page.setViewportSize({width:1440,height:1000});
  });
  await run('easing: normal duration and reduced motion',async()=>{
    await page.emulateMedia({reducedMotion:'no-preference'});await go('easing-curves','ease-out');check(await page.locator('.g2-motion-marker').evaluate(node=>getComputedStyle(node).transitionDuration)==='0.2s','duration');await page.emulateMedia({reducedMotion:'reduce'});check(await page.locator('.g2-motion-marker').evaluate(node=>getComputedStyle(node).transitionDuration)==='0s','reduced motion');await page.getByRole('button',{name:'位置を切り替える'}).click();const difference=await page.locator('.g2-motion-marker').evaluate(node=>node.parentElement.getBoundingClientRect().right-node.getBoundingClientRect().right);check(Math.abs(difference)<1,'right edge');
  });
  await run('grid list: preserve selection and order',async()=>{
    await go('card-list-toggle','grid');await page.getByRole('button',{name:'配色を選ぶ'}).click();await page.getByRole('button',{name:'表示形式を切り替える'}).click();await text('形式：リスト / 選択：配色');check(await page.getByRole('button',{name:'配色を選ぶ'}).getAttribute('aria-pressed')==='true','selection preserved');check((await page.locator('li h2').allTextContents()).join(',')==='余白,配色,文章','DOM order');
  });
  return {checks:results.length,passed:results,failures,errors};
}
