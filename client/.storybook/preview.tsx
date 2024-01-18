import type { Preview } from '@storybook/react';
import '@/styles/globals.scss';
import '@/styles/variables.scss';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { http, HttpResponse } from 'msw';
import {
  mockUser,
  mockCartItem,
  mockFavorite,
} from '@/shared/constants/mockData';
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
          HttpResponse.json(mockUser)
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
        createCartItem: http.post(
          `${process.env.API_URL}/cart/:productId`,
          ({ request }) => {
            const productId = request.url.split('/').slice(-1)[0];

            return !Number.isNaN(+productId)
              ? HttpResponse.json({
                  ...mockCartItem,
                  productId: +productId,
                  product: {
                    ...mockCartItem.product,
                    id: +productId,
                  },
                })
              : HttpResponse.error();
          }
        ),
        createFavorite: http.post(
          `${process.env.API_URL}/favorite/:productId`,
          ({ request }) => {
            const productId = request.url.split('/').slice(-1)[0];

            return !Number.isNaN(+productId)
              ? HttpResponse.json({
                  ...mockFavorite,
                  productId: +productId,
                  product: {
                    ...mockFavorite.product,
                    id: +productId,
                  },
                })
              : HttpResponse.error();
          }
        ),
        removeFavorite: http.delete(
          `${process.env.API_URL}/favorite/:id`,
          ({ request }) => {
            const param = request.url.split('/').slice(-1)[0];
            return !Number.isNaN(+param)
              ? HttpResponse.json(+param)
              : HttpResponse.error();
          }
        ),
      },
    },
  },
  decorators: [(story) => <AppProvider>{story()}</AppProvider>],
  loaders: [mswLoader],
};

export default preview;
