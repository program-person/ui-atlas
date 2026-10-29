async (page) => {
  const passed = [], failures = [], errors = [];
  page.setDefaultTimeout(8000);
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const text = value => page.getByText(value, { exact: false }).first().waitFor();
  const go = async (id, mode) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:5178/#/demo/' + id + '?mode=' + mode);
    await page.reload();
    await page.getByRole('heading', { level: 1 }).waitFor();
  };
  const run = async (name, action) => { try { await action(); passed.push(name); } catch (error) { failures.push({ name, message: error.message }); } };

  await run('reading: boundary guard and focus', async () => {
    await go('reading-ruler', 'outline');
    const next = page.getByRole('button', { name: '次の段落', exact: true });
    await next.focus(); await page.keyboard.press('Enter'); await page.keyboard.press('Enter');
    await text('現在：段落3'); check(await next.isDisabled(), 'last boundary');
    check(await next.evaluate(node => node === document.activeElement), 'focus retained at last paragraph');
    await page.keyboard.press('Enter'); await text('現在：段落3');
    await page.getByRole('button', { name: '段落1を選ぶ' }).click(); await text('現在：段落1');
    check(await page.getByRole('button', { name: '前の段落' }).isDisabled(), 'first boundary');
  });
  await run('reading: visible current and contextual background', async () => {
    await go('reading-ruler', 'dim');
    const backgrounds = await page.locator('.cont3-panel').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).backgroundColor));
    check(backgrounds[0] !== backgrounds[1] && backgrounds[1] === backgrounds[2], 'context background');
    check(await page.getByText('現在の段落', { exact: true }).count() === 1, 'one current marker');
  });
  await run('log: preserve position then follow', async () => {
    await go('log-tail', 'pause');
    const region = page.getByRole('region', { name: '架空の処理ログ' });
    await region.evaluate(node => { node.scrollTop = 70; });
    const previous = await region.evaluate(node => node.scrollTop);
    await page.getByRole('button', { name: '架空ログを追加' }).click();
    check(await region.evaluate(node => node.scrollTop) === previous, 'position retained');
    await page.getByRole('button', { name: '末尾へ追従' }).click();
    check(await region.evaluate(node => Math.abs(node.scrollHeight - node.clientHeight - node.scrollTop)) < 2, 'follow to end');
    const add = page.getByRole('button', { name: '架空ログを追加' });
    for (let index = 9; index < 20; index++) await add.click();
    await text('ログ 20 / 20件'); check(await add.isDisabled(), 'log limit');
  });
  await run('log: scrolling away pauses following', async () => {
    await go('log-tail', 'follow');
    const region = page.getByRole('region', { name: '架空の処理ログ' });
    await region.evaluate(node => { node.scrollTop = 0; });
    await text('位置を保持');
    await page.getByRole('button', { name: '架空ログを追加' }).click();
    check(await region.evaluate(node => node.scrollTop) === 0, 'not forced to bottom');
  });
  await run('markup: literal HTML and supported blocks', async () => {
    await go('markdown-preview', 'live');
    await page.getByRole('textbox', { name: '原文' }).fill('# 見出し\n<script>window.cont3Injected=1</script>\n<img src=x onerror=alert(1)>\n- 一つ\n- 二つ');
    const preview = page.getByRole('region', { name: '記法のプレビュー' });
    check(await preview.locator('h3').textContent() === '見出し', 'heading');
    check(await preview.locator('li').count() === 2, 'list grouped');
    check(await preview.locator('script,img').count() === 0, 'no HTML execution');
    check(await page.evaluate(() => window.cont3Injected) === undefined, 'script not run');
    check((await preview.textContent()).includes('<script>'), 'literal source retained');
  });
  await run('markup: manual update, empty and length limit', async () => {
    await go('markdown-preview', 'manual');
    const input = page.getByRole('textbox', { name: '原文' });
    const preview = page.getByRole('region', { name: '記法のプレビュー' });
    await input.fill('# 次の本文'); check((await preview.textContent()).includes('短いメモ'), 'manual preview unchanged');
    await page.getByRole('button', { name: 'プレビューを更新' }).click(); await preview.getByRole('heading', { name: '次の本文' }).waitFor();
    await input.fill(''); await page.getByRole('button', { name: 'プレビューを更新' }).click(); await text('プレビューなし');
    await input.fill('あ'.repeat(2001)); await text('2,000文字以内'); check(await page.getByRole('button', { name: 'プレビューを更新' }).isDisabled(), 'too long guarded');
  });
  await run('normalization: preserve source and optional trimming', async () => {
    for (const mode of ['preserve', 'trim']) {
      await go('input-normalization', mode);
      const input = page.getByRole('textbox', { name: '架空のコード' });
      await input.fill('　ＡＢ１２　'); await page.getByRole('button', { name: '変換結果を確認' }).click();
      check(await input.inputValue() === '　ＡＢ１２　', 'source untouched');
      check(await page.locator('#normalization-result').textContent() === (mode === 'trim' ? '変換後：AB12' : '変換後： AB12 '), 'normalization mode');
      await input.fill('別の入力'); await text('変換結果は未確定');
    }
  });
  await run('normalization: composition guard and blank error', async () => {
    await go('input-normalization', 'trim');
    const input = page.getByRole('textbox', { name: '架空のコード' });
    await input.dispatchEvent('compositionstart'); await page.getByRole('button', { name: '変換結果を確認' }).click(); await text('変換結果は未確定');
    await input.dispatchEvent('compositionend'); await page.getByRole('button', { name: '変換結果を確認' }).click(); await text('変換後：ABC123');
    await input.fill('　 '); await page.getByRole('button', { name: '変換結果を確認' }).click(); await text('空白以外の文字');
  });
  await run('checklist: individual rules, unicode and confirmed edit', async () => {
    await go('rule-checklist', 'letters');
    const input = page.getByRole('textbox', { name: '架空の整理コード' });
    await input.fill('AB12'); await text('2 / 3条件');
    await input.fill('ABCDEFGH'); await text('3 / 3条件'); await page.getByRole('button', { name: '内容を確定' }).click(); await text('確定済み');
    await input.fill('ABCDEFGHI'); await text('2 / 3条件'); check(!(await page.locator('#rules-result').textContent()).includes('確定済み'), 'confirmation reset');
    await input.fill('ＡＢ'); await text('2 / 3条件');
    await input.fill(''); await text('1 / 3条件');
  });
  await run('toolbar: disclosure, priority and Escape focus', async () => {
    await go('responsive-toolbar', 'view');
    const toolbar = page.getByRole('group', { name: '幅に応じた操作' });
    check(await toolbar.getByRole('button', { name: '表示', exact: true }).isVisible(), 'view priority');
    check(!await toolbar.getByRole('button', { name: '作成', exact: true }).isVisible(), 'create hidden');
    const trigger = page.getByRole('button', { name: 'その他の操作' });
    await trigger.click(); const create = toolbar.getByRole('button', { name: '作成', exact: true }); await create.focus(); await page.keyboard.press('Escape');
    check(await trigger.getAttribute('aria-expanded') === 'false', 'collapsed'); check(await trigger.evaluate(node => node === document.activeElement), 'focus restored');
  });
  await run('toolbar: resize keeps focused operation reachable', async () => {
    await go('responsive-toolbar', 'create'); await page.getByRole('button', { name: '枠を広げる' }).click();
    await page.setViewportSize({ width: 375, height: 900 });
    const trigger = page.getByRole('button', { name: 'その他の操作' }); await trigger.waitFor(); await trigger.focus();
    await page.setViewportSize({ width: 1440, height: 1000 });
    await trigger.waitFor({ state: 'detached' });
    check(await page.getByRole('button', { name: '作成', exact: true }).evaluate(node => node === document.activeElement), 'focus on first action');
  });
  await run('position: native keyboard and visual bounds', async () => {
    await go('position-picker', '10');
    const horizontal = page.getByRole('slider', { name: '横の位置' });
    await horizontal.focus(); await page.keyboard.press('ArrowRight'); check(await horizontal.inputValue() === '60', '10 percent step');
    await page.getByRole('button', { name: '右下へ' }).click(); await text('横 100% / 縦 100%');
    const inside = await page.locator('.cont3-position-dot').evaluate(node => { const dot = node.getBoundingClientRect(); const plane = node.closest('.cont3-position-plane').getBoundingClientRect(); return dot.right <= plane.right && dot.bottom <= plane.bottom; });
    check(inside, 'dot remains inside');
  });
  await run('variants: repair incompatible combination', async () => {
    await go('variant-picker', 'L'); await page.getByRole('radio', { name: '赤', exact: true }).check();
    await text('選択：赤・S'); await text('Sへ変更しました'); check(await page.getByRole('radio', { name: 'L', exact: true }).isDisabled(), 'L disabled');
    await page.getByRole('radio', { name: '青', exact: true }).check(); check(await page.getByRole('radio', { name: 'L', exact: true }).isEnabled(), 'L restored'); check(await page.getByRole('radio', { name: 'S', exact: true }).isChecked(), 'S preserved');
  });
  await run('recurrence: interval, sorted dates and fixed baseline', async () => {
    await go('recurrence-picker', '2');
    check((await page.locator('time').allTextContents()).join(',') === '2026-11-02,2026-11-04,2026-11-06,2026-11-16', 'two-week interval');
    await go('recurrence-picker', '1'); check((await page.locator('time').allTextContents()).join(',') === '2026-11-02,2026-11-04,2026-11-06,2026-11-09', 'one-week interval');
  });
  await run('recurrence: no weekday and weekend selection', async () => {
    await go('recurrence-picker', '1'); await page.getByRole('button', { name: '全解除', exact: true }).click(); await text('曜日を1つ以上'); check(await page.locator('time').count() === 0, 'no dates');
    await page.getByRole('checkbox', { name: '日', exact: true }).check(); check((await page.locator('time').allTextContents()).join(',') === '2026-11-08,2026-11-15,2026-11-22,2026-11-29', 'Sundays');
  });
  await run('footnotes: route and focus round trip', async () => {
    await go('footnote-links', 'aside'); const url = page.url(); const reference = page.getByRole('link', { name: '脚注1を読む' });
    await reference.focus(); await page.keyboard.press('Enter'); check(await page.getByRole('heading', { name: '補足：余白の意味' }).evaluate(node => node === document.activeElement), 'footnote focused'); check(page.url() === url, 'route preserved');
    await page.getByRole('link', { name: '本文の参照元1へ戻る' }).click(); check(await reference.evaluate(node => node === document.activeElement), 'reference focused'); check(page.url() === url, 'route still preserved');
  });
  await run('scrubber: frame thresholds, step and endpoint', async () => {
    await go('timeline-scrubber', '5'); const range = page.getByRole('slider', { name: 'プレビューの位置' });
    await range.fill('10'); await text('図：配色'); await range.fill('20'); await text('図：文章');
    const forward = page.getByRole('button', { name: '5秒進む' }); await forward.click(); await forward.click(); await text('位置 00:30'); check(await forward.isDisabled(), 'upper boundary');
    await range.focus(); await page.keyboard.press('Home'); await text('位置 00:00'); check(await page.getByRole('button', { name: '5秒戻る' }).isDisabled(), 'lower boundary');
  });
  await run('allocation: empty, fullwidth, overage and edit', async () => {
    await go('allocation-input', '10'); const fields = [page.getByRole('textbox', { name: '文章', exact: true }), page.getByRole('textbox', { name: '図', exact: true }), page.getByRole('textbox', { name: '確認', exact: true })];
    await fields[0].fill(''); await text('半角整数'); await fields[0].fill('１'); await text('半角整数');
    await fields[0].fill('10'); await fields[1].fill('1'); await text('超過 1点'); check(await page.getByRole('button', { name: '配分を確定' }).isDisabled(), 'overage guard');
    await page.getByRole('button', { name: '均等に配分' }).click(); check((await Promise.all(fields.map(field => field.inputValue()))).join(',') === '4,3,3', 'remainder first'); await page.getByRole('button', { name: '配分を確定' }).click(); await text('確定済み');
    await fields[0].fill('3'); await text('未配分 1点');
  });
  await run('allocation: 100-point conservation', async () => {
    await go('allocation-input', '100'); await page.getByRole('button', { name: '均等に配分' }).click(); await text('現在の合計：100 / 100点');
    const values = await page.locator('input').evaluateAll(nodes => nodes.map(node => Number(node.value))); check(values.join(',') === '34,33,33', '100-point remainder');
  });
  return { checks: passed.length, passed, failures, errors };
}
