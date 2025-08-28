"use client";

import { ReactNode } from "react";
import LoginForm from "./form/LoginForm";
import { useUserContext } from "../contexts/UserContext";

export default function RouteProtector({ children }: { children: ReactNode }) {
  const { user } = useUserContext() as UserContext;

  if (!user) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
