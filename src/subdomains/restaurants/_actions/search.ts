"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const searchForRestaurants = async (search: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  return restaurants;
};

export const searchForUniqueRestaurants = async (id: string) => {
  const restaurant = await db.restaurant.findFirst({
    where: {
      id: id,
    },
  });

  return restaurant;
};
