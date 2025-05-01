import React from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, CheckCircle, Circle } from 'lucide-react';
import clsx from 'clsx';
import Card, { CardContent } from '../ui/Card';
import Button from '../ui/Button';
import PriorityBadge from '../ui/PriorityBadge';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const isOverdue = new Date(task.dueDate) < new Date() && !task.isCompleted;

  return (
    <Card 
      className={clsx(
        'transition-all duration-300 hover:translate-y-[-2px]',
        task.isCompleted && 'opacity-80'
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 
            className={clsx(
              'text-lg font-semibold',
              task.isCompleted && 'line-through text-gray-500 dark:text-gray-400'
            )}
          >
            {task.title}
          </h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              onClick={() => onToggleComplete(task.id)}
              aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {task.isCompleted ? (
                <CheckCircle size={18} className="text-success-600 dark:text-success-500" />
              ) : (
                <Circle size={18} />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              onClick={() => onEdit(task)}
              aria-label="Edit task"
            >
              <Pencil size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 text-gray-500 hover:text-error-600 dark:text-gray-400 dark:hover:text-error-400"
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        </div>
        
        <p 
          className={clsx(
            'text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2',
            task.isCompleted && 'text-gray-500 dark:text-gray-400'
          )}
        >
          {task.description || 'No description provided.'}
        </p>
        
        <div className="flex flex-wrap items-center justify-between">
          <PriorityBadge priority={task.priority} />
          
          <div 
            className={clsx(
              'text-xs',
              isOverdue ? 'text-error-600 dark:text-error-400 font-medium' : 'text-gray-500 dark:text-gray-400'
            )}
          >
            {isOverdue ? 'Overdue: ' : 'Due: '}
            {format(new Date(task.dueDate), 'MMM d, yyyy')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;