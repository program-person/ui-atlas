import type { ReactNode } from 'react';

// A visible table keeps every plotted value available without interpreting an SVG.
export function DataFigure({ caption, headers, rows, children }: { caption: string; headers: string[]; rows: (string | number)[][]; children: ReactNode }) {
  return <figure className="g2-figure"><figcaption>{caption}</figcaption>{children}<div className="g2-table-scroll" role="region" aria-label={caption + 'の数表'} tabIndex={0}><table><caption>{caption}の数表</caption><thead><tr>{headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index}>{row.map((value, column) => column === 0 ? <th scope="row" key={column}>{value}</th> : <td key={column}>{value}</td>)}</tr>)}</tbody></table></div></figure>;
}
