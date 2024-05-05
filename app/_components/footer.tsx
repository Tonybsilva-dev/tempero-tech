import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 p-6 dark:bg-gray-800 md:py-12">
      <div className="container flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <Link className="flex items-center gap-2" href="#">
          <Image
            src={"/logo/logo-3.png"}
            width={48}
            height={48}
            alt="tempero tech logo"
          />
          <span className="sr-only">Tempero Tech</span>
        </Link>
        <div className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tempero Tech. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link
              className="text-sm underline-offset-4 hover:underline"
              href="#"
            >
              Privacy
            </Link>
            <Link
              className="text-sm underline-offset-4 hover:underline"
              href="#"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
