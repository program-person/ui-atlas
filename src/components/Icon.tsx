import type { CSSProperties } from 'react';

const paths = {
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  search: 'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM16 16l5 5',
  sidebar: 'M3 4h18v16H3z M9 4v16 M5 8h2 M5 12h2',
  layers: 'm12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5 M3 16l9 5 9-5',
  motion: 'M13 3 5 14h6l-1 7 9-12h-6l1-6',
  flow: 'M5 3v6h6 M5 9l8-6 M5 15v6h6 M5 21l8-6 M17 6h4 M17 18h4',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  copy: 'M9 9h12v12H9z M15 9V3H3v12h6',
  check: 'm5 12 4 4L19 6',
  close: 'm6 6 12 12 M18 6 6 18',
  reset: 'M3 10a9 9 0 1 1 1 7 M3 4v6h6',
  monitor: 'M3 4h18v13H3z M12 17v4 M8 21h8',
  phone: 'M7 2h10v20H7z M11 18h2',
  link: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2',
  palette: 'M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4 2 2 0 0 1 1-4h3a3 3 0 0 0 3-3 9 9 0 0 0-9-7Z M7 8h.01 M12 6h.01 M17 8h.01 M6 13h.01',
} as const;
export function Icon({ name, size = 18, style }: { name: keyof typeof paths; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}><path d={paths[name]} /></svg>;
}
