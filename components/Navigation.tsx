"use client";

import gsap from "gsap";
import { User, HeartPlus, House, LayoutGrid, Users } from "lucide-react";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { useUserContext } from "../contexts/contexts";

const navItems = [
  { name: "Home", icon: <House />, path: "/", role: "user" },
  {
    name: "Categories",
    icon: <LayoutGrid />,
    path: "/categories",
    role: "user",
  },
  { name: "Favorites", icon: <HeartPlus />, path: "/favorites", role: "user" },
  { name: "Profile", icon: <User />, path: "/profile", role: "user" },
  { name: "Users", icon: <Users />, path: "/admin", role: "admin" },
];

export default function Navigation() {
  const { user, setUser } = useUserContext() as UserContext;
  const [isLogginOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      setUser(null);
      setIsLoggingOut(false);
    }, 1000);
    return;
  };

  const containerRef = useRef(null);
  const itemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
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

  return (
    <div
      className="max-w-4xl flex flex-col justify-start items-start py-6"
      ref={containerRef}
    >
      <Link href="/">
        <img src="/logo.png" alt="" width={300} height={300} />
      </Link>
      <ul className="w-full flex flex-col justify-center items-start gap-4">
        {navItems
          .filter((item) => item.role === user.role)
          .map((item, index) => (
            <Link key={item.name} href={item.path} className="w-full">
              <li
                className="w-full flex gap-4 rounded-xl hover:bg-[#00b4d8] hover:text-white p-4 cursor-pointer"
                ref={(el: HTMLLIElement | null) => {
                  if (el) itemsRef.current[index] = el;
                }}
              >
                {item.icon} {item.name}
              </li>
            </Link>
          ))}
      </ul>
      <button type="button" onClick={handleLogout} className="cursor-pointer">
        {isLogginOut ? "Logging out..." : "Log out"}
      </button>
    </div>
  );
}
