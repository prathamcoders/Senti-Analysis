// src/Table.js
import React from 'react';

export const Table = ({ children }) => {
  return <table className="min-w-full border-collapse border border-gray-300">{children}</table>;
};

export const TableHeader = ({ children }) => {
  return <thead className="bg-gray-200">{children}</thead>;
};

export const TableBody = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }) => {
  return <tr className="border-b border-gray-300">{children}</tr>;
};

export const TableHead = ({ children, className }) => {
  return <th className={`p-2 text-left ${className}`}>{children}</th>;
};

export const TableCell = ({ children, className }) => {
  return <td className={`p-2 ${className}`}>{children}</td>;
};
