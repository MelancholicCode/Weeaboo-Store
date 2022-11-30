import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BookmarkIcon from "../../assets/img/svg/BookmarkIcon";
import { addGood } from "../../pages/Cart/cartSlice";
import { addFavourite, deleteFavourite } from "../../pages/FavouritesPage/favouritesSlice";
import { getAccessToken, getUser } from "../../utils/auth";
import { stringTrim } from "../../utils/string";
import { setModal } from "../Form/authSlice";

import cl from './Product.module.css'

const Product = ({product, pageTitle}) => {
  const dispatch = useDispatch();
  const [isGood, setIsGood] = useState(false);
  const [currentFavourite, setCurrentFavourite] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const {signedIn} = useSelector(state => state.auth);
  const {goods} = useSelector(state => state.cart);
  const {favourites} = useSelector(state => state.favourites);

  useEffect(() => {
    setIsFavourite(false);
    if (pageTitle === 'catalog') {
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
    } else if (pageTitle === 'favourites') {
      goods.forEach(item => {
        if (item.productId === product.productId) {
          setIsGood(true);
        }
      })
      favourites.forEach(item => {
        if (item.id === product.id) {
          setIsFavourite(true);
          setCurrentFavourite(item);
        }
      })
    }
    // eslint-disable-next-line
  }, [goods, favourites]);

  useEffect(() => {
    if (!signedIn) {
      setIsGood(false);
      setIsFavourite(false);
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
    <li className={cl.productItem}>
      <Link
        to={`/catalog/${product.slug}`}
        className={cl.productPoster}>
        <img height='100%' width='100%' src={product.poster} alt=""/>
      </Link>
      <Link
        to={`/catalog/${product.slug}`}
        className={cl.productName}>
          {stringTrim(product.title, 30)}
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
          onClick={() => onAddProduct('favourites')}
          className={cl.favourite}
          >
          <BookmarkIcon
            color={isFavourite ? '#ff4c4c' : '#ddd'}/>
        </div>
      </div>
    </li>
  );
};

export default Product;