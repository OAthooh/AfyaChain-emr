import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings, 
  LogOut,
  Building2,
  FileText
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { icon: Users, label: 'Patient Queue', href: '/registration' },
  { icon: ClipboardList, label: 'Registration', href: '/registration/registration' },
  { icon: Calendar, label: 'Appointments', href: '/registration/appointments' },
  { icon: Building2, label: 'Departments', href: '/registration/departments' },
  { icon: FileText, label: 'Records', href: '/registration/records' },
  { icon: Settings, label: 'Settings', href: '/registration/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white fixed left-0 top-0 flex flex-col border-r">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-[#2563EB]">HealthCare EHR</h2>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-[#2563EB] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;