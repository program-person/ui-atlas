import { readCatalog } from './read-catalog.ts';
import { validateCatalog } from '../src/catalog/logic.ts';

try {
  const catalog = validateCatalog(readCatalog());
  if (!catalog.length) throw new Error('少なくとも1項目が必要です。');
  console.log(`Catalog OK: ${catalog.length} patterns`);
} catch (error) {
  console.error(error instanceof Error ? error.message : '項目の検証に失敗しました。');
  process.exitCode = 1;
}
