import test from 'node:test';
import assert from 'node:assert/strict';
import { readCatalog } from '../../scripts/read-catalog.ts';
import { validateCatalog, searchPatterns, buildPrompt, defaultSettings } from './logic.ts';

const patterns = validateCatalog(readCatalog());
const drawer = patterns.find((pattern) => pattern.id === 'drawer')!;

test('検索は空入力・日本語の別名・全角英字・複数語・0件を扱う', () => {
  assert.equal(searchPatterns(patterns, '　 ', 'すべて').length, patterns.length);
  assert.equal(searchPatterns(patterns, '横から開く', 'すべて')[0]?.id, 'drawer');
  assert.equal(searchPatterns(patterns, '　ＤＲＡＷＥＲ　', 'すべて')[0]?.id, 'drawer');
  assert.equal(searchPatterns(patterns, 'drawer 設定', '部品')[0]?.id, 'drawer');
  assert.equal(searchPatterns(patterns, 'drawer', '動き').length, 0);
  assert.equal(searchPatterns(patterns, '存在しないパターン', 'すべて').length, 0);
});

test('選んだ設定が指示文に反映され、未知の値は拒否される', () => {
  const prompt = buildPrompt(drawer, { ...defaultSettings(drawer), direction: 'left', duration: '400' });
  assert.match(prompt, /左側/); assert.match(prompt, /400ms/); assert.doesNotMatch(prompt, /\{\{/);
  assert.throws(() => buildPrompt(drawer, { direction: 'invalid' }));
});

test('欠損・重複・関連ID・設定の不整合を掲載前に検出する', () => {
  assert.throws(() => validateCatalog([null]));
  assert.throws(() => validateCatalog([drawer, drawer]), /重複/);
  assert.throws(() => validateCatalog([{ ...drawer, nameJa: '' }]), /nameJa/);
  assert.throws(() => validateCatalog([{ ...drawer, relatedIds: ['missing'] }]), /関連/);
  assert.throws(() => validateCatalog([{ ...drawer, demoId: 'missing' }]), /デモ/);
  const changed = structuredClone(drawer); changed.controls[0].default = 'invalid';
  assert.throws(() => validateCatalog([changed]), /初期値/);
  assert.throws(() => validateCatalog([{ ...drawer, prompt: '{{missing}}' }]), /指示文/);
});

test('タブとアコーディオンは別名検索でき、全設定の組み合わせを指示文へ反映する', () => {
  for (const [id, query] of [['tabs', '　ＴＡＢＳ　'], ['accordion', '折りたたみ']] as const) {
    const pattern = patterns.find((candidate) => candidate.id === id)!;
    assert.ok(pattern);
    assert.ok(searchPatterns(patterns, query, '部品').some((candidate) => candidate.id === id));
    const combinations = pattern.controls.reduce<Record<string, string>[]>((settingsList, control) =>
      settingsList.flatMap((settings) => control.options.map((option) => ({ ...settings, [control.id]: option.value }))), [{}]);
    for (const settings of combinations) {
      const prompt = buildPrompt(pattern, settings);
      assert.doesNotMatch(prompt, /\{\{/);
      for (const control of pattern.controls) {
        assert.ok(prompt.includes(control.options.find((option) => option.value === settings[control.id])!.promptValue));
      }
    }
  }
});
