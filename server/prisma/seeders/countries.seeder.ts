import { PrismaClient, Country } from '@prisma/client';

const prisma = new PrismaClient();

const createCountry = async (
  name: string,
  code: string,
  currencyCode: string,
  currencySymbol: string,
): Promise<Country> => {
  return await prisma.country.create({
    data: {
      name,
      code,
      Currency: {
        create: {
          code: currencyCode,
          symbol: currencySymbol,
        },
      },
    },
  });
};

export const seedCountries = async (): Promise<{
  russia: Country;
  unitedStates: Country;
  japan: Country;
}> => {
  try {
    const russia: Country = await createCountry(
      'Russian Federation',
      'RU',
      'RUR',
      '₽',
    );

    const unitedStates: Country = await createCountry(
      'United States',
      'US',
      'USD',
      '$',
    );

    const japan: Country = await createCountry('Japan', 'JP', 'JPY', '¥');

    console.log('Countries and currencies seeded successfully');
    return { russia, unitedStates, japan };
  } catch (error) {
    console.error('Error seeding countries:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
};
