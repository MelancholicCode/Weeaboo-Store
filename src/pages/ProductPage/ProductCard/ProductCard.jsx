import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setModal } from '../../../components/Form/authSlice';
import { getAccessToken, getUser } from '../../../utils/auth';
import { addGood } from '../../Cart/cartSlice';

import cl from './ProductCard.module.css'

const ProductCard = ({product}) => {
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
    <div className={cl.productCard}>
      <div className={cl.productCardImage}>
        <img height="100%" width="100%" src={product.poster} alt="" />
      </div>
      <div className={cl.rightBlock}>
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
                onClick={checkAuth}
                className={cl.productBtn}
                >Купить
              </div>}
          <p className={cl.productBtn}>
            Закладки
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;