import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/shared/modules/utils/auth";
import { getFavoriteRestaurants } from "../_actions/getFavoriteRestaurants";

const Restaurants = dynamic(() => import("../components/restaurants"));

export const SearchRestaurantsInterface = async () => {
  const session = await getServerSession(authOptions);

  const userFavoriteRestaurants = await getFavoriteRestaurants({
    userId: String(session?.user.id),
  });

  return (
    <main>
      <Restaurants userFavoriteRestaurants={userFavoriteRestaurants} />
    </main>
  );
};
