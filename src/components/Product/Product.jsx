import { Link } from "react-router-dom";

import Bookmark from "../../assets/img/svg/Bookmark";

import cl from './Product.module.css'

const Product = () => {

  return (
    <li className={cl.productItem}>
      <Link
        className={cl.productContent}
        // Добавить слаг
        to={`/catalog/product-page`}>
        <div className={cl.productPoster}>
          <img height='100%' src={"https://img-gorod.ru/29/426/2942674_detail.jpg"} alt=""/>
        </div>
        <p className={cl.productName}>Имя товара</p>
      </Link>
      <p className={cl.price}>1337 ₽</p>
      <div className={cl.btns}>
        {/* <Link to='/cart'>
          <div className='buy-btn good-btn'>
            В корзину
          </div>
        </Link> */}
        <div
          className={cl.buyBtn}
          >Купить
        </div>
        <div
          className={cl.favourite}
          >
          <Bookmark
            color={'#ff4c4c'}/>
        </div>
      </div>
    </li>
  );
};

export default Product;