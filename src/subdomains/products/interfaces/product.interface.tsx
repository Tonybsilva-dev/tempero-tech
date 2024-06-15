import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProduct } from "../_actions/getProduct";

const ProductImage = dynamic(() => import("../components/product-image"));
const ProductDetails = dynamic(() => import("../components/product-details"));

import { getRestaurantJuices } from "../_actions/getRestaurantJuices";

interface CategoriesInterfaceProps {
  params: {
    id: string;
  };
}

export const ProductsInterface = async ({
  params,
}: CategoriesInterfaceProps) => {
  const { id } = params;
  const product = await getProduct(id);

  if (!product) {
    return notFound();
  }

  const juices = await getRestaurantJuices({
    restaurantId: product?.restaurant.id,
  });

  return (
    <>
      <main>
        {/* IMAGEM */}
        <ProductImage product={product} />

        {/* TITULO E PREÇO */}
        <ProductDetails product={product} complementaryProducts={juices} />
      </main>
    </>
  );
};
