import { getServerSession } from "next-auth";
import RestaurantItem from "./restaurant-item";
import { authOptions } from "@/src/shared/modules/utils/auth";
import { db } from "@/src/shared/modules/infrastructure/database/prisma";

const RestaurantList = async () => {
  const session = await getServerSession(authOptions);

  const restaurants = await db.restaurant.findMany({ take: 10 });
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: { userId: session?.user?.id },
  });

  console.log(userFavoriteRestaurants);

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
          userFavoriteRestaurants={userFavoriteRestaurants}
        />
      ))}
    </div>
  );
};

export default RestaurantList;
