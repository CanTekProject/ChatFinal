import React, { useState } from "react";
import SignIn from "./ChatSignIn";
import SignUp from "./ChatSignup";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigation = useNavigate();
  const [showSignInUp, setShowSignInUp] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && userName && password) {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      });
      const user = await response.json();
      localStorage.setItem("userName", user.username);
      setShowSignInUp(false);
      navigation("/");
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userName && password) {
      try {
        const response = await fetch("http://localhost:4000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        });

        if (response.status === 200) {
          const user = await response.json();
          localStorage.setItem("token", user.token);
          localStorage.setItem("userName", userName);
          navigation("/chat");
        } else {
          navigation("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {showSignInUp ? "Create and account" : "Sign in to your account"}
            </h1>
            {showSignInUp ? (
              <SignUp
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
                setShowSignInUp={setShowSignInUp}
                showSignInUp={showSignInUp}
              />
            ) : (
              <SignIn
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                setShowSignInUp={setShowSignInUp}
                showSignInUp={showSignInUp}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
