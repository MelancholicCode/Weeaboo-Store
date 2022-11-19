import axios from "axios";
import Spinner from '../../assets/spinner/Spinner';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product/Product";
import { clearCatalog, fetchProducts } from "./catalogSlice";
import { calcPages } from "../../utils/pages";

import cl from './Catalog.module.css'

const Catalog = () => {
  const limit = 20;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [catalogIsOver, setCatalogIsOver] = useState(false);
  const {products, productsLoadingStatus} = useSelector(state => state.catalog);

  useEffect(() => {
    axios.get(`http://localhost:3001/444/products?_page=${page}&_limit=${limit}`)
      .then(res => {
        setTotalPages(() => calcPages(res, limit))
      })

    return () => dispatch(clearCatalog());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(fetchProducts(page, limit));
    if (page === totalPages) {
      setCatalogIsOver(true);
    }
    // eslint-disable-next-line
  }, [page]);

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return <p>Товаров нет</p>
    }

    console.log(arr)

    return arr.map(item => (
      <Product
        key={item.id}
        product={item}
      />
    ));
  }

  if (!products.length && productsLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (productsLoadingStatus === 'error') {
    return <p>Что-то пошло не так</p>
  }

  return (
    <div className={`container ${cl.catalogContainer}`}>
      <ul className={cl.productsList}>
        {renderItems(products)}
      </ul>
      {products.length && productsLoadingStatus === 'loading'
        && <Spinner/>}
      {!catalogIsOver &&
        <div onClick={() => setPage(page + 1)} className={cl.loadNewBtn}>Загрузить еще...</div>}
    </div>
  );
};

export default Catalog;