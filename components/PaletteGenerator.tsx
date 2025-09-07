"use client";

import { useState, useEffect } from "react";
import { Search, ExternalLink } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PaletteGenerator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const popularSearches = ["summer", "pastel", "autumn", "candy", "winter"];

  const randomizedSearchQuery =
    popularSearches[Math.floor(Math.random() * popularSearches.length)];

  const fetchPalettes = async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/palette?q=${encodeURIComponent(randomizedSearchQuery)}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setPalettes(data);
        if (data.length === 0) {
          setError("No palettes found");
        }
      } else {
        throw new Error("Wrong format. Data needs to be array");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError(
        `Search failed: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      setPalettes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetchPalettes(searchQuery);
  };

  useEffect(() => {
    const urlSearchQuery = searchParams.get("search");
    if (urlSearchQuery) {
      setSearchQuery(urlSearchQuery);
      fetchPalettes(urlSearchQuery);
    } else {
      fetchPalettes(randomizedSearchQuery);
    }
  }, []);

  const navigateToSinglePalette = (palette: Palette) => {
    const route = encodeURIComponent(palette.text);
    router.push(`/${route}`);
  };

  return (
    <div className="w-full min-h-screen bg-white px-8 md:px-20 pt-8 md:pt-12 pb-6 md:pb-24">
      <div className="text-center pb-6 space-y-2">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Color Palette Generator
        </h1>
        <p className="text-xs md:text-lg text-gray-400 max-w-2xl mx-auto">
          Type to generate your very own palettes 🎨
        </p>
      </div>
      <div className="max-w-2xl mx-auto mb-4">
        <form onSubmit={handleSearch} className="relative py-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search color palettes..."
              className="w-full pl-12 pr-4 py-2 text-black text-lg border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent bg-white"
            />
          </div>
        </form>
      </div>

      {!loading && palettes.length > 0 && (
        <div>
          <p className="pb-4 text-xs md:text-lg text-right text-gray-500">
            Found {palettes.length} results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {palettes.map((palette) => (
              <div
                key={palette.id}
                onClick={() => navigateToSinglePalette(palette)}
                className="cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-800 flex-1 py-2">
                      {palette.text}
                    </h3>
                    <button
                      type="button"
                      onClick={() => navigateToSinglePalette(palette)}
                      className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {""}
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="w-full flex cursor-pointer">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="group relative flex-1 aspect-square overflow-hidden border-1 border-amber-50"
                        style={{ backgroundColor: color }}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-400 md:text-transparent md:hover:text-gray-600">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>

                  {palette.tags && palette.tags.length > 0 && (
                    <div className="flex flex-wrap justify-start items-center gap-1 mt-3 text-xs">
                      <p className="text-gray-400">Keywords: </p>
                      {palette.tags.slice(0, 3).map((tag, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => {
                            setSearchQuery(tag);
                            fetchPalettes(tag);
                          }}
                          className="text-gray-400 hover:text-blue-600 px-2 py-1 rounded-2xl cursor-pointer transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="w-full text-center py-12">
          <p className="text-gray-500">
            ⚠️ Error occured 👷🏻‍♀️ or keyword not exist
          </p>
        </div>
      )}

      {loading && (
        <div className="w-full min-h-screen bg-white p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p>Loading...</p>
        </div>
      )}

      {!loading && !error && palettes.length === 0 && (
        <div className="w-full text-center py-12">
          <p className="text-gray-500">
            👩🏻‍💻 We are trying to fetch from API. Please wait...
          </p>
        </div>
      )}
    </div>
  );
}
