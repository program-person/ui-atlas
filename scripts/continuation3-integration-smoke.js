async (page) => {
  const passed = [], failures = [], errors = [];
  page.setDefaultTimeout(8000);
  page.on('pageerror', error => errors.push(error.message));
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const run = async (name, action) => { try { await action(); passed.push(name); } catch (error) { failures.push({ name, message: error.message }); } };
  await page.addInitScript(() => {
    window.continuation3Copied = ''; window.continuation3CopyFails = false;
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { if (window.continuation3CopyFails) throw new Error('simulated failure'); window.continuation3Copied = value; } } });
  });
  await run('new search, detail, settings, copy and manual fallback', async () => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:5178/'); await page.reload();
    await page.getByRole('textbox', { name: '名前・用途でパターンを検索' }).fill('　ＩＮＰＵＴ　ＮＯＲＭＡＬＩＺＡＴＩＯＮ　');
    await page.getByRole('heading', { name: '原文を残した入力の正規化', level: 3, exact: true }).waitFor();
    check(await page.locator('a.pattern-card').count() === 1, 'one matching card'); await page.locator('a.pattern-card').click();
    await page.locator('.settings-section select').selectOption('trim');
    const prompt = await page.getByRole('textbox', { name: 'AIへの指示文' }).inputValue(); check(prompt.includes('前後の余白を除いて'), 'trim prompt');
    await page.getByRole('button', { name: '指示文をコピー', exact: true }).click(); check(await page.evaluate(() => window.continuation3Copied) === prompt, 'full prompt copied');
    await page.evaluate(() => { window.continuation3CopyFails = true; }); await page.getByRole('button', { name: '指示文をコピー', exact: true }).click();
    check(await page.getByRole('textbox', { name: 'AIへの指示文' }).evaluate(node => node === document.activeElement && node.selectionStart === 0 && node.selectionEnd === node.value.length), 'manual selection');
  });
  await run('desktop and mobile toolbar presentation', async () => {
    await page.getByRole('textbox', { name: '名前・用途でパターンを検索' }).fill('Responsive Toolbar');
    await page.getByRole('heading', { level: 3, name: '幅に応じて操作をまとめる', exact: true }).waitFor(); await page.locator('a.pattern-card').click();
    await page.frameLocator('iframe').getByRole('button', { name: 'その他の操作' }).click();
    await page.screenshot({ path: 'output/playwright/continuation3-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 375, height: 900 });
    check(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), 'no outer overflow');
    await page.screenshot({ path: 'output/playwright/continuation3-mobile.png', fullPage: true });
    await page.setViewportSize({ width: 1440, height: 1000 });
  });
  await run('existing 240-pattern routes still load', async () => {
    for (const [id, name] of [['virtual-list', '見えている範囲だけ描く一覧'], ['modal', 'モーダル'], ['sankey-diagram', '量の流れを太さで示す図']]) {
      await page.goto('http://127.0.0.1:5178/#/patterns/' + id); await page.reload();
      await page.getByRole('heading', { level: 2, name, exact: true }).waitFor();
      await page.frameLocator('iframe').getByRole('heading', { level: 1 }).first().waitFor();
    }
  });
  return { checks: passed.length, passed, failures, errors };
}
