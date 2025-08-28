interface User {
  name: string,
  lastname: string,
  password: string,
  image: string,
  email: string,
  role: string
}

interface UserContext {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

/* UI types */

interface Palette {
  id: string;
  colors: string[];
  tags: string[];
  text: string;
}



interface Palette {
  id: string;
  colors: string[];
  tags: string[];
  text: string;
}

interface PalettePageProps {
  params: Promise<{
    palette: string;
  }>;
}

interface FavoritesContext {
  favorites: Palette[];
  setFavorites: (favorites: Palette[]) => void;
}
