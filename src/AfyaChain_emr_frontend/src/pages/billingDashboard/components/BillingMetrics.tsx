import { useState } from 'react';
import {TrendingUp, ArrowUp } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BillingMetricsProps {
  dateRange: string;
}

const dailySummaryData = {
  totalTransactions: 156,
  totalAmount: 245000,
  averageTransaction: 1571,
  comparisonYesterday: {
    transactions: 12,
    amount: 15000,
  },
  hourlyTrends: [
    { hour: '8AM', count: 12, amount: 18500 },
    { hour: '10AM', count: 25, amount: 42000 },
    { hour: '12PM', count: 35, amount: 58000 },
    { hour: '2PM', count: 28, amount: 45000 },
    { hour: '4PM', count: 18, amount: 32000 },
    { hour: '6PM', count: 15, amount: 25000 },
  ],
};

export function BillingMetrics({ dateRange }: BillingMetricsProps) {
  const [view, setView] = useState<'revenue' | 'summary'>('revenue');

  const revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const revenueData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Revenue',
        data: [65000, 59000, 80000, 81000, 56000, 55000, 70000],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const renderDailySummary = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Today's Transactions</span>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-semibold text-gray-900">{dailySummaryData.totalTransactions}</span>
            <div className="flex items-center mt-1 text-sm">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-green-600 ml-1">+{dailySummaryData.comparisonYesterday.transactions} from yesterday</span>
            </div>
          </div>
        </div>
        
        {/* Similar cards for Total Amount and Average Transaction */}
      </div>

      <div className="bg-white rounded-lg p-4 border">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Hourly Transaction Trends</h4>
        <div className="h-48">
          <Bar
            data={{
              labels: dailySummaryData.hourlyTrends.map(trend => trend.hour),
              datasets: [
                {
                  label: 'Transaction Count',
                  data: dailySummaryData.hourlyTrends.map(trend => trend.count),
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
                  borderRadius: 4,
                },
              ],
            }}
            options={revenueChartOptions}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Financial Overview - {dateRange === '7d' ? 'Last 7 Days' : 
                              dateRange === '30d' ? 'Last 30 Days' : 
                              'Last 3 Months'}
        </h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('revenue')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              view === 'revenue'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Revenue Trends
          </button>
          <button
            onClick={() => setView('summary')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
              view === 'summary'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Summary
          </button>
        </div>
      </div>

      <div className="mt-6">
        {view === 'revenue' ? (
          <div className="h-72">
            <Line data={revenueData} options={revenueChartOptions} />
          </div>
        ) : (
          renderDailySummary()
        )}
      </div>
    </div>
  );
}