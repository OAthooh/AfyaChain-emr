// src/pages/patientDashboard/PatientRecords.tsx
import { useState } from 'react';
import { FileText, Download, Filter, Search } from 'lucide-react';
import { Card } from '../../components/ui/card';

export function PatientRecords() {
  const [activeTab, setActiveTab] = useState<'all' | 'conditions' | 'procedures' | 'immunizations'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', label: 'All Records' },
    { id: 'conditions', label: 'Conditions' },
    { id: 'procedures', label: 'Procedures' },
    { id: 'immunizations', label: 'Immunizations' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
        
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-1" /> Download Records
          </button>
        </div>
      </div>

      <Card className="p-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search medical records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="ml-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" /> Filters
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Records List */}
        <div className="mt-6 space-y-4">
          <RecordItem
            title="Annual Physical Examination"
            date="Oct 10, 2024"
            provider="Dr. Sarah Smith"
            type="Examination"
            department="General Practice"
          />
          <RecordItem
            title="Influenza Vaccination"
            date="Sep 15, 2024"
            provider="Nurse John Davis"
            type="Immunization"
            department="Primary Care"
          />
          <RecordItem
            title="Blood Work Results"
            date="Aug 22, 2024"
            provider="Dr. Michael Chang"
            type="Laboratory"
            department="Internal Medicine"
          />
        </div>
      </Card>

      {/* Health Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Conditions</h2>
          <div className="space-y-3">
            <ConditionItem
              condition="Hypertension"
              diagnosedDate="March 2023"
              status="Managed"
              severity="Moderate"
            />
            <ConditionItem
              condition="Type 2 Diabetes"
              diagnosedDate="January 2022"
              status="Controlled"
              severity="Mild"
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Procedures</h2>
          <div className="space-y-3">
            <ProcedureItem
              procedure="ECG"
              date="September 2024"
              provider="Dr. Sarah Smith"
              result="Normal"
            />
            <ProcedureItem
              procedure="Blood Test"
              date="August 2024"
              provider="Dr. Michael Chang"
              result="Completed"
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

interface RecordItemProps {
  title: string;
  date: string;
  provider: string;
  type: string;
  department: string;
}

function RecordItem({ title, date, provider, type, department }: RecordItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{provider} - {department}</p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {type}
        </span>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View
        </button>
      </div>
    </div>
  );
}

interface ConditionItemProps {
  condition: string;
  diagnosedDate: string;
  status: string;
  severity: string;
}

function ConditionItem({ condition, diagnosedDate, status, severity }: ConditionItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{condition}</p>
          <p className="text-sm text-gray-500">Diagnosed: {diagnosedDate}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">Severity: {severity}</p>
    </div>
  );
}

interface ProcedureItemProps {
  procedure: string;
  date: string;
  provider: string;
  result: string;
}

function ProcedureItem({ procedure, date, provider, result }: ProcedureItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{procedure}</p>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {result}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{date}</p>
    </div>
  );
}