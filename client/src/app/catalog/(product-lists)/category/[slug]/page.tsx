import { Metadata } from 'next';
import ProductService from '@/services/product/product.service';
import CategoryService from '@/services/category/category.service';
import { SEO_TITLE } from '@/shared/constants/seo';
import { CatalogProductList } from '@/components/CatalogProductList/CatalogProductList';
import { notFound } from 'next/navigation';

interface MetadataProps {
  params: { slug: string };
}

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const category = await CategoryService.getOne(params.slug);

  if (!category) {
    notFound();
  }

  return {
    title: `${category.name} | ${SEO_TITLE}`,
    description: `List of products of the ${category.name} category.`,
  };
};

const CategoryPage = async ({ params }: { params: { slug: string } }) => {
  const { products, totalCount } = await ProductService.getMany({
    categorySlug: params.slug,
  });

  return (
    <CatalogProductList
      items={products}
      totalCount={totalCount}
      categorySlug={params.slug}
    />
  );
};

export default CategoryPage;
