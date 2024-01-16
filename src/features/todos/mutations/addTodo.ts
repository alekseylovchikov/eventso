import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';

const Input = z.object({
  todoTitle: z.string(),
});

export default resolver.pipe(resolver.zod(Input), resolver.authorize(), async ({ todoTitle }) => {
  console.log(todoTitle);

  return {
    id: 1,
    todoTitle,
  };
});
