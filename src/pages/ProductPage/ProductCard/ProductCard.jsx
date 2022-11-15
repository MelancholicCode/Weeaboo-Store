import cl from './ProductCard.module.css'

const ProductCard = () => {
  return (
    <div className={cl.productCard}>
      <div className={cl.productCardImage}>
        <img height="100%" width="100%" src={"https://img-gorod.ru/29/426/2942674_detail.jpg"} alt="" />
      </div>
      <div className={cl.rightBlock}>
        <div className={cl.productCardDescr}>
          <h1 className={cl.productName}>Имя товара</h1>
          <p className={cl.productAuthor}>Автор</p>
        </div>
        <div className={cl.purchaseBlock}>
          <p className={cl.productPrice}>1337 ₽</p>
          {/* <Link to='/cart'>
            <div className={`${cl.productBtn} ${cl.activeBtn}`}>
              В корзину
            </div>
          </Link> */}
          <div
            className={cl.productBtn}
            >Купить
          </div>
          <p className={cl.productBtn}>
            Закладки
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;