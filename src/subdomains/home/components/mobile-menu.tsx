"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Heart,
  Home,
  LogIn,
  LogOut,
  Map,
  Menu,
  ScrollText,
  User,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/shared/_components/ui/sheet";
import { Button } from "@/src/shared/_components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/_components/ui/avatar";
import { Separator } from "@/src/shared/_components/ui/separator";

const Search = dynamic(() => import("./search"));

const MobileMenu = ({ data }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const avatarImage = data?.user?.image ?? "/user.svg";

  const handleGoToSignInPage = () => router.push("/signIn");

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            aria-label="Open Menu"
            variant="ghost"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          {data?.user ? (
            <div className="flex justify-between pt-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={avatarImage} alt={data?.user?.name} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-10">
              <h2 className="font-semibold">Olá. Faça seu login!</h2>
              <Button size="icon" onClick={handleGoToSignInPage}>
                <LogIn />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <nav className="space-y-2">
            <div className="mb-2">
              <Search />
            </div>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
              >
                <Home size={16} />
                <span className="block">Início</span>
              </Button>
            </Link>
            <Link href="/maps">
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
              >
                <Map size={16} />
                <span className="block">Mapa</span>
              </Button>
            </Link>

            {data?.user && (
              <>
                <Link href="/my-account">
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
                  >
                    <User size={16} />
                    <span className="block">Minha conta</span>
                  </Button>
                </Link>
                <Link href="/my-orders">
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
                  >
                    <ScrollText size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Button>
                </Link>
                <Link href="/my-favorite-restaurants">
                  <Button
                    variant="ghost"
                    className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
                  >
                    <Heart size={16} />
                    <span className="block">Restaurantes Favoritos</span>
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
              onClick={() => signOut()}
            >
              <LogOut size={16} />
              <span className="block">Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
