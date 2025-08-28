import React from "react";
interface ButtonProps {
  text: string;
  color: string;
  handleClick: () => void;
}
const Button = ({ text, color, handleClick }: ButtonProps) => {
  return (
    <button
      onClick={handleClick}
      className={`bg-[${color}] text-white w-[72px] h-[40px] rounded-full text-sm hover:-translate-y-1 transition`}
    >
      {text}
    </button>
  );
};

export default Button;
