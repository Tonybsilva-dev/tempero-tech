import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/shared/modules/utils/auth";

import { getFavoriteRestaurants } from "../_actions/getFavoriteRestaurants";
import { getRestaurantById } from "../_actions/getRestaurantById";

import { StarIcon } from "lucide-react";
import ProductList from "../../home/components/product-list";
import CartBanner from "../components/cart-banner";

const DeliveryInfo = dynamic(
  () => import("../../products/components/delivery-info"),
);
const RestaurantImage = dynamic(() => import("../components/restaurant-image"));

interface RestaurantInterfaceProps {
  params: {
    id: string;
  };
}

export const RestaurantInterface = async ({
  params,
}: RestaurantInterfaceProps) => {
  const session = await getServerSession(authOptions);

  const restaurant = await getRestaurantById({
    restaurantId: params.id,
  });

  if (!restaurant) {
    return notFound();
  }

  const userFavoriteRestaurants = await getFavoriteRestaurants({
    userId: String(session?.user.id),
  });

  return (
    <div>
      <RestaurantImage
        restaurant={restaurant}
        userFavoriteRestaurants={userFavoriteRestaurants}
      />

      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-tl-3xl rounded-tr-3xl bg-white px-5 pt-5">
        {/* TITULO */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="100%"
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        <div className="flex items-center gap-[3px] rounded-full bg-foreground px-2 py-[2px] text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>

      <div className="mt-3 flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {restaurant.categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[167px] rounded-lg bg-[#F4F4F4] text-center"
          >
            <span className="text-xs text-muted-foreground">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
        <h2 className="px-5  font-semibold">Mais Pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map((category) => (
        <div className="mt-6 space-y-4" key={category.id}>
          {/* TODO: mostrar produtos mais pedidos quando implementarmos realização de pedido */}
          <h2 className="px-5  font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}

      <CartBanner restaurant={restaurant} />
    </div>
  );
};
