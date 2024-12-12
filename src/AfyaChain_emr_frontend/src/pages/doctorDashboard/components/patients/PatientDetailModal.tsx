import { useState } from 'react';
import { 
  X, User, Phone, Mail, MapPin, Edit, MessageSquare, 
  Pill, Activity, Calendar, Image, AlertCircle 
} from 'lucide-react';

// Mock Data
const mockMedicalHistory = [
  {
    id: '1',
    date: '2024-02-15',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Metformin 500mg',
    provider: 'Dr. Sarah Kimani'
  },
  {
    id: '2',
    date: '2024-01-20',
    diagnosis: 'Hypertension',
    treatment: 'Lisinopril 10mg',
    provider: 'Dr. James Mwangi'
  },
  {
    id: '3',
    date: '2023-12-10',
    diagnosis: 'Upper Respiratory Infection',
    treatment: 'Amoxicillin 500mg',
    provider: 'Dr. Sarah Kimani'
  }
];

const mockPrescriptions = [
  {
    id: '1',
    medication: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    startDate: '2024-02-15',
    status: 'active'
  },
  {
    id: '2',
    medication: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    startDate: '2024-01-20',
    status: 'active'
  },
  {
    id: '3',
    medication: 'Amoxicillin',
    dosage: '500mg',
    frequency: 'Three times daily',
    startDate: '2023-12-10',
    status: 'completed'
  }
];

const mockLabResults = [
  {
    id: '1',
    testName: 'Blood Glucose',
    date: '2024-02-15',
    result: '126 mg/dL',
    normalRange: '70-99 mg/dL',
    status: 'high'
  },
  {
    id: '2',
    testName: 'HbA1c',
    date: '2024-02-15',
    result: '6.8%',
    normalRange: '4.0-5.6%',
    status: 'high'
  },
  {
    id: '3',
    testName: 'Blood Pressure',
    date: '2024-02-15',
    result: '128/82 mmHg',
    normalRange: '120/80 mmHg',
    status: 'normal'
  }
];

const mockImaging = [
  {
    id: '1',
    type: 'Chest X-Ray',
    date: '2024-02-15',
    url: 'https://example.com/xray1.jpg',
    notes: 'No significant findings'
  },
  {
    id: '2',
    type: 'ECG',
    date: '2024-01-20',
    url: 'https://example.com/ecg1.jpg',
    notes: 'Normal sinus rhythm'
  },
  {
    id: '3',
    type: 'Ultrasound',
    date: '2023-12-10',
    url: 'https://example.com/ultrasound1.jpg',
    notes: 'Abdominal scan - normal'
  }
];

const mockActivityLog = [
  {
    id: '1',
    content: 'Prescribed',
    target: 'Metformin 500mg',
    date: '2024-02-15',
    datetime: '2024-02-15T13:00',
    icon: Pill
  },
  {
    id: '2',
    content: 'Lab test requested for',
    target: 'Blood Glucose',
    date: '2024-02-15',
    datetime: '2024-02-15T11:30',
    icon: Activity
  },
  {
    id: '3',
    content: 'Appointment scheduled with',
    target: 'Dr. Sarah Kimani',
    date: '2024-02-14',
    datetime: '2024-02-14T09:00',
    icon: Calendar
  },
  {
    id: '4',
    content: 'Uploaded',
    target: 'Chest X-Ray',
    date: '2024-02-13',
    datetime: '2024-02-13T15:45',
    icon: Image
  },
  {
    id: '5',
    content: 'Updated allergies',
    target: 'Penicillin added',
    date: '2024-02-12',
    datetime: '2024-02-12T10:15',
    icon: AlertCircle
  }
];

interface PatientDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

type TabType = 'personal' | 'medical' | 'prescriptions' | 'lab' | 'imaging' | 'activity';

export function PatientDetailModal({ isOpen, onClose, patientId /* TODO: Use for fetching patient data */ }: PatientDetailModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');

  if (!isOpen) return null;

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'medical', label: 'Medical History' },
    { id: 'prescriptions', label: 'Prescriptions' },
    { id: 'lab', label: 'Lab Results' },
    { id: 'imaging', label: 'Imaging' },
    { id: 'activity', label: 'Activity Log' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Patient Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
            <Edit className="h-4 w-4 mr-1" /> Edit Info
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
            <MessageSquare className="h-4 w-4 mr-1" /> Send Message
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-4 px-4 text-sm font-medium border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">Male, 45 years</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">+254 712 345 678</p>
                        <p className="text-sm text-gray-500">Primary Contact</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">john.doe@example.com</p>
                        <p className="text-sm text-gray-500">Email</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">123 Kimathi Street</p>
                        <p className="text-sm text-gray-500">Nairobi, Kenya</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Jane Doe</p>
                        <p className="text-sm text-gray-500">Spouse</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">+254 712 345 679</p>
                        <p className="text-sm text-gray-500">Emergency Contact</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Treatment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Provider</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockMedicalHistory.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{record.diagnosis}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{record.treatment}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{record.provider}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Prescriptions Tab */}
          {activeTab === 'prescriptions' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  New Prescription
                </button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Start Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockPrescriptions.map((prescription) => (
                      <tr key={prescription.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{prescription.medication}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{prescription.dosage}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{prescription.frequency}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{prescription.startDate}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            prescription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {prescription.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Lab Results Tab */}
          {activeTab === 'lab' && (
            <div className="space-y-6">
              <div className="flex justify-end space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Upload Results
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Request Test
                </button>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Test Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Result</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Normal Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockLabResults.map((result) => (
                      <tr key={result.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{result.testName}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{result.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{result.result}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{result.normalRange}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            result.status === 'normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Imaging Tab */}
          {activeTab === 'imaging' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  Upload Image
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockImaging.map((image) => (
                  <div key={image.id} className="border rounded-lg overflow-hidden">
                    <img src={image.url} alt={image.type} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-900">{image.type}</h4>
                      <p className="text-sm text-gray-500">{image.date}</p>
                      <p className="text-sm text-gray-500 mt-1">{image.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="flow-root">
                <ul className="-mb-8">
                  {mockActivityLog.map((activity, activityIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {activityIdx !== mockActivityLog.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <activity.icon className="h-5 w-5 text-white" aria-hidden="true" />
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-500">
                                {activity.content}{' '}
                                <span className="font-medium text-gray-900">{activity.target}</span>
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={activity.datetime}>{activity.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 