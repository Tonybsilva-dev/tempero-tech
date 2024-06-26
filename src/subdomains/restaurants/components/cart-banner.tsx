"use client";

import { Button } from "@/src/shared/_components/ui/button";
import { Separator } from "@/src/shared/_components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/shared/_components/ui/sheet";
import { formatCurrency } from "@/src/shared/modules/helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext, useState } from "react";
import Cart from "../../home/components/cart";
import { CartContext } from "../../home/context/cart";

interface CartBannerProps {
  restaurant: Pick<Restaurant, "id">;
}

const CartBanner = ({ restaurant }: CartBannerProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { products, totalPrice, totalQuantity } = useContext(CartContext);

  const restaurantHasProductsOnCart = products.some(
    (product) => product.restaurantId === restaurant.id,
  );

  console.log({ restaurantHasProductsOnCart });

  if (!restaurantHasProductsOnCart) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted bg-white p-5 pt-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* PREÇO */}
        <div>
          <span className="text-xs text-muted-foreground">
            Total sem entrega
          </span>
          <h3 className="font-semibold">
            {formatCurrency(totalPrice)}{" "}
            <span className="text-xs font-normal text-muted-foreground">
              {" "}
              / {totalQuantity} {totalQuantity > 1 ? "itens" : "item"}
            </span>
          </h3>
        </div>
        {/* BOTÃO */}

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger>
            <Button>Ver sacola</Button>
          </SheetTrigger>
          <SheetContent className="w-[90vw]">
            <SheetHeader className="space-y-4">
              <SheetTitle className="text-left text-xl">Sacola</SheetTitle>
              <Separator />
            </SheetHeader>

            <Cart setIsOpen={setIsCartOpen} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CartBanner;
