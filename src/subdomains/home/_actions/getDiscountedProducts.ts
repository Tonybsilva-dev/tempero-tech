"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";


export const getDiscountedProducts = async () => {
  return await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
};
