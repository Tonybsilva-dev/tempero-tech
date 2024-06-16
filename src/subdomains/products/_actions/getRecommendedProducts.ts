"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getRecommendedProduct = async () => {
  return await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
};
