"use client";
import { useRouter } from "next/navigation";
import { useFavorites } from "../../contexts/FavoritesContext";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect } from "react";
import { X } from "lucide-react";

const loadFavorites = (username: string): Palette[] => {
  try {
    const saved = localStorage.getItem(`favorites_${username}`);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};

export default function Favorites() {
  const router = useRouter();
  const { user, setUser } = useUserContext() as UserContext;
  const { favorites, setFavorites } = useFavorites() as FavoritesContext;

  const username = user.name;

  const loadUserFavorites = () => {
    const userFavorites = loadFavorites(username);
    setFavorites(userFavorites);
  };

  const removeFromFavorites = (palette: Palette) => {
    const updatedFavorites = favorites.filter(
      (item) => item.text.toLowerCase() !== palette.text.toLowerCase()
    );
    setFavorites(updatedFavorites);

    try {
      localStorage.setItem(
        `favorites_${username}`,
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  const navigateToSinglePalette = (palette: Palette) => {
    const route = encodeURIComponent(palette.text);
    console.log("Navigating to palette:", route);
    router.push(`/${route}`);
  };

  useEffect(() => {
    loadUserFavorites();
  }, [username]);

  return (
    <div className="w-full min-h-screen bg-white p-8 pb-24">
      <h1 className="text-center text-2xl md:text-4xl font-bold text-gray-800 my-12">
        Favorite list
      </h1>
      {favorites.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500 text-center py-8">No favorites shown</p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="cursor-pointer mt-8 py-3 px-6 bg-none border-1 border-gray-300 text-gray-400 hover:border-gray-600 hover:text-black dark:hover:text-white dark:border-gray-600 dark:hover:border-gray-300"
          >
            Explore
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((palette) => (
            <div
              key={palette.text}
              className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group"
            >
              <button
                type="button"
                onClick={() => removeFromFavorites(palette)}
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
                      className="group relative flex-1 aspect-square overflow-hidden border-1 border-amber-50"
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
                    <p className="text-gray-400">Keywords: </p>
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
  );
}
