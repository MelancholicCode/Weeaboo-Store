import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Bookmark from '../../assets/img/svg/BookmarkIcon';
import Trash from '../../assets/img/svg/Trash';
import { changeCount, deleteGood } from '../../pages/Cart/cartSlice';
import { addFavorite, deleteFavorite } from '../../pages/FavoritesPage/favoritesSlice';

import cl from './CartItem.module.css';

const CartItem = ({good}) => {
  const dispatch = useDispatch();
  const {favorites} = useSelector(state => state.favorites);
  const {signedIn} = useSelector(state => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(false);
    favorites.forEach(item => {
      if (item.productId === good.productId) {
        setIsFavorite(true);
      }
    })
    // eslint-disable-next-line
  }, [favorites])

  const onDeleteGood = () => {
    dispatch(deleteGood(good.id));
  }

  const onChangeCount = (count) => {
    if (count >= 1 && count <= 30) {
      dispatch(changeCount(good.id, count));
    }
  }

  const onChangeFavorite = () => {
    if (signedIn) {
      if (isFavorite) {
        dispatch(deleteFavorite(good.productId));
      } else {
        dispatch(addFavorite(good.productId));
      }
    }
  }

  return (
    <li className={cl.cartListItem}>
      <Link
        className={cl.productCardImage}
        to={`/catalog/${good.slug}`}>
        <img height="100%" width="100%" src={process.env.REACT_APP_API_URL + good.img} alt="" />
      </Link>
      <div className={cl.productCardDescr}>
        <Link
          className="product-content"
          to={`/catalog/${good.slug}`}>
          <p className={cl.goodName}>{good.name}</p>
        </Link>
        <p className={cl.goodAuthor}>{good.author}</p>
      </div>
      <div className={cl.buyBlock}>
        <p className={cl.price}>
          {good.count * good.price} ₽
        </p>
        <div className={cl.leftButtons}>
          <div
            onClick={() => onChangeCount(good.count - 1)}
            className={cl.countButton}
          >
            -
          </div>
          <div className={cl.countButton}>{good.count}</div>
          <div
          onClick={() => onChangeCount(good.count + 1)}
            className={cl.countButton}
          >
            +
          </div>
        </div>
      </div>
      <div className={cl.productButtons}>
        <div
          onClick={onChangeFavorite}
          className={cl.productBtn}>
          <div className={cl.btnIcon}>
            <Bookmark
              color={isFavorite ? '#ff4c4c' : '#ddd'}/>
          </div>
          <p>Закладки</p>
        </div>
        <div
          onClick={onDeleteGood}
          className={cl.productBtn}>
          <div className={cl.btnIcon}>
            <Trash/>
          </div>
          <p>Удалить</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;