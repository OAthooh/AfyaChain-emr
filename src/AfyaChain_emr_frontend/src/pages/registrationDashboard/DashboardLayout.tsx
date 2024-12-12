import { Outlet } from 'react-router-dom';
import Sidebar from './components/SideBar';
import DashboardHeader from './components/DashBoardHeader';

export const RegistrationDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64">
        <DashboardHeader />
        <main className="p-6 mt-16">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};