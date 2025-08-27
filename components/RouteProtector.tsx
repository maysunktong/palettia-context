"use client";

import { ReactNode } from "react";

import { useUserContext } from "../contexts/contexts";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import LoginForm from "./LoginForm";

export default function RouteProtector({ children }: { children: ReactNode }) {
  const { user, setUser } = useUserContext() as UserContext;

  if (!user) {
    return <LoginForm />;
  }

  if (user.role === "user") {
    return <UserDashboard />;
  }

  if (user.role === "admin") {
    return <AdminDashboard />;
  }

  return <>{children}</>;
}
