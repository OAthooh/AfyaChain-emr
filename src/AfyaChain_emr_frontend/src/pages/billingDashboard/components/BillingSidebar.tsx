import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  ArrowLeftRight, 
  FileBarChart, 
  Settings, 
  LogOut 
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/billing', icon: LayoutDashboard },
  { name: 'Invoices', href: '/billing/invoices', icon: Receipt },
  { name: 'Transactions', href: '/billing/transactions', icon: ArrowLeftRight },
  { name: 'Reports', href: '/billing/reports', icon: FileBarChart },
  { name: 'Settings', href: '/billing/settings', icon: Settings },
];

export function BillingSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <nav className="flex-1 px-4 py-6 space-y-1">
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
        <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default BillingSidebar; 