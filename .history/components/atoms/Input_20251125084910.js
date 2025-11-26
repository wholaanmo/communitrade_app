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
  // Styles for normal inputs
  const baseClasses =
    "w-full p-3 bor

