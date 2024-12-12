import { Eye, Edit, Trash2, MoreVertical } from 'lucide-react';

interface PatientTableProps {
  filters: {
    search: string;
    status: string;
    condition: string;
    ageRange: string;
  };
  onViewPatient: (patientId: string) => void;
}

export function PatientTable({ filters, onViewPatient }: PatientTableProps) {
  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         patient.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || patient.status.toLowerCase() === filters.status.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
              Patient ID
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Full Name
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Age
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Primary Condition
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Last Visit
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Status
            </th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {filteredPatients.map((patient) => (
            <tr 
              key={patient.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-blue-600 font-medium">
                {patient.id}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {patient.fullName}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {patient.age}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {patient.primaryCondition}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {patient.lastVisit}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => onViewPatient(patient.id)}
                    className="text-gray-400 hover:text-blue-600"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-blue-600"
                    title="Edit Patient"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-red-600"
                    title="Delete Patient"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    title="More Options"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock data
const mockPatients = [
  {
    id: 'P001',
    fullName: 'John Doe',
    age: 45,
    primaryCondition: 'Diabetes Type II',
    lastVisit: '2024-02-15',
    status: 'Active'
  },
  {
    id: 'P002',
    fullName: 'Jane Smith',
    age: 32,
    primaryCondition: 'Hypertension',
    lastVisit: '2024-02-10',
    status: 'Active'
  },
  // Add more mock patients as needed
]; 