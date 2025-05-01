import React, { useState } from 'react';
import { FilterX, Filter, Search } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Priority, TaskFilter as TaskFilterType } from '../../types';

interface TaskFilterProps {
  onFilterChange: (filter: TaskFilterType) => void;
}

const priorityOptions = [
  { value: '', label: 'All Priorities' },
  { value: Priority.Low, label: 'Low' },
  { value: Priority.Medium, label: 'Medium' },
  { value: Priority.High, label: 'High' },
];

const completionOptions = [
  { value: '', label: 'All Tasks' },
  { value: 'false', label: 'Incomplete' },
  { value: 'true', label: 'Completed' },
];

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priority, setPriority] = useState('');
  const [completion, setCompletion] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(value, priority, completion);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Priority | '';
    setPriority(value);
    applyFilters(searchTerm, value, completion);
  };

  const handleCompletionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCompletion(value);
    applyFilters(searchTerm, priority, value);
  };

  const applyFilters = (search: string, prio: string, comp: string) => {
    const filter: TaskFilterType = {};
    
    if (search) {
      filter.searchTerm = search;
    }
    
    if (prio) {
      filter.priority = prio as Priority;
    }
    
    if (comp === 'true') {
      filter.isCompleted = true;
    } else if (comp === 'false') {
      filter.isCompleted = false;
    }
    
    onFilterChange(filter);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setPriority('');
    setCompletion('');
    onFilterChange({});
  };

  const hasActiveFilters = searchTerm || priority || completion;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Filter Tasks</h2>
        <div className="flex space-x-2">
          {hasActiveFilters && (
            <Button
              variant="secondary"
              size="sm"
              onClick={resetFilters}
              icon={<FilterX size={16} />}
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            icon={<Filter size={16} />}
          >
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? 'mt-4 max-h-60' : 'max-h-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearchChange}
            leftIcon={<Search size={16} />}
            fullWidth
          />
          
          <Select
            options={priorityOptions}
            value={priority}
            onChange={handlePriorityChange}
            fullWidth
          />
          
          <Select
            options={completionOptions}
            value={completion}
            onChange={handleCompletionChange}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;