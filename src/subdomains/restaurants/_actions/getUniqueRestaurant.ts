"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

type getUniqueRestaurantProps = {
  id: string;
};

export const getUniqueRestaurant = async ({ id }: getUniqueRestaurantProps) => {
  return await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      reservations: true,
    },
  });
};
