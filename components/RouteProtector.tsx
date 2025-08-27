"use client";

import { ReactNode } from "react";
import { useUserContext } from "../contexts/contexts";
import Home from "../app/page";
import LoginForm from "./LoginForm";

export default function RouteProtector({ children }: { children: ReactNode }) {
  const { user, setUser } = useUserContext() as UserContext;

  if (!user) {
    return <LoginForm />;
  }

  if (user.role === "user") {
    return <Home />;
  }

  if (user.role === "admin") {
    return <Home />;
  }

  return <>{children}</>;
}
