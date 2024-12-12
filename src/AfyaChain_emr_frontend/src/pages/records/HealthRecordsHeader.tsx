import { Link } from 'react-router-dom';
import { Activity, User, Bell, Settings } from 'lucide-react';

export function HealthRecordsHeader() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center">
                <Link to="/doctor" className="flex items-center">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">AfyaChain</span>
                </Link>
            </div>
            {/* <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-900">Health Records Dashboard</h1>
      </div> */}

            <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-600 hover:text-blue-600">
                    <User className="h-6 w-6" />
                </Link>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Bell className="h-6 w-6" />
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Settings className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
}