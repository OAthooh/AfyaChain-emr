import { useState } from 'react';
import { Download } from 'lucide-react';
import { ReportMetrics } from '../components/reports/ReportMetrics';
import { ReportFilters } from '../components/reports/ReportFilters';
import { ReportCharts } from '../components/reports/ReportCharts';
import { ReportTable } from '../components/reports/ReportTable';

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all',
    paymentMethod: 'all',
    insuranceProvider: 'all',
    startDate: null,
    endDate: null,
  });

  const handleExport = (format: 'pdf' | 'excel') => {
    // TODO: Implement export functionality
    console.log(`Exporting report as ${format}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Reports</h1>
        
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="custom">Custom Range</option>
          </select>

          <button
            onClick={() => handleExport('excel')}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Download className="h-4 w-4 mr-1" /> Export Report
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <ReportMetrics dateRange={dateRange} />

      {/* Filters Panel */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <ReportFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportCharts.Revenue dateRange={dateRange} />
        <ReportCharts.PaymentMethods dateRange={dateRange} />
        <ReportCharts.DepartmentRevenue dateRange={dateRange} />
        <ReportCharts.OutstandingPayments dateRange={dateRange} />
      </div>

      {/* Detailed Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Detailed Transactions</h2>
        </div>
        <ReportTable dateRange={dateRange} filters={filters} />
      </div>
    </div>
  );
} 