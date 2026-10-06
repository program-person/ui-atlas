import { CATEGORIES, DEMO_IDS } from '../types.ts';
import type { Pattern, Settings, Category } from '../types.ts';

export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').trim().toLocaleLowerCase('ja-JP');
}

export function searchPatterns(patterns: Pattern[], query: string, category: Category | 'すべて'): Pattern[] {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  return patterns.filter((pattern) => {
    const searchable = normalizeSearch([pattern.nameJa, pattern.nameEn, pattern.summary,
      pattern.category, ...pattern.aliases, ...pattern.tags, ...pattern.useCases].join(' '));
    return (category === 'すべて' || pattern.category === category) && terms.every((term) => searchable.includes(term));
  });
}

export function defaultSettings(pattern: Pattern): Settings {
  return Object.fromEntries(pattern.controls.map((control) => [control.id, control.default]));
}

export function buildPrompt(pattern: Pattern, settings: Settings): string {
  const replacements = new Map<string, string>();
  for (const control of pattern.controls) {
    const value = settings[control.id] ?? control.default;
    const option = control.options.find((candidate) => candidate.value === value);
    if (!option) throw new Error(`設定「${control.label}」の値が不正です。`);
    replacements.set(control.id, option.promptValue);
  }
  return pattern.prompt.replace(/\{\{([a-zA-Z][a-zA-Z0-9]*)\}\}/g, (_match, token: string) => {
    const replacement = replacements.get(token);
    if (replacement === undefined) throw new Error(`指示文の設定「${token}」が見つかりません。`);
    return replacement;
  });
}

function requireString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field}は空でない文字列が必要です。`);
}

export function validateCatalog(input: unknown[]): Pattern[] {
  const ids = new Set<string>();
  for (const [index, candidate] of input.entries()) {
    if (!candidate || typeof candidate !== 'object') throw new Error(`項目${index + 1}が不正です。`);
    const pattern = candidate as Record<string, unknown>;
    for (const field of ['id', 'nameJa', 'nameEn', 'summary', 'description', 'prompt', 'verifiedAt']) requireString(pattern[field], field);
    if (!/^[a-z][a-z0-9-]*$/.test(pattern.id as string) || ids.has(pattern.id as string)) throw new Error(`IDが不正または重複しています：${pattern.id}`);
    ids.add(pattern.id as string);
    if (!(CATEGORIES as readonly unknown[]).includes(pattern.category)) throw new Error(`分類が不正です：${pattern.id}`);
    if (!(DEMO_IDS as readonly unknown[]).includes(pattern.demoId)) throw new Error(`デモが未登録です：${pattern.id}`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(pattern.verifiedAt as string)) throw new Error(`確認日が不正です：${pattern.id}`);
    for (const field of ['aliases', 'tags', 'useCases', 'cautions', 'relatedIds']) {
      if (!Array.isArray(pattern[field]) || !(pattern[field] as unknown[]).every((value) => typeof value === 'string' && value.trim())) throw new Error(`${field}は文字列の配列が必要です。`);
    }
    for (const field of ['useCases', 'cautions']) if (!(pattern[field] as unknown[]).length) throw new Error(`${field}が必要です。`);
    if (!Array.isArray(pattern.controls)) throw new Error('設定一覧が必要です。');
    const controlIds = new Set<string>();
    for (const control of pattern.controls) {
      if (!control || typeof control !== 'object') throw new Error('設定が不正です。');
      for (const field of ['id', 'label', 'help', 'default']) requireString(control[field], `control.${field}`);
      if (!/^[a-zA-Z][a-zA-Z0-9]*$/.test(control.id) || controlIds.has(control.id)) throw new Error('設定IDが不正または重複しています。');
      controlIds.add(control.id);
      if (!Array.isArray(control.options) || control.options.length < 2) throw new Error('設定の選択肢が必要です。');
      const optionValues = new Set<string>();
      for (const option of control.options) {
        if (!option || typeof option !== 'object') throw new Error('選択肢が不正です。');
        for (const field of ['value', 'label', 'promptValue']) requireString(option[field], `option.${field}`);
        if (optionValues.has(option.value)) throw new Error('選択肢が重複しています。');
        optionValues.add(option.value);
      }
      if (!optionValues.has(control.default)) throw new Error('初期値が選択肢にありません。');
    }
    if (!Array.isArray(pattern.references) || !pattern.references.length) throw new Error('参考資料が必要です。');
    for (const reference of pattern.references) {
      if (!reference || typeof reference !== 'object') throw new Error('参考資料が不正です。');
      for (const field of ['title', 'url', 'checkedAt']) requireString(reference[field], `reference.${field}`);
      if (!['https:', 'http:'].includes(new URL(reference.url).protocol)) throw new Error('参考URLの形式が不正です。');
      if (!/^\d{4}-\d{2}-\d{2}$/.test(reference.checkedAt)) throw new Error('参考資料の確認日が不正です。');
    }
    buildPrompt(candidate as Pattern, defaultSettings(candidate as Pattern));
  }
  const patterns = input as Pattern[];
  for (const pattern of patterns) for (const relatedId of pattern.relatedIds) {
    if (!ids.has(relatedId) || relatedId === pattern.id) throw new Error(`関連項目が不正です：${pattern.id} → ${relatedId}`);
  }
  return patterns;
}
