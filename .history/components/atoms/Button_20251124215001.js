import React from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'flex items-center justify-center rounded-lg font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-[#121731] text-white border border-[#121731] hover:bg-[#728a9c] hover:border-[#728a9c]',
    secondary: 'bg-white text-[#728a9c] border border-[#728a9c] hover:bg-[#728a9c] hover:text-white',
    danger: 'bg-red-600 text-white border border-red-600 hover:bg-red-700 hover:border-red-700',
    ghost: 'bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white'
  };
  
  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <>
          <span className="material-icons mr-2 animate-spin">refresh</span>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};