"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Provider from "@/components/ui/Provider";
import Spinner from "@/components/ui/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    setError(""); // Reset error state

    const signInResponse = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    });

    if (signInResponse?.error) {
      setSuccess(false);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setError(signInResponse.error);
    } else {
      setSuccess(true);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
      });
      router.push("/homepage");
    }
    setLoading(false);
  };

  return (
    <Provider>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white-100 flex flex-col min-h-screen">
          <Header />
          <div className="relative isolate px-6 pt-14 lg:px-8 flex-grow">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
            <div className="mx-auto max-w-md py-8 mt-32">
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              <form className="space-y-4 text-black" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={user.email}
                    required
                    onChange={handleChange}
                    className="mt-1 block text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={user.password}
                    required
                    onChange={handleChange}
                    className="mt-1 block text-white w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="mt-4 text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-white hover:text-indigo-500 "
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </Provider>
  );
}
