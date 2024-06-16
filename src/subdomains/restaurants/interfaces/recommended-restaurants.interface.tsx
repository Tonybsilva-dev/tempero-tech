import dynamic from "next/dynamic";
import { authOptions } from "@/src/shared/modules/utils/auth";
import { getServerSession } from "next-auth";
import { getFavoriteRestaurants } from "../_actions/getFavoriteRestaurants";
import { notFound } from "next/navigation";
import { getRestaurants } from "../_actions/getRestaurants";

const RestaurantItem = dynamic(() => import("../../home/components/restaurant-item"));

export const RecommendedRestaurantsInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await getFavoriteRestaurants({
    userId: String(session.user.id),
  });

  const restaurants = await getRestaurants();

  return (
    <>
      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="products"
      >
        <div className="container mx-auto">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Restaurantes recomendados
          </h2>
          <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
          {restaurants.map((restaurant) => (
              <RestaurantItem
                key={restaurant.id}
                restaurant={restaurant}
                className="min-w-full max-w-full"
                userFavoriteRestaurants={userFavoriteRestaurants}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
