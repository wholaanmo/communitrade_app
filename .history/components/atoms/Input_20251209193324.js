export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {

  const baseClasses =
    "w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base transition-colors duration-300 focus:border-[#121731] focus:outline-none bg-white";

  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed opacity-60"
    : "";

  // Special styles for radio or checkbox
  const isChoice = type === "radio" || type === "checkbox";

  const choiceClasses = "w-4 h-4 cursor-pointer";

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={
        isChoice
          ? `${choiceClasses} ${className}` // radio/checkbox
          : `${baseClasses} ${disabledClasses} ${className}` // normal inputs
      }
      {...props}
    />
  );
}

