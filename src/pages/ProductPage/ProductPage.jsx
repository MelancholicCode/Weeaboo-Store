import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../assets/spinner/Spinner";
import ProductCard from "./ProductCard/ProductCard";

import cl from './ProductPage.module.css'

const ProductPage = () => {
  const {slug} = useParams();
  const [product, setProduct] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState('idle');

  console.log(slug)

  useEffect(() => {
    setLoadingStatus('loading');
    axios.get(`http://localhost:3001/444/products?slug=${slug}`)
      .then(({data}) => {
        setLoadingStatus('idle');
        setProduct(data[0]);
      })
      .catch(setLoadingStatus('error'));
  }, [slug])

  if (!product) {
    return <p>Нет информации о товаре</p>
  }

  if (loadingStatus === 'loading') {
    return <Spinner/>;
  } else if (loadingStatus === 'error') {
    return <p>Не удалось получить информацию о товаре</p>;
  }

  return (
    <div className={`container ${cl.ProductPage}`}>
      <ProductCard
        product={product}/>
      <h2 className={cl.productTitle}>Аннотация</h2>
      <p className={cl.productDescr}>{product.description}</p>
    </div>
  );
};

export default ProductPage;