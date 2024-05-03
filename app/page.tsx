import CategoryList from "./_components/category-list";
import ProductList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ArrowRight, ChevronRightIcon } from "lucide-react";
import { db } from "./_lib/prisma";
// import PromoBanner from "./_components/promo-banner";
import RestaurantList from "./_components/restaurant-list";
import Link from "next/link";
import Image from "next/image";

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
      <div className="px-6 py-16 md:p-8 md:px-8 lg:px-10">
        <div className="space-y-4 px-5 pt-12">
          <CategoryList />
        </div>
        {/* <div className=" lg:w-lg mx-auto max-w-4xl">
          <div className="flex flex-col items-center justify-center space-x-0 space-y-4 px-5 pt-6 md:flex-row md:space-x-4 md:space-y-0">
            <PromoBanner
              src="/promo-banner-01.png"
              alt="Até 30% de desconto em pizzas!"
            />

            <PromoBanner
              src="/promo-banner-02.png"
              alt="A partir de R$17,90 em lanches"
            />
          </div>
        </div> */}

        <section
          className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
          id="products"
        >
          <div className="container mx-auto">
            <h2 className="mb-8 flex justify-between text-3xl font-bold">
              Ofertas do dia
              <Button
                variant="ghost"
                className="h-fit p-0 text-primary hover:bg-transparent"
              >
                <Link href="/products/recommended">Ver todos</Link>
                <ChevronRightIcon size={16} />
              </Button>
            </h2>
            <ProductList products={products} />
          </div>
        </section>

        <section className="mt-8 bg-gray-100 px-6 py-16 md:px-8 lg:px-10">
          <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="mb-4 text-4xl font-bold">
                Descubra os melhores estabelecimentos na cidade{" "}
              </h1>
              <p className="mb-8 text-gray-600">
                Explore uma grande variedade de cozinhas deliciosas e encontre a
                experiência gastronômica perfeita para você.
              </p>
              <Button className="bg-yellow-500">
                <Link
                  className="flex w-full justify-between text-lg font-semibold"
                  href="/restaurants/recommended"
                >
                  Ver todos
                  <ArrowRight className="h-6 w-6" />
                </Link>
              </Button>
            </div>
            <div>
              <Image
                width={600}
                height={600}
                alt="Hero Image"
                className="aspect-video rounded-lg shadow-lg"
                src="/foods.png"
              />
            </div>
          </div>
        </section>

        <section
          className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
          id="restaurants"
        >
          <div className="container mx-auto">
            <h2 className="mb-8 flex justify-between text-3xl font-bold">
              Os melhores restaurantes
              <Button
                variant="ghost"
                className="h-fit p-0 text-primary hover:bg-transparent"
              >
                <Link href="/restaurants/recommended">Ver todos</Link>
                <ChevronRightIcon size={16} />
              </Button>
            </h2>
            <RestaurantList />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
