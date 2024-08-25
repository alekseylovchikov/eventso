import { Illustration } from './Illustration';
import { Vertical } from 'mantine-layout-components';
import Layout from '@/core/layouts/Layout';
import { Button } from '@mantine/core';
import Link from 'next/link';
import { Routes } from '@blitzjs/next';

export default function Page404() {
  return (
    <Layout>
      <Vertical center fullH fullW>
        <Button component={Link} href={Routes.Home()}>
          Back to Home Page
        </Button>
        <Illustration />
      </Vertical>
    </Layout>
  );
}

// export default function Page404() {
//   const statusCode = 404;
//   const title = 'This page could not be found';
//   return (
//     <>
//       <Head>
//         <title>
//           {statusCode}: {title}
//         </title>
//       </Head>
//       <ErrorComponent statusCode={statusCode} title={title} />
//     </>
//   );
// }
