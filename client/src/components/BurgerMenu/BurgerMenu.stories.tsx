import { Meta, StoryObj } from '@storybook/react';
import { BurgerMenu } from './BurgerMenu';
import { routes } from '@/shared/constants/routes';

const meta: Meta<typeof BurgerMenu> = {
  title: 'components/Burger menu',
  component: BurgerMenu,
};

export default meta;

type Story = StoryObj<typeof BurgerMenu>;

export const Default: Story = {
  args: {
    navLinks: [
      {
        href: routes.publicRoutes.HOME,
        text: 'Home',
      },
      {
        href: routes.publicRoutes.CATALOG,
        text: 'Catalog',
      },
      {
        href: routes.publicRoutes.GALLERY,
        text: 'Gallery',
      },
    ],
  },
};
