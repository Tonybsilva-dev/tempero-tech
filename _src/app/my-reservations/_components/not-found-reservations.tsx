import { imageURL } from "@/app/_helpers/images";
import Image from "next/image";

export default function NotFoundReservations() {
  return (
    <main className="flex h-full w-full flex-1 flex-col items-center justify-center">
      <Image
        alt="Imagem um lugar sem pedidos"
        className=" aspect-[3/3] overflow-hidden rounded-lg object-cover dark:border-gray-800"
        width={400}
        height={400}
        sizes="100%"
        loading="eager"
        src={`${imageURL}/d621bed7-805c-416c-8a78-410f7e9a4463-bjiv6x.svg`}
      />
      <p className="mt-4 text-xl font-bold text-zinc-500">
        Você ainda não marcou nenhuma reserva em um restaurante!
      </p>
    </main>
  );
}
