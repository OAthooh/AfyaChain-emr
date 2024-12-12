import { useState } from 'react';
import { Calendar, List, Plus, Clock, AlertCircle, X } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { ScheduleModal } from './ScheduleModal';
import { CalendarView } from './CalendarView';

type ViewMode = 'calendar' | 'list';
type Status = 'upcoming' | 'completed' | 'cancelled';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  type: string;
  status: Status;
}

interface Filters {
  status: string;
  dateRange: string;
  department: string;
}

export function PatientAppointments() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<Filters>({
    status: 'all',
    dateRange: 'upcoming',
    department: 'all'
  });
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      date: "Oct 15, 2024",
      time: "2:30 PM",
      doctor: "Dr. Sarah Smith",
      department: "Cardiology",
      type: "Follow-up",
      status: "upcoming"
    },
    {
      id: '2',
      date: "Oct 20, 2024",
      time: "10:00 AM",
      doctor: "Dr. James Wilson",
      department: "General Practice",
      type: "Regular Checkup",
      status: "upcoming"
    }
  ]);

  const handleScheduleAppointment = (appointmentData: {
    doctor: string;
    department: string;
    date: string;
    time: string;
    type: string;
  }) => {
    const newAppointment: Appointment = {
      id: String(Date.now()),
      ...appointmentData,
      status: 'upcoming'
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(app => 
        app.id === appointmentId 
          ? { ...app, status: 'cancelled' as Status }
          : app
      )
    );
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowScheduleModal(true);
  };

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredAppointments = appointments.filter(app => {
    // Status filter
    if (filters.status !== 'all' && app.status !== filters.status) return false;
    
    // Department filter
    if (filters.department !== 'all' && app.department.toLowerCase() !== filters.department) return false;
    
    // Date range filter
    const appointmentDate = new Date(app.date);
    const today = new Date();
    
    switch (filters.dateRange) {
      case 'upcoming':
        return appointmentDate >= today;
      case 'past':
        return appointmentDate < today;
      case '30days': {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 30);
        return appointmentDate >= thirtyDaysAgo && appointmentDate <= today;
      }
      case '6months': {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return appointmentDate >= sixMonthsAgo && appointmentDate <= today;
      }
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
        
        <Button 
          onClick={() => setShowScheduleModal(true)}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-1" /> Schedule Appointment
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Filters */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              {Object.entries({
                status: ['All Status', 'Upcoming', 'Completed', 'Cancelled'],
                dateRange: ['Upcoming', 'Past', 'Last 30 Days', 'Last 6 Months'],
                department: ['All Departments', 'General Practice', 'Cardiology', 'Orthopedics']
              }).map(([key, options]) => (
                <select
                  key={key}
                  value={filters[key as keyof Filters]}
                  onChange={(e) => handleFilterChange(key as keyof Filters, e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {options.map(option => (
                    <option 
                      key={option} 
                      value={option.toLowerCase().replace(' ', '')}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              {(['calendar', 'list'] as const).map((mode) => (
                <Button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  variant={viewMode === mode ? 'outline' : 'ghost'}
                  className={`${
                    viewMode === mode
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {mode === 'calendar' ? (
                    <Calendar className="h-4 w-4 mr-1" />
                  ) : (
                    <List className="h-4 w-4 mr-1" />
                  )}
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Calendar/List View */}
          <div className="mt-6">
            {viewMode === 'calendar' ? (
              <CalendarView 
                appointments={filteredAppointments}
                onDateSelect={handleDateSelect}
              />
            ) : (
              <div className="space-y-4">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <AppointmentItem
                      key={appointment.id}
                      {...appointment}
                      onCancel={() => handleCancelAppointment(appointment.id)}
                    />
                  ))
                ) : (
                  <Alert>
                    <AlertDescription>
                      No appointments found matching your filters.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Scheduling Modal */}
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setSelectedDate(null);
        }}
        onSchedule={handleScheduleAppointment}
        initialDate={selectedDate}
      />
    </div>
  );
}

interface AppointmentItemProps extends Appointment {
  onCancel: () => void;
}

function AppointmentItem({ date, time, doctor, department, type, status, onCancel }: AppointmentItemProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-500 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Clock className="h-8 w-8 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{date} at {time}</p>
          <p className="text-sm text-gray-600">{doctor} - {department}</p>
          <p className="text-sm text-gray-500">{type}</p>
          {showDetails && (
            <div className="mt-2 text-sm text-gray-500">
              <p>Location: Virtual Visit</p>
              <p>Duration: 30 minutes</p>
              <p>Notes: Please arrive 5 minutes early</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
            status === 'completed' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-400 hover:text-gray-500"
          >
            <AlertCircle className="h-5 w-5" />
          </Button>
          {status === 'upcoming' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              className="text-red-400 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}