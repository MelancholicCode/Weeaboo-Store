import { Metadata } from 'next';
import { ProductList } from '@/components/ProductList/ProductList';
import ProductService from '@/services/product/product.service';
import { Placeholder } from '@/shared/components/Placeholder/Placeholder';
import CategoryService from '@/services/category/category.service';
import { SEO_TITLE } from '@/shared/constants/seo';

interface MetadataProps {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const category = await CategoryService.getOne(params.slug);
  const mainMetaData = {
    title: `${category.name} | ${SEO_TITLE}`,
    description: `List of products of the ${category.name} category.`,
  };

  return {
    ...mainMetaData,
    openGraph: mainMetaData,
  };
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  try {
    const { products } = await ProductService.getMany({
      categorySlug: params.slug,
    });

    return <ProductList products={products} />;
  } catch (error) {
    console.error(error);

    return <Placeholder type="error">Something went wrong</Placeholder>;
  }
};

export default CategoryPage;
