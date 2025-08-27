interface User {
  name: string,
  password: string,
  role: string
}

interface UserContext {
  user: UserType | null;
  setUser: (user: UserType) => void;
}

/* UI types */
