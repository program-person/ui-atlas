import { useEffect, useRef, useState } from 'react';
import type { Settings } from '../types.ts';

const NOTE_COUNT = 18;
const noteTopics = ['余白を見直す', '検索欄の位置を試す', 'カードを並べて比べる'];
const sampleNotes = Array.from({ length: NOTE_COUNT }, (_, index) => ({
  id: index + 1, title: `ノート${String(index + 1).padStart(2, '0')}`, description: noteTopics[index % noteTopics.length],
}));

export function PaginationDemo({ settings }: { settings: Settings }) {
  const pageSize = Number(settings.pageSize);
  const pageCount = Math.ceil(sampleNotes.length / pageSize);
  const [page, setPage] = useState(settings.initial === 'last' ? pageCount : 1);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigationPending = useRef(false);
  const firstIndex = (page - 1) * pageSize;
  const visibleNotes = sampleNotes.slice(firstIndex, firstIndex + pageSize);

  useEffect(() => {
    if (navigationPending.current) {
      headingRef.current?.focus();
      navigationPending.current = false;
    }
  }, [page]);

  function changePage(nextPage: number, moveFocus = true) {
    if (nextPage < 1 || nextPage > pageCount || nextPage === page) return;
    navigationPending.current = moveFocus;
    setPage(nextPage);
  }

  return <div className="expanded-demo navigation-demo pagination-demo">
    <span className="demo-kicker">A PAGE AT A TIME</span><h1>ノートを少しずつ見る</h1>
    <p className="demo-muted">同じ一覧を、一定の件数ごとに区切ります。</p>
    <h2 tabIndex={-1} ref={headingRef}>ノート一覧 · {page} / {pageCount}ページ</h2>
    <p className="pagination-range" role="status">全{sampleNotes.length}件中 {firstIndex + 1}〜{firstIndex + visibleNotes.length}件を表示</p>
    <ul className="paginated-notes">{visibleNotes.map((note) => <li key={note.id}><strong>{note.title}</strong><p>{note.description}</p></li>)}</ul>
    <nav className="sample-pagination" aria-label="ノート一覧のページ">
      <button type="button" disabled={page === 1} onClick={() => changePage(page - 1)}>前へ</button>
      <ul className="page-numbers">{Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <li key={pageNumber}>
        <button type="button" aria-label={`${pageNumber}ページ${pageNumber === pageCount ? '（最終）' : ''}`}
          aria-current={page === pageNumber ? 'page' : undefined} onClick={() => changePage(pageNumber)}>{pageNumber}</button>
      </li>)}</ul>
      <label className="page-jump"><span className="sr-only">ノートのページを選択</span>
        <select value={page} onChange={(event) => changePage(Number(event.target.value), false)}>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <option key={pageNumber} value={pageNumber}>{pageNumber} / {pageCount}ページ</option>)}
        </select>
      </label>
      <button type="button" disabled={page === pageCount} onClick={() => changePage(page + 1)}>次へ</button>
    </nav>
    <p className="demo-status">ページを選ぶと、表示範囲が変わります。</p>
  </div>;
}
