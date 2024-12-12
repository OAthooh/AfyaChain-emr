import { Users, Calendar, FileText, AlertCircle } from 'lucide-react';

const metrics = [
  {
    name: 'Active Patients',
    value: '248',
    change: '+12%',
    changeType: 'increase',
    icon: Users,
  },
  {
    name: "Today's Appointments",
    value: '12',
    change: '4 remaining',
    changeType: 'neutral',
    icon: Calendar,
  },
  {
    name: 'Prescriptions Issued',
    value: '36',
    change: '+8%',
    changeType: 'increase',
    icon: FileText,
  },
  {
    name: 'Critical Alerts',
    value: '2',
    change: 'Action needed',
    changeType: 'decrease',
    icon: AlertCircle,
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All Departments</option>
            <option>Cardiology</option>
            <option>Neurology</option>
            <option>Pediatrics</option>
          </select>
        </div>
      </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h2>
          <div className="space-y-4">
            {/* Add patient list here */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {/* Add appointments list here */}
          </div>
        </div>
      </div>
    </div>
  );
}