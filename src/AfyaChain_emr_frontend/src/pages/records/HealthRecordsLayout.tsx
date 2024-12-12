import { Outlet } from 'react-router-dom';
import { HealthRecordsSidebar } from './HealthRecordsSidebar';
import { HealthRecordsHeader } from './HealthRecordsHeader';

export function HealthRecordsLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HealthRecordsHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <HealthRecordsSidebar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}