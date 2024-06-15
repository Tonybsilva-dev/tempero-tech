"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";

export const getRestaurants = async () => {
  return await db.restaurant.findMany({});
};
