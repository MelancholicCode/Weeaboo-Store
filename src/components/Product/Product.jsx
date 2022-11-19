import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Bookmark from "../../assets/img/svg/Bookmark";
import { stringTrim } from "../../utils/string";
import { setModal } from "../Form/authSlice";

import cl from './Product.module.css'

const Product = ({product}) => {
  const {signedIn} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const checkAuth = () => {
    // TODO Заменить конструкцию на thunk
    if (signedIn) {
      const accessToken = localStorage.getItem('accessToken');
      const userId = JSON.parse(localStorage.getItem('user')).id;
      
      axios.post('http://localhost:3001/600/cart', {...product, userId, count: 1}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(() => console.log('Добавлен товар'))
        .catch((err) => {
          console.log(err)
          switch (err.request.status) {
            case 500:
              console.log('Товар уже добавлен')
              break
            case 401:
              console.log('Ошибка авторизации')
              break
            default:
              console.log('Что-то пошло не так')
          }
        });
      return
    }
    dispatch(setModal(true));
  }

  return (
    <li className={cl.productItem}>
      <Link
        className={cl.productContent}
        // Добавить слаг
        to={`/catalog/product-page`}>
        <div className={cl.productPoster}>
          <img height='100%' src={product.poster} alt=""/>
        </div>
        <p className={cl.productName}>{stringTrim(product.title, 30)}</p>
      </Link>
      <p className={cl.price}>{product.price} ₽</p>
      <div className={cl.btns}>
        {/* <Link to='/cart'>
          <div className='buy-btn good-btn'>
            В корзину
          </div>
        </Link> */}
        <div
          onClick={checkAuth}
          className={cl.buyBtn}
          >Купить
        </div>
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