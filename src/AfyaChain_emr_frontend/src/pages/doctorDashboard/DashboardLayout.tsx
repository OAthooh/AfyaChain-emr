import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './components/DashboardSidebar';
import { DashboardHeader } from './components/DashboardHeader';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <DashboardSidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}