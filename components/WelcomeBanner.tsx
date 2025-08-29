import Link from "next/link";
import { useUserContext } from "../contexts/UserContext";

export default function WelcomeBanner() {
  const { user } = useUserContext() as UserContext;
  return (
    <div className="w-full text-sm md:text-lg border-1 border-gray-100 dark:border-none p-3  flex flex-col justify-center items-center">
      <div className="pt-2 pb-3 block md:hidden">
        <Link href="/">
          <img
            src="/logo-light.png"
            alt="Logo"
            width={150}
            height={150}
            className="block dark:hidden"
          />
          <img
            src="/logo-dark.png"
            alt="Logo Dark"
            width={150}
            height={150}
            className="hidden dark:block"
          />
        </Link>
      </div>
      👋 Welcome, {user.name}
    </div>
  );
}
