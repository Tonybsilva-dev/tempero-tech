'use client'

import Image from "next/image";
import { Button } from "../shared/_components/ui/button";
import { useRouter } from "next/navigation";
import { imageURL } from "../shared/modules/utils/image";

export default function Custom404() {
  const router = useRouter();
  const handleBack = () => router.back();

  return (
    <main className="flex h-screen lg:h-[90vh] w-full flex-1 flex-col items-center justify-center">
      <Image
        alt="página não encontrada"
        className="overflow-hidden rounded-lg object-cover dark:border-gray-800"
        width={400}
        height={400}
        sizes="100%"
        loading="lazy"
        src={`${imageURL}/30938565-da15-4cfa-a8b0-e8d33be3f3ed-7xmgtp.svg`}
      />
      <p className="mt-8 text-sm font-bold leading-relaxed text-zinc-500 lg:text-xl">
        A página que você estava procurando pode não existir.
      </p>
      <Button
        onClick={handleBack}
        className="container mt-8 max-w-sm lg:max-w-xl"
      >
        {" "}
        Voltar{" "}
      </Button>
    </main>
  );
}
