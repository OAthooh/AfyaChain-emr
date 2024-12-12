import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { TrendingUp, TrendingDown } from 'lucide-react';


const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [30000, 35000, 32000, 38000, 42000, 45000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Expenses',
      data: [25000, 28000, 26000, 32000, 34000, 36000],
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ],
};

const summaryMetrics = [
  {
    name: 'Total Revenue',
    value: 'KES 245,000',
    change: '+15.3%',
    trend: 'up',
  },
  {
    name: 'Outstanding Payments',
    value: 'KES 32,450',
    change: '-8.1%',
    trend: 'down',
  },
  {
    name: 'Average Per Patient',
    value: 'KES 4,250',
    change: '+5.2%',
    trend: 'up',
  },
];

export function FinancialMetrics() {
  const [view, setView] = useState<'revenue' | 'summary'>('revenue');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Financial Overview</h2>
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

      {view === 'revenue' ? (
        <div className="h-[300px]">
          <Line
            data={revenueData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'bottom',
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Amount (KES)',
                  },
                },
              },
            }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {summaryMetrics.map((metric) => (
            <div
              key={metric.name}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
            >
              <div>
                <p className="text-sm text-gray-600">{metric.name}</p>
                <p className="text-xl font-semibold text-gray-900">{metric.value}</p>
              </div>
              <div className={`flex items-center ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 