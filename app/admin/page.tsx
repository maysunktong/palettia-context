"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUserContext } from "../../contexts/UserContext";
import { loadFavorites } from "../../utils/generator";

export default function AdminDashboard() {
  const router = useRouter();
  const { setFavorites } = useFavorites() as FavoritesContext;
  const { user } = useUserContext() as UserContext;

  const [allFavorites, setAllFavorites] = useState<
    { username: string; favorites: Palette[] }[]
  >([]);

  const usernames = ["user1", "user2"];
  useEffect(() => {
    const data = usernames.map((username) => ({
      username,
      favorites: loadFavorites(username),
    }));
    setAllFavorites(data);

    setFavorites(data.flatMap((u) => u.favorites));
  }, []);

  /* Block access for users to admin dashboard */
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.replace("/");
    }
  }, [user, router]);

  const removeFromFavorites = (username: string, palette: Palette) => {
    const updated = allFavorites.map((userData) =>
      userData.username === username
        ? {
            ...userData,
            favorites: userData.favorites.filter(
              (item) => item.text.toLowerCase() !== palette.text.toLowerCase()
            ),
          }
        : userData
    );

    setAllFavorites(updated);

    try {
      const user = updated.find((u) => u.username === username);
      localStorage.setItem(
        `favorites_${username}`,
        JSON.stringify(user?.favorites || [])
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const navigateToSinglePalette = (palette: Palette) => {
    const route = encodeURIComponent(palette.text);
    router.push(`/${route}`);
  };

  return (
    <div className="w-full min-h-screen bg-white p-8 pb-24">
      <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-800 my-12">
        User Management Dashboard
      </h1>

      {allFavorites.map(({ username, favorites }) => (
        <div key={username} className="mb-12">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 rounded-lg border-blue-600 p-2 bg-gray-100">
            Name: {username}
          </h2>

          {favorites.length === 0 ? (
            <p className="text-gray-500 text-sm mb-4 text-center py-4">
              No favorites for {username}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((palette) => (
                <div
                  key={`${username}_${palette.text}`}
                  className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeFromFavorites(username, palette)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
                    title="Remove from favorites"
                  >
                    <X className="w-8 h-8" />
                  </button>
                  <div
                    onClick={() => navigateToSinglePalette(palette)}
                    className="cursor-pointer"
                  >
                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 flex-1 py-2">
                      {palette.text}
                    </h3>
                    <div className="w-full flex cursor-pointer">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="group relative flex-1 aspect-square overflow-hidden border border-amber-50"
                          style={{ backgroundColor: color }}
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-transparent hover:text-gray-700">
                            {color}
                          </span>
                        </div>
                      ))}
                    </div>

                    {palette.tags && palette.tags.length > 0 && (
                      <div className="flex flex-wrap justify-start items-center gap-1 mt-3 text-xs">
                        <p className="text-gray-400">Keywords:</p>
                        {palette.tags.slice(0, 3).map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
