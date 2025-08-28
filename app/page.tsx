"use client";

import ColorGenerator from "../components/ColorGenerator";
import { useUserContext } from "../contexts/contexts";

export default function Home() {
  const { user } = useUserContext() as UserContext;
  return (
    <>
      <div className="w-full text-lg text-gray-500 bg-gray-50 p-3 text-center">👋 Welcome, {user.name}</div>
      <ColorGenerator />
    </>
  );
}
