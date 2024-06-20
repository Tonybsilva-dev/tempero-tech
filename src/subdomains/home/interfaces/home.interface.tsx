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
    <main>
      <div className="space-y-4 pt-16">
        <CategoryList />
      </div>
      <PromoBanner banners={banners} />
      <section
        className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
        id="products"
      >
        <div className="mx-auto lg:container">
          <header className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Produtos recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-yellow-600 hover:bg-transparent"
            >
              <Link
                className="center flex space-y-1"
                href="/products/recommended"
              >
                Ver todos <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </header>
          <ProductList products={products} />
        </div>
      </section>

      <section className="mt-8 bg-gray-100 px-6 py-16 md:px-8 lg:px-10">
        <div className="mx-auto grid grid-cols-1 gap-8 lg:container md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-bold">
              Descubra os melhores estabelecimentos na cidade
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
                Ver todos <ArrowRightIcon className="h-6 w-6" />
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
              alt="Imagem de destaque"
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
          <header className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Restaurantes recomendados</h2>
            <Button
              variant="ghost"
              className="h-fit p-0 text-yellow-600 hover:bg-transparent"
            >
              <Link
                className="flex items-center space-y-1"
                href="/restaurants/recommended"
              >
                Ver todos <ChevronRightIcon size={16} />
              </Link>
            </Button>
          </header>
          <RestaurantList />
        </div>
      </section>
      <Footer />
    </main>
  );
};
