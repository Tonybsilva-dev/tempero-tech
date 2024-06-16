"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getMyOrders = async (userId: string) => {
  return await db.order.findMany({
    where: {
      userId,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });
};
