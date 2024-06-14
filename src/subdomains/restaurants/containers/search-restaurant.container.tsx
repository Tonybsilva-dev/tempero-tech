import { SearchRestaurantsInterface } from "./search-restaurant.container";
export { SearchRestaurantsInterface } from "../interfaces/search-restaurant.interface";

interface SearchRestaurantsInterface {
  params: {};
  searchParams: {
    search: string;
  };
}

export const SearchRestaurantsContainer = () => {
  return <SearchRestaurantsInterface />;
};
