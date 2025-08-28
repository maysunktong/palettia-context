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
          data.find(
            (p) =>
              p.text.toLowerCase() === id.toLowerCase()
          ) || data[0];

        console.log("Found palette:", foundPalette);
        setPalette(foundPalette);
      } else {
        console.log("No palettes in response");
      }
    } catch (err) {
      console.log("Error fetching palette:", err);
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
    <div className="w-full min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {palette ? (
          <div>
            {/* Palette name */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              {palette.text}
            </h1>

            {/* Colors display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {palette.colors.map((color, index) => (
                <div key={index} className="text-center">
                  {/* Color square */}
                  <div
                    className="w-full aspect-square rounded-lg mb-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  {/* Color code */}
                  <p className="text-gray-800 font-mono text-sm">
                    {color.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center py-20 text-gray-500">Palette not found</p>
        )}
      </div>
    </div>
  );
}
