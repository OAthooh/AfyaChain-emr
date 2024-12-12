import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  onViewAppointment: (id: string) => void;
}

// Mock appointment data
const mockAppointments = [
  {
    id: '1',
    patientName: 'John Doe',
    time: '09:00',
    date: '2024-02-15',
    status: 'confirmed',
    reason: 'Follow-up',
    condition: 'Diabetes'
  },
  // Add more mock appointments...
];

export function AppointmentCalendar({ onViewAppointment }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    return { daysInMonth, firstDayOfMonth };
  };

  const { daysInMonth, firstDayOfMonth } = getDaysInMonth(currentDate);

  const getAppointmentsForDate = (date: string) => {
    return mockAppointments.filter(apt => apt.date === date);
  };

  const renderAppointmentIndicator = (appointments: typeof mockAppointments) => {
    if (!appointments.length) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-1">
        {appointments.map(apt => (
          <div
            key={apt.id}
            className={`h-1.5 w-1.5 rounded-full ${
              apt.status === 'confirmed' ? 'bg-green-500' :
              apt.status === 'pending' ? 'bg-yellow-500' :
              apt.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
            }`}
            title={`${apt.patientName} - ${apt.time}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-1.5 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="bg-gray-50 p-2 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {Array.from({ length: 42 }).map((_, index) => {
          const dayNumber = index - firstDayOfMonth + 1;
          const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber);
          const dateString = date.toISOString().split('T')[0];
          const appointments = isCurrentMonth ? getAppointmentsForDate(dateString) : [];
          
          return (
            <div
              key={index}
              className={`
                bg-white p-2 min-h-[80px] relative
                ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400 bg-gray-50'}
                ${selectedDate?.toDateString() === date.toDateString() ? 'ring-2 ring-blue-500' : ''}
              `}
              onClick={() => {
                if (isCurrentMonth) {
                  setSelectedDate(date);
                  if (appointments.length) {
                    onViewAppointment(appointments[0].id);
                  }
                }
              }}
            >
              <span className="text-sm">{isCurrentMonth ? dayNumber : ''}</span>
              {renderAppointmentIndicator(appointments)}
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            {selectedDate.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          <div className="space-y-2">
            {getAppointmentsForDate(selectedDate.toISOString().split('T')[0]).map(apt => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                onClick={() => onViewAppointment(apt.id)}
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">{apt.patientName}</p>
                  <p className="text-xs text-gray-500">{apt.time} - {apt.reason}</p>
                </div>
                <span className={`
                  px-2 py-1 text-xs font-medium rounded-full
                  ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    apt.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'}
                `}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 