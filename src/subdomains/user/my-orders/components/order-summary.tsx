"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "@/src/shared/_components/ui/separator";
import { formatDate } from "@/src/shared/modules/helpers/date";
import { formatCurrency } from "@/src/shared/modules/helpers/price";
import Image from "next/image";
import type { Prisma } from "@prisma/client";
import NotFoundOrders from "./not-found-orders";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      user: true;
      restaurant: true;
      products: {
        include: {
          product: true;
        };
      };
    };
  }> | null;
}

const OrderSummary = ({ order }: OrderItemProps) => {
  const [hoveredProduct, setHoveredProduct] = useState("");

  useEffect(() => {
    if (order && order.products.length > 0) {
      setHoveredProduct(order.products[0].product.imageUrl);
    }
  }, [order]);

  if (!order) {
    return <NotFoundOrders />;
  }

  return (
    <section
      className="body-font overflow-hidden text-gray-600"
      aria-labelledby="order-summary-heading"
    >
      <div className="container mx-auto flex items-center justify-center px-5 py-12">
        <article className="mx-auto flex flex-wrap lg:w-4/5">
          <div className="mb-6 w-full lg:mb-0 lg:w-1/2 lg:py-6 lg:pr-10">
            <header>
              <h2 className="title-font text-sm tracking-widest text-gray-500">
                Feito em {formatDate(order.createdAt)}
              </h2>
              <h1
                id="order-summary-heading"
                className="title-font mb-4 text-3xl font-medium text-gray-900"
              >
                {order.restaurant.name}
              </h1>
            </header>
            <div className="mb-4 flex">
              <a className="flex-grow border-b-2 border-yellow-500 px-1 py-2 text-lg text-yellow-500">
                Descrição
              </a>
            </div>
            <p className="mb-4 text-zinc-400">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere,
              rerum iure nulla possimus id et quae error repudiandae accusantium
              quasi asperiores ea nesciunt labore, cum eligendi ipsum incidunt
              similique aliquid.
            </p>
            <ul className="leading-relaxed">
              {order.products.map((productItem, index) => (
                <li
                  key={index}
                  className="group flex items-center justify-between border-t py-2 hover:bg-yellow-500"
                  onMouseEnter={() =>
                    setHoveredProduct(productItem.product.imageUrl)
                  }
                  onMouseLeave={() =>
                    setHoveredProduct(order.products[0].product.imageUrl)
                  }
                >
                  <span className="text-gray-500 group-hover:text-black">
                    {productItem.product.name} x {productItem.quantity}
                  </span>
                  <span className="ml-auto text-gray-900 group-hover:text-black">
                    {formatCurrency(Number(productItem.product.price))}
                  </span>
                </li>
              ))}
            </ul>
            <Separator className="my-1" />
            <div className="flex items-center justify-between py-2 font-semibold">
              <span className="text-sm text-gray-500">Descontos totais</span>
              <span>{formatCurrency(Number(order.totalDiscounts))}</span>
            </div>
            <div className="flex items-center justify-between border-t py-2 font-semibold">
              <span className="text-gray-500">Total</span>
              <span>{formatCurrency(Number(order.totalPrice))}</span>
            </div>
          </div>
          <Image
            alt={`Imagem do produto ${hoveredProduct}`}
            className="aspect-[3/3] w-full rounded object-contain object-center lg:h-auto lg:w-1/2"
            src={hoveredProduct}
            sizes="100%"
            loading="lazy"
            width={400}
            height={400}
          />
        </article>
      </div>
    </section>
  );
};

export default OrderSummary;
