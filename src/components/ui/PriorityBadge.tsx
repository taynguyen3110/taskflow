import React from 'react';
import clsx from 'clsx';
import { Priority } from '../../types';

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const colors = {
    [Priority.Low]: 'bg-success-100 text-success-800 border-success-200 dark:bg-success-900/30 dark:text-success-400 dark:border-success-900',
    [Priority.Medium]: 'bg-warning-100 text-warning-800 border-warning-200 dark:bg-warning-900/30 dark:text-warning-400 dark:border-warning-900',
    [Priority.High]: 'bg-error-100 text-error-800 border-error-200 dark:bg-error-900/30 dark:text-error-400 dark:border-error-900',
  };

  return (
    <span 
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        colors[priority],
        className
      )}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;