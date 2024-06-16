import { RestaurantInterface } from "../interfaces/restaurant.interface";
export { RestaurantInterface } from "../interfaces/restaurant.interface";

interface RestaurantInterfaceProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export const RestaurantContainer = ({ params }: RestaurantInterfaceProps) => {
  return <RestaurantInterface params={params} />;
};
