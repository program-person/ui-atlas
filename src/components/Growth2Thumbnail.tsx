import type { DemoId } from '../types.ts';
const previews: Partial<Record<DemoId, string[]>> = {
  "floating-label": ["入力欄のラベルを、入力後は小さく上へ移す。","入力後も残る浮動ラベル","空欄 / 例あり"],
  "autosize-textarea": ["入力した行数に合わせて、高さを自動で変える。","文章量に合わせて伸びる入力欄","160px / 240px"],
  "card-list-toggle": ["同じ項目を一覧性と詳細の読みやすさで並べ替える。","カードとリストを切り替える","カード / リスト"],
  "virtual-list": ["大量の行のうち、表示範囲とその前後だけを描く。","見えている範囲だけ描く一覧","100件 / 500件"],
  "infinite-scroll": ["一覧の末尾が見えたとき、続きの項目を増やす。","末尾で次の項目を表示する","手動 / 自動"],
  "scrollbar-gutter": ["スクロールの有無で本文幅が変わるのを抑える。","スクロールバーの場所を確保する","常に確保 / 自動"],
  "overscroll-containment": ["内側の末尾で、外側までスクロールが伝わるかを変える。","スクロールを枠の中に留める","枠内に留める / 外側へ伝える"],
  "relative-time": ["何分前という表示と、正確な日時を使い分ける。","相対時刻と日時を切り替える","何分前 / 正確な日時"],
  "responsive-image": ["画面幅に合わせて別の図を読み込む。","幅に応じて画像を選ぶ","幅で切替 / 横長に固定"],
  "easing-curves": ["同じ距離と時間で、途中の速さだけを変える。","動きの速さの変化を比べる","一定 / 最後に減速"],
  "flowchart": ["条件の答えによって進む先が変わる流れを示す。","条件分岐のフローチャート","はい / いいえ"],
  "state-machine": ["現在の状態と、操作で移れる先を示す。","状態遷移図","完了 / 失敗"],
  "organization-chart": ["上位と下位の関係を枝で示す。","階層の構成図","展開 / 省略"],
  "network-graph": ["複数の項目どうしの接続を図で見る。","つながりのネットワーク図","輪 / 中心から枝"],
  "dependency-graph": ["先に終える必要がある作業を線で結ぶ。","前提を持つ作業の図","並行 / 順番"],
  "swimlane": ["工程の並びと、その担当範囲を同時に示す。","担当範囲ごとの工程図","横 / 縦"],
  "cycle-diagram": ["最後の手順から最初へ戻る関係を示す。","繰り返す手順の図","正順 / 逆順"],
  "sankey-diagram": ["分かれて流れる量を、線の太さで表す。","量の流れを太さで示す図","8対4 / 6対6"],
  "parallel-coordinates": ["複数の数値軸を横に並べ、同じ項目を線で結ぶ。","平行座標の比較図","AとB / Aだけ"],
  "venn-diagram": ["2つの集合の共通部分と全体を見比べる。","集合の重なりを示す図","共通部分 / 和集合"],
  "seat-selection": ["座標のある配置図で、利用できる場所を選ぶ。","配置図から場所を選ぶ","1席 / 複数席"],
  "time-slot-picker": ["候補から利用可能な時間帯を選ぶ。","空いている時間帯を選ぶ","30分 / 60分"],
  "schedule-conflict": ["予定どうしの重なりと、接しているだけの状態を分ける。","時間帯の重なりを確認する","重なる / 接する"],
  "permission-matrix": ["対象と操作を行列に分けて選択する。","権限を表で選ぶ","編集には閲覧が必要 / 独立"],
  "settings-dependency": ["前提となる設定に応じて、詳細設定を使えるようにする。","関連する設定の有効・無効","無効 / 有効"],
  "facet-counts": ["選ぶ前に、候補ごとの件数を示す。","絞り込み候補の件数","表示 / 隠す"],
  "selection-summary": ["選択を変えるたび、対象数と合計値を更新する。","選んだ項目の合計","点数 / 件数"],
  "image-hotspots": ["図の位置と補足説明を対応させる。","図の印から説明を開く","見出し / 本文"],
  "pan-controls": ["表示窓の中で大きな図の位置を変える。","図を上下左右へ動かす","20px / 40px"],
  "shortcut-hints": ["実行できるキーと操作名を近くに表示する。","キー操作を画面に示す","Alt+B / Alt+M"],
  "cursor-pagination": ["総ページ数を使わず、前後の位置から一覧を送る。","次の位置をたどるページ送り","2件 / 3件"],
  "cross-page-selection": ["今のページの選択と、全体の選択を区別する。","ページをまたいで選ぶ","先頭 / 次のページ"],
  "attachment-list": ["候補の名前・形式・容量と、対象に含めるかを表示する。","添付候補を一覧で確認する","2件 / 3件"],
  "upload-constraints": ["形式と容量の条件を示し、候補ごとに理由を表示する。","取り込み条件を先に示す","5KB / 10KB"],
  "delivery-receipt": ["異なる到達段階を、別の状態として表示する。","送信・到達・既読を分ける","成功 / 失敗"],
  "threaded-comments": ["返信先との関係を、段差とまとまりで示す。","返信を階層で読む","段差あり / 段差なし"],
  "code-block": ["インデントを保ち、長い行の表示を選ぶ。","コードの表示と折り返し","折り返す / 横スクロール"],
  "anchor-offset": ["移動先の見出しが固定部分の下に隠れないようにする。","固定見出しを避けて移動する","64px / なし"],
  "notification-grouping": ["種類別の通知と発生順の通知を切り替える。","関連する通知をまとめる","種類別 / 新しい順"],
  "collapsed-breadcrumb": ["深い階層の中間をまとめ、必要なときに開く。","長いパンくずの中間を開く","省略 / すべて"],
  "lollipop-chart": [
    "棒の先端を点で示し、分類ごとの値を比較する。",
    "ロリポップチャート",
    "標準の値 / 別の値"
  ],
  "diverging-bar": [
    "増減を0の左右へ分けて表示する。",
    "左右に分かれる棒グラフ",
    "標準の値 / 別の値"
  ],
  "dumbbell-chart": [
    "同じ分類の2時点を点と線で比較する。",
    "ダンベルチャート",
    "標準の値 / 別の値"
  ],
  "slope-chart": [
    "2時点の順位や値の変化を傾きで示す。",
    "スロープチャート",
    "標準の値 / 別の値"
  ],
  "radar-chart": [
    "複数の評価軸を放射状に並べる。",
    "レーダーチャート",
    "標準の値 / 別の値"
  ],
  "box-plot": [
    "中央値・四分位数・範囲をまとめて示す。",
    "箱ひげ図",
    "標準の値 / 別の値"
  ],
  "bubble-chart": [
    "点の位置に2つの値、面積に3つ目の値を割り当てる。",
    "バブルチャート",
    "標準の値 / 別の値"
  ],
  "gantt-chart": [
    "作業の開始日と終了日を横の帯で示す。",
    "ガントチャート",
    "標準の値 / 別の値"
  ],
  "range-band": [
    "代表値と、その上下の範囲を一緒に表示する。",
    "範囲帯付きの折れ線",
    "標準の値 / 別の値"
  ],
  "legend-toggle": [
    "系列ごとに表示と非表示を選ぶ。",
    "凡例から系列を切り替える",
    "両方 / Aのみ"
  ],
  "object-fit": [
    "画像全体を見せるか、枠を埋めるかを選ぶ。",
    "画像を枠に収める",
    "全体を表示 / 枠を埋める"
  ],
  "writing-mode": [
    "日本語の文章を縦方向と横方向に組む。",
    "縦書きと横書き",
    "横書き / 縦書き"
  ],
  "fluid-type": [
    "文字の大きさを上下限の間で変える。",
    "幅に応じて変わる文字サイズ",
    "可変 / 固定"
  ],
  "tabular-numbers": [
    "桁を揃え、数値の変化で表示幅が動くのを抑える。",
    "数字の幅を揃える",
    "等幅の数字 / 通常の数字"
  ],
  "drop-cap": [
    "本文の最初の一文字を大きく組む。",
    "段落の先頭文字を大きくする",
    "拡大 / 通常"
  ],
  "text-spacing": [
    "文字の間隔と行間を変えて読み比べる。",
    "文字間隔を調整する",
    "標準 / 広め"
  ],
  "color-mix": [
    "基準色と白を混ぜ、段階的な色を作る。",
    "基準色から中間色を作る",
    "sRGB / Oklab"
  ],
  "contrast-checker": [
    "文字色と背景色の明るさの差を数値で確かめる。",
    "文字と背景のコントラスト",
    "通常文字 / 大きい文字"
  ],
  "border-radius": [
    "同じ部品の角を、用途に合わせて変える。",
    "角の丸みを使い分ける",
    "直角 / 6px / 20px"
  ],
  "scroll-shadow": [
    "枠の上や下に続きがあることを示す。",
    "スクロールの続きの手がかり",
    "長い / 短い"
  ],
  "table-transpose": [
    "比べる方向に合わせて表の縦横を入れ替える。",
    "表の行と列を入れ替える",
    "道具を行 / 道具を列"
  ],
  "grouped-table": [
    "分類ごとに行をまとめ、内訳と小計を示す。",
    "分類別にまとまった表",
    "開く / 閉じる"
  ],
  "pivot-table": [
    "2つの分類を掛け合わせて集計する。",
    "クロス集計表",
    "数量の合計 / 記録の件数"
  ],
  "multi-sort-table": [
    "第1条件が同じ行を第2条件で並べる。",
    "複数の条件で並べ替える表",
    "昇順 / 降順"
  ],
  "responsive-table": [
    "横スクロールと項目ごとの縦表示を比較する。",
    "狭い枠で表の表示を変える",
    "横スクロール / 縦に表示"
  ],
  "cross-field-validation": [
    "別々の入力値をまとめて検証する。",
    "入力欄どうしの整合性を確かめる",
    "有効 / 逆転"
  ],
  "month-input": [
    "日を含めず、年月を選ぶ。",
    "年月だけを入力する",
    "2026年全体 / 2026年秋"
  ],
  "number-format": [
    "入力値を保ち、桁区切りや単位を表示へ付ける。",
    "数値を表示用に整える",
    "小数2桁まで / 百分率"
  ],
  "paste-preview": [
    "区切られた文章を、確定前に行と列で確認する。",
    "取り込む前に表を確認する",
    "タブ / カンマ"
  ],
  "toggle-button": [
    "ボタンを押すたびに状態を切り替える。",
    "押した状態を保つボタン",
    "標準 / 太字"
  ]
};
const figureIds = new Set<DemoId>(['lollipop-chart', 'diverging-bar', 'dumbbell-chart', 'slope-chart', 'radar-chart', 'box-plot', 'bubble-chart', 'gantt-chart', 'range-band', 'legend-toggle', 'flowchart', 'state-machine', 'organization-chart', 'network-graph', 'dependency-graph', 'swimlane', 'cycle-diagram', 'sankey-diagram', 'parallel-coordinates', 'venn-diagram']);

