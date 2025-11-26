import React from 'react';

export const Input = ({
  type = 'text',
  value,
  onChange,
  placeholder = '',
  disabled = false,
  error = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full p-3 border rounded-lg font-inherit text-sm transition-colors duration-300 focus:outline-none';
  
  const stateClasses = error 
    ? 'border-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:border-[#121731]';

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`${baseClasses} ${stateClasses} ${className}`}
      {...props}
    />
  );
};