import React from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Alert from '../components/ui/Alert';

const Login: React.FC = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;

  return (
    <div className="min-h-[calc(100vh-132px)] flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {successMessage && (
          <Alert variant="success" className="mb-6">
            {successMessage}
          </Alert>
        )}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;