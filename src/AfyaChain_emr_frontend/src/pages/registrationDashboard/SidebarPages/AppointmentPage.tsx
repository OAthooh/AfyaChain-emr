import { useState } from 'react';
import { FaCalendarPlus, FaSearch } from 'react-icons/fa';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  doctor: string;
}

const AppointmentsPage = () => {
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      date: '2024-01-20',
      time: '09:00',
      type: 'General Checkup',
      status: 'scheduled',
      doctor: 'Dr. Sarah Smith'
    },
    // Add more sample appointments as needed
  ]);

  const [showNewAppointmentForm, setShowNewAppointmentForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleNewAppointment = () => {
    setShowNewAppointmentForm(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#2563EB]">Appointments</h1>
        <p className="text-gray-600">Manage patient appointments</p>
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={handleNewAppointment}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaCalendarPlus />
          New Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.patientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.date} {appointment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {appointment.doctor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-3">
                    Edit
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 10 of 20 results
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* New Appointment Modal (you can create a separate component for this) */}
      {showNewAppointmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">New Appointment</h2>
            {/* Add your appointment form here */}
            <button
              onClick={() => setShowNewAppointmentForm(false)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;