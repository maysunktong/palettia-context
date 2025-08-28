"use client";

import { useUserContext } from "../../contexts/UserContext";

export default function ProfilePage() {
  const { user } = useUserContext() as UserContext;

  return (
    <div className="w-full h-auto bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm border rounded-xl p-6 bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="space-y-4 text-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-20 h-20 rounded-full mx-auto"
          />
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {user.name} {user.lastname}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
          <span className="inline-block text-md font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Role: {user.role}
          </span>
        </div>
      </div>
    </div>
  );
}
