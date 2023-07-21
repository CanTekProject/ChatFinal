import React, { SetStateAction } from "react";
type LoginFooterProps = {
  message: string;
  label: string;
  setShowSignInUp: React.Dispatch<SetStateAction<boolean>>;
  showSignInUp: boolean;
};

export default function LoginFooter({
  message,
  label,
  setShowSignInUp,
  showSignInUp,
}: LoginFooterProps) {
  function handleToogle() {
    setShowSignInUp(!showSignInUp);
  }

  return (
    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
      {message}{" "}
      <a
        href="#"
        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        onClick={handleToogle}
      >
        {label}
      </a>
    </p>
  );
}
