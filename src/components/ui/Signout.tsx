"use client";
import { signOut, useSession } from "next-auth/react";
import { useToast } from "./use-toast";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Signout() {
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const { cartItems } = useCart();

  if (status === "loading") {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="py-6">
      {session?.user ? (
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
          <span className="text-white text-sm font-medium">
            Welcome, {session.user.name}!
          </span>
          <button
            onClick={() => {
              signOut();
              toast({ title: "Sign out successful!" });
            }}
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Out
          </button>
          <Link href="/cart">
            <button className="relative p-2 text-white hover:text-indigo-500">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 px-2 py-1 bg-red-500 text-white rounded-full text-xs">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      ) : (
        <a
          href="/signup"
          className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Log in / Sign up
        </a>
      )}
    </div>
  );
}
