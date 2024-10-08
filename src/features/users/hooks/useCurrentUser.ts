import { useQuery } from '@blitzjs/rpc';
import getCurrentUser from '@/features/users/queries/getCurrentUser';

export const useCurrentUser = () => {
  const [user] = useQuery(getCurrentUser, null);

  if (user) {
    return { ...user, isAdmin: user?.role === 'ADMIN' };
  }

  return null;
};
