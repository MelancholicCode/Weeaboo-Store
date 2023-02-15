import { useSelector } from 'react-redux';
import Catalog from '../../components/Catalog/Catalog';

import cl from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const {favorites, favoritesLoadingStatus} = useSelector(state => state.favorites);

  if (!favorites.length) {
    return (
      <div className={`container ${cl.FavoritesPage}`}>
        <p className="emptyPage">Пока что нет избранных товаров</p>
      </div>
    )
  }

  return (
    <div className={`container ${cl.FavoritesPage}`}>
      <Catalog
        products={favorites}
        productsLoadingStatus={favoritesLoadingStatus}
        pageTitle='favorites'
      />
    </div>
  );
};

export default FavoritesPage;