import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getUniqueRestaurant } from "../_actions/getUniqueRestaurant";

const Scheduler = dynamic(() => import("../components/scheduler"));


interface RestaurantPageProps {
  params: {
    id: string;
  };
}

export const ScheduleDateOnRestaurantInterface = async ({
  params: { id },
}: RestaurantPageProps) => {
  const restaurant = await getUniqueRestaurant({ id });

  if (!restaurant) {
    return notFound();
  }

  return <Scheduler restaurant={restaurant} />;
};

