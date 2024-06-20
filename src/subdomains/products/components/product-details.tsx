"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/_components/ui/avatar";
import type { Prisma } from "@prisma/client";
import DiscountBadge from "./discount-badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/src/shared/modules/helpers/price";
import {
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
} from "lucide-react";
import { Button } from "@/src/shared/_components/ui/button";
import { useContext, useState } from "react";
import { CartContext } from "../../home/context/cart";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/shared/_components/ui/sheet";
import Cart from "../../home/components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/shared/_components/ui/alert-dialog";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
}

const NewProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const { addProductToCart, products } = useContext(CartContext);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product: { ...product, quantity }, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    // VERIFICAR SE HÁ ALGUM PRODUTO DE OUTRO RESTAURANTE NO CARRINHO
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    // SE HOUVER, ABRIR UM AVISO
    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

  const handleIncreaseQuantityClick = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={product.restaurant.imageUrl} />
          <AvatarFallback>
            {product.restaurant.name
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <span>{product.restaurant.name}</span>
      </div>
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </span>
          <DiscountBadge product={product} />
        </div>
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button size="icon" onClick={handleIncreaseQuantityClick}>
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="text-gray-500">
        De: {formatCurrency(Number(product.price))}
      </div>
      <div className="flex items-center justify-between border-b border-t py-4">
        <div className="flex items-center space-x-2">
          <BikeIcon className="h-5 w-5" />
          <span>Entrega</span>
          <span className="font-semibold">
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="font-semibold">Grátis</p>
            )}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-5 w-5" />
          <span>Entrega</span>
          <span className="font-semibold">
            {product.restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold">Sobre</h2>
        <p>{product.description}</p>
      </div>
      <div className="mt-6">
        <Button className="w-full font-semibold" onClick={handleAddToCartClick}>
          Adicionar à sacola
        </Button>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Sacola</SheetTitle>
          </SheetHeader>

          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Um momento...</AlertDialogTitle>
            <AlertDialogDescription>
              Você só pode adicionar itens de um restaurante por vez <br />
              Deseja mesmo adicionar esse produto? Isso limpará sua sacola
              atual.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NewProductDetails;
