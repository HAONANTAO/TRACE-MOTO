import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const root = document.getElementById('root');
const isPrerendered = document.documentElement.getAttribute('data-prerendered') === 'true';

if (isPrerendered && root.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    root,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
