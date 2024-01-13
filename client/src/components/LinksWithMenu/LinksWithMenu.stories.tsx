import { Meta, StoryObj } from '@storybook/react';
import { LinksWithMenu } from './LinksWithMenu';
import { routes } from '@/shared/constants/routes';

const meta: Meta<typeof LinksWithMenu> = {
  title: 'components/Links with menu',
  component: LinksWithMenu,
};

export default meta;

type Story = StoryObj<typeof LinksWithMenu>;

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
