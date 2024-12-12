import { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Download
} from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface Transaction {
  id: string;
  date: string;
  patientName: string;
  patientId: string;
  department: string;
  service: string;
  amount: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed' | 'partially_paid';
  insuranceProvider?: string;
  lastUpdated: string;
}

interface ReportTableProps {
  dateRange: string;
  filters: {
    status: string;
    department: string;
    paymentMethod: string;
    insuranceProvider: string;
    startDate: Date | null;
    endDate: Date | null;
  };
}

// Mock data generator
const generateMockData = (dateRange: string): Transaction[] => {
  const statuses: Transaction['status'][] = ['completed', 'pending', 'failed', 'partially_paid'];
  const departments = ['Cardiology', 'Pediatrics', 'Orthopedics', 'Radiology', 'Surgery'];
  const services = [
    'Consultation', 'X-Ray', 'Blood Test', 'MRI Scan', 'Surgery', 
    'Physical Therapy', 'Vaccination', 'Emergency Care'
  ];
  const paymentMethods = ['Cash', 'Credit Card', 'Insurance', 'Mobile Money', 'Bank Transfer'];
  const insuranceProviders = ['AAR', 'Jubilee', 'NHIF', 'Madison', 'Britam'];

  const count = dateRange === '7d' ? 50 : dateRange === '30d' ? 200 : 500;
  
  return Array.from({ length: count }, (_, i) => ({
    id: `TRX${String(i + 1).padStart(6, '0')}`,
    date: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 90).toISOString(),
    patientName: `Patient ${i + 1}`,
    patientId: `P${String(i + 1).padStart(6, '0')}`,
    department: departments[Math.floor(Math.random() * departments.length)],
    service: services[Math.floor(Math.random() * services.length)],
    amount: Math.floor(Math.random() * 50000) + 1000,
    paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    insuranceProvider: Math.random() > 0.5 
      ? insuranceProviders[Math.floor(Math.random() * insuranceProviders.length)]
      : undefined,
    lastUpdated: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24).toISOString(),
  }));
};

const StatusBadge = ({ status }: { status: Transaction['status'] }) => {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    partially_paid: 'bg-blue-100 text-blue-800',
  };

  const labels = {
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    partially_paid: 'Partially Paid',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export function ReportTable({ dateRange, filters }: ReportTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: 'asc' | 'desc';
  }>({ key: 'date', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Generate and memoize filtered data
  const filteredData = useMemo(() => {
    let data = generateMockData(dateRange);

    // Apply filters
    if (filters.status !== 'all') {
      data = data.filter(item => item.status === filters.status);
    }
    if (filters.department !== 'all') {
      data = data.filter(item => item.department === filters.department);
    }
    if (filters.paymentMethod !== 'all') {
      data = data.filter(item => item.paymentMethod === filters.paymentMethod);
    }
    if (filters.insuranceProvider !== 'all') {
      data = data.filter(item => item.insuranceProvider === filters.insuranceProvider);
    }
    if (filters.startDate && filters.endDate) {
      const startDate = filters.startDate.getTime();
      const endDate = filters.endDate.getTime();
      data = data.filter(item => {
        const date = new Date(item.date).getTime();
        return date >= startDate && date <= endDate;
      });
    }

    // Apply sorting
    return data.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (!aValue || !bValue) return 0;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [dateRange, filters, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id)));
    }
  };

  const handleSelectRow = (id: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const exportSelected = () => {
    const selectedData = filteredData.filter(row => selectedRows.has(row.id));
    // TODO: Implement actual export functionality
    console.log('Exporting selected rows:', selectedData);
  };

  return (
    <div className="space-y-4">
      {/* Table Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={pageSize}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
          
          <span className="text-sm text-gray-600">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
          </span>
        </div>

        {selectedRows.size > 0 && (
          <button
            onClick={exportSelected}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-1" />
            Export Selected ({selectedRows.size})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.size === paginatedData.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              {[
                { key: 'date', label: 'Date' },
                { key: 'patientName', label: 'Patient Name' },
                { key: 'department', label: 'Department' },
                { key: 'service', label: 'Service' },
                { key: 'amount', label: 'Amount' },
                { key: 'paymentMethod', label: 'Payment Method' },
                { key: 'status', label: 'Status' },
                { key: 'lastUpdated', label: 'Last Updated' },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort(key as keyof Transaction)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortConfig.key === key && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(transaction.id)}
                    onChange={() => handleSelectRow(transaction.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{transaction.patientName}</div>
                  <div className="text-sm text-gray-500">{transaction.patientId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div>{transaction.paymentMethod}</div>
                  {transaction.insuranceProvider && (
                    <div className="text-sm text-gray-500">{transaction.insuranceProvider}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={transaction.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(transaction.lastUpdated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
} 