import React from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

export const FormField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  error = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <Label required={required} className="mb-2">
          {label}
        </Label>
      )}
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={!!error}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1">{error}</span>
      )}
    </div>
  );
};