import { useState } from 'react';
import { Plus, FileText, Download, Bell } from 'lucide-react';
import { PatientTable } from './components/patients/PatientTable';
import { PatientFilters } from './components/patients/PatientFilters';
import { PatientDetailModal } from './components/patients/PatientDetailModal';
import { NewPatientModal } from './components/patients/NewPatientModal';

export function PatientsPage() {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    condition: 'all',
    ageRange: 'all'
  });

  const handleViewPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
        
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsNewPatientModalOpen(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Patient
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700">
            <FileText className="h-4 w-4 mr-1" /> Export Records
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-1" /> Download Report
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-red-600 hover:bg-red-700">
            <Bell className="h-4 w-4 mr-1" /> Alerts
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <PatientFilters filters={filters} onFilterChange={setFilters} />
        <PatientTable 
          filters={filters}
          onViewPatient={handleViewPatient}
        />
      </div>

      {selectedPatientId && (
        <PatientDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          patientId={selectedPatientId}
        />
      )}

      <NewPatientModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
      />
    </div>
  );
} 