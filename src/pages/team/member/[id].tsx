import { BlitzPage } from '@blitzjs/next';
import { useStringParam } from '../../../utils/utils';

const TeamPage: BlitzPage = () => {
  const slug = useStringParam('id');

  return (
    <div>
      <h1>Hello {slug}</h1>
    </div>
  );
};
