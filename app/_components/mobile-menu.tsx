import { useState } from "react";
import { Button } from "./ui/button";
import { Heart, Home, LogIn, LogOut, Menu, ScrollText } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

const MobileMenu = ({ data }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            aria-label="Close Menu"
            variant="ghost"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                    />
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
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-10">
                <h2 className="font-semibold">Olá. Faça seu login!</h2>
                <Button size="icon" onClick={() => signIn()}>
                  <LogIn />
                </Button>
              </div>
            </>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <Link href={"/"}>
              <Button
                variant="ghost"
                className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
              >
                <Home size={16} />
                <span className="block">Início</span>
              </Button>
            </Link>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollText size={16} />
                    <span className="block">Meus Pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start space-x-3 rounded-md text-sm font-normal hover:bg-zinc-100"
                >
                  <Heart size={16} />
                  <span className="block">Restaurantes Favoritos</span>
                </Button>
              </>
            )}
          </div>

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
