import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BookmarkIcon from "../../assets/img/svg/BookmarkIcon";
import { addGood } from "../../pages/Cart/cartSlice";
import { addFavorite, deleteFavorite } from "../../pages/FavoritesPage/favoritesSlice";
import { stringTrim } from "../../utils/string";
import { setModal } from "../Form/authSlice";

import cl from './Product.module.css'

const Product = ({product, pageTitle}) => {
  const dispatch = useDispatch();
  const [isGood, setIsGood] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const {signedIn} = useSelector(state => state.auth);
  const {goods} = useSelector(state => state.cart);
  const {favorites} = useSelector(state => state.favorites);

  const productId = pageTitle === 'catalog' ? product.id : product.productId;

  useEffect(() => {
    setIsFavorite(false);
    goods.forEach(item => {
      if (item.productId === productId) {
        setIsGood(true);
      }
    })
    favorites.forEach(item => {
      if (item.productId === productId) {
        setIsFavorite(true);
      }
    });
    // eslint-disable-next-line
  }, [goods, favorites]);

  useEffect(() => {
    if (!signedIn) {
      setIsGood(false);
      setIsFavorite(false);
    }
  }, [signedIn])

  const onAddProduct = (place) => {
    if (signedIn) {
      if (place === 'cart') {
        dispatch(addGood(productId));
      } else if (place === 'favorites') {
        if (isFavorite) {
          dispatch(deleteFavorite(productId));
        } else {
          dispatch(addFavorite(productId));
        }
      }
      return
    }
    dispatch(setModal(true));
  }

  return (
    <li className={cl.productItem}>
      <Link
        to={`/catalog/${product.slug}`}
        className={cl.productPoster}>
        <img height='100%' width='100%' src={process.env.REACT_APP_API_URL + product.img} alt=""/>
      </Link>
      <Link
        to={`/catalog/${product.slug}`}
        className={cl.productName}>
          {stringTrim(product.name, 30)}
      </Link>
      <p className={cl.price}>{product.price} ₽</p>
      <div className={cl.btns}>
        {isGood
          ? <Link className={`${cl.buyBtn} ${cl.goodBtn}`} to='/cart'>
              В корзину
            </Link>
          : <div
              onClick={() => onAddProduct('cart')}
              className={cl.buyBtn}
              >Купить
            </div>}
        <div
          onClick={() => onAddProduct('favorites')}
          className={cl.favorite}
          >
          <BookmarkIcon
            color={isFavorite ? '#ff4c4c' : '#ddd'}/>
        </div>
      </div>
    </li>
  );
};

export default Product;