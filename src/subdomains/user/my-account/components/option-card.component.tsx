import { FC } from "react";
import Link from "next/link";

export interface CardProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const CardOptionsComponent: FC<CardProps> = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
}) => (
  <article className="flex h-full flex-col overflow-hidden rounded-lg bg-background shadow-lg">
    <header className="flex-1 p-6">
      <div className="mb-4 flex items-center">
        <Icon className="mr-4 h-8 w-8 text-primary" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </header>
    <footer>
      <Link
        href={linkHref}
        className="block bg-muted px-6 py-3 text-center font-medium hover:bg-accent hover:text-accent-foreground"
        prefetch={false}
        aria-label={`Link para ${title}`}
      >
        {linkText}
      </Link>
    </footer>
  </article>
);

export default CardOptionsComponent;
