import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { initDatabase, loadCustomers, loadProducts } from './backend';
import { PouchProvider } from './contexts/pouchDb';
import './index.css';

initDatabase();
loadProducts();
loadCustomers();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PouchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PouchProvider>
  </React.StrictMode>,
);
