import {  Outlet } from 'react-router-dom';
import Sidebar from './components/SideBar';
import DashboardHeader from './components/DashBoardHeader';



export const RegistrationDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <DashboardHeader />
      
      <main className="ml-64 pt-16 p-6">
        <Outlet />
      </main>
    </div>
  );
};