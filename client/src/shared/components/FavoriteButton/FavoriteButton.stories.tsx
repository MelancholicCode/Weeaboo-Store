import { Meta, StoryObj } from '@storybook/react';
import { FavoriteButton } from './FavoriteButton';
import { http, HttpResponse } from 'msw';
import { mockFavorite, mockFavoritesData } from '@/shared/constants/mockData';

const meta: Meta<typeof FavoriteButton> = {
  title: 'shared/Favorite button',
  component: FavoriteButton,
  decorators: [
    (story) => (
      <span style={{ width: 100, height: 100, display: 'block' }}>
        {story()}
      </span>
    ),
  ],
  parameters: {
    msw: {
      handlers: {
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
};

export default meta;

type Story = StoryObj<typeof FavoriteButton>;

export const Default: Story = {
  args: {
    productId: 2,
  },
  parameters: {
    handlers: {
      favorite: http.get(`${process.env.API_URL}/favorite`, () =>
        HttpResponse.json([])
      ),
    },
  },
};

export const Is_favorite: Story = {
  args: {
    productId: 1,
  },
  parameters: {
    msw: {
      handlers: {
        favorite: http.get(`${process.env.API_URL}/favorite`, () =>
          HttpResponse.json(mockFavoritesData)
        ),
      },
    },
  },
};
