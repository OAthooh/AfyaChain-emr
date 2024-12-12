// src/pages/patientdashboard/PatientDashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { PatientDashboardSidebar } from './components/PatientDashboardSidebar';
import { PatientDashboardHeader } from './components/PatientDashboardHeader';

export function PatientDashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PatientDashboardHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <PatientDashboardSidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}