import { SecurePassword } from '@blitzjs/auth/secure-password';
import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';
import db from '~/db';
import { Role } from '~/types';
import { email, password } from './../schemas';

const Input = z.object({
  email,
  password,
  name: z.string(),
});

export default resolver.pipe(resolver.zod(Input), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim());
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), name, hashedPassword, role: 'USER' },
    select: { id: true, name: true, email: true, role: true },
  });

  await ctx.session.$create({ userId: user.id, role: user.role as Role });
  return user;
});
