// src/pages/patientDashboard/PatientResults.tsx
import { useState } from 'react';
import { FileText, Download, Filter, AlertCircle, Calendar, Activity } from 'lucide-react';
import { Card } from '../../components/ui/card';

type ResultCategory = 'all' | 'lab' | 'imaging' | 'pathology';
type TimeFilter = 'recent' | '3months' | '6months' | '1year' | 'all';

export function PatientResults() {
  const [category, setCategory] = useState<ResultCategory>('all');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('recent');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Test Results & Reports</h1>
        
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-1" /> Download All Results
          </button>
        </div>
      </div>

      <Card className="p-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ResultCategory)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="lab">Laboratory</option>
            <option value="imaging">Imaging</option>
            <option value="pathology">Pathology</option>
          </select>

          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value as TimeFilter)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="recent">Recent</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
            <option value="all">All Time</option>
          </select>

          <div className="flex-1">
            <input
              type="search"
              placeholder="Search results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          <TestResultItem
            title="Complete Blood Count (CBC)"
            date="Oct 15, 2024"
            category="Laboratory"
            status="completed"
            flagged
            provider="Dr. Sarah Smith"
          />
          <TestResultItem
            title="Chest X-Ray"
            date="Oct 10, 2024"
            category="Imaging"
            status="completed"
            provider="Dr. James Wilson"
          />
          <TestResultItem
            title="Lipid Panel"
            date="Sep 28, 2024"
            category="Laboratory"
            status="pending"
            provider="Dr. Michael Chang"
          />
        </div>
      </Card>

      {/* Recent Results Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trending Values</h2>
          <div className="space-y-4">
            <TrendingValue
              name="Blood Pressure"
              value="128/82"
              trend="stable"
              date="Oct 15, 2024"
            />
            <TrendingValue
              name="Blood Glucose"
              value="110 mg/dL"
              trend="increasing"
              date="Oct 15, 2024"
            />
            <TrendingValue
              name="Cholesterol"
              value="185 mg/dL"
              trend="decreasing"
              date="Sep 28, 2024"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Tests</h2>
          <div className="space-y-4">
            <UpcomingTest
              name="HbA1c Test"
              date="Nov 1, 2024"
              provider="Dr. Sarah Smith"
              preparation="Fasting required"
            />
            <UpcomingTest
              name="Annual Physical"
              date="Nov 15, 2024"
              provider="Dr. James Wilson"
              preparation="No special preparation needed"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

interface TestResultItemProps {
  title: string;
  date: string;
  category: string;
  status: 'completed' | 'pending' | 'cancelled';
  flagged?: boolean;
  provider: string;
}

function TestResultItem({
  title,
  date,
  category,
  status,
  flagged,
  provider
}: TestResultItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {flagged && (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
          </div>
          <p className="text-sm text-gray-500">{provider}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'completed' ? 'bg-green-100 text-green-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {category}
        </span>
      </div>
    </div>
  );
}

interface TrendingValueProps {
  name: string;
  value: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  date: string;
}

function TrendingValue({ name, value, trend, date }: TrendingValueProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium text-gray-900">{value}</p>
        <Activity className={`h-4 w-4 ${
          trend === 'increasing' ? 'text-red-500' :
          trend === 'decreasing' ? 'text-green-500' :
          'text-blue-500'
        }`} />
      </div>
    </div>
  );
}

interface UpcomingTestProps {
  name: string;
  date: string;
  provider: string;
  preparation: string;
}

function UpcomingTest({ name, date, provider, preparation }: UpcomingTestProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-blue-600" />
          <p className="text-sm font-medium text-gray-900">{name}</p>
        </div>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-sm text-gray-600 mt-1">{provider}</p>
      <p className="text-xs text-gray-500 mt-1">{preparation}</p>
    </div>
  );
}