import { Button } from "@/src/shared/_components/ui/button";
import { formatCurrency } from "@/src/shared/modules/helpers/price";
import React from "react";

interface BookingSummaryProps {
  date: string;
  time: string;
  price: number;
  table: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  date,
  time,
  price,
  table,
}) => {
  return (
    <div className="flex h-full flex-col rounded-lg border border-gray-300 p-4">
      <h2 className="text-lg font-semibold">Detalhes</h2>
      <div className="my-2 h-[1px] bg-zinc-200" />
      <p>Data: {date}</p>
      <p>Hora: {time}</p>
      <p>Mesa: {table}</p>
      <p>Preço: {formatCurrency(price)}</p>
      <div className="flex-grow"></div>
      <Button className="mt-auto w-full self-end">Confirmar</Button>
    </div>
  );
};

export default BookingSummary;
