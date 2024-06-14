import Image from "next/image";
import { imageURL } from "../shared/modules/utils/image";

export default function Custom404() {
  return (
    <main className="flex h-[90vh] w-full flex-1 flex-col items-center justify-center">
      <Image
        alt="página não encontrada"
        className="overflow-hidden rounded-lg object-cover dark:border-gray-800"
        width={400}
        height={400}
        sizes="100%"
        loading="eager"
        src={`${imageURL}/30938565-da15-4cfa-a8b0-e8d33be3f3ed-7xmgtp.svg`}
      />
      <p className="mt-8 text-sm font-bold leading-relaxed text-zinc-500 lg:text-xl">
        A página que você estava procurando pode não existir.
      </p>
    </main>
  );
}
