import { ProductList } from '@/components/ProductList/ProductList';
// import { getProducts } from '@/utils/api/product/product';
import React from 'react';

const Catalog = async () => {
  // const products = await getProducts();
  const products = [
    {
      id: 1,
      categoryId: 1,
      img: 'https://image.dokodemo.world/catalog-skus/63770/f260c151d4539c5b6e0729725162e7d2.jpg?d=450x0',
      title: 'Super Mario Action Figure',
      description: 'This is really awesome!',
      price: 15,
      slug: 'super-mario-figure',
    },
    {
      id: 2,
      categoryId: 1,
      img: 'https://image.dokodemo.world/catalog-skus/219172/07c07ba8eac6b1bbcf49f441c37954ca.jpg?d=450x0',
      title: 'Kit Kat Mini - Dark Matcha Green Tea (12 Bars)',
      description:
        'With double the Uji Matcha as original Green Tea Kit Kats, this refined version has a sharp, deep flavor and leaves behind a rich, bitter aftertaste.\nBy incorporating a little bit of catechin-rich Matcha Green Tea in your life every day, you can escape the hustle and bustle of busy life. Stop to catch your breath and and have a break with a Dark Green Tea Kit Kat.',
      price: 3.35,
      slug: 'kit-kat-mini',
    },
    {
      id: 3,
      categoryId: 1,
      img: 'https://image.dokodemo.world/catalog-skus/623224/609227db8681c3c1221a98d00491886d.jpg?d=450x0',
      title: 'Nippon Kodo Mainichi Byakudan - Sandalwood 24 sticks',
      description:
        'Sandalwood incense "Mainichi Byakudan"\nIn incense ceremony, sandalwood is classified as "salty." Its fragrance from the parched lands of India and other regions is said to invite refreshing coolness. It also has a mysteriously balmy warmth.\nIt has a long history and has been prized throughout the world as a valuable medicine.',
      price: 5,
      slug: 'super-mario-figure-two',
    },
    {
      id: 4,
      categoryId: 1,
      img: 'https://image.dokodemo.world/catalog-skus/18434/9cf855997934643284092067f801a706.jpg?d=450x0',
      title: 'Sarasaty Lingerie Detergent',
      description:
        "Sarasaty Lingerie Detergent is very effective at cleaning out dirt and blood from fabrics. Leave them to soak for about 20 minutes, and you won't even need to scrub. Easy to use one-touch cap.",
      price: 2,
      slug: 'super-mario-figure-two',
    },
  ];

  return (
    <main className="container mx-auto py-5">
      <ProductList products={products} />
    </main>
  );
};

export default Catalog;
