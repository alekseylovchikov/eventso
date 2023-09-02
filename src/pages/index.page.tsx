import Layout from 'src/core/layouts/Layout';
import { BlitzPage } from '@blitzjs/next';
import { UserInfo } from '@/core/components/UserInfo';

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <div>
        <div>hello</div>
        <div>world</div>
      </div>
    </Layout>
  );
};

export default Home;
