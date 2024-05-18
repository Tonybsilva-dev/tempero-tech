import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import RestaurantItem from "../_components/restaurant-item";
import { Metadata } from "next";
import NotFoundRestaurants from "./_components/not-found-restaurants";

export const metadata: Metadata = {
  title: "Restaurantes favoritos",
};

const MyFavoriteRestaurants = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return notFound();
  }

  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
    },
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

export default MyFavoriteRestaurants;
