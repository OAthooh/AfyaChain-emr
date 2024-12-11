import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/auth/Input';
import { Button } from '../../components/auth/Button';
export function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement login logic
        setTimeout(() => setIsLoading(false), 1000);
    };
    return (<AuthLayout title="Welcome back" subtitle="Sign in to your account to continue">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="Email address" type="email" name="email" autoComplete="email" required/>

        <Input label="Password" type="password" name="password" autoComplete="current-password" required/>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"/>
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <Link to="/auth/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>);
}
