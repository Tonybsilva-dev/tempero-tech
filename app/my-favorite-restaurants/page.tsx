import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { notFound } from "next/navigation";
import RestaurantItem from "../_components/restaurant-item";
import Image from "next/image";

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
          {userFavoriteRestaurants.length === 0 && (
            <>
              <h3 className="font-medium">
                Você ainda não marcou nenhum restaurante como favorito.
              </h3>
              <div className="flex items-center justify-center">
                <Image
                  alt="Imagem um lugar sem pedidos"
                  className="aspect-[1/1] self-center overflow-hidden rounded-lg object-cover dark:border-gray-800"
                  width={400}
                  height={400}
                  src="/restaurant.svg"
                />
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default MyFavoriteRestaurants;
