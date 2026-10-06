import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function readCatalog(): unknown[] {
  const directory = fileURLToPath(new URL('../src/catalog/patterns/', import.meta.url));
  return readdirSync(directory).filter((name) => name.endsWith('.json')).sort().map((name) => {
    try { return JSON.parse(readFileSync(`${directory}/${name}`, 'utf8')); }
    catch (error) { throw new Error(`項目ファイルを読めません：${name}`, { cause: error }); }
  });
}
