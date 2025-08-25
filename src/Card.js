// src/components/ui/Card.js
import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardHeader = ({ children }) => {
  return (
    <div className="border-b mb-4 pb-2">
      <h3 className="text-lg font-semibold">{children}</h3>
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export { Card, CardHeader, CardContent }; // Make sure to export these correctly
