import Image from "next/image";
import { Metadata } from "next";
import SocialButtonForm from "../_components/social-buttons-fom";

export const metadata: Metadata = {
  title: "Login",
};

export default function SignInPage() {
  return (
    <div className="mx-auto grid h-screen max-w-6xl items-center gap-6 px-4 py-6 md:grid-cols-2 lg:gap-12">
      <div className="flex items-center justify-center">
        <Image
          alt="Imagem de um chef"
          className="aspect-[3/3] w-full overflow-hidden rounded-lg object-cover dark:border-gray-800"
          height={900}
          src="/chef.svg"
          width={600}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
          <h2 className="mb-1 text-center text-3xl font-bold lg:text-4xl">
            Acessar conta
          </h2>
          <p className="mb-6 text-center text-xl font-thin text-zinc-500">
            Escolha sua forma de ingresso
          </p>
          <SocialButtonForm />
        </div>
      </div>
    </div>
  );
}
