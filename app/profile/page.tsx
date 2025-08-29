"use client";

import { useUserContext } from "../../contexts/UserContext";

export default function ProfilePage() {
  const { user } = useUserContext() as UserContext;

  return (
    <div className="w-full h-full bg-background flex items-start justify-center p-8">
      <div className="max-w-md w-full border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-800 p-6 text-center space-y-4">
        <img
          src={user.image}
          alt={user.name}
          className="w-20 h-20 rounded-full mx-auto"
        />
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {user.name} {user.lastname}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        <span className="inline-block text-md font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          Role: {user.role}
        </span>
      </div>
    </div>
  );
}
