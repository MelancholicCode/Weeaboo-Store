import { useSelector } from 'react-redux';
import Catalog from '../../components/Catalog/Catalog';

import cl from './FavouritesPage.module.css';

const FavouritesPage = () => {
  const {favourites, favouritesLoadingStatus} = useSelector(state => state.favourites);

  return (
    <div className={`container ${cl.catalogContainer}`}>
      <Catalog
        products={favourites}
        productsLoadingStatus={favouritesLoadingStatus}
        pageTitle='favourites'
      />
    </div>
  );
};

export default FavouritesPage;