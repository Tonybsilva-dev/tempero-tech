import { FC } from "react";

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

interface LinkListItemProps {
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  image?: string;
}

const LinkListItem: FC<LinkListItemProps> = ({
  title,
  description,
  linkText,
  linkHref,
}) => {
  return (
    <Link
      href={linkHref}
      className={`flex items-center justify-between rounded-md border border-gray-200 p-4 hover:border-yellow-500 hover:bg-yellow-50`}
    >
      {/* TODO IMAGE RELATIONSHIP */}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-yellow-500 hover:underline">{linkText}</p>
      </div>
      <ArrowRightIcon className="h-5 w-5 text-yellow-500" />
    </Link>
  );
};

export default LinkListItem;
