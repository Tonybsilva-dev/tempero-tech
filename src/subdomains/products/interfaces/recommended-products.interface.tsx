import { notFound } from "next/navigation";
import { getRecommendedProduct } from "../_actions/getRecommendedProducts";
import ProductItem from "../../categories/components/product-item";

export const RecommendedProductsInterface = async () => {
  const recommended = await getRecommendedProduct();

  if (!recommended) {
    return notFound();
  }

  return (
    <>
      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="products"
      >
        <div className="container mx-auto">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Ofertas do dia
          </h2>
          <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {recommended.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                className="min-w-full"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
