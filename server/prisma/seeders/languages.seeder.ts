import { PrismaClient, Country, Language } from '@prisma/client';

const prisma = new PrismaClient();

const createLanguage = async (
  countryId: number,
  name: string,
  code: string,
): Promise<Language> => {
  return await prisma.language.create({
    data: {
      name,
      code,
      countryId,
    },
  });
};

export const seedLanguages = async (countries: {
  russia: Country;
  unitedStates: Country;
  japan: Country;
}): Promise<{
  russian: Language;
  english: Language;
  japanese: Language;
}> => {
  try {
    const languages: {
      russian: Language;
      english: Language;
      japanese: Language;
    } = {
      russian: await createLanguage(countries.russia.id, 'Russian', 'RU'),
      english: await createLanguage(countries.unitedStates.id, 'English', 'EN'),
      japanese: await createLanguage(countries.japan.id, 'Japanese', 'JA'),
    };

    console.log('Languages seeded successfully');
    return languages;
  } catch (error) {
    console.error('Error seeding languages:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
