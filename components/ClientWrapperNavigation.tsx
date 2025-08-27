/* Burrito my layout just to be able to use client T_T */
"use client";

import Navigation from "./Navigation";

export default function ClientWrapperNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
