import { Metadata } from 'next';
import { FavoriteList } from '@/components/FavoriteList/FavoriteList';
import { SEO_TITLE } from '@/shared/constants/seo';

export const metadata: Metadata = {
  title: `Favorite products | ${SEO_TITLE}`,
  description: "The user's favorite products.",
};

const FavoritesPage = () => {
  return (
    <main className="page-container">
      <FavoriteList />
    </main>
  );
};

export default FavoritesPage;
