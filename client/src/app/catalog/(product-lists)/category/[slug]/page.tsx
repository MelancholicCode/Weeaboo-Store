import { Metadata } from 'next';
import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/components/Placeholder/Placeholder';
import CategoryService from '@/services/category/category.service';
import { SEO_TITLE } from '@/shared/constants/seo';

interface MetadataProps {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const category = await CategoryService.getOne(params.slug);

  return {
    title: `${category.name} | ${SEO_TITLE}`,
    description: `List of products of the ${category.name} category.`,
  };
};

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
