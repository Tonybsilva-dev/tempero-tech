import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProduct } from "../_actions/getProduct";
import { getRestaurantJuices } from "../_actions/getRestaurantJuices";

const ProductImage = dynamic(() => import("../components/product-image"));
const ProductDetails = dynamic(() => import("../components/product-details"));
const ProductList = dynamic(() => import("../../home/components/product-list"));

interface CategoriesInterfaceProps {
  params: {
    id: string;
  };
}

export const ProductsInterface = async ({
  params,
}: CategoriesInterfaceProps) => {
  const { id } = params;

  const [product, juices] = await Promise.all([
    getProduct(id),
    getProduct(id).then((product) => {
      if (!product) {
        return notFound();
      }
      return getRestaurantJuices({
        restaurantId: product?.restaurant.id,
      });
    }),
  ]);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4 md:mt-12">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/2">
          <ProductImage product={product} />
        </div>
        <div className="lg:w-1/2">
          <ProductDetails product={product} />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList products={juices} />
      </div>
    </div>
  );
};
