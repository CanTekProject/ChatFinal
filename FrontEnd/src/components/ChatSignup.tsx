import React, { SetStateAction } from "react";
import LoginFooter from "./ChatLoginFooter";
import InputLogin from "./ChatInputLogin";
type SignUpProps = {
  setShowSignInUp: React.Dispatch<SetStateAction<boolean>>;
  showSignInUp: boolean;
  handleRegister: (e: any) => void;
  userName: string;
  setUserName: React.Dispatch<SetStateAction<string>>;
  setEmail: React.Dispatch<SetStateAction<string>>;
  email: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
  password: string;
};

export default function SignUp({
  setShowSignInUp,
  showSignInUp,
  handleRegister,
  userName,
  setUserName,
  setEmail,
  email,
  password,
  setPassword,
}: SignUpProps) {
  return (
    <form
      className="space-y-4 md:space-y-6"
      action="#"
      onSubmit={(e: any) => handleRegister(e)}
    >
      <div>
        <InputLogin
          label="Username"
          type="text"
          name="userName"
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
          placeholder="username"
        />
      </div>
      <div>
        <InputLogin
          label="Email"
          type="text"
          name="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          placeholder="name@company.com"
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
        Create an account
      </button>
      <LoginFooter
        message="Already have an account?"
        label="Login here"
        setShowSignInUp={setShowSignInUp}
        showSignInUp={showSignInUp}
      />
    </form>
  );
}
