import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/shared/components/Placeholder/Placeholder';

const CatalogPage = async () => {
  try {
    const { products } = await ProductService.getMany();

    return <ProductList products={products} />;
  } catch (error) {
    console.error(error);

    return <Placeholder type="error">Something went wrong</Placeholder>;
  }
};

export default CatalogPage;
