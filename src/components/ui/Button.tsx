import React, { type ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  text,
  startIcon,
  endIcon,
  onClick,
  fullWidth,
  loading
}) => {
  const baseStyles = "rounded-md font-medium inline-flex items-center justify-center";
  const sizeStyles = size === "sm" ? "px-3 py-1 text-sm" : size === "lg" ? "px-5 py-3 text-lg" : "px-4 py-2 text-base";
  const variantStyles = variant === "secondary" ? "bg-violet-100 text-black border border-violet-400 hover:bg-violet-200" : "bg-violet-600 text-white hover:bg-violet-700";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${fullWidth ? "w-full" : ""} ${loading ? " opacity-45" : " cursor-pointer"} ` } 
      disabled={loading}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};
