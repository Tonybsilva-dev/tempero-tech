"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getOrderById = async (orderId: string) => {
  const order = await db.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      user: true,
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
};