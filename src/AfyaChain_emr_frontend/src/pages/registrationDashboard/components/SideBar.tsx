import { 
  Users, 
  Calendar, 
  ClipboardList, 
  Settings, 
  LogOut,
  Building2,
  FileText
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Patient Queue', href: '/registration', icon: Users },
  { name: 'Registration', href: '/registration/registration', icon: ClipboardList },
  { name: 'Appointments', href: '/registration/appointments', icon: Calendar },
  { name: 'Departments', href: '/registration/departments', icon: Building2 },
  { name: 'Records', href: '/registration/records', icon: FileText },
  { name: 'Settings', href: '/registration/settings', icon: Settings },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg border-r border-gray-100">
      

      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;