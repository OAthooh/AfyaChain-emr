import { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { PrescriptionForm } from './components/prescriptions/PrescriptionForm';
import { PrescriptionsList } from './components/prescriptions/PrescriptionsList';
import { PrescriptionDetailModal } from './components/prescriptions/PrescriptionDetailModal';
import { PrescriptionFilters } from './components/prescriptions/PrescriptionFilters';

export function PrescriptionsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateRange: 'all',
    medication: 'all'
  });

  const handleViewPrescription = (prescriptionId: string) => {
    setSelectedPrescriptionId(prescriptionId);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
        
        {/* Quick Actions */}
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" /> New Prescription
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700">
            <FileText className="h-4 w-4 mr-1" /> Export Records
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <PrescriptionFilters filters={filters} onFilterChange={setFilters} />
        <PrescriptionsList 
          filters={filters}
          onViewPrescription={handleViewPrescription}
        />
      </div>

      <PrescriptionForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {selectedPrescriptionId && (
        <PrescriptionDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          prescriptionId={selectedPrescriptionId}
        />
      )}
    </div>
  );
} 