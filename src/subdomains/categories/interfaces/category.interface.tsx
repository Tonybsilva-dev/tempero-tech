import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "../_actions/getProductsByCategory";

const ProductItem = dynamic(() => import("../components/product-item"));

interface CategoriesInterfaceProps {
  params: {
    id: string;
  };
}

export const CategoriesInterface = async ({
  params,
}: CategoriesInterfaceProps) => {
  const { id } = params;
  const category = await getProductsByCategory(id);

  if (!category) {
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
            {category.name}
          </h2>
          <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {category.products.map((product) => (
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
