import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, fullWidth = false, size = 'md', className, id, ...props }, ref) => {
    // Generate a unique ID for the select if one isn't provided
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: 'py-1 text-xs',
      md: 'py-2 text-sm',
      lg: 'py-3 text-base',
    };

    return (
      <div className={clsx('flex flex-col', fullWidth ? 'w-full' : '')}>
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'block appearance-none w-full rounded-md border-gray-300 shadow-sm',
              'focus:border-primary-500 focus:ring-primary-500 focus:outline-none',
              'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
              'dark:bg-gray-800 dark:border-gray-700 dark:text-white',
              'dark:focus:border-primary-500 dark:focus:ring-primary-500',
              error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : 'border-gray-300',
              'pr-10 pl-4',
              sizeClasses[size],
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
            <ChevronDown size={16} />
          </div>
        </div>
        
        {error && (
          <p className="mt-1 text-sm text-error-600 dark:text-error-400 animate-slide-down">{error}</p>
        )}
        
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;