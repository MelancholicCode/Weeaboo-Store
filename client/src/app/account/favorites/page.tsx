import { FavoriteList } from '@/components/FavoriteList/FavoriteList';
import styles from './page.module.scss';

const FavoritesPage = () => {
  return (
    <main className={`container ${styles.container}`}>
      <FavoriteList />
    </main>
  );
};

export default FavoritesPage;
