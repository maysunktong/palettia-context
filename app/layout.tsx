import type { Metadata } from "next";
import "./globals.css";
import RouteProtector from "../components/RouteProtector";
import ClientWrapperNavigation from "../components/ClientWrapperNavigation";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import { UserContextProvider } from "../contexts/UserContext";

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
          <FavoritesProvider>
            <RouteProtector>
              <ClientWrapperNavigation>{children}</ClientWrapperNavigation>
            </RouteProtector>
          </FavoritesProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
