"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../../shared/_components/ui/dropdown-menu";
import { Button } from "../../../shared/_components/ui/button";
import { User, Settings, LogOut, LogIn, Heart, ScrollText } from "lucide-react";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserMenu = ({ status, data }: any) => {
  const router = useRouter();

  const GoToSignInPage = () => router.push("/signIn");
  const avatarImage = data?.user?.image ?? "/user.svg";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <Avatar>
            <AvatarImage
              src={avatarImage}
              loading="eager"
              sizes="100%"
              width={24}
              height={24}
              className="rounded"
            />
            <AvatarFallback>
              {data?.user?.name?.split(" ")[0][0]}
              {data?.user?.name?.split(" ")[1][0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {data?.user?.name ? data.user.name : "Minha conta"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {status === "authenticated" ? (
          <>
            <Link href="/my-account">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Minha conta
              </DropdownMenuItem>
            </Link>
            <Link href="/my-orders">
              <DropdownMenuItem>
                <ScrollText className="mr-2 h-4 w-4" />
                Meus pedidos
              </DropdownMenuItem>
            </Link>
            <Link href="/my-favorite-restaurants">
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                Restaurantes favoritos
              </DropdownMenuItem>
            </Link>
            <div className="py-1">
              <DropdownMenuSeparator />
            </div>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Deslogar
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={GoToSignInPage}>
            <LogIn className="mr-2 h-4 w-4" />
            Logar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
