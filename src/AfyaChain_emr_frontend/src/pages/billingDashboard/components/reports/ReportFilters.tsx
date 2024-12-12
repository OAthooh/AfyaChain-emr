import { useState } from 'react';
import { Filter, X, Calendar } from 'lucide-react';
import { departments, paymentMethods, insuranceProviders } from '../../components/transaction';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface ReportFiltersProps {
  filters: {
    status: string;
    department: string;
    paymentMethod: string;
    insuranceProvider: string;
    startDate: Date | null;
    endDate: Date | null;
  };
  onFilterChange: (filters: any) => void;
}

export function ReportFilters({ filters, onFilterChange }: ReportFiltersProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDateRange, setTempDateRange] = useState<DateRange>({
    startDate: filters.startDate,
    endDate: filters.endDate
  });

  const handleDateChange = (field: 'startDate' | 'endDate', date: Date | null) => {
    const newDateRange = { ...tempDateRange, [field]: date };
    setTempDateRange(newDateRange);
    
    // Only update parent filters if both dates are selected or both are null
    if ((newDateRange.startDate && newDateRange.endDate) || 
        (!newDateRange.startDate && !newDateRange.endDate)) {
      onFilterChange({
        ...filters,
        startDate: newDateRange.startDate,
        endDate: newDateRange.endDate,
      });
    }
  };

  const clearDates = () => {
    setTempDateRange({ startDate: null, endDate: null });
    onFilterChange({
      ...filters,
      startDate: null,
      endDate: null,
    });
  };

  const clearFilters = () => {
    setTempDateRange({ startDate: null, endDate: null });
    onFilterChange({
      status: 'all',
      department: 'all',
      paymentMethod: 'all',
      insuranceProvider: 'all',
      startDate: null,
      endDate: null,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-sm font-medium text-gray-700">Filters</h3>
        </div>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1"
        >
          <X className="h-4 w-4" />
          <span>Clear all</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="partially_paid">Partially Paid</option>
          </select>
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <select
            id="department"
            value={filters.department}
            onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={filters.paymentMethod}
            onChange={(e) => onFilterChange({ ...filters, paymentMethod: e.target.value })}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Methods</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 mb-1">
            Insurance Provider
          </label>
          <select
            id="insuranceProvider"
            value={filters.insuranceProvider}
            onChange={(e) => onFilterChange({ ...filters, insuranceProvider: e.target.value })}
            className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Providers</option>
            {insuranceProviders.map((provider) => (
              <option key={provider} value={provider}>{provider}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-700">
            {tempDateRange.startDate && tempDateRange.endDate
              ? `${tempDateRange.startDate.toLocaleDateString()} - ${tempDateRange.endDate.toLocaleDateString()}`
              : 'Select date range'}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {(tempDateRange.startDate || tempDateRange.endDate) && (
            <button
              onClick={clearDates}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Clear dates
            </button>
          )}
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {showDatePicker ? 'Close' : 'Change dates'}
          </button>
        </div>
      </div>

      {showDatePicker && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={tempDateRange.startDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('startDate', e.target.value ? new Date(e.target.value) : null)}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={tempDateRange.endDate?.toISOString().split('T')[0] || ''}
                onChange={(e) => handleDateChange('endDate', e.target.value ? new Date(e.target.value) : null)}
                min={tempDateRange.startDate?.toISOString().split('T')[0]}
                className="w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 