import type { DemoId } from '../types.ts';
const previews: Partial<Record<DemoId, string[]>> = {
  "reading-ruler": [
    "段落1",
    "［段落2］",
    "段落3"
  ],
  "log-tail": [
    "記録8 → 9",
    "末尾へ追従",
    "位置を保つ"
  ],
  "markdown-preview": [
    "# 見出し",
    "- 箇条書き",
    "原文 ↔ 表示"
  ],
  "input-normalization": [
    "ＡＢ１２",
    "↓ NFKC",
    "AB12"
  ],
  "rule-checklist": [
    "済 文字数",
    "未 文字の種類",
    "達成 2 / 3"
  ],
  "responsive-toolbar": [
    "作成　複製",
    "その他…",
    "表示 / 説明"
  ],
  "position-picker": [
    "横50%",
    "＋",
    "縦50%"
  ],
  "variant-picker": [
    "青：S / L",
    "赤：Sのみ",
    "有効な組合せ"
  ],
  "recurrence-picker": [
    "月　水　金",
    "1週 / 2週",
    "次の4日付"
  ],
  "footnote-links": [
    "本文［1］",
    "↓　↑",
    "脚注1"
  ],
  "timeline-scrubber": [
    "00:05 / 00:30",
    "━●━━━━",
    "時刻と図"
  ],
  "allocation-input": [
    "文章4 図3",
    "確認3",
    "合計10点"
  ]
};
export function Continuation3Thumbnail({id}: {id: DemoId}) { const preview=previews[id]; return preview ? <div className="mini-workflow"><span>{preview[0]}</span><b>{preview[1]}</b><span>{preview[2]}</span></div> : null; }
