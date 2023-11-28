import { PrismaClient, Language, Category } from '@prisma/client';

const prisma = new PrismaClient();

const createCategory = async (
  languages: {
    english: Language;
    russian: Language;
    japanese: Language;
  },
  {
    en,
    ru,
    ja,
  }: {
    en: string;
    ru: string;
    ja: string;
  },
): Promise<Category> => {
  return await prisma.category.create({
    data: {
      CategoryTitle: {
        create: [
          {
            text: en,
            languageId: languages.russian.id,
          },
          {
            text: ru,
            languageId: languages.english.id,
          },
          {
            text: ja,
            languageId: languages.japanese.id,
          },
        ],
      },
    },
  });
};

export const seedCategories = async (languages: {
  russian: Language;
  english: Language;
  japanese: Language;
}): Promise<Category[]> => {
  try {
    const food = await createCategory(languages, {
      ru: 'Еда',
      en: 'Food',
      ja: '食事',
    });

    const cosmetics = await createCategory(languages, {
      ru: 'Косметика',
      en: 'Cosmetics',
      ja: '化粧品',
    });

    const electronics = await createCategory(languages, {
      ru: 'Электроника',
      en: 'Electronics',
      ja: '電子機器',
    });

    const manga = await createCategory(languages, {
      ru: 'Манга',
      en: 'Manga',
      ja: 'マンガ',
    });

    const householdGoods = await createCategory(languages, {
      ru: 'Товары для дома',
      en: 'Household Goods',
      ja: '生活雑貨',
    });

    console.log('Categories seeded successfully');
    return [food, cosmetics, electronics, manga, householdGoods];
  } catch (error) {
    console.error('Error seeding categories:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
