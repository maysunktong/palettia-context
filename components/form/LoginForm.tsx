"use client";

import { useEffect, useState } from "react";
import { UserData } from "../../data/users";
import { useUserContext } from "../../contexts/UserContext";
import { useRouter } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const initialFormInputs: LoginFormInputs = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const [formInput, setFormInput] =
    useState<LoginFormInputs>(initialFormInputs);
  const { user, setUser } = useUserContext() as UserContext;
  const [error, setError] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isTestUsersShow, setIsTestUsersShow] = useState(false);

  const router = useRouter();

  /* Validate only Username and Password */
  const handleFormValidation = (input: LoginFormInputs): LoginFormErrors => {
    const errorLog: LoginFormErrors = {};

    if (!input.username.trim()) {
      errorLog.username = "Username is required ‼️";
    } else {
      const foundUser = UserData.find((item) => item.name === input.username);
      if (!foundUser) {
        errorLog.username = "This username does not exist! ❌";
      }
    }

    if (!input.password.trim()) {
      errorLog.password = "Password is required ‼️";
    } else {
      const foundPassword = UserData.find(
        (item) => item.password === input.password
      );
      if (!foundPassword) {
        errorLog.password = "Wrong password! ❌";
      }
    }

    return errorLog;
  };

  /* handle change of input - name and value of the certain input */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const validationErrors = handleFormValidation(formInput);
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors);
        setIsLoading(false);
        return;
      }

      const loggedInUser = UserData.find(
        (user) =>
          user.name === formInput.username &&
          user.password === formInput.password
      );

      if (loggedInUser) {
        setUser(loggedInUser);
        router.push("/");
      }

      setFormInput(initialFormInputs);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {

    if (user) {
      try {
        setUser(user);
        console.log("✅ LOGGED IN -- User: " + user.name);
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        setUser(null);
      }
    }
  }, [setUser]);

  /* GSAP logo spinning */
  useGSAP(() => {
    gsap.from("#logo-spin", {
      repeat: -1,
      yoyo: true,
      rotation: 360,
      duration: 3,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full h-screen">
      {/* Desktop Login */}
      <div className="hidden md:block bg-cover bg-center bg-[url(/login-bg.jpg)]" />
      <div className="flex justify-center items-center bg-background">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm p-8 bg-background rounded-lg shadow-md md:shadow-none space-y-2"
        >
          <div className="flex justify-center items-center">
            <img id="logo-spin" src="/favicon.png" alt="logo" width={100} />
          </div>
          <div className="flex flex-col justify-center items-center py-6">
            <img
              src="/nologo-light.png"
              alt="Logo"
              width={200}
              height={200}
              className="block dark:hidden"
            />
            <img
              src="/nologo-dark.png"
              alt="Logo Dark"
              width={200}
              height={200}
              className="hidden dark:block"
            />
          </div>
          <label htmlFor="username" className="block font-medium mb-1">
            Username
          </label>
          <input
            name="username"
            id="username"
            value={formInput.username}
            type="text"
            onChange={handleChange}
            placeholder="Enter your username"
            className={`w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.username && (
            <span className="text-red-500 text-sm mt-1 block">
              {error.username}
            </span>
          )}
          <label htmlFor="password" className="block font-medium mt-4 mb-1">
            Password
          </label>
          <input
            name="password"
            id="password"
            value={formInput.password}
            type="password"
            onChange={handleChange}
            placeholder="Enter your password"
            className={`w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {error.password && (
            <span className="text-red-500 text-sm mt-1 block">
              {error.password}
            </span>
          )}
          <button
            type="submit"
            className="mt-6 w-full py-2 text-black dark:text-white transition cursor-pointer border-1 border-gray-500 hover:border-blue-500 hover:text-blue-500"
          >
            {isLoading ? "Loggin in..." : "Log in"}
          </button>
          <div className="text-gray-400 text-sm text-center py-3">
            <button
              type="button"
              onClick={() => setIsTestUsersShow(!isTestUsersShow)}
              className="hover:underline cursor-pointer"
            >
              Test user login
            </button>
            {isTestUsersShow && (
              <div>
                <ul>
                  <li>admin / password: admin (admin dashboard)</li>
                  <li>user1 / password: user</li>
                  <li>user2 / password: user</li>
                </ul>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Mobile Login */}
      <div className="absolute top-0 left-0 w-full h-full md:hidden bg-cover bg-center bg-[url(/login-bg.jpg)] ">
        <div className="flex justify-center items-center w-full h-full ">
          <form
            onSubmit={handleSubmit}
            className="w-11/12 max-w-sm p-8 shadow-lg bg-background"
          >
            <div className="flex justify-center items-center">
              <img id="logo-spin" src="/favicon.png" alt="logo" width={100} />
            </div>
            <div className="flex flex-col justify-center items-center py-2">
              <img
                src="/nologo-light.png"
                alt="Logo"
                width={200}
                height={200}
                className="block dark:hidden"
              />
              <img
                src="/nologo-dark.png"
                alt="Logo Dark"
                width={200}
                height={200}
                className="hidden dark:block"
              />
            </div>
            <label htmlFor="username-mobile" className="block font-medium mb-1">
              Username
            </label>
            <input
              name="username"
              id="username-mobile"
              value={formInput.username}
              type="text"
              onChange={handleChange}
              placeholder="Enter your username"
              className={`w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error.username && (
              <span className="text-red-500 text-sm mt-1 block">
                {error.username}
              </span>
            )}

            <label
              htmlFor="password-mobile"
              className="block font-medium mt-4 mb-1"
            >
              Password
            </label>
            <input
              name="password"
              id="password-mobile"
              value={formInput.password}
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {error.password && (
              <span className="text-red-500 text-sm mt-1 block">
                {error.password}
              </span>
            )}

            <button
              type="submit"
              className="mt-6 w-full py-2 text-black dark:text-white transition cursor-pointer border-1 border-gray-500 hover:border-blue-500 hover:text-blue-500"
            >
              {isLoading ? "Loggin in..." : "Log in"}
            </button>
            <div className="text-gray-400 text-sm text-center py-3">
              <button
                type="button"
                onClick={() => setIsTestUsersShow(!isTestUsersShow)}
                className="hover:underline cursor-pointer"
              >
                Test user login
              </button>
              {isTestUsersShow && (
                <div>
                  <ul>
                    <li>admin / password: admin (admin dashboard)</li>
                    <li>user1 / password: user</li>
                    <li>user2 / password: user</li>
                  </ul>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
