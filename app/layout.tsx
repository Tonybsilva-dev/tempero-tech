import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

import Header from "./_components/header";
import { CartProvider } from "./_contexts/cart";
import AuthProvider from "./_providers/auth";
import { Toaster } from "./_components/ui/sonner";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: {
    template: "%s | Tempero Tech",
    default: "Tempero Tech",
  },
  description: "Created by <contato@antoniobsilva.com.br>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
