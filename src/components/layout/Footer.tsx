import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} TaskFlow. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;