import React from "react";

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "base" | "outlined" | "text";
  color?: "blue" | "red" | "green" | "gray";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}
const Button: React.FC<IProps> = ({
  children,
  onClick,
  type = "button",
  variant = "base",
  color = "blue",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled = false,
  ...props
}) => {
  const colorClasses = {
    blue: {
      base: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-500",
      outlined:
        "bg-transparent border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
      text: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 px-2",
    },
    red: {
      base: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-red-500",
      outlined:
        "bg-transparent border border-red-500 text-red-600 hover:bg-red-50 focus:ring-red-500",
      text: "bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500 px-2",
    },
    green: {
      base: "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 disabled:bg-green-500",
      outlined:
        "bg-transparent border border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-500",
      text: "bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500 px-2",
    },
    gray: {
      base: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 disabled:bg-gray-500",
      outlined:
        "bg-transparent border border-gray-500 text-gray-600 hover:bg-gray-50 focus:ring-gray-500",
      text: "bg-transparent text-gray-600 hover:bg-gray-50 focus:ring-gray-500 px-2",
    },
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;
  const variantClasses = {
    base: selectedColor.base,
    outlined: selectedColor.outlined,
    text: selectedColor.text,
  };

  const selectedVariant = variantClasses[variant] || variantClasses.base;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${selectedVariant} ${className}`}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      )}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
