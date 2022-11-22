import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Catalog from '../../components/Catalog/Catalog';

import cl from './FavouritesPage.module.css';
import { clearFavourites, fetchFavourites } from './favouritesSlice';
import { getAccessToken, getUser } from '../../utils/auth';

const FavouritesPage = () => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [catalogIsOver, setCatalogIsOver] = useState(false);
  const dispatch = useDispatch();
  const {favouritesPages} = useSelector(state => state.favourites);
  const {favourites, favouritesLoadingStatus} = useSelector(state => state.favourites);

  const user = getUser();
  const accessToken = getAccessToken();

  useEffect(() => {
    return () => dispatch(clearFavourites());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user && accessToken) {
      const userId = user.id;
      dispatch(fetchFavourites(userId, accessToken, page, limit));
    }
    if (page === favouritesPages) {
      setCatalogIsOver(true);
    }
    // eslint-disable-next-line
  }, [page]);

  return (
    <div className={`container ${cl.catalogContainer}`}>
      <Catalog
        page={page}
        setPage={setPage}
        catalogIsOver={catalogIsOver}
        products={favourites}
        productsLoadingStatus={favouritesLoadingStatus}
      />
    </div>
  );
};

export default FavouritesPage;