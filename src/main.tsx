import { ChakraProvider } from '@chakra-ui/react';
import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './backend';
import { ConfirmContextProvider } from './component/modal/confirm-modal/ConfirmContext';
import { SideKickContextProvider } from './component/modules/sidekick/SideKickContext';
import { DataProvider } from './context/DataContext';
import './index.css';
import { router } from './router';

const options = {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  autocapture: false,
  capture_pageview: false,
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_POSTHOG_KEY}
      options={options}
    >
      <ChakraProvider>
        <ConfirmContextProvider>
          <SideKickContextProvider>
            <DataProvider>
              <RouterProvider router={router} />
            </DataProvider>
          </SideKickContextProvider>
        </ConfirmContextProvider>
      </ChakraProvider>
    </PostHogProvider>
  </React.StrictMode>,
);
