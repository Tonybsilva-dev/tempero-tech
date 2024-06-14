"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

interface getFavoriteRestaurantsInterface {
  userId: string;
}

export const getFavoriteRestaurants = async ({
  userId,
}: getFavoriteRestaurantsInterface) => {
  return await db.userFavoriteRestaurant.findMany({
    where: {
      userId,
    },
    include: {
      restaurant: true,
    },
  });
};
