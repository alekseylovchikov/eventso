import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';
import db from '~/db';

const Input = z.object({
  search: z.string().optional(),
});

export default resolver.pipe(
  resolver.zod(Input),
  resolver.authorize(),
  async ({}, { session: { userId } }) => {
    return db.todo.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      select: { id: true, title: true, done: true },
    });
  },
);
