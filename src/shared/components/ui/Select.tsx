import React from "react";

interface IProps {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<string | { label: string; value: string | number }>;
  placeholder?: string;
  className?: string;
  selectClassName?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}
const Select: React.FC<IProps> = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seçim edin",
  className = "",
  selectClassName = "",
  error,
  helperText,
  disabled = false,
  name,
  id,
  ...props
}) => {
  const selectId = id || name;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${
          error
            ? "border-red-300 focus:ring-red-400"
            : "border-gray-300 focus:border-transparent"
        } ${selectClassName}`}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => {
          if (typeof option === "string") {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            );
          }

          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>

      {error ? (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      ) : (
        helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
