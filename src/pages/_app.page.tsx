import { AppProps, ErrorBoundary } from '@blitzjs/next';
import React, { Suspense } from 'react';
import { withBlitz } from 'src/blitz-client';
import { MantineProvider } from '@mantine/core';
import 'src/styles/globals.css';
import { RootErrorFallback } from '@/core/components/RootErrorFallback';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Suspense fallback="Calculate...">
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: 'light',
          }}
        >
          <Component {...pageProps} />
        </MantineProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default withBlitz(MyApp);
