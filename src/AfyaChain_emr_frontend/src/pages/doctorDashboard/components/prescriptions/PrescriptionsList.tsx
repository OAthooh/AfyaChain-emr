import { useState } from 'react';
import { Eye, RotateCcw, Edit, X, ChevronUp, ChevronDown, Printer, Send } from 'lucide-react';

interface ListProps {
  filters: {
    search: string;
    status: string;
    dateRange: string;
    medication: string;
  };
  onViewPrescription: (id: string) => void;
}

// Mock data for prescriptions
const mockPrescriptions = [
  {
    id: '1',
    patientName: 'John Doe',
    patientId: 'P1001',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    duration: '30 days',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-03-01',
    doctor: 'Dr. Sarah Kimani',
    notes: 'Take after meals'
  },
  // Add more mock prescriptions...
];

export function PrescriptionsList({ filters, onViewPrescription }: ListProps) {
  const [sortConfig, setSortConfig] = useState({
    key: 'startDate',
    direction: 'desc' as 'asc' | 'desc'
  });

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  // Filter and sort prescriptions
  const filteredPrescriptions = mockPrescriptions
    .filter(prescription => {
      if (filters.search && !prescription.patientName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      if (filters.status !== 'all' && prescription.status !== filters.status) {
        return false;
      }
      if (filters.medication !== 'all' && prescription.medication !== filters.medication) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortConfig.key === 'startDate') {
        return sortConfig.direction === 'asc' 
          ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      return 0;
    });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-4">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                onClick={() => handleSort('patientName')}
              >
                <div className="flex items-center space-x-1">
                  <span>Patient</span>
                  {getSortIcon('patientName')}
                </div>
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Medication</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Dosage & Frequency</th>
              <th 
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                onClick={() => handleSort('startDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  {getSortIcon('startDate')}
                </div>
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredPrescriptions.map((prescription) => (
              <tr key={prescription.id} className="hover:bg-gray-50">
                <td className="py-4 pl-4 pr-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{prescription.patientName}</span>
                    <span className="text-xs text-gray-500">ID: {prescription.patientId}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className="text-sm text-gray-900">{prescription.medication}</span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">{prescription.dosage}</span>
                    <span className="text-xs text-gray-500">{prescription.frequency}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-900">
                      {new Date(prescription.startDate).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-500">{prescription.duration}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusBadgeColor(prescription.status)}`}>
                    {prescription.status}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onViewPrescription(prescription.id)}
                      className="text-blue-600 hover:text-blue-900"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {prescription.status === 'active' && (
                      <>
                        <button className="text-gray-600 hover:text-gray-900" title="Edit">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900" title="Renew">
                          <RotateCcw className="h-4 w-4" />
                        </button>
                        <button className="text-purple-600 hover:text-purple-900" title="Print">
                          <Printer className="h-4 w-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900" title="Send to Pharmacy">
                          <Send className="h-4 w-4" />
                        </button>
                      </>
                    )}
                    {prescription.status === 'active' && (
                      <button className="text-red-600 hover:text-red-900" title="Cancel">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 