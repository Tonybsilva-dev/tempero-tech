import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/src/shared/modules/utils/auth";

const RestaurantItem = dynamic(
  () => import("@/src/subdomains/home/components/restaurant-item"),
);
const NotFoundRestaurants = dynamic(
  () => import("../components/not-found-restaurants"),
);

import { getFavoriteRestaurants } from "@/src/subdomains/restaurants/_actions/getFavoriteRestaurants";

export const MyFavoriteRestaurantsInterface = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await getFavoriteRestaurants({
    userId: String(session.user.id),
  });

  return (
    <>
      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="products"
      >
        <div className="container mx-auto">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Restaurantes favoritos
          </h2>
          <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {userFavoriteRestaurants.length > 0 &&
              userFavoriteRestaurants.map(({ restaurant }) => (
                <RestaurantItem
                  key={restaurant.id}
                  restaurant={restaurant}
                  className="min-w-full max-w-full"
                  userFavoriteRestaurants={userFavoriteRestaurants}
                />
              ))}
          </div>
          {userFavoriteRestaurants.length === 0 && <NotFoundRestaurants />}
        </div>
      </section>
    </>
  );
};
