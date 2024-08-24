import { AuthClientPlugin } from '@blitzjs/auth';
import { setupBlitzClient } from '@blitzjs/next';
import { BlitzRpcPlugin, getQueryClient } from '@blitzjs/rpc';

export const authConfig = {
  cookiePrefix: 'eventso',
};

export const { withBlitz } = setupBlitzClient({
  plugins: [
    AuthClientPlugin(authConfig),
    BlitzRpcPlugin({
      reactQueryOptions: {
        queries: { retry: 2 },
        mutations: {
          async onSuccess() {
            const queryClient = getQueryClient();
            await queryClient.invalidateQueries();
          },
        },
      },
    }),
  ],
});
