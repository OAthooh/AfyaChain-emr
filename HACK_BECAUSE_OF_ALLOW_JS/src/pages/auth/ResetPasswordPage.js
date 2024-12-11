import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Input } from '../../components/auth/Input';
import { Button } from '../../components/auth/Button';
export function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // TODO: Implement password reset logic
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1000);
    };
    if (isSubmitted) {
        return (<AuthLayout title="Password reset successful" subtitle="Your password has been reset successfully">
        <div className="space-y-6">
          <Link to="/auth/login" className="btn btn-primary w-full">
            Sign in with new password
          </Link>
        </div>
      </AuthLayout>);
    }
    return (<AuthLayout title="Reset password" subtitle="Enter your new password below">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input label="New password" type="password" name="password" autoComplete="new-password" required/>

        <Input label="Confirm new password" type="password" name="confirmPassword" autoComplete="new-password" required/>

        <Button type="submit" isLoading={isLoading}>
          Reset password
        </Button>

        <p className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/auth/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>);
}
