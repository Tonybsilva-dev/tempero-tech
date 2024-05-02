import CategoryList from "./_components/category-list";
import Search from "./_components/search";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="md:p-8">
        <div className="px-5 pt-6">
          <Search />
        </div>

        <div className="px-5 pt-6 space-y-4">
          <h2 className="text-2xl font-semibold">Categorias</h2>
          <CategoryList />
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 px-5 pt-6 md:flex-row md:space-x-4 md:space-y-0">
          <PromoBanner
            src="/promo-banner-01.png"
            alt="Até 30% de desconto em pizzas!"
          />

          <PromoBanner
            src="/promo-banner-02.png"
            alt="A partir de R$17,90 em lanches"
          />
        </div>

        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-2xl font-semibold">
              Os queridinhos do momento
            </h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              <Link href="/products/recommended">Ver todos</Link>
              <ChevronRightIcon size={16} />
            </Button>
          </div>
          <ProductList products={products} />
        </div>

        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between px-5">
            <h2 className="text-2xl font-semibold">Os melhores restaurantes</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-primary hover:bg-transparent"
            >
              <Link href="/restaurants/recommended">Ver todos</Link>
              <ChevronRightIcon size={16} />
            </Button>
          </div>
          <RestaurantList />
        </div>
      </div>
    </>
  );
};

export default Home;
