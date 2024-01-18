import { Prisma } from '@prisma/client';

export const calcRating = (
  rateArray: number[],
  newRate: number,
): Prisma.Decimal => {
  return new Prisma.Decimal(
    (
      (rateArray.reduce((acc, curr) => acc + curr, 0) + newRate) /
      (rateArray.length + 1)
    ).toFixed(1),
  );
};
