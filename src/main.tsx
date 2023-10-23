import { PostHogProvider } from 'posthog-js/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './backend';
import './index.css';

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
      <App />
    </PostHogProvider>
  </React.StrictMode>,
);
