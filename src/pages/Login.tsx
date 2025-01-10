import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';

export function Login() {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <>
      {message && (
        <div className="max-w-md mx-auto mt-4">
          <div className="rounded-md bg-green-50 p-4">
            <div className="text-sm text-green-700">{message}</div>
          </div>
        </div>
      )}
      <AuthForm type="login" />
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign up
        </Link>
      </p>
    </>
  );
}