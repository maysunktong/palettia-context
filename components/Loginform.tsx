"use client";

import { useState } from "react";
import { UserData } from "../data/users";
import { useUserContext } from "../contexts/contexts";

type FormInputs = {
  username: string;
  password: string;
  role?: "user" | "admin";
};

type FormErrors = {
  username?: string;
  password?: string;
  role?: string;
};

export default function LoginForm() {
  const [formInput, setFormInput] = useState<FormInputs>({
    username: "",
    password: "",
  });
  const { user, setUser } = useUserContext() as UserContext;
  const [error, setError] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFormValidation = (input: FormInputs): FormErrors => {
    const alertError: FormErrors = {};

    if (!input.username.trim()) {
      alertError.username = "Username is required";
    } else {
      const foundUser = UserData.find((u) => u.name === input.username);
      if (!foundUser) {
        alertError.username = "This username does not exist!";
      }
    }

    if (!input.password.trim()) {
      alertError.password = "Password is required";
    } else {
      const foundPassword = UserData.find((u) => u.password === input.password);
      if (!foundPassword) {
        alertError.password = "Wrong password!";
      }
    }

    return alertError;
  };

  const handleChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const validationErrors = handleFormValidation(formInput);
      if (validationErrors) {
        setError(validationErrors);
        setIsLoading(false);
      }

      const loggedInUser = UserData.find(
        (u) =>
          u.name === formInput.username && u.password === formInput.password
      );
      if (loggedInUser) {
        setUser(loggedInUser);
        console.log("✅ Logged in. User: " + loggedInUser.name);
      } else {
        console.log("No user.");
      }

      setFormInput({
        username: "",
        password: "",
      });
    }, 1000);
    return;
  };

  return (
    <form>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        id="username"
        value={formInput.username}
        type="text"
        onChange={handleChange}
        placeholder="Enter your username"
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error.username ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error.username && (
        <span className="text-red-500 text-sm mt-1 block">
          {error.username}
        </span>
      )}
      <label htmlFor="password">Password</label>
      <input
        name="password"
        id="password"
        value={formInput.password}
        type="password"
        onChange={handleChange}
        placeholder="Enter your password"
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error.password ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error.password && (
        <span className="text-red-500 text-sm mt-1 block">
          {error.password}
        </span>
      )}
      <button type="submit" onClick={handleSubmit}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
