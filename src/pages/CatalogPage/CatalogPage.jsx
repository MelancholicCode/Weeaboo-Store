import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Catalog from '../../components/Catalog/Catalog';
import { clearCatalog, fetchProducts } from './catalogSlice';

import cl from './CatalogPage.module.css';

const CatalogPage = () => {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [catalogIsOver, setCatalogIsOver] = useState(false);
  const dispatch = useDispatch();
  const {catalogPages} = useSelector(state => state.catalog);
  const {products, productsLoadingStatus} = useSelector(state => state.catalog);

  useEffect(() => {
    return () => dispatch(clearCatalog());
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(fetchProducts(page, limit));
    if (page === catalogPages) {
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
        products={products}
        productsLoadingStatus={productsLoadingStatus}
        pageTitle='catalog'
      />
    </div>
  );
};

export default CatalogPage;