import { CategoriesInterface } from "./category.container";
export { CategoriesInterface } from "../interfaces/category.interface";

interface CategoriesInterface {
  params: {
    id: string;
  };
  searchParams: {};
}

export const CategoriesContainer = ({ params }: CategoriesInterface) => {
  return <CategoriesInterface params={params} />;
};
