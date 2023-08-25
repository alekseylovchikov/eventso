import { useParam } from '@blitzjs/next';

export const useStringParam = (name: string) => {
  return useParam(name, 'string');
};
