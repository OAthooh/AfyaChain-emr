// src/pages/patientDashboard/components/analytics/HealthAnalytics.tsx
import React from 'react'; // Add React import
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { Card } from '../../../../components/ui/card';
import { TrendingUp, AlertCircle } from 'lucide-react';

// Move interfaces to top
interface TrendAnalysis {
  metric: string;
  current: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  status: 'improving' | 'declining' | 'stable';
  prediction: number;
}

interface Insight {
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
}

// Sample data at the top level
const healthData = [
  { date: '2024-01-01', value: 120, prediction: 122 },
  { date: '2024-01-02', value: 122, prediction: 123 },
  { date: '2024-01-03', value: 125, prediction: 124 },
  { date: '2024-01-04', value: 123, prediction: 124 },
  { date: '2024-01-05', value: 124, prediction: 125 },
  { date: '2024-01-06', value: 126, prediction: 126 },
  { date: '2024-01-07', value: 125, prediction: 125 }
];

const trendAnalysis: TrendAnalysis[] = [
  {
    metric: 'Blood Pressure',
    current: 122,
    change: -2.5,
    trend: 'down',
    status: 'improving',
    prediction: 120
  },
  {
    metric: 'Heart Rate',
    current: 75,
    change: 1.2,
    trend: 'up',
    status: 'stable',
    prediction: 76
  },
  {
    metric: 'Blood Sugar',
    current: 95,
    change: -1.8,
    trend: 'down',
    status: 'improving',
    prediction: 94
  }
];

const insights: Insight[] = [
  {
    title: 'Blood Pressure Trending Down',
    description: 'Your blood pressure has shown consistent improvement over the past 30 days.',
    severity: 'info'
  },
  {
    title: 'Exercise Goal Progress',
    description: 'You ae 80% towards your weekly exercise goal. Keep it up!',
    severity: 'info'
  },
  {
    title: 'Medication Reminder',
    description: 'Your blood pressure medication refill is due in 5 days.',
    severity: 'warning'
  }
];

// Component definition
const TrendCard: React.FC<{ trend: TrendAnalysis }> = ({ trend }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">{trend.metric}</span>
        <TrendingUp className={`h-5 w-5 ${
          trend.status === 'improving' ? 'text-green-500' :
          trend.status === 'declining' ? 'text-red-500' :
          'text-blue-500'
        }`} />
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-gray-900">{trend.current}</span>
        <span className={`text-sm font-medium ${
          trend.change > 0 ? 'text-green-600' :
          trend.change < 0 ? 'text-red-600' :
          'text-gray-600'
        }`}>
          {trend.change > 0 ? '+' : ''}{trend.change}%
        </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">
        Predicted: {trend.prediction}
      </p>
    </Card>
  );
};

const InsightCard: React.FC<Insight> = ({ title, description, severity }) => {
  return (
    <div className={`p-4 rounded-lg ${
      severity === 'info' ? 'bg-blue-50' :
      severity === 'warning' ? 'bg-yellow-50' :
      'bg-red-50'
    }`}>
      <div className="flex items-start space-x-3">
        <AlertCircle className={`h-5 w-5 mt-0.5 ${
          severity === 'info' ? 'text-blue-600' :
          severity === 'warning' ? 'text-yellow-600' :
          'text-red-600'
        }`} />
        <div>
          <h4 className="text-sm font-medium text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Main component
export const HealthAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState('30d');
  const [selectedMetric, setSelectedMetric] = React.useState('bloodPressure');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Health Analytics</h2>
        <div className="flex space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="bloodPressure">Blood Pressure</option>
            <option value="bloodSugar">Blood Sugar</option>
            <option value="weight">Weight</option>
            <option value="heartRate">Heart Rate</option>
          </select>
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trendAnalysis.map((trend) => (
          <TrendCard key={trend.metric} trend={trend} />
        ))}
      </div>

      {/* Main Chart */}
      <Card className="p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="prediction" 
                stroke="#9333ea" 
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Health Insights</h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <InsightCard key={index} {...insight} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default HealthAnalytics;