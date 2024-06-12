import React from "react";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Prisma } from "@prisma/client";
import { formatCurrency } from "../../_helpers/price";

interface ReservationProps {
  reservation: Prisma.ReservationGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const getReservationStatusLabel = (status: string) => {
  switch (status) {
    case "Canceled":
      return "Cancelada";
    case "Confirmed":
      return "Confirmada";
    default:
      return status;
  }
};

const ReservationItem = ({ reservation }: ReservationProps) => {

  if (!reservation.restaurant) {
    console.error("Reservation data is incomplete:", reservation);
    return null;
  }

  return (
    <Card>
      <CardContent className="p-5">
        <div
          className={`w-fit rounded-full px-2 py-1 text-xs font-semibold ${reservation.status === "Confirmed" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {getReservationStatusLabel(reservation.status)}
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={reservation.restaurant.imageUrl} />
            </Avatar>
            <span className="text-sm font-semibold">
              {reservation.restaurant.name}
            </span>
          </div>
          <Button
            variant="link"
            size="icon"
            className="h-5 w-5 text-black"
            asChild
          >
            <Link href={`/restaurants/${reservation.restaurant.id}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-3">
          <span>Data: {reservation.date.toLocaleDateString()}</span>
          <span>Hora: {reservation.time}</span>
          <span>Mesa Nº: {reservation.tableNumber}</span>
          <span>
            Preço:{" "}
            {formatCurrency(Number(reservation.restaurant.reservationFee))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationItem;
