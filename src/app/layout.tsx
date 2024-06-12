import "../assets/styles/globals.css";
import "leaflet/dist/leaflet.css";
import { poppins } from "@/_src/app/_lib/fonts";
import type { Metadata } from "next";
import AuthProvider from "../shared/modules/providers/session";
import { CartProvider } from "../subdomains/home/context/cart";
import Header from "../subdomains/home/components/header";
import { Toaster } from "../shared/_components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | Tempero Tech",
    default: "Tempero Tech",
  },
  authors: [
    {
      name: "Antonio Silva",
      url: "https://www.linkedin.com/in/tony-silva/",
    },
  ],
  description: "Created by <contato@antoniobsilva.com.br>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="space-y-8">
              <Header />
              <div className="pt-6">{children}</div>
            </div>
          </CartProvider>
        </AuthProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
