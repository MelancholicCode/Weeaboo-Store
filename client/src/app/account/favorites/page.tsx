import { Metadata } from 'next';
import { FavoriteList } from '@/components/FavoriteList/FavoriteList';
import { SEO_TITLE } from '@/shared/constants/seo';

const mainMetaData = {
  title: `Favorite products | ${SEO_TITLE}`,
  description: "The user's favorite products.",
};

export const metadata: Metadata = {
  ...mainMetaData,
  openGraph: mainMetaData,
};

const FavoritesPage = () => {
  return (
    <main className="page-container">
      <FavoriteList />
    </main>
  );
};

export default FavoritesPage;
