"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Provider from "./Provider";
import Signout from "./Signout";
import Image from "next/image";

export default function Header() {
  const navigation = [
    { name: "Italian", href: "/1" },
    { name: "American", href: "/9" },
    { name: "Asian", href: "/10" },
    { name: "Mexican", href: "/11" },
    { name: "Chinese", href: "/12" },
    { name: "Thai", href: "/13" },
    { name: "Vegan", href: "/14" },
    { name: "Non-Veg", href: "/15" },
    { name: "Deserts", href: "/16" },
  ];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Provider>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/homepage" className="-m-1.5 p-1.5">
              <span className="sr-only">SavorServe</span>
              <Image
                className="h-28 w-auto"
                src="/images/logo.jpg"
                alt="SavorServe Logo"
                width={112}
                height={28}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-white"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Signout />
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="mt-12 mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-100 hover:bg-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <Signout />
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </Provider>
  );
}
