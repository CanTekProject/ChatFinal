import React, { SetStateAction } from "react";
import LoginFooter from "./ChatLoginFooter";
import InputLogin from "./ChatInputLogin";

type SignInProps = {
  setShowSignInUp: React.Dispatch<SetStateAction<boolean>>;
  showSignInUp: boolean;
  handleLogin: (e: any) => void;
  setUserName: React.Dispatch<SetStateAction<string>>;
  userName: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
  password: string;
};

export default function SignIn({
  setShowSignInUp,
  showSignInUp,
  handleLogin,
  userName,
  setUserName,
  password,
  setPassword,
}: SignInProps) {
  return (
    <form
      className="space-y-4 md:space-y-6"
      action="#"
      onSubmit={(e: any) => handleLogin(e)}
    >
      <div>
        <InputLogin
          label="UserName"
          type="text"
          name="userName"
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
          placeholder="username"
        />
      </div>
      <div>
        <InputLogin
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign in
      </button>
      <LoginFooter
        message="Don’t have an account yet?"
        label="Sign up"
        setShowSignInUp={setShowSignInUp}
        showSignInUp={showSignInUp}
      />
    </form>
  );
}
