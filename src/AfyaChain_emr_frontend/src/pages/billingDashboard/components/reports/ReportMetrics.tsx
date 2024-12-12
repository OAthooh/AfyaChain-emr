import { DollarSign, TrendingUp, TrendingDown, CreditCard, Building2, Users } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: React.ElementType;
  onClick?: () => void;
}

const MetricCard = ({ title, value, change, changeType, icon: Icon, onClick }: MetricCardProps) => (
  <div 
    onClick={onClick}
    className={`bg-white p-6 rounded-xl shadow-sm border border-gray-200 ${onClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
  >
    <div className="flex items-center justify-between">
      <Icon className="h-8 w-8 text-blue-600" />
      {change && (
        <span className={`text-sm font-medium ${
          changeType === 'increase' ? 'text-green-600' :
          changeType === 'decrease' ? 'text-red-600' :
          'text-gray-600'
        }`}>
          {changeType === 'increase' ? <TrendingUp className="h-4 w-4 inline mr-1" /> :
           changeType === 'decrease' ? <TrendingDown className="h-4 w-4 inline mr-1" /> : null}
          {change}
        </span>
      )}
    </div>
    <p className="mt-4 text-2xl font-semibold text-gray-900">
      {typeof value === 'number' && title.toLowerCase().includes('revenue') 
        ? formatCurrency(value)
        : value}
    </p>
    <p className="mt-1 text-sm text-gray-600">{title}</p>
  </div>
);

interface ReportMetricsProps {
  dateRange: string;
}

// Mock data for different date ranges
const mockMetricsData = {
  '7d': {
    totalRevenue: 1245000,
    revenueChange: '+12.5%',
    outstandingPayments: 145200,
    outstandingChange: '-3.2%',
    topDepartment: 'Cardiology',
    topDepartmentRevenue: 'KES 450,000',
    avgRevenuePerPatient: 15000,
    avgRevenueChange: '+5.8%'
  },
  '30d': {
    totalRevenue: 4850000,
    revenueChange: '+15.2%',
    outstandingPayments: 523000,
    outstandingChange: '-5.1%',
    topDepartment: 'Radiology',
    topDepartmentRevenue: 'KES 1,250,000',
    avgRevenuePerPatient: 16500,
    avgRevenueChange: '+7.2%'
  },
  '90d': {
    totalRevenue: 14250000,
    revenueChange: '+18.7%',
    outstandingPayments: 1250000,
    outstandingChange: '-8.5%',
    topDepartment: 'Surgery',
    topDepartmentRevenue: 'KES 3,850,000',
    avgRevenuePerPatient: 17200,
    avgRevenueChange: '+9.5%'
  }
};

export function ReportMetrics({ dateRange }: ReportMetricsProps) {
  const currentData = mockMetricsData[dateRange as keyof typeof mockMetricsData] || mockMetricsData['7d'];

  const metrics = [
    {
      title: 'Total Revenue',
      value: currentData.totalRevenue,
      change: currentData.revenueChange,
      changeType: 'increase' as const,
      icon: DollarSign,
      onClick: () => console.log('Show revenue breakdown')
    },
    {
      title: 'Outstanding Payments',
      value: currentData.outstandingPayments,
      change: currentData.outstandingChange,
      changeType: 'decrease' as const,
      icon: CreditCard,
      onClick: () => console.log('Show outstanding payments')
    },
    {
      title: 'Top Department',
      value: currentData.topDepartment,
      change: currentData.topDepartmentRevenue,
      changeType: 'neutral' as const,
      icon: Building2,
      onClick: () => console.log('Show department breakdown')
    },
    {
      title: 'Avg. Revenue Per Patient',
      value: currentData.avgRevenuePerPatient,
      change: currentData.avgRevenueChange,
      changeType: 'increase' as const,
      icon: Users,
      onClick: () => console.log('Show patient revenue details')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
          icon={metric.icon}
          onClick={metric.onClick}
        />
      ))}
    </div>
  );
} 