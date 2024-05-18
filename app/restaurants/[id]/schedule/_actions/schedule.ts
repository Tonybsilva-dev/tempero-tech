import { db } from "@/app/_lib/prisma";

export const newReservation = async (
  date: Date,
  time: string,
  table: number,
  price: number,
  restaurantId: string,
  userId: string,
) => {
  const reservation = await db.reservation.create({
    data: {
      date: new Date(date),
      time,
      tableNumber: table,
      restaurantId,
      userId,
      status: "PENDING",
    },
  });

  return reservation;
};
