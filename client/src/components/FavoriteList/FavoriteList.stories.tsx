import { Meta, StoryObj } from '@storybook/react';
import { FavoriteList } from './FavoriteList';
import { HttpResponse, http } from 'msw';
import { mockFavorites } from '@/shared/constants/mockData';

const meta: Meta<typeof FavoriteList> = {
  title: 'components/Favorite list',
  component: FavoriteList,
  parameters: {
    msw: {
      handlers: {
        favorite: http.get(`${process.env.API_URL}/favorite`, () =>
          HttpResponse.json(mockFavorites)
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof FavoriteList>;

export const Default: Story = {};
