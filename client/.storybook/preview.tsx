import type { Preview } from '@storybook/react';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { http, HttpResponse } from 'msw';
import { mockUserData } from '@/shared/constants/mockData';
import { AppProvider } from '@/providers/AppProvider/AppProvider';

// Initialize MSW
initialize();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewMode: 'docs',
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: {
        auth: http.get(`${process.env.API_URL}/auth/me`, () =>
          HttpResponse.json(mockUserData)
        ),
        cart: http.get(`${process.env.API_URL}/cart`, () =>
          HttpResponse.json([])
        ),
        favorite: http.get(`${process.env.API_URL}/favorite`, () =>
          HttpResponse.json([])
        ),
        order: http.get(`${process.env.API_URL}/order`, () =>
          HttpResponse.json([])
        ),
        review: http.get(`${process.env.API_URL}/review`, () =>
          HttpResponse.json([])
        ),
      },
    },
  },
  decorators: [(story) => <AppProvider>{story()}</AppProvider>],
  loaders: [mswLoader],
};

export default preview;
