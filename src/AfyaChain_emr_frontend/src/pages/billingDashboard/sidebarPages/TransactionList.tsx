import { useState } from 'react';
import { ChevronRight, Download, Loader2 } from 'lucide-react';
import { EmptyState } from '../components/EmptyState';
import { TransactionDetailModal } from '../components/TransactionDetailModal';
import { Transaction, TransactionFilters } from '../types/transaction';
import { mockTransactions, departments, insuranceProviders, paymentMethods } from '../components/transaction';

interface TransactionListProps {
  dateRange: string;
  filters: {
    status: string;
    paymentMethod: string;
    search: string;
  };
}

export function TransactionList({ dateRange, filters: initialFilters }: TransactionListProps) {
  const [isLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<TransactionFilters>({
    dateRange,
    status: initialFilters.status || 'all',
    paymentMethod: initialFilters.paymentMethod || 'all',
    department: 'all',
    insuranceProvider: 'all',
    search: initialFilters.search || '',
    sortBy: 'date',
    sortOrder: 'desc',
  });

  const itemsPerPage = 10;

  // Filter transactions based on all criteria
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (filters.status !== 'all' && transaction.payment.status !== filters.status) {
      return false;
    }

    if (filters.paymentMethod !== 'all' && transaction.payment.method !== filters.paymentMethod) {
      return false;
    }

    if (filters.department !== 'all' && transaction.serviceDetails.department !== filters.department) {
      return false;
    }

    if (filters.insuranceProvider !== 'all' && 
        transaction.insurance?.provider !== filters.insuranceProvider) {
      return false;
    }

    const searchTerm = filters.search.toLowerCase();
    if (searchTerm) {
      return (
        transaction.patientName.toLowerCase().includes(searchTerm) ||
        transaction.id.toLowerCase().includes(searchTerm) ||
        transaction.serviceDetails.description.toLowerCase().includes(searchTerm)
      );
    }

    return true;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (filters.sortBy) {
      case 'date':
        return filters.sortOrder === 'desc' 
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'amount':
        return filters.sortOrder === 'desc'
          ? b.financial.netTotal - a.financial.netTotal
          : a.financial.netTotal - b.financial.netTotal;
      case 'status':
        return filters.sortOrder === 'desc'
          ? b.payment.status.localeCompare(a.payment.status)
          : a.payment.status.localeCompare(b.payment.status);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleExport = () => {
    const csv = [
      ['Transaction ID', 'Date', 'Patient Name', 'Service', 'Amount', 'Status'],
      ...sortedTransactions.map(t => [
        t.id,
        new Date(t.date).toLocaleDateString(),
        t.patientName,
        t.serviceDetails.description,
        `${t.financial.currency} ${t.financial.netTotal}`,
        t.payment.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!filteredTransactions.length) {
    return (
      <EmptyState 
        title="No transactions found"
        description="No transactions match your current filters."
        action={{
          label: "Clear filters",
          onClick: () => setFilters({
            ...filters,
            status: 'all',
            paymentMethod: 'all',
            department: 'all',
            insuranceProvider: 'all',
            search: '',
          })
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <select
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          
          <select
            value={filters.paymentMethod}
            onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="all">All Payment Methods</option>
            {paymentMethods.map(method => (
              <option key={method} value={method}>{method}</option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="partially_paid">Partially Paid</option>
          </select>

          <select
            value={filters.insuranceProvider}
            onChange={(e) => setFilters({ ...filters, insuranceProvider: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
          >
            <option value="all">All Insurance Providers</option>
            {insuranceProviders.map(provider => (
              <option key={provider} value={provider}>{provider}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm min-w-[200px]"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
            <button
              onClick={handleExport}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.patientName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.serviceDetails.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.financial.currency} {transaction.financial.netTotal}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                      transaction.payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transaction.payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      transaction.payment.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.payment.status.charAt(0).toUpperCase() + transaction.payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
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
                  {Math.min(startIndex + itemsPerPage, sortedTransactions.length)}
                </span>{' '}
                of <span className="font-medium">{sortedTransactions.length}</span> results
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

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
} 