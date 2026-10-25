import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './styles/app.css';
import './styles/demos.css';
import './styles/form-controls.css';
import './styles/navigation-demos.css';
import './styles/growth-demos.css';
import './styles/extension-demos.css';
import './styles/continuation-demos.css';
import './styles/exploration-demos.css';
import './styles/workflow-demos.css';

const container = document.getElementById('root');
if (!container) throw new Error('アプリの表示先が見つかりません。');
createRoot(container).render(<StrictMode><App /></StrictMode>);
