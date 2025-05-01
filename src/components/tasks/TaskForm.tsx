import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Priority, Task } from '../../types';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
}

const priorityOptions = [
  { value: Priority.Low, label: 'Low' },
  { value: Priority.Medium, label: 'Medium' },
  { value: Priority.High, label: 'High' },
];

const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const isEditMode = !!task;
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues: task
      ? {
          ...task,
          dueDate: format(new Date(task.dueDate), 'yyyy-MM-dd'),
        }
      : {
          title: '',
          description: '',
          dueDate: format(new Date(), 'yyyy-MM-dd'),
          priority: Priority.Medium,
        },
  });

  useEffect(() => {
    if (task) {
      reset({
        ...task,
        dueDate: format(new Date(task.dueDate), 'yyyy-MM-dd'),
      });
    }
  }, [task, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Title"
        fullWidth
        error={errors.title?.message}
        {...register('title', {
          required: 'Title is required',
          maxLength: {
            value: 100,
            message: 'Title cannot exceed 100 characters',
          },
        })}
      />

      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          {...register('description')}
        ></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          type="date"
          label="Due Date"
          fullWidth
          error={errors.dueDate?.message}
          {...register('dueDate', {
            required: 'Due date is required',
          })}
        />

        <Select
          label="Priority"
          options={priorityOptions}
          fullWidth
          error={errors.priority?.message}
          {...register('priority')}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {isEditMode ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;