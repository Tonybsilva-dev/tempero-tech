import { imageURL } from "@/app/_helpers/images";
import Image from "next/image";

export default function NotFoundRestaurants() {
  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <Image
        alt="Imagem um lugar sem pedidos"
        className=" aspect-[3/3] overflow-hidden rounded-lg object-cover dark:border-gray-800"
        width={400}
        height={400}
        sizes="100%"
        loading="eager"
        src={`${imageURL}/3155d3b4-9523-4075-8608-8d9a41896daa-tba4lf.svg`}
      />
      <p className="mt-4 text-xl font-bold text-zinc-500">
        Você ainda não marcou nenhum restaurante como favorito!
      </p>
    </main>
  );
}
