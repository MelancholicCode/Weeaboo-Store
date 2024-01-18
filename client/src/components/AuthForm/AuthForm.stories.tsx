import { Meta, StoryObj } from '@storybook/react';
import { AuthForm } from './AuthForm';
import { HttpResponse, http } from 'msw';
import { mockUser } from '@/shared/constants/mockData';

const meta: Meta<typeof AuthForm> = {
  title: 'components/Auth form',
  component: AuthForm,
  parameters: {
    msw: {
      handlers: {
        login: http.post(`${process.env.API_URL}/auth/login`, () =>
          HttpResponse.json(mockUser)
        ),
        registration: http.post(
          `${process.env.API_URL}/auth/registration`,
          () => HttpResponse.json(mockUser)
        ),
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof AuthForm>;

export const Default: Story = {};
