import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { memo, useContext } from "react";
import { CartContext, type CartProduct } from "../context/cart";
import { calculateProductTotalPrice, formatCurrency } from "@/src/shared/modules/helpers/price";
import { Button } from "@/src/shared/_components/ui/button";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  console.log("CartItem");

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProduct.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProduct.id);

  const handleRemoveClick = () => removeProductFromCart(cartProduct.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* IMAGEM E INFO */}
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            quality={75}
            sizes="100%"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE */}

          <div className="flex items-center text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon
                size={16}
                onClick={handleDecreaseQuantityClick}
              />
            </Button>
            <p className="block w-8 text-xs">{cartProduct.quantity}</p>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* BOTÃO DE DELETAR */}
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7 border border-solid border-muted-foreground"
        onClick={handleRemoveClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default memo(CartItem, (prev, next) => {
  return prev.cartProduct.quantity === next.cartProduct.quantity;
});
