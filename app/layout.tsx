import type { Metadata } from "next";
import "./globals.css";
import { UserContextProvider } from "../contexts/contexts";
import RouteProtector from "../components/RouteProtector";
import ClientWrapperNavigation from "../components/ClientWrapperNavigation";

export const metadata: Metadata = {
  title: "Palettia",
  description: "Color palette generator",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex gap-4">
        <UserContextProvider>
          <RouteProtector>
            <ClientWrapperNavigation>{children}</ClientWrapperNavigation>
          </RouteProtector>
        </UserContextProvider>
      </body>
    </html>
  );
}
