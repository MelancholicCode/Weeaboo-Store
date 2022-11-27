import { useSelector } from 'react-redux';
import Catalog from '../../components/Catalog/Catalog';

import cl from './FavouritesPage.module.css';

const FavouritesPage = () => {
  const {favourites, favouritesLoadingStatus} = useSelector(state => state.favourites);

  if (!favourites.length) {
    return (
      <div className={`container ${cl.FavouritesPage}`}>
        <p className="emptyPage">Пока что нет избранных товаров</p>
      </div>
    )
  }

  return (
    <div className={`container ${cl.FavouritesPage}`}>
      <Catalog
        products={favourites}
        productsLoadingStatus={favouritesLoadingStatus}
        pageTitle='favourites'
      />
    </div>
  );
};

export default FavouritesPage;