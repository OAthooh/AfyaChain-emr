import { Bell, Search } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header className="bg-white h-16 fixed right-0 top-0 left-64 flex items-center justify-between px-6 border-b">
      <div className="flex-1">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB]"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#2563EB] flex items-center justify-center text-white overflow-hidden">
            <img 
              src="/default-avatar.png" 
              alt="User Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
              }}
            />
          </div>
          <span className="font-medium">Roberts</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;