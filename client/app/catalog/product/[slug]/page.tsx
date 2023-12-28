import ProductService from '@/services/product/product.service';
import styles from './page.module.scss';
import Image from 'next/image';
import { Typography } from '@/shared/components/Typography/Typography';
import { Button } from '@/shared/components/Button/Button';

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const product = await ProductService.getOne(params.slug);

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.card}>
        <div className={styles.image_wrapper}>
          <Image
            src={product.img}
            alt=""
            sizes="100vw"
            width={0}
            height={0}
            className={styles.image}
          />
        </div>
        <div className={styles.info}>
          <Typography variant="body-1">{product.title}</Typography>
          <Typography variant="body-2">Price: {product.price}$</Typography>
          <Button className={styles.button}>Buy</Button>
        </div>
      </div>
      <div className={styles.description}>
        <Typography type="h2" variant="title-2">
          Description:
        </Typography>
        <Typography variant="body-1">{product.description}</Typography>
      </div>
    </div>
  );
};

export default ProductPage;
