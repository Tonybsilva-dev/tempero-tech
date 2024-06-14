"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getProductsByCategory = async (id: string) => {
  return await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};
