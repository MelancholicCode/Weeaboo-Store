import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Bookmark from "../../assets/img/svg/Bookmark";
import { addGood } from "../../pages/Cart/cartSlice";
import { getAccessToken, getUser } from "../../utils/auth";
import { stringTrim } from "../../utils/string";
import { setModal } from "../Form/authSlice";

import cl from './Product.module.css'

const Product = ({product}) => {
  const [isGood, setIsGood] = useState(false);
  const {signedIn} = useSelector(state => state.auth);
  const {goods} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    goods.forEach(item => {
      if (item.productId === product.id) {
        setIsGood(true);
      }
    })
    // eslint-disable-next-line
  }, [goods]);

  useEffect(() => {
    if (!signedIn) {
      setIsGood(false);
    }
  }, [signedIn])

  const checkAuth = () => {
    if (signedIn) {
      const accessToken = getAccessToken();
      const userId = getUser().id;

      const good = {
        productId: product.id,
        title: product.title,
        author: product.author,
        poster: product.poster,
        price: product.price,
        slug: product.slug,
        count: 1
      }
      
      dispatch(addGood(good, userId, accessToken));

      return
    }
    dispatch(setModal(true));
  }

  return (
    <li className={cl.productItem}>
      <Link
        className={cl.productContent}
        to={`/catalog/${product.slug}`}>
        <div className={cl.productPoster}>
          <img height='100%' src={product.poster} alt=""/>
        </div>
        <p className={cl.productName}>{stringTrim(product.title, 30)}</p>
      </Link>
      <p className={cl.price}>{product.price} ₽</p>
      <div className={cl.btns}>
        {isGood
          ? <Link className={`${cl.buyBtn} ${cl.goodBtn}`} to='/cart'>
              В корзину
            </Link>
          : <div
              onClick={checkAuth}
              className={cl.buyBtn}
              >Купить
            </div>}
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