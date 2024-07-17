import React from "react";
import Header from "../../../shared/_components/application/header";

type Props = {
  children: React.ReactNode;
};

export default function SimpleLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
