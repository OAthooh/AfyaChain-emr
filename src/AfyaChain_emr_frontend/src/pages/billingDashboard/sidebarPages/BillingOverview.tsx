import { useState } from 'react';
import { 
  Download, 
  DollarSign, 
  CreditCard, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight 
} from 'lucide-react';
import { BillingMetrics } from '../components/BillingMetrics';
import { TransactionsTable } from '../components/TransactionsTable';
import { FilterBar } from '../components/FilterBar';

interface Metric {
  name: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  trend?: number;
  description?: string;
}

const metrics: Metric[] = [
  {
    name: 'Total Revenue',
    value: 'KES 1,245,000',
    change: '+12.5%',
    changeType: 'increase',
    icon: DollarSign,
    trend: 12.5,
    description: 'Total revenue this period'
  },
  {
    name: 'Outstanding Balance',
    value: 'KES 145,200',
    change: '-3.2%',
    changeType: 'decrease',
    icon: CreditCard,
    trend: -3.2,
    description: 'Pending payments'
  },
  {
    name: 'Pending Approvals',
    value: '24',
    change: '8 urgent',
    changeType: 'neutral',
    icon: Clock,
    description: 'Requires immediate attention'
  },
  {
    name: 'Failed Transactions',
    value: '3',
    change: 'Action needed',
    changeType: 'decrease',
    icon: AlertCircle,
    description: 'Failed payment attempts'
  },
];

export function BillingOverview() {
  const [dateRange, setDateRange] = useState('7d');
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    department: 'all',
  });

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting report...');
  };

  const renderMetricCard = (metric: Metric) => (
    <div
      key={metric.name}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="p-2 bg-blue-50 rounded-lg">
          <metric.icon className="h-8 w-8 text-blue-600" />
        </div>
        <div className="flex items-center space-x-1">
          {metric.trend && metric.trend !== 0 && (
            metric.trend > 0 
              ? <TrendingUp className="h-4 w-4 text-green-500" />
              : <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm font-medium ${
            metric.changeType === 'increase' ? 'text-green-600' :
            metric.changeType === 'decrease' ? 'text-red-600' :
            'text-gray-600'
          }`}>
            {metric.change}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
        <p className="mt-1 text-sm text-gray-600">{metric.name}</p>
        {metric.description && (
          <p className="mt-2 text-xs text-gray-500">{metric.description}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing Overview</h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor your financial metrics and transactions
          </p>
        </div>
        
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
            onClick={handleExport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Download className="h-4 w-4 mr-2" /> 
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(renderMetricCard)}
      </div>

      <BillingMetrics dateRange={dateRange} />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
        
        <FilterBar filters={filters} onFilterChange={setFilters} />
        <TransactionsTable dateRange={dateRange} filters={filters} />
      </div>
    </div>
  );
}
