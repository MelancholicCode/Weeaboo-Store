import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCategories = async (): Promise<Category[]> => {
  try {
    const categoriesData = [
      {
        name: 'Food',
        slug: 'food',
      },
      {
        name: 'Cosmetics',
        slug: 'cosmetics',
      },
      {
        name: 'Electronics',
        slug: 'electronics',
      },
      {
        name: 'Manga',
        slug: 'manga',
      },
      {
        name: 'Household Goods',
        slug: 'household-goods',
      },
    ];

    const categories: Category[] = [];

    for (let i = 0; i < categoriesData.length; i++) {
      categories.push(
        await prisma.category.create({
          data: categoriesData[i],
        }),
      );
    }

    console.log('Categories seeded successfully');
    console.log(categories);
  } catch (error) {
    console.error('Error seeding categories:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
