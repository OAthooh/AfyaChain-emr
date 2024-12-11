import React from 'react';
import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';
export function AuthLayout({ children, title, subtitle }) {
    return (<div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Link to="/" className="flex items-center text-blue-600 mb-8">
              <Activity className="w-8 h-8 mr-2"/>
              <span className="text-2xl font-bold">AfyaChain</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
      
      {/* Right side - Image */}
      <div className="hidden lg:block relative w-1/2">
        <div className="absolute inset-0">
          <img className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" alt="Healthcare professional using digital technology"/>
          <div className="absolute inset-0 bg-blue-900/90 mix-blend-multiply"/>
        </div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <blockquote className="max-w-xl">
            <p className="text-xl font-medium text-white">
              "AfyaChain has revolutionized how we manage patient records, making healthcare delivery more efficient and accessible across Kenya."
            </p>
            <footer className="mt-8">
              <p className="text-base font-semibold text-blue-200">Dr. Sarah Kimani</p>
              <p className="text-base text-blue-300">Chief Medical Officer, Nairobi General Hospital</p>
            </footer>
          </blockquote>
        </div>
      </div>
    </div>);
}
