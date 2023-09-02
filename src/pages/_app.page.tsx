import { AppProps, ErrorBoundary } from '@blitzjs/next';
import React, { Suspense } from 'react';
import { withBlitz } from 'src/blitz-client';
import { MantineProvider } from '@mantine/core';
import 'src/styles/globals.css';
import { RootErrorFallback } from '@/core/components/RootErrorFallback';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
        <Suspense fallback="Calculate...">
          <Component {...pageProps} />
        </Suspense>
      </MantineProvider>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
