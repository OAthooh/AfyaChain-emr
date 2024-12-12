import { useState } from 'react';
import { ChevronRight, Loader2 } from 'lucide-react';
import { EmptyState } from './EmptyState';

interface Transaction {
  id: string;
  date: string;
  patient: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  department: string;
}

interface TransactionsTableProps {
  dateRange: string;
  filters: {
    status: string;
    type: string;
    department: string;
  };
}

const mockTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    date: '2024-03-15',
    patient: 'John Doe',
    amount: 15000,
    status: 'completed',
    paymentMethod: 'M-Pesa',
    department: 'Outpatient'
  },
  {
    id: 'TRX-002',
    date: '2024-03-15',
    patient: 'Jane Smith',
    amount: 25000,
    status: 'pending',
    paymentMethod: 'Insurance',
    department: 'Laboratory'
  },
  {
    id: 'TRX-003',
    date: '2024-03-14',
    patient: 'Alice Johnson',
    amount: 5000,
    status: 'failed',
    paymentMethod: 'Credit Card',
    department: 'Pharmacy'
  }
];

export function TransactionsTable({ dateRange, filters }: TransactionsTableProps) {
  const [isLoading] = useState(false);
  
  const filteredTransactions = mockTransactions.filter(transaction => {
    // Filter by status
    if (filters.status !== 'all' && transaction.status !== filters.status) {
      return false;
    }

    // Filter by date range
    const transactionDate = new Date(transaction.date);
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
        daysAgo.setDate(today.getDate() - 7); // Default to 7 days
    }

    return transactionDate >= daysAgo && transactionDate <= today;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!filteredTransactions.length) {
    return <EmptyState 
      title="No transactions found"
      description="No transactions match your current filters."
      action={{
        label: "Clear filters",
        onClick: () => {} // TODO: Implement clear filters action
      }}
    />;
  }

  return (
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
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
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
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {transaction.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.patient}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.amount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                  transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                  transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-900">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 