"use client";

import ColorGenerator from "../components/ColorGenerator";
import { useUserContext } from "../contexts/UserContext";

export default function Home() {
  const { user } = useUserContext() as UserContext;
  return (
    <>
      <div className="w-full text-lg border-1 border-gray-100 dark:border-none p-3 text-center">
        👋 Welcome, {user.name}
      </div>
      <ColorGenerator />
    </>
  );
}
