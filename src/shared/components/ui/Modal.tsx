import React, { useEffect } from "react";
import Button from "./Button";
import Loading from "./Loading";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

interface IProps {
  opened: boolean;
  onClose?: () => void;
  size?: "sm" | "md" | "lg";
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  loading?: boolean;
  loadingMessage?: string;
  className?: string;
}
const Modal: React.FC<IProps> = ({
  opened = false,
  onClose,
  size = "md",
  title,
  children,
  showCloseButton = true,
  closeOnOverlayClick = true,
  loading = false,
  loadingMessage,
  className = "",
}) => {
  useEffect(() => {
    if (!opened) {
      return undefined;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [opened, onClose]);

  if (!opened) {
    return null;
  }

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => {
        if (closeOnOverlayClick) {
          onClose?.();
        }
      }}
    >
      <div
        className={`relative w-full ${selectedSize} rounded-md bg-white shadow-sm ${className}`}
        onClick={(event) => event.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {showCloseButton && (
              <Button
                type="button"
                variant="text"
                color="gray"
                className="px-2!"
                onClick={onClose}
              >
                ✕
              </Button>
            )}
          </div>
        )}

        {loading ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center rounded-md bg-white/70">
            <Loading message={loadingMessage || "Yüklənir..."} />
          </div>
        ) : (
          <div className="p-4">{children}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
