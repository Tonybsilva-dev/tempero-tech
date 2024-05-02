import { useContext } from "react";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { CartContext } from "../_contexts/cart";
import { ShoppingCart } from "lucide-react";

const Cart = () => {
  const { products, subtotalPrice, totalPrice, totalDiscounts } =
    useContext(CartContext);

  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-4">
            {products.map((product) => (
              <CartItem key={product.id} cartProduct={product} />
            ))}
          </div>

          {/* TOTAIS */}
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Descontos</span>
                  <span>- {formatCurrency(totalDiscounts)}</span>
                </div>

                <Separator className="h-[0.5px]" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega</span>

                  {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary">Grátis</span>
                  ) : (
                    formatCurrency(Number(products?.[0].restaurant.deliveryFee))
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FINALIZAR PEDIDO */}
          <Button className="mt-6 w-full">Finalizar pedido</Button>
        </>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-4">
          <ShoppingCart className="h-6 w-6" />
          <h2 className="text-left font-medium">Sua sacola está vazia.</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
