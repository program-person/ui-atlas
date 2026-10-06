import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './styles/app.css';
import './styles/demos.css';

const container = document.getElementById('root');
if (!container) throw new Error('アプリの表示先が見つかりません。');
createRoot(container).render(<StrictMode><App /></StrictMode>);
