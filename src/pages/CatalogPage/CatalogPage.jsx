import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Catalog from '../../components/Catalog/Catalog';
import { clearCatalog, fetchProducts, setSearchQuery } from './catalogSlice';

import cl from './CatalogPage.module.css';

const CatalogPage = () => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [catalogIsOver, setCatalogIsOver] = useState(false);
  const dispatch = useDispatch();
  const {catalogPages} = useSelector(state => state.catalog);
  const {products, productsLoadingStatus, searchQuery} = useSelector(state => state.catalog);

  useEffect(() => {
    return () => {
      dispatch(clearCatalog());
      dispatch(setSearchQuery(''));
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!searchQuery.length) {
      dispatch(fetchProducts(page, limit));
    } else {
      setPage(1);
      dispatch(fetchProducts(page, limit, searchQuery))
    }
    // eslint-disable-next-line
  }, [page, searchQuery]);

  useEffect(() => {
    if (page === catalogPages) {
      setCatalogIsOver(true);
    } else if (page < catalogPages) {
      setCatalogIsOver(false);
    }
  }, [page, catalogPages]);

  return (
    <div className={`container ${cl.catalogContainer}`}>
      <Catalog
        page={page}
        setPage={setPage}
        catalogIsOver={catalogIsOver}
        products={products}
        productsLoadingStatus={productsLoadingStatus}
        pageTitle='catalog'
      />
    </div>
  );
};

export default CatalogPage;