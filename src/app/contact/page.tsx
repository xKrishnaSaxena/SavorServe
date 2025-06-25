"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Provider from "@/components/ui/Provider";

export default function ContactUs() {
  return (
    <Provider>
      <Header />
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-6">Contact Us</h1>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full p-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:text-white"
                />
              </div>
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
                  className="mt-1 block w-full p-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full p-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:text-white"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
            <div className="mt-10 text-white space-y-2">
              <p>
                <strong>Email:</strong> support@savorserve.com
              </p>
              <p>
                <strong>Address:</strong> 123 Foodie Lane, Culinary City, FL
                12345
              </p>
              <p>
                <strong>Support:</strong> For order issues, email
                orders@savorserve.com
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
