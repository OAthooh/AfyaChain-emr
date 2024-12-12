// src/pages/patientDashboard/PatientMedications.tsx
import { useState } from 'react';
import { Pill, Clock, AlertCircle, RefreshCcw, Search } from 'lucide-react';
import { Card } from '../../components/ui/card';

interface MedicationItemProps {
  name: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  lastRefill: string;
  refillsRemaining: number;
  status: 'active' | 'refill-needed' | 'discontinued';
}

interface AllergyItemProps {
  medication: string;
  severity: string;
  reaction: string;
  diagnosed: string;
}

export function PatientMedications() {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
        
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <RefreshCcw className="h-4 w-4 mr-1" /> Request Refill
          </button>
        </div>
      </div>

      <Card className="p-6">
        {/* Search Bar */}
        <div className="flex items-center mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('current')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'current'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Current Medications
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === 'history'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              Medication History
            </button>
          </nav>
        </div>

        {/* Medications List */}
        <div className="space-y-4">
          <MedicationItem
            name="Lisinopril"
            dosage="10mg"
            frequency="Once daily"
            prescribedBy="Dr. Sarah Smith"
            lastRefill="Oct 1, 2024"
            refillsRemaining={2}
            status="active"
          />
          <MedicationItem
            name="Metformin"
            dosage="500mg"
            frequency="Twice daily"
            prescribedBy="Dr. Michael Chang"
            lastRefill="Sep 15, 2024"
            refillsRemaining={1}
            status="refill-needed"
          />
          <MedicationItem
            name="Atorvastatin"
            dosage="20mg"
            frequency="Once daily"
            prescribedBy="Dr. Sarah Smith"
            lastRefill="Sep 1, 2024"
            refillsRemaining={3}
            status="active"
          />
        </div>
      </Card>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pharmacy Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">HealthCare Pharmacy</p>
                <p className="text-sm text-gray-500">123 Medical Center Drive</p>
                <p className="text-sm text-gray-500">Open until 9:00 PM</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Change Pharmacy
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Get Directions
              </button>
              <button className="flex-1 text-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Call Pharmacy
              </button>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Medication Allergies</h2>
          <div className="space-y-3">
            <AllergyItem
              medication="Penicillin"
              severity="Severe"
              reaction="Anaphylaxis"
              diagnosed="2020"
            />
            <AllergyItem
              medication="Sulfa Drugs"
              severity="Moderate"
              reaction="Skin Rash"
              diagnosed="2019"
            />
          </div>
        </Card>
      </div>

      {/* Next Scheduled Medications */}
      <Card className="p-6">
        <NextScheduledMedications />
      </Card>
    </div>
  );
}

// Component implementations
function MedicationItem({
  name,
  dosage,
  frequency,
  prescribedBy,
  lastRefill,
  refillsRemaining,
  status
}: MedicationItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Pill className={`h-6 w-6 ${
            status === 'refill-needed' ? 'text-yellow-600' :
            status === 'discontinued' ? 'text-gray-400' :
            'text-blue-600'
          }`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{name} - {dosage}</p>
          <p className="text-sm text-gray-600">{frequency}</p>
          <p className="text-xs text-gray-500">Prescribed by {prescribedBy}</p>
        </div>
      </div>
      <div className="flex flex-col items-end space-y-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'refill-needed' ? 'bg-yellow-100 text-yellow-800' :
          status === 'discontinued' ? 'bg-gray-100 text-gray-800' :
          'bg-green-100 text-green-800'
        }`}>
          {status === 'refill-needed' ? 'Refill Needed' :
           status === 'discontinued' ? 'Discontinued' :
           'Active'}
        </span>
        <p className="text-xs text-gray-500">Last refill: {lastRefill}</p>
        <p className="text-xs text-gray-500">Refills remaining: {refillsRemaining}</p>
      </div>
    </div>
  );
}

function AllergyItem({
  medication,
  severity,
  reaction,
  diagnosed
}: AllergyItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <p className="font-medium text-gray-900">{medication}</p>
          </div>
          <p className="text-sm text-gray-500 mt-1">Reaction: {reaction}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          severity === 'Severe' ? 'bg-red-100 text-red-800' :
          severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {severity}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-2">Diagnosed: {diagnosed}</p>
    </div>
  );
}

function NextScheduledMedications() {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Next Scheduled Medications</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Lisinopril 10mg</p>
              <p className="text-xs text-gray-500">Take with water</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-blue-600">8:00 PM</p>
            <p className="text-xs text-gray-500">Today</p>
          </div>
        </div>
      </div>
    </div>
  );
}