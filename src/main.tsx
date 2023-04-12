import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Analytics } from '@vercel/analytics/react';
import './backend';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
        <Analytics />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
