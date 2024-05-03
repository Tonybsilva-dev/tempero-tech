import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header";
import { CartProvider } from "./_contexts/cart";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Tempero Tech",
    default: "Tempero Tech",
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="space-y-8">
            <Header />
            <div className="pt-8">{children}</div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
