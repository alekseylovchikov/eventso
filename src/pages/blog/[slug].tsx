import { useStringParam } from '../../utils/utils';

const BlogPostPage = () => {
  const slug = useStringParam('slug');

  return (
    <div>
      <h1>Hello blog post page...</h1>
      <h2>{slug}</h2>
    </div>
  );
};

export default BlogPostPage;
