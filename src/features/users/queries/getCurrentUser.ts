import { Ctx } from 'blitz';
import db from '~/db';

export default async function getCurrentUser(_ = null, { session }: Ctx) {
  if (!session.userId) return null;

  return db.user.findUnique({
    where: { id: session.userId },
    select: { id: true, name: true, email: true, role: true },
  });
}
