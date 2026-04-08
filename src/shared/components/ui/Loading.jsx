import React from "react";

const Loading = ({
  message = "Yüklənir...",
  fullScreen = false,
  className = "",
}) => {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : "py-6"
      } ${className}`}
      role="status"
      aria-live="polite"
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
