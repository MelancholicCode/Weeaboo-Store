import { Typography } from '@/shared/components/Typography/Typography';
import styles from './page.module.scss';
import Image from 'next/image';
import { images } from '@/shared/constants/images';

const HomePage = () => {
  return (
    <main className="page-container">
      <div className={styles.hero_wrapper}>
        <div className={styles.hero_description}>
          <Typography variant="title-1" type="h1">
            Welcome to the Weeaboo Store
          </Typography>
          <Typography className={styles.hero_text} variant="body-2">
            Welcome to Weeaboo Store, your ultimate destination for authentic
            Japanese products. Immerse yourself in the vibrant world of Japanese
            culture with our wide range of anime merchandise, traditional
            clothing, delicious snacks, stylish fashion, home decor, and more.
            Discover the magic of Japan and indulge your passion for all things
            Japanese with Weeaboo Store. Start shopping today and bring a touch
            of Japan into your life!
          </Typography>
        </div>

        <Image
          src={images.hero}
          sizes="100vw"
          width={0}
          height={0}
          className={styles.hero_image}
          alt="Hero image"
        />
      </div>
    </main>
  );
};

export default HomePage;
