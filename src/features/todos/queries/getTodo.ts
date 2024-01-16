import { resolver } from '@blitzjs/rpc';

export default resolver.pipe(async () => {
  const todos = [
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

  return todos[0];
});
