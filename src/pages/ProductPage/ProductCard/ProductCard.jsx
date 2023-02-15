import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModal } from '../../../components/Form/authSlice';
import { addGood } from '../../Cart/cartSlice';
import { addFavorite, deleteFavorite } from '../../FavoritesPage/favoritesSlice';

import cl from './ProductCard.module.css'

const ProductCard = ({product}) => {
  const dispatch = useDispatch();
  const [isGood, setIsGood] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {signedIn} = useSelector(state => state.auth);
  const {goods} = useSelector(state => state.cart);
  const {favorites} = useSelector(state => state.favorites);

  useEffect(() => {
    setIsFavorite(false);
    goods.forEach(item => {
      if (item.productId === product.id) {
        setIsGood(true);
      }
    })
    favorites.forEach(item => {
      if (item.productId === product.id) {
        setIsFavorite(true);
      }
    })
    // eslint-disable-next-line
  }, [goods, favorites]);

  useEffect(() => {
    if (!signedIn) {
      setIsGood(false);
    }
  }, [signedIn])

  const onAddProduct = (place) => {
    if (signedIn) {
      if (place === 'cart') {
        dispatch(addGood(product.id));
      } else if (place === 'favorites') {
        if (isFavorite) {
          dispatch(deleteFavorite(product.id));
        } else {
          dispatch(addFavorite(product.id));
        }
      }
      return
    }
    dispatch(setModal(true));
  }

  return (
    <div className={cl.productCard}>
      <div className={cl.productCardImage}>
        <img height="100%" width="100%" src={process.env.REACT_APP_API_URL + product.img} alt="" />
      </div>
      <div className={cl.productRightBlock}>
        <div className={cl.productCardDescr}>
          <h1 className={cl.productName}>{product.name}</h1>
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
          {isFavorite
            ? <div
                onClick={() => onAddProduct('favorites')}
                className={`${cl.productBtn} ${cl.activeBtn}`}>
                В закладках
              </div>
            : <div
                onClick={() => onAddProduct('favorites')}
                className={cl.productBtn}>
                Закладки
              </div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;