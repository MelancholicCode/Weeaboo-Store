import ProductCard from "./ProductCard/ProductCard";

import cl from './ProductPage.module.css'

const ProductPage = () => {
  return (
    <div className={`container ${cl.ProductPage}`}>
      <ProductCard/>
      <h2 className={cl.productTitle}>Аннотация</h2>
      <p className={cl.productDescr}>Следует отметить, что постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке модели развития. Прежде всего понимание сущности ресурсосберегающих технологий требует от нас анализа дальнейших направлений развития. Равным образом курс на социально-ориентированный национальный проект обеспечивает широкому кругу специалистов существующий финансовых и административных условий.</p>
    </div>
  );
};

export default ProductPage;