import { Outlet } from 'react-router-dom';
import BillingSidebar from './components/BillingSidebar';
import { DashboardHeader } from '../doctorDashboard/components/DashboardHeader';

export function BillingLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <BillingSidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}