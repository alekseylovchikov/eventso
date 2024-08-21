import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';
import db from '~/db';

const Input = z.object({
  todoTitle: z.string(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({ todoTitle }, { session: { userId } }) => {
    return db.todo.create({
      data: { title: todoTitle, user: { connect: { id: userId } } },
    });
  },
);
