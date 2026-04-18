import React from "react";

interface IProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
  dataTestId?: string;
}
const Loading: React.FC<IProps> = ({
  message = "Yüklənir...",
  fullScreen = false,
  className = "",
  dataTestId = "loading-component",
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-6"
      } ${className}`}
      role="status"
      aria-live="polite"
      data-testid={dataTestId}
    >
      <span
        className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
        aria-hidden="true"
      />
      <span className="text-sm text-gray-600">{message}</span>
    </div>
  );
};

export default Loading;
