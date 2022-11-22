import Spinner from '../../assets/spinner/Spinner';
import Product from "../Product/Product";

import cl from './Catalog.module.css'

const Catalog = ({setPage, catalogIsOver, products, productsLoadingStatus, page}) => {

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return <p>Товаров нет</p>
    }

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
    <>
      <ul className={cl.productsList}>
        {renderItems(products)}
      </ul>
      {products.length && productsLoadingStatus === 'loading'
        && <Spinner/>}
      {!catalogIsOver &&
        <div onClick={() => setPage(page + 1)} className={cl.loadNewBtn}>Загрузить еще...</div>}
    </>
  );
};

export default Catalog;