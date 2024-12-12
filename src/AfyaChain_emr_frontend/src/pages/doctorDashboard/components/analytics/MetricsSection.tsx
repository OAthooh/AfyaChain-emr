import { Users, Calendar, TrendingUp, Star } from 'lucide-react';

const metrics = [
  {
    name: 'Total Patients',
    value: '1,248',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: 'Appointments This Week',
    value: '86',
    change: '23 pending',
    changeType: 'neutral',
    icon: Calendar,
  },
  {
    name: 'Treatment Success Rate',
    value: '94.2%',
    change: '+2.1%',
    changeType: 'increase',
    icon: TrendingUp,
  },
  {
    name: 'Patient Satisfaction',
    value: '4.8',
    change: '+0.3',
    changeType: 'increase',
    icon: Star,
  },
];

export function MetricsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <metric.icon className="h-8 w-8 text-blue-600" />
            <span className={`text-sm font-medium ${
              metric.changeType === 'increase' ? 'text-green-600' :
              metric.changeType === 'decrease' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {metric.change}
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold text-gray-900">{metric.value}</p>
          <p className="mt-1 text-sm text-gray-600">{metric.name}</p>
        </div>
      ))}
    </div>
  );
} 