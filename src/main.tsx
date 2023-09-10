import { ChakraProvider } from '@chakra-ui/react';
import { inject } from '@vercel/analytics';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './backend';
import { ConfirmContextProvider } from './component/modal/confirm-modal/ConfirmContext';
import { SideKickContextProvider } from './component/modules/sidekick/SideKickContext';
import './index.css';

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
