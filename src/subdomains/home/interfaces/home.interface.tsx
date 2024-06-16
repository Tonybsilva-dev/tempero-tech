import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import { ArrowRightIcon, ChevronRightIcon } from "lucide-react";
import { imageURL } from "@/src/shared/modules/utils/image";

const ProductList = dynamic(() => import("../components/product-list"));
const RestaurantList = dynamic(() => import("../components/restaurant-list"));
const CategoryList = dynamic(() => import("../components/category-list"));
const PromoBanner = dynamic(() => import("../components/promo-banner"));

import { getDiscountedProducts } from "../_actions/getDiscountedProducts";
import { banners } from "../../restaurants/helpers/banners";
import { Button } from "@/src/shared/_components/ui/button";

export const HomeInterface = async () => {
  const products = await getDiscountedProducts();

  return (
    <>
      <div className="space-y-4 pt-16">
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

      <PromoBanner banners={banners} />

      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="products"
      >
        <div className="mx-auto lg:container">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Produtos recomendados
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
        <div className="mx-auto grid grid-cols-1 gap-8 lg:container md:grid-cols-2">
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
                <ArrowRightIcon className="h-6 w-6" />
              </Link>
            </Button>
          </div>
          <div>
            <Image
              width={600}
              height={600}
              sizes="100%"
              quality={75}
              loading="eager"
              alt="Hero Image"
              className="aspect-video rounded-lg shadow-lg"
              src={`${imageURL}/bb822675-15e6-40f6-a8ca-4db0f1b36e39-1m48ut.png`}
            />
          </div>
        </div>
      </section>

      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="restaurants"
      >
        <div className="mx-auto lg:container">
          <h2 className="mb-8 flex justify-between text-3xl font-bold">
            Restaurantes recomendados
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
      <Footer />
    </>
  );
};
