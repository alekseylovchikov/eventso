import React from 'react';
import { BlitzPage } from '@blitzjs/next';
import Layout from '@/core/layouts/Layout';

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="About">
      <div>This is about page</div>
    </Layout>
  );
};

export default AboutPage;
