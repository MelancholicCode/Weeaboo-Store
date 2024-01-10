import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/components/Placeholder/Placeholder';

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const products = await ProductService.getMany({
      categorySlug: params.slug,
    });

    return (
      <main className="page-container">
        <ProductList products={products} />
      </main>
    );
  } catch (error) {
    console.log(error);

    return (
      <main className="page-container">
        <Placeholder type="error">Something went wrong</Placeholder>
      </main>
    );
  }
};

export default CategoryPage;
