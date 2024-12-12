// src/pages/patientDashboard/PatientAppointments.tsx
import { useState } from 'react';
import { Calendar, List, Plus, Clock, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/card';

type ViewMode = 'calendar' | 'list';

export function PatientAppointments() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'upcoming',
    department: 'all'
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        
        <div className="flex space-x-3">
          <button 
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" /> Schedule Appointment
          </button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Filters */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past</option>
                <option value="30days">Last 30 Days</option>
                <option value="6months">Last 6 Months</option>
              </select>

              <select
                value={filters.department}
                onChange={(e) => setFilters(prev => ({ ...prev, department: e.target.value }))}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                <option value="general">General Practice</option>
                <option value="cardiology">Cardiology</option>
                <option value="orthopedics">Orthopedics</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('calendar')}
                className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-lg ${
                  viewMode === 'calendar'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="h-4 w-4 mr-1" /> Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`inline-flex items-center px-3 py-1.5 border text-sm font-medium rounded-lg ${
                  viewMode === 'list'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <List className="h-4 w-4 mr-1" /> List
              </button>
            </div>
          </div>

          {/* Calendar/List View */}
          <div className="mt-6">
            {viewMode === 'calendar' ? (
              <div className="min-h-[600px] bg-gray-50 rounded-lg p-4">
                {/* Calendar component would go here */}
                <p className="text-gray-600 text-center py-8">Calendar view coming soon</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Example appointment items */}
                <AppointmentItem
                  date="Oct 15, 2024"
                  time="2:30 PM"
                  doctor="Dr. Sarah Smith"
                  department="Cardiology"
                  type="Follow-up"
                  status="upcoming"
                />
                <AppointmentItem
                  date="Oct 20, 2024"
                  time="10:00 AM"
                  doctor="Dr. James Wilson"
                  department="General Practice"
                  type="Regular Checkup"
                  status="upcoming"
                />
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

interface AppointmentItemProps {
  date: string;
  time: string;
  doctor: string;
  department: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

function AppointmentItem({ date, time, doctor, department, type, status }: AppointmentItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{date} at {time}</p>
          <p className="text-sm text-gray-600">{doctor} - {department}</p>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <button className="text-gray-400 hover:text-gray-500">
          <AlertCircle className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}