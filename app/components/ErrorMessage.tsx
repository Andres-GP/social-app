import React from "react";

interface ErrorMessageProps {
  className?: string;
  error: string;
}
const ErrorMessage = ({ className = "", error }: ErrorMessageProps) => {
  return (
    <div
      className={`bg-red-50 border border-red-400 text-red-800 px-4 py-3 rounded-md shadow-sm flex items-center space-x-2 mx-auto w-full max-w-md`}
    >
      <svg
        className="w-5 h-5 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
        />
      </svg>
      <span className="text-sm font-medium">Error: {error}</span>
    </div>
  );
};

export default ErrorMessage;
