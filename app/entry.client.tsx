import * as Sentry from '@sentry/remix';
import { RemixBrowser, useLocation, useMatches } from '@remix-run/react';
import { startTransition, StrictMode, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';

Sentry.init({
  dsn: 'https://3546d2dfae964405a7a1211e6b147388@o918579.ingest.us.sentry.io/5861922',
  tunnel: '/sentry-tunnel',
  tracesSampleRate: 1,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,

  integrations: [
    Sentry.browserTracingIntegration({
      useEffect,
      useLocation,
      useMatches
    }),
    Sentry.replayIntegration()
  ]
});

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>
  );
});
