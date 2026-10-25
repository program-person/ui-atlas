export const CATEGORIES = ['見た目', 'レイアウト', '部品', '動き', 'UXの流れ'] as const;
export const DEMO_IDS = ['sidebar', 'modal', 'drawer', 'hover-feedback', 'search-filter', 'tabs', 'accordion', 'popover', 'minimal', 'glassmorphism', 'neobrutalism', 'split-view', 'bento-grid', 'master-detail', 'inline-validation', 'skeleton-loading', 'undo-feedback', 'command-palette', 'fade-slide', 'stagger', 'switch', 'radio-group', 'checkbox', 'breadcrumb', 'pagination', 'tooltip', 'progress-bar', 'range-slider', 'toast', 'select', 'data-table', 'step-indicator', 'empty-state', 'alert-banner', 'carousel', 'scrollspy', 'combobox', 'reorder-list', 'tree-view', 'context-menu', 'toolbar', 'color-picker', 'number-input', 'tag-input', 'date-picker', 'timeline', 'sticky-header', 'resizable-panel', 'dark-mode', 'meter', 'textarea', 'multi-select', 'description-list', 'status-badge', 'loading-button', 'confirmation-flow', 'error-summary', 'load-more', 'responsive-grid', 'aspect-ratio', 'text-truncation', 'typography-scale', 'skip-link', 'fieldset', 'input-adornment', 'dual-range', 'container-query', 'multi-column', 'image-comparison', 'flip-card', 'elevation', 'gradient-surface', 'spacing-scale', 'focus-ring'] as const;
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
