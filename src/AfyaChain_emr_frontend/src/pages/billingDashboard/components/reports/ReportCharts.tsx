import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
//   ChartType,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { formatCurrency } from '../../utils/formatters';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Define chart data types
type RevenueChartData = ChartData<'line', number[], string>;
type PaymentMethodsChartData = ChartData<'pie', number[], string>;
type DepartmentRevenueChartData = ChartData<'bar', number[], string>;
type OutstandingPaymentsChartData = ChartData<'bar', number[], string>;

interface ChartDataSets {
  revenue: RevenueChartData;
  paymentMethods: PaymentMethodsChartData;
  departmentRevenue: DepartmentRevenueChartData;
  outstandingPayments: OutstandingPaymentsChartData;
}

// Mock data based on date range
const mockChartData: Record<string, ChartDataSets> = {
  '7d': {
    revenue: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Daily Revenue',
        data: [150000, 180000, 160000, 200000, 175000, 120000, 190000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }],
    },
    paymentMethods: {
      labels: ['Cash', 'Credit Card', 'Insurance', 'Mobile Money', 'Bank Transfer'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 1,
        borderColor: '#fff',
      }],
    },
    departmentRevenue: {
      labels: ['Cardiology', 'Pediatrics', 'Orthopedics', 'Radiology', 'Surgery'],
      datasets: [{
        label: 'Revenue by Department',
        data: [450000, 380000, 320000, 290000, 420000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderRadius: 4,
      }],
    },
    outstandingPayments: {
      labels: ['< 30 days', '30-60 days', '60-90 days', '> 90 days'],
      datasets: [{
        label: 'Outstanding Amount',
        data: [250000, 180000, 120000, 80000],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(220, 38, 38, 0.8)',
        ],
        borderRadius: 4,
      }],
    },
  },
  '30d': {
    // Similar structure with different data for 30 days
    revenue: {
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      datasets: [{
        label: 'Daily Revenue',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 300000) + 100000),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }],
    },
    // ... other charts for 30d
  } as ChartDataSets,
  '90d': {
    // Similar structure with different data for 90 days
    revenue: {
      labels: Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`),
      datasets: [{
        label: 'Daily Revenue',
        data: Array.from({ length: 90 }, () => Math.floor(Math.random() * 300000) + 100000),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }],
    },
    // ... other charts for 90d
  } as ChartDataSets,
};

interface ChartProps {
  dateRange: string;
}

// Separate options for each chart type
const lineChartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      boxPadding: 4,
      usePointStyle: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return formatCurrency(value as number);
        }
      },
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 1
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

const pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      boxPadding: 4,
      usePointStyle: true,
      callbacks: {
        label: function(context) {
          return `${context.label}: ${context.formattedValue}%`;
        }
      }
    }
  }
};

const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      boxPadding: 4,
      usePointStyle: true,
      callbacks: {
        label: function(context) {
          return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          return formatCurrency(value as number);
        }
      },
      grid: {
        display: true,
        color: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 1
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

const RevenueChart = ({ dateRange }: ChartProps) => {
  const data = mockChartData[dateRange]?.revenue || mockChartData['7d'].revenue;
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
      <div className="h-[300px]">
        <Line data={data} options={lineChartOptions} />
      </div>
    </div>
  );
};

const PaymentMethodsChart = ({ dateRange }: ChartProps) => {
  const data = mockChartData[dateRange]?.paymentMethods || mockChartData['7d'].paymentMethods;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Distribution</h3>
      <div className="h-[300px]">
        <Pie data={data} options={pieChartOptions} />
      </div>
    </div>
  );
};

const DepartmentRevenueChart = ({ dateRange }: ChartProps) => {
  const data = mockChartData[dateRange]?.departmentRevenue || mockChartData['7d'].departmentRevenue;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue by Department</h3>
      <div className="h-[300px]">
        <Bar data={data} options={barChartOptions} />
      </div>
    </div>
  );
};

const OutstandingPaymentsChart = ({ dateRange }: ChartProps) => {
  const data = mockChartData[dateRange]?.outstandingPayments || mockChartData['7d'].outstandingPayments;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Outstanding Payments Aging</h3>
      <div className="h-[300px]">
        <Bar data={data} options={barChartOptions} />
      </div>
    </div>
  );
};

export const ReportCharts = {
  Revenue: RevenueChart,
  PaymentMethods: PaymentMethodsChart,
  DepartmentRevenue: DepartmentRevenueChart,
  OutstandingPayments: OutstandingPaymentsChart,
}; 