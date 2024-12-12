import { Search } from 'lucide-react';

interface FilterProps {
  filters: {
    search: string;
    status: string;
    dateRange: string;
    department: string;
  };
  onFilterChange: (filters: any) => void;
}

export function AppointmentFilters({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="flex flex-1 items-center space-x-4">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search appointments..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>

      <select
        value={filters.dateRange}
        onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="all">All Dates</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>

      <select
        value={filters.department}
        onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="all">All Departments</option>
        <option value="general">General</option>
        <option value="cardiology">Cardiology</option>
        <option value="neurology">Neurology</option>
        <option value="pediatrics">Pediatrics</option>
      </select>
    </div>
  );
} 