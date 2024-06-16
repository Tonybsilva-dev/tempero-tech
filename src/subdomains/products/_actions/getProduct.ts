"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getProduct = async (id: string) => {
  return await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });
};
