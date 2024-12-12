interface FilterBarProps {
  filters: {
    status: string;
    type: string;
    department: string;
  };
  onFilterChange: (filters: {
    status: string;
    type: string;
    department: string;
  }) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50">
      <div className="flex flex-wrap gap-4">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={filters.type}
          onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Types</option>
          <option value="consultation">Consultation</option>
          <option value="procedure">Procedure</option>
          <option value="medication">Medication</option>
        </select>

        <select
          value={filters.department}
          onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          <option value="cardiology">Cardiology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="orthopedics">Orthopedics</option>
        </select>
      </div>
    </div>
  );
} 