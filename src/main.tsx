import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PouchProvider } from './contexts/pouchDb';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PouchProvider>
      <App />
    </PouchProvider>
  </React.StrictMode>,
);
