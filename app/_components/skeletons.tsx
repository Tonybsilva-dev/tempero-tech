const ProductItemSkeleton = () => {
  return (
    <div className="w-[150px] min-w-[150px] animate-pulse space-y-2">
      <div className="min-w-[266px] max-w-[266px]">
        <div className="relative h-[150px] w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        <div className="mt-2">
          <div className="h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
          <div className="mt-2 flex items-center gap-1">
            <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
          <div className="mt-1 h-3 w-24 rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
};

export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductItemSkeleton key={index} />
      ))}
    </div>
  );
}

const RestaurantItemSkeleton = () => {
  return (
    <div className="min-w-[266px] max-w-[266px] animate-pulse">
      <div className="w-full space-y-3">
        {/* IMAGEM */}
        <div className="relative h-[136px] w-full rounded-lg bg-gray-300 dark:bg-gray-700"></div>
        {/* TEXTO */}
        <div className="space-y-2">
          <div className="h-4 rounded bg-gray-300 dark:bg-gray-700"></div>
          {/* INFORMAÇÕES DA ENTREGA */}
          <div className="flex gap-3">
            {/* CUSTO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <div className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            {/* TEMPO DE ENTREGA */}
            <div className="flex items-center gap-1">
              <div className="h-4 w-10 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RestaurantGridSkeleton = () => {
  return (
    <section
      className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
      id="products"
    >
      <div className="container mx-auto">
        <h2 className="mb-8 flex justify-between text-3xl font-bold">
          Restaurantes encontrados
        </h2>
      </div>
      <div className="container grid grid-cols-2 justify-items-center gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <RestaurantItemSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
