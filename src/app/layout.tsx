"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import "./globals.css"; // Import your global CSS here if needed
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
  );
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Toaster />
          <Elements stripe={stripePromise}>
            <CartProvider>{children}</CartProvider>
          </Elements>
        </SessionProvider>
      </body>
    </html>
  );
}
