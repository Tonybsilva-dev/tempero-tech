import { imageURL } from "@/app/_helpers/images";
import Image from "next/image";

export default function NotFoundOrders() {
  return (
    <main className="flex flex-1 h-full w-full flex-col items-center justify-center">
      <Image
        alt="Imagem um lugar sem pedidos"
        className=" aspect-[3/3] overflow-hidden rounded-lg object-cover dark:border-gray-800"
        width={400}
        height={400}
        sizes="100%"
        loading="eager"
        src={`${imageURL}/ce75fa46-d4a7-4a47-b2cc-d49e928f7d97-1lj7f1.svg`}
      />
      <p className="text-xl text-zinc-500 font-bold mt-4">Você ainda não realizou nenhum pedido!</p>
    </main>
  );
}
