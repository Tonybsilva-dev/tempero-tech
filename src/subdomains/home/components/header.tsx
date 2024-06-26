"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { Bell, ShoppingCart } from "lucide-react";

import UserMenu from "./user-menu";
import MobileMenu from "./mobile-menu";

import Image from "next/image";
import { CartContext } from "../context/cart";
import Search from "./search";
import { Button } from "@/src/shared/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/shared/_components/ui/sheet";
import { Separator } from "@/src/shared/_components/ui/separator";
import Cart from "./cart";

export default function Header() {
  const { data, status } = useSession();
  const { totalQuantity } = useContext(CartContext);

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white shadow-md dark:bg-gray-950 dark:text-gray-50">
        <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" href="/" aria-label="Home">
            <Image
              src={"/logo/logo-3.png"}
              width={24}
              height={24}
              alt="Tempero Tech logo"
              quality={75}
              sizes="100%"
            />
            <span className="text-lg font-bold">Tempero Tech</span>
          </Link>
          <div className="lg:hidden">
            <MobileMenu data={data} />
          </div>
          <div className="hidden lg:flex lg:flex-1">
            <Search />
          </div>

          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <Button
              className="relative"
              size="icon"
              variant="ghost"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-500 px-2 text-xs text-white">
                {totalQuantity}
              </span>
            </Button>
            <Button
              className="relative"
              size="icon"
              variant="ghost"
              aria-label="Notifications"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-500 px-2 text-xs text-white">
                2
              </span>
            </Button>
            <UserMenu status={status} data={data} />
          </div>
        </nav>
      </header>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader className="space-y-4">
            <SheetTitle className="text-left text-xl">Sacola</SheetTitle>
            <Separator />
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
}
