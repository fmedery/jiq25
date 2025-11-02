# Plan to Implement Google Analytics

This plan outlines the steps to integrate Google Analytics into the application.

## 1. Create `gtag.ts`

First, we'll create a new file at `utils/gtag.ts` to house all the Google Analytics functions. This will help keep the code organized and easy to maintain.

```typescript
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

const isProduction = process.env.NODE_ENV === 'production';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  if (!isProduction) {
    return;
  }
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: { action: string; category: string; label: string; value: number }) => {
  if (!isProduction) {
    return;
  }
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
```

## 2. Add GTAG ID to Environment Variables

Next, we'll add the Google Analytics GTAG ID to the environment variables. We'll create a `.env` file if it doesn't already exist, and add the following line:

```
GA_TRACKING_ID=YOUR_GTAG_ID
```

Then, we'll update `vite.config.ts` to make the environment variable available in the application:

```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GA_TRACKING_ID': JSON.stringify(env.GA_TRACKING_ID)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
})
```

## 3. Initialize Google Analytics in `App.tsx`

Finally, we'll initialize Google Analytics tracking in the main application file, `App.tsx`. We'll use a `useEffect` hook to dynamically create and inject the Google Analytics script tags into the document's head. This ensures the script is loaded with the correct GTAG ID from the environment variables. Another `useEffect` hook will track page views whenever the application's `step` state changes.

```typescript
// App.tsx
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import * as gtag from './utils/gtag';
// ... other imports

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  // ... other state

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`;
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gtag.GA_TRACKING_ID}');
    `;
    document.head.appendChild(script2);
  }, []);

  useEffect(() => {
    gtag.pageview(new URL(window.location.href));
  }, [step]);

  // ... rest of the component
}
```

## 5. Event Tracking (Optional)

If you'd like to track specific events, we can add event tracking to the application. For example, we could track button clicks, form submissions, or other user interactions.

Please let me know if you're happy with this plan, or if you'd like to make any changes. Once you approve, we can switch to code mode to implement the changes.