import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ScheduleAppointmentModal } from './ScheduleAppointmentRecords';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: 'APT001',
    date: '2024-03-20',
    time: '09:30 AM',
    doctor: 'Dr. Sarah Smith',
    department: 'Cardiology',
    location: 'Main Hospital, Room 205',
    status: 'upcoming',
    notes: 'Regular checkup and ECG'
  },
  {
    id: 'APT002',
    date: '2024-02-15',
    time: '02:00 PM',
    doctor: 'Dr. James Wilson',
    department: 'General Medicine',
    location: 'Medical Center, Room 102',
    status: 'completed',
    notes: 'Follow-up consultation'
  },
  {
    id: 'APT003',
    date: '2024-02-01',
    time: '11:00 AM',
    doctor: 'Dr. Emily Brown',
    department: 'Neurology',
    location: 'Specialist Wing, Room 304',
    status: 'cancelled',
    notes: 'MRI scan and consultation'
  }
];

export function AppointmentRecords() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return 'text-blue-600 bg-blue-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      case 'rescheduled':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: Appointment['status']) => {
    switch (status) {
      case 'upcoming':
        return <AlertCircle className="h-5 w-5" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5" />;
      case 'rescheduled':
        return <Clock className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesDepartment = selectedDepartment === 'all' || appointment.department.toLowerCase() === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || appointment.status === selectedStatus;
    return matchesDepartment && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Records</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Schedule New Appointment
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select 
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Appointments</option>
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="rescheduled">Rescheduled</option>
        </select>
        <select 
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="all">All Departments</option>
          <option value="cardiology">Cardiology</option>
          <option value="general medicine">General Medicine</option>
          <option value="neurology">Neurology</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{appointment.date}</p>
                  <p className="text-sm text-gray-500">{appointment.time}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                {getStatusIcon(appointment.status)}
                <span className="text-sm font-medium capitalize">{appointment.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{appointment.doctor}</p>
                  <p className="text-sm text-gray-500">{appointment.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <p className="text-sm text-gray-600">{appointment.location}</p>
              </div>
            </div>

            {appointment.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Notes:</span> {appointment.notes}
                </p>
              </div>
            )}

            <div className="mt-4 flex space-x-3">
              {appointment.status === 'upcoming' && (
                <>
                  <button className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    Reschedule
                  </button>
                  <button className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    Cancel
                  </button>
                </>
              )}
              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <ScheduleAppointmentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}