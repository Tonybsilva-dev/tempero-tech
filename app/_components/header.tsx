"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/jK7yMpr4CAX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";

import { useEffect, useState } from "react";
import { Beef, Bell, LogOut, Settings, ShoppingCart, User } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import Cart from "./cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import Search from "./search";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  useEffect(() => {
    // Recuperar os dados do carrinho do localStorage
    const cartData = localStorage.getItem("@tempero-tech:cart");
    if (cartData) {
      const parsedCartData: any[] = JSON.parse(cartData);

      const itemCount = parsedCartData.reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      setCartItemCount(itemCount);
    }
  }, []);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white shadow-md dark:bg-gray-950 dark:text-gray-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" href="/">
            <Beef className="h-6 w-6" />
            <span className="text-lg font-bold">Tempero Tech</span>
          </Link>
          <Search />
          <div className="flex items-center space-x-4">
            <Button
              className="relative"
              size={"icon"}
              variant={"ghost"}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-500 px-2 text-xs text-white">
                {cartItemCount}
              </span>
            </Button>
            <Button className="relative" size={"icon"} variant={"ghost"}>
              <Bell className="h-6 w-6" />
              {/* <span className="absolute -right-2 -top-2 rounded-full bg-yellow-500 px-2 text-xs text-white">
                2
              </span> */}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <Image
                    alt="Avatar"
                    className="rounded-full dark:text-white"
                    width="32"
                    height="32"
                    src="/placeholder.png"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Deslogar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader className="space-y-4">
            <SheetTitle className="text-left text-xl">Sacola</SheetTitle>
            <Separator />
          </SheetHeader>

          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
}
