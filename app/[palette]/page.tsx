// app/[palette]/page.tsx
"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PalettePage({ params }: PalettePageProps) {
  const router = useRouter();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const resolvedParams = use(params);
  const paletteId = decodeURIComponent(resolvedParams.palette);

  const fetchPalette = async (id: string) => {
    setLoading(true);
    console.log("Fetching palette with ID:", id);

    try {
      const response = await fetch("/api/palette", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: id }),
      });

      const data = await response.json();
      console.log("API response:", data);

      if (Array.isArray(data) && data.length > 0) {
        const foundPalette =
          data.find((p) => p.text.toLowerCase() === id.toLowerCase()) ||
          data[0];

        console.log("Found palette:", foundPalette);
        setPalette(foundPalette);
      } else {
        console.log("No palette found");
      }
    } catch (error) {
      console.log("Error fetching a palette:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (paletteId) {
      fetchPalette(paletteId);
    }
  }, [paletteId]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white p-8">
        <p className="text-center py-20 text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white p-8">
      <div className="w-full">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex justify-center items-center gap-2 mb-8 text-md text-gray-600 hover:text-blue-600 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {palette ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {palette.text}
            </h1>
            <div className="w-full flex justify-center">
              <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-1 text-center">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    className="w-full h-[70vh] group relative"
                    style={{ backgroundColor: color }}
                  >
                    <p className="absolute inset-0 flex items-center justify-center text-md font-medium text-gray-800">
                      {color.toUpperCase()}
                    </p>
                  </div>
                ))}
                <div className="flex gap-2 py-4">
                  {palette.tags.map((tag) => (
                    <p className="text-md font-medium text-gray-800 border-1 border-gray-200 rounded-2xl py-1 px-6">
                      {tag}
                    </p>
                  ))}
                </div>
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
