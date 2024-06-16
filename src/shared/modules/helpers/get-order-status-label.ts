import type { OrderStatus } from "@prisma/client";

export const getOrderStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case "CANCELED":
      return "Cancelado";
    case "COMPLETED":
      return "Finalizado";
    case "CONFIRMED":
      return "Confirmado";
    case "DELIVERING":
      return "Em Transporte";
    case "PREPARING":
      return "Preparando";
  }
};
