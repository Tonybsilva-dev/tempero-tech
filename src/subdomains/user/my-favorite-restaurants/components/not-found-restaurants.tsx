import { imageURL } from "@/src/shared/modules/utils/image";
import Image from "next/image";

export default function NotFoundRestaurants() {
  return (
    <section className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <header>
        <Image
          alt="Imagem de um lugar sem pedidos"
          className="aspect-square overflow-hidden rounded-lg object-cover dark:border-gray-800"
          width={400}
          height={400}
          sizes="100%"
          loading="eager"
          src={`${imageURL}/3155d3b4-9523-4075-8608-8d9a41896daa-tba4lf.svg`}
        />
      </header>
      <p className="mt-4 text-center text-xl font-bold text-zinc-500">
        Você ainda não marcou nenhum restaurante como favorito!
      </p>
    </section>
  );
}
