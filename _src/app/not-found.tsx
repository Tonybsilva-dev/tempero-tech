/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4QDQPM7MuyR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Button } from "./_components/ui/button";

export default function Component() {
  return (
    <main className="flex h-[80dvh] flex-col items-center justify-center px-4 md:px-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-6xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
          Vixe!
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl">
          A página que você está procurando não existe ou não pode ser
          encontrada.
        </p>
        <Button className="px-8 font-bold">
          <Link href="/">Voltar ao início</Link>
        </Button>
      </div>
    </main>
  );
}
