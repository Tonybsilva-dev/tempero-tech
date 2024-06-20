import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { getRecommendedProduct } from "../_actions/getRecommendedProducts";

const ProductItem = dynamic(
  () => import("../../categories/components/product-item"),
);

export const RecommendedProductsInterface = async () => {
  const recommended = await getRecommendedProduct();

  if (!recommended) {
    return notFound();
  }

  return (
    <main className="bg-transparent px-6 py-16 md:px-8 lg:px-10" id="products">
      <div className="container mx-auto">
        <header>
          <h1 className="mb-1 text-3xl font-bold">Produtos recomendados</h1>
          <p className="mb-8 text-lg">
            Veja abaixo os queridinhos dos nossos clientes.
          </p>
        </header>
        <hr className="mb-6 h-[1px] w-full bg-zinc-200" />

        <section aria-labelledby="recommended-products-heading">
          <h3 id="recommended-products-heading" className="sr-only">
            Lista de Produtos Recomendados
          </h3>
          <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
            {recommended.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                className="min-w-full"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
