import { Link } from 'react-router-dom';
import { Activity, User, Bell, Settings, Search } from 'lucide-react';

export function HealthRecordsHeader() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center">
                <Link to="/health-records" className="flex items-center">
                    <Activity className="h-8 w-8 text-blue-600" />
                    <span className="ml-2 text-xl font-bold text-gray-900">AfyaChain</span>
                </Link>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search appointments, reports, patient info..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Settings className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Patient ID: #12345</p>
                    </div>
                </div>
            </div>
        </header>
    );
}