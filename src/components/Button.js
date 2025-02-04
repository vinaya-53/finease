import React from 'react';

const Button = ({ className, children, ...props }) => (
  <button className={`px-4 py-2 rounded-2xl ${className}`} {...props}>
    {children}
  </button>
);
export default Button;