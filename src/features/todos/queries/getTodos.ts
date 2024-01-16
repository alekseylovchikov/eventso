import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';

const Input = z.object({
  search: z.string().optional(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ search }) => {
  return [
    {
      id: 1,
      title: 'buy milk',
    },
    {
      id: 2,
      title: 'buy bread',
    },
    {
      id: 3,
      title: 'buy cheese',
    },
    {
      id: 4,
      title: 'buy meat',
    },
  ];
});
