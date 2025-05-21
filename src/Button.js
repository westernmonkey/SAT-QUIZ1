import React from 'react';

export function Button({ children, onClick, variant = "outline", size = "sm" }) {
  const base = "inline-flex items-center px-3 py-1.5 text-sm border rounded shadow-sm";
  const styles = variant === "ghost"
    ? "bg-transparent text-blue-700 border-none hover:underline"
    : variant === "link"
    ? "bg-transparent text-blue-600 underline"
    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
