"use client";

import dynamic from "next/dynamic";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "../_actions/search";

const RestaurantItem = dynamic(
  () => import("../../home/components/restaurant-item"),
);
const NotFoundRestaurants = dynamic(() => import("./not-found-restaurants"));

interface RestaurantProps {
  userFavoriteRestaurants: UserFavoriteRestaurant[];
}

const Restaurants = ({ userFavoriteRestaurants }: RestaurantProps) => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) notFound();
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };

    fetchRestaurants();
  }, [searchFor]);

  return (
    <>
      <main
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="restaurants"
      >
        <div className="container mx-auto">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Restaurantes encontrados
          </h2>
        </div>
        <div className="container grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
              userFavoriteRestaurants={userFavoriteRestaurants}
            />
          ))}
        </div>
        {restaurants.length === 0 && <NotFoundRestaurants />}
      </main>
    </>
  );
};

export default Restaurants;
