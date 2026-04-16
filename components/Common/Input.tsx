'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
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
      <input
        className={`px-4 py-2 border-2 border-light rounded-lg focus:outline-none focus:border-secondary transition-colors ${
          error ? 'border-danger' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-danger text-sm">{error}</span>
      )}
      {helpText && (
        <span className="text-gray-500 text-xs">{helpText}</span>
      )}
    </div>
  );
};
