export const loadFavorites = (username: string): Palette[] => {
  try {
    const saved = localStorage.getItem(`favorites_${username}`);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading favorites:", error);
    return [];
  }
};


