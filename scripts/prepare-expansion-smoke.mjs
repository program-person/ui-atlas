import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

mkdirSync('output/playwright', { recursive: true });
for (const batch of ['input', 'chart', 'flow', 'layout']) {
  const cases = JSON.parse(readFileSync(`scripts/expansion-${batch}-cases.json`, 'utf8'));
  const patterns = cases.map(item => JSON.parse(readFileSync(`src/catalog/patterns/${item.id}.json`, 'utf8')));
  const source = `async (page) => {
    const cases = ${JSON.stringify(cases)};
    const patterns = ${JSON.stringify(patterns)};
    const origin = 'http://127.0.0.1:5175/';
    const failures = []; let actions = 0, resets = 0, settingsChecks = 0, layoutChecks = 0;
    const errors = []; page.on('pageerror', error => errors.push(error.message));
    const verify = (condition, message) => { if (!condition) throw new Error(message); };
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const item of cases) {
      const pattern = patterns.find(candidate => candidate.id === item.id);
      try {
        await page.setViewportSize({ width: 1440, height: 1000 });
        await page.goto(origin + '#/patterns/' + item.id);
        await page.reload();
        await page.getByRole('heading', { name: pattern.nameJa, exact: true, level: 2 }).waitFor();
        let frame = page.frameLocator('iframe');
        await frame.getByRole('heading', { level: 1 }).first().waitFor();
        const perform = async () => {
          const target = frame.getByRole(item.action.role, { name: item.action.name, exact: true });
          await target.focus(); await page.keyboard.press(item.action.role === 'checkbox' ? 'Space' : 'Enter');
          await frame.getByText(item.expectedText, { exact: false }).first().waitFor({ timeout: 3500 });
        };
        await perform(); actions++;
        await page.getByRole('button', { name: 'デモをリセット', exact: true }).click();
        await frame.getByRole('heading', { level: 1 }).first().waitFor();
        await perform(); resets++;
        for (const control of pattern.controls) {
          for (const option of control.options) {
            await page.locator('.settings-section select').nth(pattern.controls.indexOf(control)).selectOption(option.value);
            await frame.getByRole('heading', { level: 1 }).first().waitFor();
            const prompt = await page.getByRole('textbox', { name: 'AIへの指示文' }).inputValue();
            verify(prompt.includes(option.promptValue), control.id + ': prompt mismatch');
            const src = await page.locator('iframe').getAttribute('src');
            verify(new URLSearchParams(src.split('?')[1]).get(control.id) === option.value, control.id + ': iframe mismatch');
            settingsChecks++;
          }
        }
        // Direct demo URLs isolate every combination from the catalogue's responsive layout.
        const combinations = pattern.controls.reduce((list, control) => list.flatMap(value => control.options.map(option => ({ ...value, [control.id]: option.value }))), [{}]);
        for (const width of [375, 768, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          for (const values of combinations) {
            await page.goto(origin + '#/demo/' + item.id + '?' + new URLSearchParams(values));
            await page.reload();
            await page.getByRole('heading', { level: 1 }).first().waitFor();
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            const dimensions = await page.evaluate(() => ({ width: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
            verify(dimensions.content <= dimensions.width + 1, 'overflow ' + width + 'px: ' + dimensions.content + ' ' + JSON.stringify(values));
            layoutChecks++;
          }
        }
        console.log('PASS ' + item.id);
      } catch (error) { failures.push({ id: item.id, message: error.message }); console.log('FAIL ' + item.id + ': ' + error.message); }
    }
    return { batch: '${batch}', items: cases.length, actions, resets, settingsChecks, layoutChecks, failures, errors };
  }`;
  writeFileSync(`output/playwright/expansion-${batch}-smoke.js`, source);
}
