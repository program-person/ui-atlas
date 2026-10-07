export const CATEGORIES = ['見た目', 'レイアウト', '部品', '動き', 'UXの流れ'] as const;
export const DEMO_IDS = ['sidebar', 'modal', 'drawer', 'hover-feedback', 'search-filter', 'tabs', 'accordion'] as const;
export type Category = typeof CATEGORIES[number];
export type DemoId = typeof DEMO_IDS[number];
export type Settings = Record<string, string>;
export interface Control {
  id: string;
  label: string;
  help: string;
  default: string;
  options: { value: string; label: string; promptValue: string }[];
}
export interface Pattern {
  id: string;
  nameJa: string;
  nameEn: string;
  aliases: string[];
  tags: string[];
  category: Category;
  summary: string;
  description: string;
  useCases: string[];
  cautions: string[];
  relatedIds: string[];
  demoId: DemoId;
  controls: Control[];
  prompt: string;
  references: { title: string; url: string; checkedAt: string }[];
  verifiedAt: string;
}
