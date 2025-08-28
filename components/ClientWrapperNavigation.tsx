/* Burrito my layout just to be able to use client T_T */
"use client";

import Navigation from "./Navigation";

export default function ClientWrapperNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-20 min-h-screen w-full">
      <div className="col-span-3">
        <Navigation />
      </div>
      <div className="col-span-17">{children}</div>
    </div>
  );
}
