"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

interface getRestaurantInterface {
  restaurantId: string;
}

export const getRestaurantById = async ({
  restaurantId,
}: getRestaurantInterface) => {
  return await db.restaurant.findUnique({
    where: {
      id: restaurantId,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          products: {
            where: {
              restaurantId,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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
