"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Provider from "@/components/ui/Provider";

export default function TermsOfService() {
  return (
    <Provider>
      <Header />
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-6">
              Terms of Service
            </h1>
            <div className="text-white space-y-6">
              <p>
                Welcome to SavorServe! These Terms of Service govern your use of
                our website and services. By using SavorServe, you agree to
                these terms.
              </p>
              <h2 className="text-2xl font-semibold">Eligibility</h2>
              <p>
                You must be at least 13 years old to use our services. You are
                responsible for maintaining the security of your account,
                powered by NextAuth.
              </p>
              <h2 className="text-2xl font-semibold">Ordering and Payments</h2>
              <p>
                You can order meals from listed restaurants using cash or
                Stripe-powered online payments. Orders are subject to
                availability, and delivery times may vary.
              </p>
              <h2 className="text-2xl font-semibold">Refunds</h2>
              <p>
                Refunds are issued at the discretion of restaurant owners per
                their policies.
              </p>
              <h2 className="text-2xl font-semibold">User Conduct</h2>
              <p>
                You may not misuse our platform, including posting false reviews
                or tampering with the admin dashboard if unauthorized.
              </p>
              <h2 className="text-2xl font-semibold">Intellectual Property</h2>
              <p>
                All content on SavorServe, including restaurant listings and
                menus, is owned by us or our partners.
              </p>
              <h2 className="text-2xl font-semibold">
                Limitation of Liability
              </h2>
              <p>
                We are not liable for issues arising from restaurant services or
                delivery delays.
              </p>
              <h2 className="text-2xl font-semibold">Changes to Terms</h2>
              <p>
                We may update these terms and will notify you via email or the
                website.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
