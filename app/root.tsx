import { captureRemixErrorBoundaryError } from '@sentry/remix';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from '@remix-run/react';
import globalStyles from '~/styles/global.css?url';
import tailwindStyles from '~/styles/tailwind.css?url';

export function links() {
  return [
    { rel: 'stylesheet', href: globalStyles },
    { rel: 'stylesheet', href: tailwindStyles },
    {
      href: 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;600&display=swap',
      rel: 'stylesheet'
    }
  ];
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
