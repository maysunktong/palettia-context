"use client";

import { useUserContext } from "../contexts/contexts";
import { ReactNode } from "react";
import LoginForm from "./LoginForm";

export default function RouteProtector({ children }: { children: ReactNode }) {
  const { user } = useUserContext() as UserContext;

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