function FigurePreview({ id }: { id: DemoId }) {
  const green = '#235b46';
  const rust = '#a24f31';
  const pale = '#d7e6df';
  return <svg viewBox="0 0 200 70" style={{ width: '100%', height: 65 }} aria-hidden="true">
    {id === 'lollipop-chart' && [45, 90, 135].map((value, index) => <g key={value}><path d={`M15 ${15 + index * 22}H${value}`} stroke={green} strokeWidth="2" /><circle cx={value} cy={15 + index * 22} r="5" fill={green} /></g>)}
    {id === 'diverging-bar' && <><path d="M100 0V70" stroke={green} /><rect x="100" y="5" width="50" height="14" fill={green} /><rect x="55" y="28" width="45" height="14" fill={rust} /><rect x="100" y="51" width="70" height="14" fill={green} /></>}
    {id === 'dumbbell-chart' && [0, 1, 2].map(index => <g key={index}><path d={`M${20 + index * 20} ${15 + index * 22}H${110 + index * 20}`} stroke={green} /><circle cx={20 + index * 20} cy={15 + index * 22} r="5" fill="white" stroke={green} /><rect x={105 + index * 20} y={10 + index * 22} width="10" height="10" fill={green} /></g>)}
    {id === 'slope-chart' && <><path d="M20 5L180 50M20 35L180 15M20 65L180 35" stroke={green} strokeWidth="2" fill="none" /><circle cx="20" cy="5" r="3" fill={green} /><circle cx="180" cy="50" r="3" fill={green} /></>}
    {id === 'radar-chart' && <><path d="M100 3L140 35L100 67L60 35Z M100 3V67 M60 35H140" stroke="#80958a" fill="none" /><polygon points="100,9 124,35 100,60 76,35" fill={pale} stroke={green} /></>}
    {id === 'box-plot' && <><path d="M20 35H180M20 20V50M180 20V50" stroke={green} /><rect x="60" y="15" width="70" height="40" fill={pale} stroke={green} /><path d="M100 15V55" stroke={green} strokeWidth="3" /></>}
    {id === 'bubble-chart' && <><path d="M10 5V65H190" stroke="#80958a" fill="none" />{[[40,45,9],[100,20,17],[160,38,12]].map(([x,y,radius]) => <circle key={x} cx={x} cy={y} r={radius} fill={pale} stroke={green} />)}</>}
    {id === 'gantt-chart' && <>{[0,1,2,3,4,5].map(index => <path key={index} d={`M${20+index*30} 0V70`} stroke="#d0d9cf" />)}<rect x="20" y="5" width="60" height="14" fill={green}/><rect x="50" y="28" width="90" height="14" fill={rust}/><rect x="140" y="51" width="45" height="14" fill={green}/></>}
    {id === 'range-band' && <><polygon points="10,45 100,10 190,5 190,35 100,50 10,65" fill={pale} /><polyline points="10,55 100,30 190,20" stroke={green} strokeWidth="3" fill="none" /></>}
    {id === 'legend-toggle' && <><polyline points="10,60 95,35 180,10" stroke={green} strokeWidth="3" fill="none"/><polyline points="10,10 95,50 180,30" stroke={rust} strokeDasharray="5 3" strokeWidth="2" fill="none"/></>}
    {id === 'flowchart' && <><path d="M100 15V25M70 40H30V65M130 40H170V65" stroke={green} fill="none"/><rect x="80" y="1" width="40" height="14" fill={pale}/><path d="M100 20L140 40L100 60L60 40Z" fill={pale} stroke={green}/><rect x="10" y="60" width="40" height="10" fill={green}/><rect x="150" y="60" width="40" height="10" fill={rust}/></>}
    {id === 'state-machine' && <><path d="M35 35H165" stroke={green}/>{[35,100,165].map((x,index)=><circle key={x} cx={x} cy="35" r="22" fill={index===1?pale:'white'} stroke={green} strokeWidth={index===1?3:1}/>)}</>}
    {id === 'organization-chart' && <><path d="M100 15V30H45V45M100 30H155V45" fill="none" stroke={green}/><rect x="75" y="0" width="50" height="18" fill={green}/><rect x="20" y="45" width="50" height="20" fill={pale} stroke={green}/><rect x="130" y="45" width="50" height="20" fill={pale} stroke={green}/></>}
    {id === 'network-graph' && <><path d="M100 10L175 35L100 60L25 35Z M100 10V60" stroke={green} fill="none"/>{[[100,10],[175,35],[100,60],[25,35]].map(([x,y])=><circle key={x+','+y} cx={x} cy={y} r="8" fill={pale} stroke={green}/>)}</>}
    {id === 'dependency-graph' && <><path d="M20 35L90 10L180 35L90 60Z" stroke={green} fill="none"/>{[[20,35],[90,10],[90,60],[180,35]].map(([x,y])=><rect key={x+','+y} x={x-9} y={y-8} width="18" height="16" fill={pale} stroke={green}/>)}</>}
    {id === 'swimlane' && <>{[0,1,2].map(index=><g key={index}><rect x="5" y={index*23} width="190" height="21" fill={index===1?pale:'#eff2eb'}/><rect x={20+index*55} y={index*23+4} width="45" height="13" fill={green}/></g>)}</>}
    {id === 'cycle-diagram' && <><path d="M100 10L160 60H40Z" stroke={green} fill="none"/>{[[100,10],[160,60],[40,60]].map(([x,y])=><circle key={x+','+y} cx={x} cy={y} r="10" fill={pale} stroke={green}/>)}</>}
    {id === 'sankey-diagram' && <><path d="M25 30C95 30 100 15 175 15" fill="none" stroke={green} strokeWidth="18"/><path d="M25 45C95 45 100 60 175 60" fill="none" stroke={rust} strokeWidth="9"/></>}
    {id === 'parallel-coordinates' && <><path d="M25 0V70M100 0V70M175 0V70" stroke="#80958a"/><polyline points="25,10 100,50 175,25" fill="none" stroke={green} strokeWidth="2"/><polyline points="25,45 100,10 175,55" fill="none" stroke={rust} strokeWidth="2" strokeDasharray="4 3"/></>}
    {id === 'venn-diagram' && <><circle cx="80" cy="35" r="32" fill="#235b4625" stroke={green}/><circle cx="120" cy="35" r="32" fill="#a24f3125" stroke={rust}/></>}
  </svg>;
}

export function Growth2Thumbnail({id}: {id:DemoId}) {
  const preview=previews[id];
  if (!preview) return null;
  if (figureIds.has(id)) return <div className="mini-workflow"><FigurePreview id={id}/><span>{preview[1]}</span></div>;
  return <div className="mini-workflow"><span>{preview[0]}</span><b>{preview[1]}</b><span>{preview[2]}</span></div>;
}
