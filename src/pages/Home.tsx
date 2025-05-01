import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, List, BarChart3 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/auth';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6 animate-slide-up">
            Manage Your Tasks <span className="text-primary-600 dark:text-primary-500">Efficiently</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            A beautiful, intuitive task management application designed to help you stay organized and productive.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            {isAuthenticated ? (
              <Link to="/tasks">
                <Button variant="primary" size="lg">
                  Go to Tasks
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="lg">
                    Create Account
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-md animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="text-primary-600 dark:text-primary-500 mb-4">
              <CheckSquare size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Task Management</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create, edit, and organize your tasks with ease. Set priorities and due dates to stay on track.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-md animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="text-primary-600 dark:text-primary-500 mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Due Dates & Reminders</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Never miss a deadline with clear due dates and visual indicators for upcoming and overdue tasks.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:shadow-md animate-slide-up" style={{ animationDelay: '500ms' }}>
            <div className="text-primary-600 dark:text-primary-500 mb-4">
              <List size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Filtering & Sorting</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Find exactly what you need with powerful filtering and sorting options. Focus on what matters most.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary-600 dark:bg-primary-700 rounded-lg shadow-md p-8 text-white animate-slide-up" style={{ animationDelay: '600ms' }}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Ready to boost your productivity?</h2>
              <p className="text-primary-100">Start managing your tasks efficiently today.</p>
            </div>
            {!isAuthenticated && (
              <Link to="/register">
                <Button variant="secondary" size="lg" className="whitespace-nowrap">
                  Get Started Now
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;