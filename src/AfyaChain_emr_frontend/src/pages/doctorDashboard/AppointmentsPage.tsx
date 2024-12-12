import { useState } from 'react';
import { Calendar, List, Plus, FileText, Clock, AlertCircle } from 'lucide-react';
import { AppointmentCalendar } from './components/appointments/AppointmentCalendar';
import { AppointmentList } from './components/appointments/AppointmentList';
import { AppointmentFilters } from './components/appointments/AppointmentFilters';
import { AppointmentDetailModal } from './components/appointments/AppointmentDetailModal';
import { NewAppointmentModal, AppointmentFormData } from './components/appointments/NewAppointmentModal';

type ViewMode = 'calendar' | 'list';

export function AppointmentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    department: 'all'
  });
  const [isNewAppointmentModalOpen, setIsNewAppointmentModalOpen] = useState(false);

  const handleViewAppointment = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setIsDetailModalOpen(true);
  };

  const handleNewAppointment = (appointmentData: AppointmentFormData) => {
    // Handle the new appointment data here
    console.log('New appointment:', appointmentData);
    // Add API call to save appointment
    setIsNewAppointmentModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
        
        {/* Quick Actions */}
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsNewAppointmentModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" /> New Appointment
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700">
            <FileText className="h-4 w-4 mr-1" /> Export Schedule
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700">
            <Clock className="h-4 w-4 mr-1" /> Pending Reviews
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700">
            <AlertCircle className="h-4 w-4 mr-1" /> Urgent Cases
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <AppointmentFilters filters={filters} onFilterChange={setFilters} />
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

        {viewMode === 'calendar' ? (
          <AppointmentCalendar onViewAppointment={handleViewAppointment} />
        ) : (
          <AppointmentList 
            filters={filters}
            onViewAppointment={handleViewAppointment}
          />
        )}
      </div>

      {selectedAppointmentId && (
        <AppointmentDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          appointmentId={selectedAppointmentId}
        />
      )}

      <NewAppointmentModal
        isOpen={isNewAppointmentModalOpen}
        onClose={() => setIsNewAppointmentModalOpen(false)}
        onSubmit={handleNewAppointment}
      />
    </div>
  );
} 