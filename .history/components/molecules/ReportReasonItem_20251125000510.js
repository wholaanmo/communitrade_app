export default function ReportReasonItem({ reason, selected, onSelect, className = '' }) {
  const { value, label } = reason;

  return (
    <label
      className={`flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer transition-all duration-300 hover:border-[#121731] hover:bg-gray-50 ${className}`}
    >
      <Input
        type="radio"
        value={value}
        checked={selected}
        onChange={(e) => onSelect?.(e.target.value)}
        className="mr-3"
      />
      <span className="font-medium text-[#121731]">{label}</span>
    </label>
  );
}
