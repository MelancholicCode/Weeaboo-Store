import { Prisma } from '@prisma/client';

export const calcRating = (
  rateArray: number[],
  newRate: number,
): Prisma.Decimal => {
  return new Prisma.Decimal(
    (
      (rateArray.reduce((acc, curr) => acc + curr) + newRate, 0) /
      (rateArray.length + 1)
    ).toFixed(1),
  );
};
