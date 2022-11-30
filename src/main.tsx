import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './backend';
import { initDatabase } from './backend';
import { PouchProvider } from './context/pouchDb';
import './index.css';

initDatabase();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PouchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PouchProvider>
  </React.StrictMode>,
);
