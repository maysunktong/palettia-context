"use client"

import { useUserContext } from "../contexts/contexts";

export default function Home() {
  const { user } = useUserContext() as UserContext;
  return <>Welcome, {user.name}</>;
}
