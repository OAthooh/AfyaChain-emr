import { useState } from 'react';
import { X, Calendar, Clock, User, FileText, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
}

// Mock appointment data with more details
const mockAppointment = {
  id: '1',
  patientName: 'John Doe',
  patientId: 'P1001',
  date: '2024-02-15',
  time: '09:00',
  duration: '30',
  status: 'confirmed',
  reason: 'Follow-up Consultation',
  condition: 'Type 2 Diabetes',
  department: 'General Medicine',
  doctor: 'Dr. Sarah Kimani',
  notes: 'Patient reported improved blood sugar levels. Continue current medication.',
  history: [
    { date: '2024-02-10', action: 'Appointment Scheduled', user: 'Reception' },
    { date: '2024-02-11', action: 'Appointment Confirmed', user: 'Patient' },
  ],
  patientDetails: {
    age: 45,
    gender: 'Male',
    phone: '+254 123 456 789',
    email: 'john.doe@example.com',
    lastVisit: '2024-01-15',
  }
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AppointmentDetailModal({ isOpen, onClose }: ModalProps) {
  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);

  const appointment = mockAppointment; // In real app: fetchAppointment(appointmentId)

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReschedule = () => {
    setIsRescheduling(true);
  };

  const handleCancel = () => {
    setIsCanceling(true);
  };

  const handleComplete = () => {
    // Handle appointment completion
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Appointment Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Status and Quick Actions */}
          <div className="flex items-center justify-between mb-6">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            <div className="flex space-x-3">
              {appointment.status === 'confirmed' && (
                <>
                  <button
                    onClick={handleComplete}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" /> Mark Complete
                  </button>
                  <button
                    onClick={handleReschedule}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" /> Reschedule
                  </button>
                  <button
                    onClick={handleCancel}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-1" /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Main Details */}
          <div className="grid grid-cols-2 gap-6">
            {/* Appointment Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Date & Time</p>
                      <p className="text-sm text-gray-500">
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Duration</p>
                      <p className="text-sm text-gray-500">{appointment.duration} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reason</p>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                <textarea
                  className="w-full h-24 text-sm border-gray-300 rounded-md"
                  placeholder="Add appointment notes..."
                  defaultValue={appointment.notes}
                />
              </div>
            </div>

            {/* Patient Information */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.patientName}</p>
                      <p className="text-sm text-gray-500">ID: {appointment.patientId}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Age</p>
                      <p className="text-sm text-gray-500">{appointment.patientDetails.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Gender</p>
                      <p className="text-sm text-gray-500">{appointment.patientDetails.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-500">{appointment.patientDetails.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-500">{appointment.patientDetails.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment History */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment History</h3>
                <div className="space-y-3">
                  {appointment.history.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">{event.action}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString()} by {event.user}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reschedule Modal */}
        {isRescheduling && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Add rescheduling form */}
          </div>
        )}

        {/* Cancel Modal */}
        {isCanceling && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            {/* Add cancellation form */}
          </div>
        )}
      </div>
    </div>
  );
} 