export const CATEGORIES = ['見た目', 'レイアウト', '部品', '動き', 'UXの流れ'] as const;
export const DEMO_IDS = ['sidebar', 'modal', 'drawer', 'hover-feedback', 'search-filter', 'tabs', 'accordion', 'popover', 'minimal', 'glassmorphism', 'neobrutalism', 'split-view', 'bento-grid', 'master-detail', 'inline-validation', 'skeleton-loading', 'undo-feedback', 'command-palette', 'fade-slide', 'stagger', 'switch', 'radio-group', 'checkbox', 'breadcrumb', 'pagination', 'tooltip', 'progress-bar', 'range-slider', 'toast', 'select', 'data-table', 'step-indicator', 'empty-state', 'alert-banner', 'carousel', 'scrollspy', 'combobox', 'reorder-list', 'tree-view', 'context-menu', 'toolbar', 'color-picker', 'number-input', 'tag-input', 'date-picker', 'timeline', 'sticky-header', 'resizable-panel', 'dark-mode', 'meter', 'textarea', 'multi-select', 'description-list', 'status-badge', 'loading-button', 'confirmation-flow', 'error-summary', 'load-more', 'responsive-grid', 'aspect-ratio', 'text-truncation', 'typography-scale', 'skip-link', 'fieldset', 'input-adornment', 'dual-range', 'container-query', 'multi-column', 'image-comparison', 'flip-card', 'elevation', 'gradient-surface', 'spacing-scale', 'focus-ring', 'inline-edit', 'conditional-fields', 'dependent-select', 'transfer-list', 'bulk-actions', 'optimistic-update', 'autosave-feedback', 'unsaved-changes', 'split-button', 'metric-card', 'bar-chart', 'donut-chart', 'media-object', 'holy-grail-layout', 'sticky-footer', 'line-chart', 'stacked-bar-chart', 'scatter-plot', 'sort-controls', 'filter-chips', 'segmented-control', 'heatmap', 'grouped-list', 'expandable-card', 'input-mask', 'rating', 'date-range', 'time-input', 'copy-button', 'form-review', 'notification-center', 'connection-status', 'activity-feed', 'polling-control', 'queue-controls', 'history-controls', 'calendar-grid', 'kanban-board', 'comparison-table', 'zoom-controls', 'thumbnail-gallery', 'hierarchical-checkboxes', 'full-bleed-layout', 'card-footer-alignment', 'reading-progress', 'back-to-top', 'search-input', 'duration-input', 'character-counter', 'input-clear', 'search-highlight', 'tokenized-search', 'query-builder', 'date-presets', 'unit-converter', 'input-suggestions', 'editable-table', 'repeatable-fields', 'checkbox-cards', 'table-row-expansion', 'column-visibility', 'column-reorder', 'pinned-columns', 'table-footer', 'sparkline', 'area-chart', 'histogram', 'bullet-chart', 'waterfall-chart', 'waffle-chart', 'funnel-chart', 'treemap', 'retry-backoff', 'request-cancellation', 'dependent-steps', 'checkpoint-resume', 'batch-progress', 'async-search', 'search-history', 'saved-filters', 'selection-limit', 'conflict-resolution', 'version-comparison', 'session-timeout', 'offline-fallback', 'masonry-columns', 'sticky-aside', 'bottom-navigation', 'navigation-rail', 'overflow-menu', 'disclosure-navigation', 'line-length', 'text-wrap', 'logical-properties', 'subgrid', 'scroll-snap', 'lollipop-chart', 'diverging-bar', 'dumbbell-chart', 'slope-chart', 'radar-chart', 'box-plot', 'bubble-chart', 'gantt-chart', 'range-band', 'legend-toggle', 'object-fit', 'writing-mode', 'fluid-type', 'tabular-numbers', 'drop-cap', 'text-spacing', 'color-mix', 'contrast-checker', 'border-radius', 'scroll-shadow', 'table-transpose', 'grouped-table', 'pivot-table', 'multi-sort-table', 'responsive-table', 'cross-field-validation', 'month-input', 'number-format', 'paste-preview', 'toggle-button', 'seat-selection', 'time-slot-picker', 'schedule-conflict', 'permission-matrix', 'settings-dependency', 'facet-counts', 'selection-summary', 'image-hotspots', 'pan-controls', 'shortcut-hints', 'cursor-pagination', 'cross-page-selection', 'attachment-list', 'upload-constraints', 'delivery-receipt', 'threaded-comments', 'code-block', 'anchor-offset', 'notification-grouping', 'collapsed-breadcrumb', 'flowchart', 'state-machine', 'organization-chart', 'network-graph', 'dependency-graph', 'swimlane', 'cycle-diagram', 'sankey-diagram', 'parallel-coordinates', 'venn-diagram', 'floating-label', 'autosize-textarea', 'card-list-toggle', 'virtual-list', 'infinite-scroll', 'scrollbar-gutter', 'overscroll-containment', 'relative-time', 'responsive-image', 'easing-curves', 'reading-ruler', 'log-tail', 'markdown-preview', 'input-normalization', 'rule-checklist', 'responsive-toolbar', 'position-picker', 'variant-picker', 'recurrence-picker', 'footnote-links', 'timeline-scrubber', 'allocation-input'] as const;
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
