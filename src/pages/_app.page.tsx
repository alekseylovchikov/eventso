import { AppProps, ErrorBoundary } from '@blitzjs/next';
import React, { Suspense } from 'react';
import { withBlitz } from 'src/blitz-client';
import { Loader, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import 'src/styles/globals.css';
import { RootErrorFallback } from '@/core/components/RootErrorFallback';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <Notifications position="top-right" />
        <Suspense fallback={<Loader />}>
          <Component {...pageProps} />
        </Suspense>
      </ErrorBoundary>
    </MantineProvider>
  );
}

export default withBlitz(MyApp);
