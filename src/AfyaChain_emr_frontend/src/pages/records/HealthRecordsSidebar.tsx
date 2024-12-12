import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  User, 
  Shield, 
  BarChart, 
  HelpCircle,
  LogOut,
  Settings,
  Bell
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/health-records', icon: Home },
  { name: 'Appointments', href: '/health-records/appointments', icon: Calendar },
  { name: 'Reports', href: '/health-records/reports', icon: FileText },
  { name: 'Patient Info', href: '/health-records/patient-info', icon: User },
  { name: 'Compliance', href: '/health-records/compliance', icon: Shield },
  { name: 'Analytics', href: '/health-records/analytics', icon: BarChart },
  { name: 'Help', href: '/health-records/help', icon: HelpCircle },
  { name: 'Settings', href: '/health-records/settings', icon: Settings },
  { name: 'Notifications', href: '/health-records/notifications', icon: Bell },
];

export function HealthRecordsSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">Patient ID: #12345</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </button>
      </div>
    </aside>
  );
}