import { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { NewInvoiceModal } from '../components/NewInvoiceModal';

interface Invoice {
  id: string;
  patientName: string;
  amount: string;
  status: 'paid' | 'unpaid';
  dueDate: string;
  createdAt: string;
}

interface InvoiceTableProps {
  dateRange: string;
  filters: {
    status: string;
    search: string;
  };
  onViewInvoice: (invoiceId: string) => void;
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-001',
    patientName: 'John Doe',
    amount: 'KES 15,000',
    status: 'unpaid',
    dueDate: '2024-04-15',
    createdAt: '2024-03-15',
  },
  {
    id: 'INV-002',
    patientName: 'Jane Smith',
    amount: 'KES 8,500',
    status: 'paid',
    dueDate: '2024-04-01',
    createdAt: '2024-03-14',
  },
];

export function InvoiceTable({ dateRange, filters, onViewInvoice }: InvoiceTableProps) {
  const [isLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const itemsPerPage = 10;

  const handleCreateInvoice = (data: any) => {
    // TODO: Implement API call to create invoice
    console.log('Creating invoice:', data);
    // For now, just close the modal
    setIsCreateModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!mockInvoices.length) {
    return (
      <>
        <EmptyState 
          title="No invoices found"
          description="No invoices match your current filters."
          action={{
            label: "Create New Invoice",
            onClick: () => setIsCreateModalOpen(true)
          }}
        />
        <NewInvoiceModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateInvoice}
        />
      </>
    );
  }

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.status === 'all' || invoice.status === filters.status;
    
    // Filter by date range
    const invoiceDate = new Date(invoice.createdAt);
    const today = new Date();
    const daysAgo = new Date();
    
    switch (dateRange) {
      case '7d':
        daysAgo.setDate(today.getDate() - 7);
        break;
      case '30d':
        daysAgo.setDate(today.getDate() - 30);
        break;
      case '90d':
        daysAgo.setDate(today.getDate() - 90);
        break;
      default:
        return true;
    }
    
    return matchesSearch && matchesStatus && invoiceDate >= daysAgo && invoiceDate <= today;
  });

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Invoices</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Create New Invoice
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onViewInvoice(invoice.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200">
            <div className="flex items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                <span className="font-medium">
                  {Math.min(startIndex + itemsPerPage, filteredInvoices.length)}
                </span>{' '}
                of <span className="font-medium">{filteredInvoices.length}</span> results
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 
                         bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium rounded-md border border-gray-300 
                         bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 
                         disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      
      <NewInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateInvoice}
      />
    </div>
  );
}
