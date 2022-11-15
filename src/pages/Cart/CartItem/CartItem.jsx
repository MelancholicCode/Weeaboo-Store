import { Link } from 'react-router-dom';

import Bookmark from '../../../assets/img/svg/Bookmark';
import Trash from '../../../assets/img/svg/Trash';

import cl from './CartItem.module.css';

const CartItem = () => {

  return (
    <li className={cl.cartListItem}>
      <div className={cl.productCard}>
        <Link
          className="product-content"
          // Добавить слаг
          to={`/catalog/product-page`}>
          <div className={cl.productCardImage}>
            <img height="100%" width="100%" src={"https://img-gorod.ru/29/426/2942674_detail.jpg"} alt="" />
          </div>
        </Link>
        <div className={cl.productCardDescr}>
          <Link
            className="product-content"
            // Добавить слаг
            to={`/catalog/product-page`}>  
            <p className={cl.goodName}>Имя товара</p>
          </Link>
          <p className={cl.goodAuthor}>Автор</p>
        </div>
      </div>
      <div className={cl.productButtons}>
        <div className={cl.leftButtons}>
          <div
            className={cl.countButton}
          >
            -
          </div>
          <div className={cl.countButton}>1</div>
          <div
            className={cl.countButton}
          >
            +
          </div>
        </div>
        <p className={cl.price}>
          1337 ₽
        </p>
        <div className={cl.rightButtons}>
          <div
            className={cl.favourite}>
            <div className={cl.favouriteIcon}>
              <Bookmark
                color={'#ff4c4c'}/>
            </div>
            <p>Закладки</p>
          </div>
          <div
            className={cl.delete}>
            <div className={cl.deleteIcon}>
              <Trash/>
            </div>
            <p>Удалить</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;