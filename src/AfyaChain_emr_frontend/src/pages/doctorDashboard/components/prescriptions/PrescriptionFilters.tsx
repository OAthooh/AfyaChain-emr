interface FilterProps {
  filters: {
    search: string;
    status: string;
    dateRange: string;
    medication: string;
  };
  onFilterChange: (filters: any) => void;
}

export function PrescriptionFilters({ filters, onFilterChange }: FilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        placeholder="Search prescriptions..."
        className="rounded-md border-gray-300"
      />
    </div>
  );
} 