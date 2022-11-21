import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Bookmark from '../../assets/img/svg/Bookmark';
import Trash from '../../assets/img/svg/Trash';
import { changeCount, deleteGood } from '../../pages/Cart/cartSlice';
import { getAccessToken } from '../../utils/auth';

import cl from './CartItem.module.css';

const CartItem = ({good}) => {
  const dispatch = useDispatch()
  const [goodCount, setGoodCount] = useState(good.count);

  console.log(good)

  const onDeleteGood = () => {
    const accessToken = getAccessToken();

    console.log(good);

    if (accessToken) {
      dispatch(deleteGood(good.id, accessToken));
    }
  }

  const onChangeCount = (count) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && count >= 1) {
      setGoodCount(count);
      dispatch(changeCount(good.id, count, accessToken));
    }

  }

  return (
    <li className={cl.cartListItem}>
      <div className={cl.productCard}>
        <Link
          className="product-content"
          to={`/catalog/${good.slug}`}>
          <div className={cl.productCardImage}>
            <img height="100%" width="100%" src={good.poster} alt="" />
          </div>
        </Link>
        <div className={cl.productCardDescr}>
          <Link
            className="product-content"
            to={`/catalog/${good.slug}`}>
            <p className={cl.goodName}>{good.title}</p>
          </Link>
          <p className={cl.goodAuthor}>{good.author}</p>
        </div>
      </div>
      <div className={cl.productButtons}>
        <div className={cl.leftButtons}>
          <div
            onClick={() => onChangeCount(goodCount - 1)}
            className={cl.countButton}
          >
            -
          </div>
          <div className={cl.countButton}>{goodCount}</div>
          <div
          onClick={() => onChangeCount(goodCount + 1)}
            className={cl.countButton}
          >
            +
          </div>
        </div>
        <p className={cl.price}>
          {good.price} ₽
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
            onClick={onDeleteGood}
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