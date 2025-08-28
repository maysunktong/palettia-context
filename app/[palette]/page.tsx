"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "../../contexts/UserContext";
import { useFavorites } from "../../contexts/FavoritesContext";

export default function PalettePage({ params }: PalettePageProps) {
  const router = useRouter();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, setUser } = useUserContext() as UserContext;
  const { favorites, setFavorites } = useFavorites() as FavoritesContext;
  const username = user.name;

  const resolvedParams = use(params);
  const paletteName = decodeURIComponent(resolvedParams.palette);

  const isFavorite = palette
    ? favorites.some((fav) => fav.id === palette.id)
    : false;

  const handleSaveFavorites = () => {
    if (!palette || isFavorite) return;

    const currentFavorites = [...favorites, palette];
    saveFavorites(username, currentFavorites);
    setFavorites(currentFavorites);
  };

  const saveFavorites = (username: string, favorites: Palette[]) => {
    try {
      localStorage.setItem(`favorites_${username}`, JSON.stringify(favorites));
      console.log(`Saved favorites for ${username}:`, favorites);
    } catch (error) {
      console.error("Error saving favorites:", error);
    }
  };

  const fetchPalette = async (name: string) => {
    setLoading(true);

    try {
      const response = await fetch("/api/palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: name }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        const foundPalette =
          data.find((p) => p.text.toLowerCase() === name.toLowerCase()) ||
          data[0];

        console.log("Found palette:", foundPalette);
        setPalette(foundPalette);
      } else {
        console.log("No palette found");
      }
    } catch (error) {
      console.log("Error fetching a palette:", error);
      setPalette(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paletteName) {
      fetchPalette(paletteName);
    }
  }, [paletteName]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white p-8 flex flex-col justify-center items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white p-8 mt-12">
      <div className="w-full">
        <div className="flex justify-between items-center mb-8">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex justify-center items-center gap-2 text-md text-gray-600 hover:text-blue-600 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {palette && (
            <button
              type="button"
              onClick={handleSaveFavorites}
              className="p-2 rounded-full text-gray-400 hover:text-red-500 transition-colors"
              title={
                isFavorite ? "Already added to favorites" : "Add to favorites"
              }
            >
              {isFavorite ? (
                <span className="text-red-500 font-medium">Added</span>
              ) : (
                <Heart className="w-6 h-6" />
              )}
            </button>
          )}
        </div>

        {palette ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {palette.text}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 py-4">
              {palette.tags.slice(0, 5).map((tag) => (
                <p
                  key={tag}
                  className="text-xs md:text-md font-medium text-gray-800 border-1 border-gray-200 rounded-2xl py-1 px-6"
                >
                  {tag}
                </p>
              ))}
            </div>
            <div className="w-full flex justify-center">
              <div className="max-w-4xl w-full flex flex-col md:flex-row gap-1 text-center">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="w-full h-[10vh] md:h-[60vh] group relative"
                    style={{ backgroundColor: color }}
                  >
                    <p className="absolute inset-0 flex items-center justify-center text-md font-medium text-gray-800">
                      {color.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-center py-20 text-gray-500">Palette not found</p>
        )}
      </div>
    </div>
  );
}
