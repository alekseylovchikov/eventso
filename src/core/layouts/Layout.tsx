import Head from 'next/head';
import React, { Suspense } from 'react';
import { BlitzLayout } from '@blitzjs/next';

type Props = {
  title?: string;
  children?: React.ReactNode;
  maxWidth?: number;
};

const Layout: BlitzLayout<Props> = ({ title, maxWidth = 800, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'eventso'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback="Calculate...">
        <div style={{ margin: '0 auto', width: '100%', maxWidth }}>{children}</div>
      </Suspense>
    </>
  );
};

export default Layout;
