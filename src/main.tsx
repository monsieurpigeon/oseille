import { ChakraProvider } from '@chakra-ui/react';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './backend';
import { ConfirmContextProvider } from './component/modal/confirm-modal/ConfirmContext';
import { SideKickContextProvider } from './component/modules/sidekick/SideKickContext';
import './index.css';

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <ChakraProvider>
        <ConfirmContextProvider>
          <SideKickContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SideKickContextProvider>
        </ConfirmContextProvider>
      </ChakraProvider>
    </PostHogProvider>
  </React.StrictMode>,
);
