// src/pages/patientDashboard/PatientOverview.tsx
import { useState } from 'react';
import { Activity, Calendar, FileText, Bell, Pill, HeartPulse } from 'lucide-react';
import { Card } from '../../components/ui/card';

export function PatientOverview() {
  const [dateRange] = useState('7d');

  const quickStats = [
    {
      name: 'Next Appointment',
      value: 'Oct 15, 2:30 PM',
      change: '3 days away',
      changeType: 'neutral',
      icon: Calendar,
    },
    {
      name: 'Active Medications',
      value: '4',
      change: '1 renewal needed',
      changeType: 'warning',
      icon: Pill,
    },
    {
      name: 'Recent Tests',
      value: '2',
      change: '1 pending result',
      changeType: 'info',
      icon: Activity,
    },
    {
      name: 'Health Alerts',
      value: '1',
      change: 'Action needed',
      changeType: 'urgent',
      icon: Bell,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Health Overview</h1>
        
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => console.log(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className={`h-8 w-8 
                ${stat.changeType === 'warning' ? 'text-yellow-600' :
                  stat.changeType === 'urgent' ? 'text-red-600' :
                  stat.changeType === 'info' ? 'text-blue-600' :
                  'text-green-600'}`} 
              />
              <span className={`text-sm font-medium
                ${stat.changeType === 'warning' ? 'text-yellow-600' :
                  stat.changeType === 'urgent' ? 'text-red-600' :
                  stat.changeType === 'info' ? 'text-blue-600' :
                  'text-green-600'}`}
              >
                {stat.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.name}</p>
          </Card>
        ))}
      </div>

      {/* Health Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {/* Appointment list would go here */}
            <p className="text-gray-600 text-sm">No upcoming appointments</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Test Results</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
          </div>
          <div className="space-y-4">
            {/* Test results list would go here */}
            <p className="text-gray-600 text-sm">No recent test results</p>
          </div>
        </Card>
      </div>

      {/* Vitals Tracking */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Recent Vitals</h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">Update Vitals</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vitals cards would go here */}
          <p className="text-gray-600 text-sm">No recent vital measurements</p>
        </div>
      </Card>

      {/* Medications Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-900">Current Medications</h2>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">View all</button>
        </div>
        <div className="space-y-4">
          {/* Medications list would go here */}
          <p className="text-gray-600 text-sm">No active medications</p>
        </div>
      </Card>
    </div>
  );
}