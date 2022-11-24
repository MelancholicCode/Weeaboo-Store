import Spinner from '../../assets/img/spinner/Spinner';
import Product from "../Product/Product";

import cl from './Catalog.module.css'

const Catalog = ({setPage, catalogIsOver, products, productsLoadingStatus, page, pageTitle}) => {

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return <p>Товаров нет</p>
    }

    return arr.map(item => (
      <Product
        key={item.id}
        product={item}
        pageTitle={pageTitle}
      />
    ));
  }

  if (!products.length && productsLoadingStatus === 'loading') {
    return <Spinner/>
  } else if (productsLoadingStatus === 'error') {
    return <p>Что-то пошло не так</p>
  }

  return (
    <>
      <ul className={cl.productsList}>
        {renderItems(products)}
      </ul>
      {products.length && productsLoadingStatus === 'loading'
        ? <Spinner/>
        : null}
      {!catalogIsOver && products.length && pageTitle === 'catalog'
        ? <div onClick={() => setPage(page + 1)} className={cl.loadNewBtn}>Загрузить еще...</div>
        : null}
    </>
  );
};

export default Catalog;