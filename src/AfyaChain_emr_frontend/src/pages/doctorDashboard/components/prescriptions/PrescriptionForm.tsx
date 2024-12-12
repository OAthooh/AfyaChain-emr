import { useState } from 'react';
import { X, Search } from 'lucide-react';

interface FormProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for dropdowns
const FREQUENCIES = [
  'Once daily',
  'Twice daily',
  'Three times daily',
  'Four times daily',
  'Every 4 hours',
  'Every 6 hours',
  'Every 8 hours',
  'As needed'
];

const DURATIONS = [
  '3 days',
  '5 days',
  '7 days',
  '10 days',
  '14 days',
  '30 days',
  'Custom'
];

export function PrescriptionForm({ isOpen, onClose }: FormProps) {
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: '',
    customDuration: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.patientId) newErrors.patientId = 'Patient is required';
    if (!formData.medication) newErrors.medication = 'Medication is required';
    if (!formData.dosage) newErrors.dosage = 'Dosage is required';
    if (!formData.frequency) newErrors.frequency = 'Frequency is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    console.log('Submitting prescription:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">New Prescription</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Patient Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Patient</label>
                <div className="mt-1 relative">
                  <input
                    type="text"
                    placeholder="Search patient by name or ID"
                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                      errors.patientId ? 'border-red-300' : ''
                    }`}
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  />
                  <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                {errors.patientId && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientId}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Medication</label>
                <input
                  type="text"
                  placeholder="Enter medication name"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.medication ? 'border-red-300' : ''
                  }`}
                  value={formData.medication}
                  onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                />
                {errors.medication && (
                  <p className="mt-1 text-sm text-red-600">{errors.medication}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  placeholder="e.g., 500mg"
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.dosage ? 'border-red-300' : ''
                  }`}
                  value={formData.dosage}
                  onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                />
                {errors.dosage && (
                  <p className="mt-1 text-sm text-red-600">{errors.dosage}</p>
                )}
              </div>
            </div>

            {/* Right Column - Prescription Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Frequency</label>
                <select
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.frequency ? 'border-red-300' : ''
                  }`}
                  value={formData.frequency}
                  onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                >
                  <option value="">Select frequency</option>
                  {FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
                {errors.frequency && (
                  <p className="mt-1 text-sm text-red-600">{errors.frequency}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <select
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.duration ? 'border-red-300' : ''
                  }`}
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                >
                  <option value="">Select duration</option>
                  {DURATIONS.map((dur) => (
                    <option key={dur} value={dur}>{dur}</option>
                  ))}
                </select>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Instructions</label>
                <textarea
                  rows={4}
                  placeholder="Additional instructions (e.g., take after meals)"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 