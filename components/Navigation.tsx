"use client";

import gsap from "gsap";
import { User, HeartPlus, House, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useUserContext } from "../contexts/UserContext";
import { useGSAP } from "@gsap/react";

const userNavItems = [
  { name: "Home", icon: <House />, path: "/" },
  { name: "Favorites", icon: <HeartPlus />, path: "/favorites" },
  { name: "Profile", icon: <User />, path: "/profile" },
];

const adminNavItems = [
  { name: "Home", icon: <House />, path: "/" },
  { name: "Favorites", icon: <HeartPlus />, path: "/favorites" },
  { name: "Profile", icon: <User />, path: "/profile" },
  { name: "Users", icon: <Users />, path: "/admin" },
];

export default function Navigation() {
  const { user, setUser } = useUserContext() as UserContext;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      localStorage.removeItem("user");
      setIsLoggingOut(false);
    }, 1000);
    return;
  };

  /* animation GSAP */
  const containerRef = useRef(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      itemsRef.current,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.3,
      }
    );
  }, []);

  const navItems = user.role === "admin" ? adminNavItems : userNavItems;

  const pathname = usePathname();

  return (
    <>
      {/* Desktop Nav */}
      <div
        className="hidden md:flex max-w-5xl h-full flex-col justify-start items-start p-2 md:p-6 border-1 border-gray-100 dark:border-none"
        ref={containerRef}
      >
        <Link href="/">
          <img
            src="/logo-light.png"
            alt="Logo"
            width={300}
            height={300}
            className="block dark:hidden"
          />
          <img
            src="/logo-dark.png"
            alt="Logo Dark"
            width={300}
            height={300}
            className="hidden dark:block"
          />
        </Link>
        <ul className="w-full flex flex-col justify-center items-start gap-2 py-12">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <Link key={item.name} href={item.path} className="w-full">
                <li
                  className={`text-sm md:text-md text-shadow-md w-full flex gap-2 md:gap-6 p-3 cursor-pointer rounded 
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200 dark:hover:text-black"
                  }
                `}
                  ref={(el: HTMLLIElement | null) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                >
                  <span className="w-6 h-6">{item.icon}</span> {item.name}
                </li>
              </Link>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer mt-8 py-3 px-6 bg-none border-1 border-gray-500 text-gray-500 hover:border-gray-600 hover:text-black dark:hover:text-white dark:border-gray-600 dark:hover:border-gray-300"
        >
          {isLoggingOut ? "Logging out..." : "Log out"}
        </button>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full flex md:hidden justify-around items-center bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`p-2 flex flex-col items-center ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={handleLogout}
          className="p-2 flex flex-col items-center text-gray-500"
        >
          {""}
          <LogOut />
        </button>
      </div>
    </>
  );
}
