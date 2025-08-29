interface User {
  name: string;
  lastname: string;
  password: string;
  image: string;
  email: string;
  role: string;
}

interface UserContext {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

/* Login Form */
interface FormInputs {
  username: string;
  password: string;
  role?: "user" | "admin";
}

interface FormErrors {
  username?: string;
  password?: string;
  role?: string;
}

/* Color generator */
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

/* [palette] */
interface FavoritesContext {
  favorites: Palette[];
  setFavorites: (favorites: Palette[]) => void;
}
