import { AppProps, ErrorBoundary } from '@blitzjs/next';
import React, { Suspense } from 'react';
import { withBlitz } from 'src/blitz-client';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import 'src/styles/globals.css';
import { RootErrorFallback } from '@/core/components/RootErrorFallback';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        <Notifications position="top-right" />
        <Suspense fallback="Calculate...">
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
