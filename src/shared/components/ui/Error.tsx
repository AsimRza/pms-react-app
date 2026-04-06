import React from "react";
import Button from "./Button";

interface IProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}
const Error: React.FC<IProps> = ({
  message = "Xəta baş verdi. Zəhmət olmasa yenidən yoxlayın.",
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`w-full rounded-md border border-red-200 bg-red-50 p-4 text-red-700 ${className}`}
      role="alert"
    >
      <p className="text-sm">{message}</p>
      {onRetry && (
        <div className="mt-3">
          <Button type="button" variant="outlined" onClick={onRetry}>
            Yenidən cəhd et
          </Button>
        </div>
      )}
    </div>
  );
};

export default Error;
