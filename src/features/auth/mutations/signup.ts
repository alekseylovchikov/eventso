import { SecurePassword } from '@blitzjs/auth/secure-password';
import { resolver } from '@blitzjs/rpc';
import { z } from 'zod';
import db from '~/db';
import { Role } from '~/types';
import { email, password } from './../schemas';
import { PrismaError } from '@/utils/blitz-utils';

const Input = z.object({
  email,
  password,
  name: z.string(),
});

export default resolver.pipe(resolver.zod(Input), async ({ email, password, name }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim());

  try {
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), name, hashedPassword, role: 'USER' },
      select: { id: true, name: true, email: true, role: true },
    });

    if (user) {
      await ctx.session.$create({ userId: user.id, role: user.role as Role });
      return user;
    }
  } catch (e) {
    throw new PrismaError(e.message, e.code, e.meta);
  }

  return null;
});
