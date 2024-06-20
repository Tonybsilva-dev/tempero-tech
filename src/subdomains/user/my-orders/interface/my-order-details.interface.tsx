import dynamic from "next/dynamic";
import { getOrderById } from "../../_actions/get-order-by-id";

const OrderSummary = dynamic(() => import("../components/order-summary"));

interface OrderDetailsProps {
  params: {
    id: string;
  };
}

export const MyOrderDetailsInterface = async ({
  params,
}: OrderDetailsProps) => {
  const { id } = params;

  const order = await getOrderById(id);

  return (
    <main
      className="bg-transparent px-6 py-16 md:px-8 lg:px-10"
      id="order-details"
      aria-labelledby="order-details-heading"
    >
      <div className="container mx-auto">
        <h1 id="order-details-heading" className="mb-1 text-3xl font-bold">
          Detalhes do pedido
        </h1>
        <p className="mb-8 flex items-center justify-between text-lg">
          <span>Verifique aqui os detalhes do seu pedido.</span>
        </p>
        <hr className="h-[1px] w-full bg-zinc-200" />
        <OrderSummary order={order} />
      </div>
    </main>
  );
};
