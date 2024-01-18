import { Meta, StoryObj } from '@storybook/react';
import { AccountMenu } from './AccountMenu';
import { HttpResponse, http } from 'msw';

const meta: Meta<typeof AccountMenu> = {
  title: 'components/Account menu',
  component: AccountMenu,
  parameters: {
    msw: {
      handlers: {
        logout: http.get(`${process.env.API_URL}/auth/logout`, () =>
          HttpResponse.json()
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AccountMenu>;

export const Default: Story = {};
