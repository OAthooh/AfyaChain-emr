import React from 'react';
import { AppointmentRecords } from './AppointmentRecords';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Activity,
  AlertCircle 
} from 'lucide-react';

interface HealthRecordsPageProps {
  activeSection: number;
}

const metrics = [
  {
    name: 'Upcoming Appointments',
    value: '3',
    change: 'Next: Mar 20',
    changeType: 'neutral',
    icon: Calendar,
  },
  {
    name: 'Active Prescriptions',
    value: '4',
    change: '2 renewals needed',
    changeType: 'decrease',
    icon: Pill,
  },
  {
    name: 'Recent Test Results',
    value: '2',
    change: 'Pending review',
    changeType: 'neutral',
    icon: FileText,
  },
  {
    name: 'Health Alerts',
    value: '1',
    change: 'Action needed',
    changeType: 'decrease',
    icon: AlertCircle,
  },
];

export function HealthRecordsPage({ activeSection }: HealthRecordsPageProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 0: // Overview
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Health Records Overview</h1>
              <div className="flex items-center space-x-4">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Last 30 days</option>
                  <option>Last 3 months</option>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric) => (
                <div
                  key={metric.name}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <metric.icon className="h-8 w-8 text-blue-600" />
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-600' :
                      metric.changeType === 'decrease' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className="mt-4 text-2xl font-semibold text-gray-900">{metric.value}</p>
                  <p className="mt-1 text-sm text-gray-600">{metric.name}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Cardiology Appointment</p>
                        <p className="text-xs text-gray-500">March 20, 2024 - 9:30 AM</p>
                      </div>
                    </div>
                    <span className="text-sm text-blue-600">Upcoming</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Blood Test Results</p>
                        <p className="text-xs text-gray-500">March 15, 2024</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">Completed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Medications</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Pill className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Lisinopril</p>
                        <p className="text-xs text-gray-500">10mg - Once daily</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Pill className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Metformin</p>
                        <p className="text-xs text-gray-500">500mg - Twice daily</p>
                      </div>
                    </div>
                    <span className="text-sm text-yellow-600">Renewal needed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 1: // Appointments
        return <AppointmentRecords />;

      default:
        return (
          <div className="text-center text-gray-600 mt-8">
            Content for this section is coming soon
          </div>
        );
    }
  };

  return (
    <div className="p-6 overflow-auto bg-gray-50">
      {renderContent()}
    </div>
  );
}