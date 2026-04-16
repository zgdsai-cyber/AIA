'use client';

import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold text-sm text-primary">
          {label}
        </label>
      )}
      <select
        className={`px-4 py-2 border-2 border-light rounded-lg focus:outline-none focus:border-secondary transition-colors bg-white ${
          error ? 'border-danger' : ''
        } ${className}`}
        {...props}
      >
        <option value="">اختر...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-danger text-sm">{error}</span>
      )}
    </div>
  );
};
