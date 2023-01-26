import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Bookmark from '../../assets/img/svg/BookmarkIcon';
import Trash from '../../assets/img/svg/Trash';
import { changeCount, deleteGood } from '../../pages/Cart/cartSlice';
import { addFavourite, deleteFavourite } from '../../pages/FavouritesPage/favouritesSlice';
import { getAccessToken, getUser } from '../../utils/auth';

import cl from './CartItem.module.css';

const CartItem = ({good}) => {
  const dispatch = useDispatch();
  const {favourites} = useSelector(state => state.favourites);
  const {signedIn} = useSelector(state => state.auth);
  const [isFavourite, setIsFavourite] = useState(false);
  const [currentFavourite, setCurrentFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(false);
    favourites.forEach(item => {
      if (item.productId === good.productId) {
        setIsFavourite(true);
        setCurrentFavourite(item);
      }
    })
    // eslint-disable-next-line
  }, [favourites])

  const onDeleteGood = () => {
    const accessToken = getAccessToken();

    if (accessToken) {
      dispatch(deleteGood(good.id, accessToken));
    }
  }

  const onChangeCount = (count) => {
    const accessToken = getAccessToken();

    if (accessToken && count >= 1 && count <= 30) {
      dispatch(changeCount(good.id, count, accessToken));
    }
  }

  const onChangeFavourite = () => {
    if (signedIn) {
      const accessToken = getAccessToken();
      const userId = getUser().id;

      const item = {
        productId: good.productId,
        title: good.title,
        poster: good.poster,
        price: good.price,
        slug: good.slug,
      }
      if (isFavourite) {
        dispatch(deleteFavourite(currentFavourite.id, accessToken));
      } else {
        dispatch(addFavourite(item, userId, accessToken));
      }
    }
  }

  return (
    <li className={cl.cartListItem}>
      <Link
        className={cl.productCardImage}
        to={`/catalog/${good.slug}`}>
        <img height="100%" width="100%" src={good.poster} alt="" />
      </Link>
      <div className={cl.productCardDescr}>
        <Link
          className="product-content"
          to={`/catalog/${good.slug}`}>
          <p className={cl.goodName}>{good.title}</p>
        </Link>
        <p className={cl.goodAuthor}>{good.author}</p>
      </div>
      <div className={cl.buyBlock}>
        <p className={cl.price}>
          {good.price} ₽
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
          onClick={onChangeFavourite}
          className={cl.productBtn}>
          <div className={cl.btnIcon}>
            <Bookmark
              color={isFavourite ? '#ff4c4c' : '#ddd'}/>
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