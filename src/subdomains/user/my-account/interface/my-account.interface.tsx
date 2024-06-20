import CardOptionsComponent from "../components/option-card.component";
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
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardsOptionsList.map((card, index) => (
            <CardOptionsComponent key={index} {...card} />
          ))}
        </div>
      </section>
    </main>
  );
};
