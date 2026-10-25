import { useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { Settings } from '../types.ts';

interface TreeNode { id: string; label: string; children?: TreeNode[] }
const roots: TreeNode[] = [{ id: 'notes', label: 'ノート', children: [{ id: 'sketch', label: '画面案' }, { id: 'color', label: '色の記録' }] }, { id: 'tools', label: 'ツール', children: [{ id: 'layout', label: '配置チェック' }] }];
const allNodes = roots.flatMap((node) => [{ ...node, parent: '' }, ...(node.children ?? []).map((child) => ({ ...child, parent: node.id }))]);

export function TreeViewDemo({ settings }: { settings: Settings }) {
  const treeId = useId();
  const [expanded, setExpanded] = useState<string[]>(settings.expansion === 'open' ? roots.map((node) => node.id) : []);
  const [focused, setFocused] = useState('notes');
  const [selected, setSelected] = useState('notes');
  const elements = useRef(new Map<string, HTMLLIElement>());
  const visible = allNodes.filter((node) => !node.parent || expanded.includes(node.parent));
  function focus(id: string) { elements.current.get(id)?.focus(); }
  function toggle(id: string) { setExpanded((current) => current.includes(id) ? current.filter((value) => value !== id) : [...current, id]); }
  function navigate(event: KeyboardEvent<HTMLLIElement>, node: TreeNode) {
    if (event.target !== event.currentTarget) return;
    const index = visible.findIndex((candidate) => candidate.id === node.id);
    let target: string | undefined;
    switch (event.key) {
      case 'ArrowDown': target = visible[Math.min(visible.length - 1, index + 1)].id; break;
      case 'ArrowUp': target = visible[Math.max(0, index - 1)].id; break;
      case 'Home': target = visible[0].id; break;
      case 'End': target = visible[visible.length - 1].id; break;
      case 'ArrowRight': if (node.children) { if (!expanded.includes(node.id)) toggle(node.id); else target = node.children[0].id; } break;
      case 'ArrowLeft': if (node.children && expanded.includes(node.id)) toggle(node.id); else target = allNodes.find((candidate) => candidate.id === node.id)?.parent; break;
      case 'Enter': case ' ': setSelected(node.id); break;
      default: return;
    }
    event.preventDefault(); event.stopPropagation(); if (target) focus(target);
  }
  function renderNode(node: TreeNode) {
    return <li key={node.id} role="treeitem" aria-labelledby={`${treeId}-${node.id}`} aria-expanded={node.children ? expanded.includes(node.id) : undefined} aria-selected={selected === node.id} tabIndex={focused === node.id ? 0 : -1}
      ref={(element) => { if (element) elements.current.set(node.id, element); }} onKeyDown={(event) => navigate(event, node)}
      onFocus={(event) => { if (event.target === event.currentTarget) { setFocused(node.id); if (settings.selection === 'automatic') setSelected(node.id); } }}
      onClick={(event) => { event.stopPropagation(); focus(node.id); setSelected(node.id); if (node.children) toggle(node.id); }}>
      <div className="tree-row"><span aria-hidden="true">{node.children ? expanded.includes(node.id) ? '▾' : '▸' : '·'}</span><span id={`${treeId}-${node.id}`}>{node.label}</span></div>
      {node.children && expanded.includes(node.id) && <ul role="group">{node.children.map(renderNode)}</ul>}
    </li>;
  }
  return <div className="expanded-demo extension-demo"><span className="demo-kicker">A HIERARCHY TO EXPLORE</span><h1>階層を開いて選ぶ</h1><p className="demo-muted">上下で移動、右で展開、左で閉じる。</p>
    <ul className="branch-tree" role="tree" aria-label="架空のノート構成" onBlur={(event) => {
      if (event.currentTarget.contains(event.relatedTarget)) return;
      let target = selected;
      while (!visible.some((node) => node.id === target)) target = allNodes.find((node) => node.id === target)?.parent || 'notes';
      setFocused(target);
    }}>{roots.map(renderNode)}</ul>
    <p role="status">選択：{allNodes.find((node) => node.id === selected)?.label}</p><p className="demo-status">クリックで選択し、フォルダーは開閉します。Home・Endでも移動できます。</p></div>;
}
