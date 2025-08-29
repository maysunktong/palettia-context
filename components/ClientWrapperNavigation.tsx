/* Burrito my layout just to be able to use 'use client' 😵‍💫 */
"use client";

import Footer from "./Footer";
import Navigation from "./Navigation";
import WelcomeBanner from "./WelcomeBanner";

export default function ClientWrapperNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-20">
      {/* Desktop Nav */}
      <div className="hidden md:block md:col-span-4">
        <Navigation />
      </div>

      {/* Main Content */}
      <div className="col-span-1 md:col-span-16">
        <WelcomeBanner />
        {children}
        <Footer />
      </div>

      {/* Mobile Nav*/}
      <div className="md:hidden">
        <Navigation />
      </div>
    </div>
  );
}
