import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/shared/components/Placeholder/Placeholder';

const CatalogPage = async () => {
  try {
    const products = await ProductService.getMany();

    return (
      <main className="page-container">
        <ProductList products={products} />
      </main>
    );
  } catch (error) {
    console.error(error);

    return (
      <main className="page-container">
        <Placeholder type="error">Something went wrong</Placeholder>
      </main>
    );
  }
};

export default CatalogPage;
