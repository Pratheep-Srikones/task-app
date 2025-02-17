"use client";

import { logIn, signIn } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notifyError, notifySuccess, notifyWarning } from "@/utils/notify";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const [mode, setMode] = useState<string>("login");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const [user_id, setUser_id] = useState<string | null>(null); // Initialize as null

  useEffect(() => {
    const storedUser_id = localStorage.getItem("user_id");

    if (storedUser_id) {
      setUser_id(storedUser_id);
    } else {
      setUser_id(""); // Set to empty string explicitly if no user_id is found
    }
  }, []);

  useEffect(() => {
    if (user_id === null) {
      return; // Don't run until user_id is initialized
    }

    if (user_id) {
      console.log("User logged in. Redirecting...");
      router.push("/home");
    } else {
      console.log("User not logged in");
    }
  }, [user_id, router]);

  const handleModeChange = (mode: string) => {
    setMode(mode);
  };

  const handleLogin = () => {
    if (!username || !password) {
      notifyWarning("Please fill all the fields");
      return;
    }
    // Call the login API
    try {
      logIn(username, password)
        .then(() => {
          notifySuccess("Logged In Successfully");
          setUsername("");
          setPassword("");
          setTimeout(() => {}, 500);
          router.push("/home");
        })
        .catch((error) => {
          console.error("Error logging in:", error.response.data.error);
          notifyError(error.response.data.error);
        });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const handleSignup = () => {
    if (!username || !password) {
      notifyWarning("Please fill all the fields");
      return;
    }
    // Call the signup API
    try {
      signIn(username, password)
        .then(() => {
          notifySuccess("User created successfully, Proceed to Log In");
          setUsername("");
          setPassword("");
          setMode("login");
        })
        .catch((error) => {
          console.error("Error signing up:", error.response.data.error);
          notifyError(error.response.data.error);
        });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="flex flex-col items-center justify-center bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Mode Toggle Buttons */}
        <div className="flex w-full justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
              mode === "login"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => handleModeChange("login")}
          >
            Login
          </button>
          <button
            className={`px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 ${
              mode === "signup"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
            onClick={() => handleModeChange("signup")}
          >
            SignUp
          </button>
        </div>

        {/* Form Section */}
        <div className="w-full">
          {mode === "login" ? (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
              <div className="mb-4">
                <label className="block font-medium mb-2">Username:</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2">Password:</label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300"
                onClick={handleLogin}
              >
                LOG IN
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-center mb-4">SignUp</h1>
              <div className="mb-4">
                <label className="block font-medium mb-2">Username:</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className="block font-medium mb-2">Password:</label>
                <input
                  type="password"
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-green-800 transition-all duration-300"
                onClick={handleSignup}
              >
                SIGN UP
              </button>
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AuthPage;
