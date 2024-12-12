import { Eye, Clock, X, Check } from 'lucide-react';

interface ListProps {
  filters: {
    search: string;
    status: string;
    dateRange: string;
    department: string;
  };
  onViewAppointment: (id: string) => void;
}

// Mock appointment data (expanded version)
const mockAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    patientId: 'P1001',
    time: '09:00',
    date: '2024-02-15',
    status: 'confirmed',
    reason: 'Follow-up',
    condition: 'Diabetes',
    department: 'general',
    duration: '30',
    doctor: 'Dr. Sarah Kimani'
  },
  // Add more mock appointments...
];

export function AppointmentList({ filters, onViewAppointment }: ListProps) {
  // Filter appointments based on search and filters
  const filteredAppointments = mockAppointments.filter(apt => {
    if (filters.search && !apt.patientName.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.status !== 'all' && apt.status !== filters.status) {
      return false;
    }
    if (filters.department !== 'all' && apt.department !== filters.department) {
      return false;
    }
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Patient</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date & Time</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reason</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Department</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredAppointments.map((appointment) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="py-4 pl-4 pr-3">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">{appointment.patientName}</span>
                  <span className="text-xs text-gray-500">ID: {appointment.patientId}</span>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-900">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                  <span className="text-xs text-gray-500">{appointment.time}</span>
                </div>
              </td>
              <td className="px-3 py-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-900">{appointment.reason}</span>
                  <span className="text-xs text-gray-500">{appointment.condition}</span>
                </div>
              </td>
              <td className="px-3 py-4 text-sm text-gray-500">{appointment.department}</td>
              <td className="px-3 py-4">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(appointment.status)}`}>
                  {appointment.status}
                </span>
              </td>
              <td className="px-3 py-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onViewAppointment(appointment.id)}
                    className="text-blue-600 hover:text-blue-900"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  {appointment.status === 'pending' && (
                    <>
                      <button className="text-green-600 hover:text-green-900" title="Confirm">
                        <Check className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" title="Cancel">
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button className="text-gray-600 hover:text-gray-900" title="Reschedule">
                      <Clock className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 