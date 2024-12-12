import { Search } from 'lucide-react';

interface PatientFiltersProps {
  filters: {
    search: string;
    status: string;
    condition: string;
    ageRange: string;
  };
  onFilterChange: (filters: any) => void;
}

export function PatientFilters({ filters, onFilterChange }: PatientFiltersProps) {
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search patients..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      {/* Condition Filter */}
      <select
        value={filters.condition}
        onChange={(e) => onFilterChange({ ...filters, condition: e.target.value })}
        className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Conditions</option>
        <option value="diabetes">Diabetes</option>
        <option value="hypertension">Hypertension</option>
        <option value="asthma">Asthma</option>
      </select>

      {/* Age Range Filter */}
      <select
        value={filters.ageRange}
        onChange={(e) => onFilterChange({ ...filters, ageRange: e.target.value })}
        className="block w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">All Ages</option>
        <option value="0-18">0-18 years</option>
        <option value="19-30">19-30 years</option>
        <option value="31-50">31-50 years</option>
        <option value="51+">51+ years</option>
      </select>
    </div>
  );
} 