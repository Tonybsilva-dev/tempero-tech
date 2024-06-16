import { db } from "@/src/shared/modules/infrastructure/database/prisma";

interface GetRestauranteJuicesInterface {
  restaurantId: string;
}

export const getRestaurantJuices = async ({
  restaurantId,
}: GetRestauranteJuicesInterface) => {
  return await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
      restaurant: {
        id: restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  });
};
