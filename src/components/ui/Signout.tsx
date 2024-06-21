import { signOut, useSession } from "next-auth/react";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

export default function Signout() {
  const { toast } = useToast(); // Accessing the 'toast' function from useToast
  const { data: session } = useSession();
  const { cartItems } = useCart();
  return (
    <div className="py-6">
      {session?.user ? (
        <div>
          <button
            onClick={() => {
              signOut();
              toast({
                title: "Sign out successful!",
              });
            }}
            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white"
          >
            Sign Out
          </button>
          <Link href="/cart">
            <button className="relative text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 px-2 py-1 bg-red-500 text-white rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      ) : (
        <a
          href="/signup"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white"
        >
          Log in / Sign up
        </a>
      )}
    </div>
  );
}
