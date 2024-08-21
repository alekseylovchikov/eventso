import Head from 'next/head';
import React, { Suspense } from 'react';
import { BlitzLayout, Routes } from '@blitzjs/next';
import { AppShell, Header, Text, Footer, Anchor, Button, Loader } from '@mantine/core';
import { Horizontal, Vertical } from 'mantine-layout-components';
import Link from 'next/link';
import { useMutation } from '@blitzjs/rpc';
import logout from '@/features/auth/mutations/logout';
import { useCurrentUser } from '@/features/users/hooks/useCurrentUser';

type Props = {
  title?: string;
  children?: React.ReactNode;
  maxWidth?: number;
};

const Layout: BlitzLayout<Props> = ({ title, children }) => {
  const thisYear = new Date().getFullYear();
  const [logoutMutation] = useMutation(logout);
  const user = useCurrentUser();

  return (
    <>
      <Head>
        <title>{title || 'eventso'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback="Calculate...">
        <AppShell
          padding="md"
          // navbar={
          //   <Navbar width={{ base: 300 }} height={500} p="xs">
          //     {/* Navbar content */}
          //   </Navbar>
          // }
          header={
            <Header height={55} p="xs">
              <Horizontal fullH spaceBetween fullW>
                <Anchor
                  color="green.2"
                  underline={false}
                  component={Link}
                  href={Routes.Home()}
                  fw="bold"
                >
                  Eventso
                </Anchor>

                {user && (
                  <Horizontal>
                    <Text>{user.name}</Text>
                    <Button
                      size="xs"
                      variant="subtle"
                      onClick={async () => {
                        await logoutMutation();
                      }}
                    >
                      Logout
                    </Button>
                  </Horizontal>
                )}
              </Horizontal>
            </Header>
          }
          footer={
            <Footer height={50}>
              <Horizontal fullH fullW center>
                <Text fz="xs" color="dimmed">
                  Copyright © {thisYear}
                </Text>
              </Horizontal>
            </Footer>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
        >
          <Vertical fullH fullW>
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </Vertical>
        </AppShell>
      </Suspense>
    </>
  );
};

export default Layout;
