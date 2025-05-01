import React, { forwardRef } from 'react';
import clsx from 'clsx';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    // Generate a unique ID for the checkbox if one isn't provided
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={clsx(
              'h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500',
              'dark:border-gray-700 dark:bg-gray-800 dark:checked:bg-primary-600',
              error ? 'border-error-500 focus:ring-error-500' : '',
              className
            )}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label 
                htmlFor={checkboxId} 
                className={clsx(
                  "font-medium text-gray-700 dark:text-gray-300",
                  props.disabled && "opacity-70"
                )}
              >
                {label}
              </label>
            )}
            
            {description && (
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{description}</p>
            )}
            
            {error && (
              <p className="text-error-600 dark:text-error-400 text-xs mt-1">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;