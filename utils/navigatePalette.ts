import { useRouter } from "next/navigation";

export const useNavigateToSinglePalette = () => {
  const router = useRouter();

  return (palette: Palette) => {
    const route = encodeURIComponent(palette.text);
    router.push(`/${route}`);
  };
};
