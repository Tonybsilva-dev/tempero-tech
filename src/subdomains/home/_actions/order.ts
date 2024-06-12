"use server";

import { db } from "@/src/shared/modules/infrastructure/database/prisma";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/my-orders");
};
