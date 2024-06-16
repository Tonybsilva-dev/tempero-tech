import { ScheduleDateOnRestaurantInterface } from "../interfaces/schedule-date-on-restaurant.interface";
export { ScheduleDateOnRestaurantInterface } from "../interfaces/schedule-date-on-restaurant.interface";

interface RestaurantInterfaceProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export const ScheduleDateOnRestaurantContainer = ({ params }: RestaurantInterfaceProps) => {
  return <ScheduleDateOnRestaurantInterface params={params} />;
};
