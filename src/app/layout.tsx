// src/app/layout.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import "./globals.css"; // Import your global CSS here if needed
import { Toaster } from "@/components/ui/toaster";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
