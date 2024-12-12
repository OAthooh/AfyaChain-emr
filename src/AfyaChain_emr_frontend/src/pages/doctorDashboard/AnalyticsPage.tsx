import { useState } from 'react';
import { Download } from 'lucide-react';
import { MetricsSection } from './components/analytics/MetricsSection';
import { DemographicsCharts } from './components/analytics/DemographicsCharts';
import { AppointmentTrends } from './components/analytics/AppointmentTrends';
import { TreatmentSuccess } from './components/analytics/TreatmentSuccess';
import { FinancialMetrics } from './components/analytics/FinancialMetrics';

export function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7d');
  const department = 'all';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        
        <div className="flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
          </select>

          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-1" /> Export Report
          </button>
        </div>
      </div>

      <MetricsSection dateRange={dateRange} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DemographicsCharts />
        <AppointmentTrends dateRange={dateRange} department={department} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TreatmentSuccess dateRange={dateRange} />
        <FinancialMetrics dateRange={dateRange} />
      </div>
    </div>
  );
} 