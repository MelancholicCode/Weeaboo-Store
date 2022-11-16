import Product from "../Product/Product";

import cl from './Catalog.module.css'

const Catalog = () => {

  return (
    <div className={`container ${cl.catalogContainer}`}>
      <ul className={cl.productsList}>
        <Product/>
        <Product/>
        <Product/>
      </ul>
      <div className={cl.loadNewBtn}>Загрузить еще...</div>
    </div>
  );
};

export default Catalog;