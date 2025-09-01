import React from "react";

interface ButtonProps {
  text: string;
  className: string;
  handleClick: () => void;
}

const Button = ({ text, className, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} text-white w-[72px] h-[40px] rounded-full text-sm hover:-translate-y-1 transition`}
    >
      {text}
    </button>
  );
};

export default Button;
