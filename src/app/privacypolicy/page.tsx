"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Provider from "@/components/ui/Provider";

export default function PrivacyPolicy() {
  return (
    <Provider>
      <Header />
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <div className="text-white space-y-6">
              <p>
                At SavorServe, we value your privacy. This Privacy Policy
                explains how we collect, use, and protect your personal
                information when you use our website and services.
              </p>
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <p>
                We collect personal information such as your name, email
                address, delivery address, and payment details when you sign up,
                log in, or place an order. We use NextAuth for secure
                authentication and Stripe for online payments.
              </p>
              <h2 className="text-2xl font-semibold">
                How We Use Your Information
              </h2>
              <p>
                Your information is used to process orders, deliver meals,
                improve our services, and allow you to manage your profile and
                reviews. Restaurant owners may use it to manage menus and orders
                via the admin dashboard.
              </p>
              <h2 className="text-2xl font-semibold">Data Protection</h2>
              <p>
                We use encryption and secure servers to protect your data.
                Third-party services like Stripe follow their own security
                standards.
              </p>
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <p>
                You can access, correct, or delete your personal data by
                managing your profile or contacting us.
              </p>
              <h2 className="text-2xl font-semibold">Cookies</h2>
              <p>
                We use cookies to enhance your experience, such as remembering
                your login details and preferences.
              </p>
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>For privacy inquiries, reach us at privacy@savorserve.com.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}
