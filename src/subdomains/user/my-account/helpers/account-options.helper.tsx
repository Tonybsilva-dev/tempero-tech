import { CreditCardIcon, KeyIcon, PhoneIcon, UserIcon } from "lucide-react";
import type { FC } from "react";

interface LinkListItemProps {
  icon: FC<{ className?: string }>;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  image?: string;
}

export const cardsOptionsList: LinkListItemProps[] = [
  {
    icon: KeyIcon,
    title: "Credenciais",
    description: "Gerencie seu nome de usuário, email e senha.",
    linkText: "Gerenciar Credenciais",
    linkHref: "#",
  },
  {
    icon: PhoneIcon,
    title: "Contato",
    description: "Atualize seu número de telefone e endereço.",
    linkText: "Gerenciar Contato",
    linkHref: "#",
  },
  {
    icon: UserIcon,
    title: "Informações Pessoais",
    description:
      "Atualize seu nome, data de nascimento e outros detalhes pessoais.",
    linkText: "Gerenciar Informações Pessoais",
    linkHref: "#",
  },
  {
    icon: CreditCardIcon,
    title: "Preferências de Pagamento",
    description: "Personalize as preferências e o estilo da sua conta.",
    linkText: "Gerenciar Preferências de Pagamento",
    linkHref: "#",
  },
];
