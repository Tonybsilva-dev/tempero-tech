"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getRestaurantsByRegion = async () => {
  return await db.restaurant.findMany({
    include: {
      address: {
        include: {
          geo: true,
        },
      },
      categories: true,
    },
  });
};
