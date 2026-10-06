import { validateCatalog } from './logic.ts';
import type { Pattern } from '../types.ts';

export interface CatalogRepository {
  list(): Promise<Pattern[]>;
}

class StaticCatalogRepository implements CatalogRepository {
  async list(): Promise<Pattern[]> {
    const modules = import.meta.glob('./patterns/*.json', { eager: true, import: 'default' });
    return validateCatalog(Object.values(modules));
  }
}

// 将来のAPI取得もこの境界で行い、画面にURLやJSON形式を持ち込まない。
export const catalogRepository: CatalogRepository = new StaticCatalogRepository();
