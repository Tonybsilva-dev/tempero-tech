import React from "react";
import { formatCurrency } from "../../../../_helpers/price";
import { Button } from "@/app/_components/ui/button";

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
    <div className="flex flex-col h-full rounded-lg border border-gray-300 p-4">
      <h2 className="text-lg font-semibold">Detalhes</h2>
      <div className="h-[1px] bg-zinc-200 my-2"/>
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
