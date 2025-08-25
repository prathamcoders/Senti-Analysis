// src/Button.js
import React from 'react';

const Button = ({ children, variant, size, onClick, className }) => {
  const baseStyle = "py-2 px-4 rounded transition-colors focus:outline-none";
  const variantStyle = variant === 'default' ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white";
  const sizeStyle = size === 'sm' ? "text-sm" : "text-base";
  const styles = {
    border: '1px solid black',
    padding: '15px',
    margin: '10px',
    borderRadius: '30px',
    width:'80px'
  };

  return (
    <button 
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}  // Add the className prop here
      onClick={onClick} 
      style={styles}
    >
      {children}
    </button>
  );
};

export default Button;
