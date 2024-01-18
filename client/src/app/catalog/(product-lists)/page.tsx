import { CatalogProductList } from '@/components/CatalogProductList/CatalogProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/shared/components/Placeholder/Placeholder';

const CatalogPage = async () => {
  const { products, totalCount } = await ProductService.getMany();

  return <CatalogProductList items={products} totalCount={totalCount} />;
};

export default CatalogPage;
