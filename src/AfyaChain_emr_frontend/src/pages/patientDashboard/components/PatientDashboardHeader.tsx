// src/pages/patientdashboard/components/PatientDashboardHeader.tsx
import { Link } from 'react-router-dom';
import { Activity, Bell, Search, MessageSquare } from 'lucide-react';
import { PatientQuickInfo } from './PatientQuickInfo';

export function PatientDashboardHeader() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Link to="/patient" className="flex items-center">
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">AfyaChain</span>
        </Link>
      </div>

      <div className="flex-1 max-w-2xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search appointments, medications, records..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <MessageSquare className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <PatientQuickInfo />
      </div>
    </header>
  );
}