"user client";

import { signOut, useSession } from "next-auth/react";

export default function Signout() {
  const { data: session } = useSession();

  return (
    <div className="py-6">
      {session?.user ? (
        <button
          onClick={() => signOut()}
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white "
        >
          Sign Out
        </button>
      ) : (
        <a
          href="/signup"
          className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white "
        >
          Log in / Sign up
        </a>
      )}
    </div>
  );
}
