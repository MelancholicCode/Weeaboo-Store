import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModal } from '../../../components/Form/authSlice';
import { getAccessToken, getUser } from '../../../utils/auth';
import { addGood } from '../../Cart/cartSlice';
import { addFavourite, deleteFavourite } from '../../FavouritesPage/favouritesSlice';

import cl from './ProductCard.module.css'

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const [isGood, setIsGood] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [currentFavourite, setCurrentFavourite] = useState(false);
  const {signedIn} = useSelector(state => state.auth);
  const {goods} = useSelector(state => state.cart);
  const {favourites} = useSelector(state => state.favourites);

  useEffect(() => {
    setIsFavourite(false);
    goods.forEach(item => {
      if (item.productId === product.id) {
        setIsGood(true);
      }
    })
    favourites.forEach(item => {
      if (item.productId === product.id) {
        setIsFavourite(true);
        setCurrentFavourite(item);
      }
    })
    // eslint-disable-next-line
  }, [goods, favourites]);

  useEffect(() => {
    if (!signedIn) {
      setIsGood(false);
    }
  }, [signedIn])

  const onAddProduct = (place) => {
    if (signedIn) {
      const accessToken = getAccessToken();
      const userId = getUser().id;

      const item = {
        productId: product.id,
        title: product.title,
        poster: product.poster,
        price: product.price,
        slug: product.slug,
      }

      if (place === 'cart') {
        item.author = product.author;
        item.count = 1;
        dispatch(addGood(item, userId, accessToken));
      } else if (place === 'favourites') {
        if (isFavourite) {
          dispatch(deleteFavourite(currentFavourite.id, accessToken));
        } else {
          dispatch(addFavourite(item, userId, accessToken));
        }
      }
      return
    }
    dispatch(setModal(true));
  }

  return (
    <div className={cl.productCard}>
      <div className={cl.productCardImage}>
        <img height="100%" width="100%" src={product.poster} alt="" />
      </div>
      <div className={cl.productCardDescr}>
        <h1 className={cl.productName}>{product.title}</h1>
        <p className={cl.productAuthor}>{product.author}</p>
      </div>
      <div className={cl.purchaseBlock}>
        <p className={cl.productPrice}>{product.price} ₽</p>
        {isGood
          ? <Link to='/cart' className={`${cl.productBtn} ${cl.activeBtn}`}>
              В корзину
            </Link>
          : <div
              onClick={() => onAddProduct('cart')}
              className={cl.productBtn}
              >Купить
            </div>}
        {isFavourite
          ? <div
              onClick={() => onAddProduct('favourites')}
              className={`${cl.productBtn} ${cl.activeBtn}`}>
              В закладках
            </div>
          : <div
              onClick={() => onAddProduct('favourites')}
              className={cl.productBtn}>
              Закладки
            </div>}
      </div>
    </div>
  );
};

export default ProductCard;