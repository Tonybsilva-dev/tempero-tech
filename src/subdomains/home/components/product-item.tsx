import { Prisma } from "@prisma/client";
import Image from "next/image";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/src/shared/modules/utils/utils";
import { calculateProductTotalPrice, formatCurrency } from "@/src/shared/modules/helpers/price";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      <Link
        className={cn("min-w-[266px] max-w-[266px]", className)}
        href={`/products/${product.id}`}
      >
        <div className={cn("relative h-[150px] w-full", className)}>
          <Image
            src={product.imageUrl}
            alt={product.name}
            quality={75}
            sizes="100%"
            fill
            className="rounded-lg object-cover shadow-md"
          />

          {product.discountPercentage && (
            <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-yellow-500 px-2 py-[2px] text-white">
              <ArrowDownIcon size={12} />
              <span className="text-xs font-semibold">
                {product.discountPercentage}%
              </span>
            </div>
          )}
        </div>

        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-1">
            <h3 className="font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h3>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(Number(product.price))}
              </span>
            )}
          </div>

          <span className="block text-xs text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
