import { CatalogProductList } from '@/components/CatalogProductList/CatalogProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/shared/components/Placeholder/Placeholder';

const CatalogPage = async () => {
  try {
    const { products, totalCount } = await ProductService.getMany();

    return <CatalogProductList items={products} totalCount={totalCount} />;
  } catch (error) {
    console.error(error);

    return <Placeholder type="error">Something went wrong</Placeholder>;
  }
};

export default CatalogPage;
