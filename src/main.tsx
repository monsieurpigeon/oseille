import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './backend';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { inject } from '@vercel/analytics';
import { ConfirmContextProvider } from './component/modal/confirm-dialog/ConfirmContext';

inject();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ConfirmContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfirmContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
