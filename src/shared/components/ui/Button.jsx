import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "base",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled = false,
  ...props
}) => {
  const variantClasses = {
    base: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-500",
    outlined:
      "bg-transparent border border-blue-500 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    text: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500 px-2",
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
