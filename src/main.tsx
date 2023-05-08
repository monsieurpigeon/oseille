import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './backend';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { inject } from '@vercel/analytics';
import { ConfirmContextProvider } from './component/modal/confirm-dialog/ConfirmContext';
import { SideKickContextProvider } from './component/modules/sidekick/SideKickContext';

inject();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ConfirmContextProvider>
        <SideKickContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SideKickContextProvider>
      </ConfirmContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
