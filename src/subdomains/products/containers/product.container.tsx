import { ProductsInterface } from "./product.container";
export { ProductsInterface } from "../interfaces/product.interface";

interface ProductsInterface {
  params: {
    id: string;
  };
  searchParams: {};
}

export const ProductsContainer = ({ params }: ProductsInterface) => {
  return <ProductsInterface params={params} />;
};
