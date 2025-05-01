import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '../components/ui/Button';
import TaskList from '../components/tasks/TaskList';
import TaskForm, { TaskFormData } from '../components/tasks/TaskForm';
import TaskFilter from '../components/tasks/TaskFilter';
import Modal from '../components/ui/Modal';
import { Task, TaskFilter as TaskFilterType } from '../types';
import { useTaskStore } from '../store/task';

const Tasks: React.FC = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedTask, addTask, updateTask, setFilter, resetSelectedTask } = useTaskStore();

  const handleAddTask = () => {
    resetSelectedTask();
    setIsFormModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (data: TaskFormData) => {
    setIsSubmitting(true);
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, data);
      } else {
        await addTask(data);
      }
      setIsFormModalOpen(false);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilterChange = (filter: TaskFilterType) => {
    setFilter(filter);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          My Tasks
        </h1>
        <Button
          variant="primary"
          onClick={handleAddTask}
          icon={<Plus size={16} />}
        >
          Add Task
        </Button>
      </div>

      <TaskFilter onFilterChange={handleFilterChange} />

      <TaskList onEditTask={handleEditTask} />

      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={selectedTask ? 'Edit Task' : 'Create Task'}
        size="lg"
      >
        <TaskForm
          task={selectedTask ?? undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};

export default Tasks;