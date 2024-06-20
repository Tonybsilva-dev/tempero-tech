// import CardOptionsComponent from "../components/option-card.component";
import LinkListItem from "../components/option-list.component";
import { cardsOptionsList } from "../helpers/account-options.helper";

export const MyAccountInterface = () => {
  return (
    <main className="container py-16 sm:px-6 lg:px-8">
      <header>
        <h1 className="mb-1 text-3xl font-bold">Minha conta</h1>
        <p className="mb-8 text-lg">Selecione a opção desejada.</p>
      </header>
      <hr className="mb-6 h-[1px] w-full bg-zinc-200" />
      <section aria-labelledby="account-options">
        <h2 id="account-options" className="sr-only">
          Opções da Conta
        </h2>
        <div className="flex-1 space-y-4">
          {cardsOptionsList.map((item, index) => (
            <LinkListItem
              key={index}
              title={item.title}
              description={item.description}
              linkText={item.linkText}
              linkHref={item.linkHref}
            />
          ))}
        </div>
      </section>
    </main>
  );
};
