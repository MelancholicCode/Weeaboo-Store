import { FC } from 'react';
import { Metadata } from 'next';
import ProductService from '@/services/product/product.service';
import styles from './page.module.scss';
import Image from 'next/image';
import { Typography } from '@/shared/components/Typography/Typography';
import { BuyButton } from '@/shared/components/BuyButton/BuyButton';
import { FavoriteButton } from '@/shared/components/FavoriteButton/FavoriteButton';
import { StarIcon } from '@/assets/icons/StarIcon/StarIcon';
import { ReviewForm } from '@/components/ReviewForm/ReviewForm';
import { ReviewList } from '@/components/ReviewList/ReviewList';
import { Placeholder } from '@/components/Placeholder/Placeholder';
import { SEO_TITLE } from '@/shared/constants/seo';

interface MetadataProps {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({
  params,
}: MetadataProps): Promise<Metadata> => {
  const product = await ProductService.getOne(params.slug);

  return {
    title: `${product.title} | ${SEO_TITLE}`,
    description: product.description,
    openGraph: {
      images: product.img,
    },
  };
};

interface ProductPageProps {
  params: {
    slug: string;
  };
}

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  try {
    const product = await ProductService.getOne(params.slug);

    return (
      <main className={`container ${styles.container}`}>
        <div className={styles.card}>
          <div className={styles.image_wrapper}>
            <Image
              src={product.img}
              alt={product.title}
              sizes="100vw"
              width={0}
              height={0}
              className={styles.image}
            />
          </div>

          <div className={styles.info}>
            <div className={styles.rating}>
              <StarIcon className={styles.rating_icon} />
              <Typography variant="body-2" className={styles.rating_rate}>
                {product.rate}
              </Typography>
            </div>
            <Typography variant="body-1">{product.title}</Typography>
            <Typography variant="body-2">
              Price: {Number(product.price).toFixed(2)}$
            </Typography>
            <div className={styles.buttons}>
              <FavoriteButton
                className={styles.favorite_button}
                productId={product.id}
              />
              <BuyButton className={styles.buy_button} productId={product.id} />
            </div>
          </div>
        </div>

        <div className={styles.description}>
          <Typography type="h2" variant="title-2">
            Description:
          </Typography>
          <Typography variant="body-1">{product.description}</Typography>
        </div>

        <div className={styles.reviews}>
          <ReviewForm productId={product.id} />
          <ReviewList productId={product.id} />
        </div>
      </main>
    );
  } catch (error) {
    console.error(error);

    return (
      <main className={`container ${styles.container}`}>
        <Placeholder type="error">Something went wrong</Placeholder>
      </main>
    );
  }
};

export default ProductPage;
