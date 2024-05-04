"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { Beef, Bell, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Separator } from "./ui/separator";
import Cart from "./cart";
import Search from "./search";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";
import MobileMenu from "./mobile-menu";
import { CartContext } from "../_contexts/cart";

export default function Header() {
  const { data, status } = useSession();
  const { totalQuantity } = useContext(CartContext);

  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 w-full bg-white shadow-md dark:bg-gray-950 dark:text-gray-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link className="flex items-center gap-2" href="/">
            <Beef className="h-6 w-6" />
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
            >
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-500 px-2 text-xs text-white">
                {totalQuantity}
              </span>
            </Button>
            <Button className="relative" size="icon" variant="ghost">
              <Bell className="h-6 w-6" />
              <span className="absolute -right-2 -top-2 rounded-full bg-yellow-500 px-2 text-xs text-white">
                2
              </span>
            </Button>
            <UserMenu status={status} data={data} />
          </div>
        </div>
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
