"use client";

import { Button } from "@/src/shared/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/_components/ui/card";
import { Separator } from "@/src/shared/_components/ui/separator";
import type { Prisma } from "@prisma/client";
import { formatDate } from "../../../../shared/modules/helpers/date";
import { formatCurrency } from "@/src/shared/modules/helpers/price";
import { getOrderStatusLabel } from "@/src/shared/modules/helpers/get-order-status-label";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const router = useRouter();

  const productsToShow = order.products.slice(0, 3);
  const hasMoreProducts = order.products.length > 3;

  const goToOrderDetails = () => router.push(`/my-orders/${order.id}`);

  return (
    <article
      className="overflow-hidden p-4"
      aria-labelledby={`order-${order.id}-title`}
    >
      <Card>
        <CardHeader className="flex flex-row items-start bg-muted/50 p-2">
          <div className="grid gap-0.5">
            <CardTitle
              id={`order-${order.id}-title`}
              className="group flex items-center gap-2 text-base"
            >
              {order.restaurant.name}
              <Button
                size="icon"
                variant="outline"
                className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Copy Order ID"
              >
                <div className="h-3 w-3" />
              </Button>
            </CardTitle>
            <CardDescription className="flex gap-1 text-sm">
              {formatDate(order.createdAt)}
            </CardDescription>
          </div>
          <div className="ml-auto text-xl font-bold">
            {getOrderStatusLabel(order.status)}
          </div>
        </CardHeader>
        <CardContent className="p-2 text-sm">
          <div className="grid gap-2">
            <h3 className="text-sm font-semibold">Resumo do pedido</h3>
            <ul
              className="grid gap-2"
              aria-label="Resumo dos produtos do pedido"
            >
              {productsToShow.map((productItem, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="text-muted-foreground">
                    {productItem.product.name} x {productItem.quantity}
                  </span>
                  <span>
                    {formatCurrency(Number(productItem.product.price))}
                  </span>
                </li>
              ))}
              {hasMoreProducts && <li className="text-center text-xs">...</li>}
            </ul>
            <Separator className="my-1" />
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-muted-foreground">Descontos totais</span>
              <span>{formatCurrency(Number(order.totalDiscounts))}</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{formatCurrency(Number(order.totalPrice))}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-2 py-1">
          <Button
            type="button"
            size="sm"
            className="my-1 w-full text-xs"
            onClick={goToOrderDetails}
          >
            Ver detalhes do pedido
          </Button>
        </CardFooter>
      </Card>
    </article>
  );
};

export default OrderItem;
