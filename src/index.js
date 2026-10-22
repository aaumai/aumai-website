import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Loaded after every page stylesheet so it wins; scoped to .site-lux (India site only).
import './styles/lux.css';
import { initVideoFocus } from './utils/videoFocus';

// Every video pauses when scrolled away or the tab is hidden; one plays at a time (owner 2026-10-22).
initVideoFocus();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

