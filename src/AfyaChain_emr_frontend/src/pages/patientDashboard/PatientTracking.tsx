// src/pages/patientDashboard/PatientTracking.tsx
import { useState } from 'react';
import { 
  Activity, 
  Heart, 
  Weight, 
  Thermometer, 
  Activity as PulseIcon,
  Plus,
  LineChart,
  Calendar 
} from 'lucide-react';
import { Card } from '../../components/ui/card';

interface VitalRecord {
  type: string;
  value: number;
  unit: string;
  timestamp: string;
  status: 'normal' | 'warning' | 'critical';
}

export function PatientTracking() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Health Tracking</h1>
        
        <div className="flex space-x-3">
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
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-1" /> Add Measurement
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <QuickStat 
          title="Blood Pressure"
          value="128/82"
          change="-2%"
          icon={Heart}
          status="normal"
        />
        <QuickStat 
          title="Heart Rate"
          value="72 bpm"
          change="+5 bpm"
          icon={PulseIcon}
          status="normal"
        />
        <QuickStat 
          title="Weight"
          value="165 lbs"
          change="-1.5 lbs"
          icon={Weight}
          status="normal"
        />
        <QuickStat 
          title="Temperature"
          value="98.6°F"
          change="0"
          icon={Thermometer}
          status="normal"
        />
      </div>

      {/* Tracking Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Measurements */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Measurements</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {recentMeasurements.map((record, index) => (
              <VitalRecordItem key={index} {...record} />
            ))}
          </div>
        </Card>

        {/* Trends Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Trends</h2>
            <select className="text-sm border-gray-300 rounded-md">
              <option>Blood Pressure</option>
              <option>Heart Rate</option>
              <option>Weight</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <LineChart className="h-8 w-8 text-gray-400" />
            <span className="ml-2 text-gray-500">Chart visualization here</span>
          </div>
        </Card>
      </div>

      {/* Health Goals */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Health Goals</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Add New Goal
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HealthGoal
            title="Daily Steps"
            target="10,000 steps"
            current="7,500 steps"
            progress={75}
          />
          <HealthGoal
            title="Weight Goal"
            target="160 lbs"
            current="165 lbs"
            progress={60}
          />
          <HealthGoal
            title="Blood Pressure"
            target="120/80"
            current="128/82"
            progress={85}
          />
          <HealthGoal
            title="Exercise"
            target="30 min/day"
            current="20 min/day"
            progress={66}
          />
        </div>
      </Card>

      {/* Upcoming Check-ins */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Check-ins</h2>
        </div>
        <div className="space-y-4">
          <CheckInItem
            title="Blood Pressure Reading"
            description="Daily morning measurement"
            dueDate="Tomorrow, 8:00 AM"
          />
          <CheckInItem
            title="Weight Check"
            description="Weekly weigh-in"
            dueDate="Saturday, 9:00 AM"
          />
        </div>
      </Card>
    </div>
  );
}

// Component implementations
function QuickStat({ title, value, change, icon: Icon, status }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  status: 'normal' | 'warning' | 'critical';
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <Icon className={`h-8 w-8 ${
          status === 'normal' ? 'text-blue-600' :
          status === 'warning' ? 'text-yellow-600' :
          'text-red-600'
        }`} />
        <span className="text-sm font-medium text-gray-500">{change}</span>
      </div>
      <p className="mt-4 text-2xl font-semibold text-gray-900">{value}</p>
      <p className="mt-1 text-sm text-gray-600">{title}</p>
    </Card>
  );
}

function VitalRecordItem({ type, value, unit, timestamp, status }: VitalRecord) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Activity className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm font-medium text-gray-900">{type}</p>
          <p className="text-xs text-gray-500">{timestamp}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{value} {unit}</p>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'normal' ? 'bg-green-100 text-green-800' :
          status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
    </div>
  );
}

function HealthGoal({ title, target, current, progress }: {
  title: string;
  target: string;
  current: string;
  progress: number;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <p className="font-medium text-gray-900">{title}</p>
        <span className="text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="space-y-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Current: {current}</span>
          <span>Target: {target}</span>
        </div>
      </div>
    </div>
  );
}

function CheckInItem({ title, description, dueDate }: {
  title: string;
  description: string;
  dueDate: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <Calendar className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600">{dueDate}</p>
    </div>
  );
}

// Sample data
const recentMeasurements: VitalRecord[] = [
  {
    type: 'Blood Pressure',
    value: 128,
    unit: 'mmHg',
    timestamp: 'Today, 8:00 AM',
    status: 'normal'
  },
  {
    type: 'Heart Rate',
    value: 72,
    unit: 'bpm',
    timestamp: 'Today, 8:00 AM',
    status: 'normal'
  },
  {
    type: 'Weight',
    value: 165,
    unit: 'lbs',
    timestamp: 'Yesterday, 7:30 AM',
    status: 'normal'
  }
];