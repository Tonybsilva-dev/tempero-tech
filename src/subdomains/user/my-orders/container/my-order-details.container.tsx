import { MyOrderDetailsInterface } from "../interface/my-order-details.interface";
export { MyOrderDetailsInterface } from "../interface/my-order-details.interface";

interface MyOrderDetailsProps {
  params: {
    id: string;
  };
  searchParams: {};
}

export const MyOrderDetailsContainer = ({params}: MyOrderDetailsProps) => {
  return <MyOrderDetailsInterface params={params}/>;
};
