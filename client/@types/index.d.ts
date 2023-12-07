interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  img: string;
  slug: string;
  categoryId: number;
}
