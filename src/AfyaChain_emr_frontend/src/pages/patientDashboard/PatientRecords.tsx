import { useState, useMemo } from 'react';
import { FileText, Download, Filter, Search, ChevronDown } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';

interface Record {
  id: string;
  title: string;
  date: string;
  provider: string;
  type: string;
  department: string;
  category: 'conditions' | 'procedures' | 'immunizations' | 'laboratory' | 'examination';
  details: string;
  attachments?: string[];
}

interface ConditionItemProps {
  condition: string;
  diagnosedDate: string;
  status: string;
  severity: string;
}

interface ProcedureItemProps {
  procedure: string;
  date: string;
  provider: string;
  result: string;
}

interface RecordItemProps extends Record {
  onClick: () => void;
  isSelected: boolean;
}

interface Filters {
  type: string[];
  department: string[];
  provider: string[];
  dateRange: string;
  category: ('conditions' | 'procedures' | 'immunizations' | 'laboratory' | 'examination')[];
}

function RecordItem({ 
  title, 
  date, 
  provider, 
  type, 
  department, 
  details,
  attachments,
  onClick,
  isSelected 
}: RecordItemProps) {
  return (
    <div 
      className={`flex items-center justify-between p-4 bg-white rounded-lg border transition-colors cursor-pointer
        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{provider} - {department}</p>
          <p className="text-xs text-gray-500">
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          {isSelected && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">{details}</p>
              {attachments && attachments.length > 0 && (
                <div className="mt-2 space-x-2">
                  {attachments.map((attachment, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle attachment download
                      }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      {attachment}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {type}
        </span>
        {!isSelected && (
          <button 
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}

function ConditionItem({ condition, diagnosedDate, status, severity }: ConditionItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{condition}</p>
          <p className="text-sm text-gray-500">Diagnosed: {diagnosedDate}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${status === 'Managed' ? 'bg-blue-100 text-blue-800' :
            status === 'Controlled' ? 'bg-green-100 text-green-800' :
            'bg-yellow-100 text-yellow-800'}`}
        >
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        Severity: 
        <span className={`ml-1 font-medium
          ${severity === 'Severe' ? 'text-red-600' :
            severity === 'Moderate' ? 'text-yellow-600' :
            'text-green-600'}`}
        >
          {severity}
        </span>
      </p>
    </div>
  );
}

function ProcedureItem({ procedure, date, provider, result }: ProcedureItemProps) {
  return (
    <div className="p-3 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-gray-900">{procedure}</p>
          <p className="text-sm text-gray-500">{provider}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${result === 'Normal' ? 'bg-green-100 text-green-800' :
            result === 'Abnormal' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'}`}
        >
          {result}
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-1">{date}</p>
    </div>
  );
}

export function PatientRecords() {
  const [activeTab, setActiveTab] = useState<'all' | 'conditions' | 'procedures' | 'immunizations'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({
    type: [],
    department: [],
    provider: [],
    dateRange: 'all',
    category: []
  });

  // Sample records data
  const records: Record[] = [
    {
      id: '1',
      title: "Annual Physical Examination",
      date: "2024-10-10",
      provider: "Dr. Sarah Smith",
      type: "Examination",
      department: "General Practice",
      category: "examination",
      details: "Routine annual physical examination. All vital signs normal.",
      attachments: ["physical_exam_report.pdf"]
    },
    {
      id: '2',
      title: "Influenza Vaccination",
      date: "2024-09-15",
      provider: "Nurse John Davis",
      type: "Immunization",
      department: "Primary Care",
      category: "immunizations",
      details: "Seasonal flu vaccine administered. No adverse reactions."
    },
    {
      id: '3',
      title: "Blood Work Results",
      date: "2024-08-22",
      provider: "Dr. Michael Chang",
      type: "Laboratory",
      department: "Internal Medicine",
      category: "laboratory",
      details: "Comprehensive metabolic panel and complete blood count.",
      attachments: ["lab_results.pdf"]
    }
  ];

  // Get unique values for filters
  const filterOptions = useMemo(() => ({
    type: [...new Set(records.map(record => record.type))],
    department: [...new Set(records.map(record => record.department))],
    provider: [...new Set(records.map(record => record.provider))],
    dateRanges: ['all', 'last30days', 'last6months', 'lastyear'],
    category: ['conditions', 'procedures', 'immunizations', 'laboratory', 'examination']
  }), [records]);

  // Filter and search logic
  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      // Filter by tab
      if (activeTab !== 'all' && record.category !== activeTab) return false;

      // Apply search
      if (searchQuery) {
        const search = searchQuery.toLowerCase();
        const searchMatch = 
          record.title.toLowerCase().includes(search) ||
          record.provider.toLowerCase().includes(search) ||
          record.department.toLowerCase().includes(search) ||
          record.details.toLowerCase().includes(search);
        if (!searchMatch) return false;
      }

      // Apply filters
      if (filters.type.length && !filters.type.includes(record.type)) return false;
      if (filters.department.length && !filters.department.includes(record.department)) return false;
      if (filters.provider.length && !filters.provider.includes(record.provider)) return false;
      if (filters.category.length && !filters.category.includes(record.category)) return false;

      // Date range filter
      if (filters.dateRange !== 'all') {
        const recordDate = new Date(record.date);
        const today = new Date();
        switch (filters.dateRange) {
          case 'last30days':
            const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
            if (recordDate < thirtyDaysAgo) return false;
            break;
          case 'last6months':
            const sixMonthsAgo = new Date(today.setMonth(today.getMonth() - 6));
            if (recordDate < sixMonthsAgo) return false;
            break;
          case 'lastyear':
            const oneYearAgo = new Date(today.setFullYear(today.getFullYear() - 1));
            if (recordDate < oneYearAgo) return false;
            break;
        }
      }

      return true;
    });
  }, [records, activeTab, searchQuery, filters]);

  // Download records
  const handleDownloadRecords = () => {
    const recordsToDownload = filteredRecords.map(record => ({
      Title: record.title,
      Date: record.date,
      Provider: record.provider,
      Type: record.type,
      Department: record.department,
      Category: record.category,
      Details: record.details
    }));

    const csv = [
      Object.keys(recordsToDownload[0]).join(','),
      ...recordsToDownload.map(row => 
        Object.values(row).map(value => `"${value}"`).join(',')
      )
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'medical_records.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Toggle filter
  const isCategoryType = (
    value: string
  ): value is 'conditions' | 'procedures' | 'immunizations' | 'laboratory' | 'examination' => {
    return ['conditions', 'procedures', 'immunizations', 'laboratory', 'examination'].includes(value);
  };
  
  const toggleFilter = (type: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: Array.isArray(prev[type])
        ? type === 'category'
          ? isCategoryType(value)
            ? (prev.category.includes(value)
              ? prev.category.filter(v => v !== value)
              : [...prev.category, value])
            : prev.category
          : prev[type].includes(value)
            ? prev[type].filter(v => v !== value)
            : [...prev[type], value]
        : value
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      department: [],
      provider: [],
      dateRange: 'all',
      category: []
    });
    setSearchQuery('');
  };

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
          <Button 
            variant="outline"
            onClick={handleDownloadRecords}
            className="inline-flex items-center"
          >
            <Download className="h-4 w-4 mr-1" /> Download Records
          </Button>
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
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center ${showFilters ? 'bg-blue-50' : ''}`}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
              <ChevronDown className={`h-4 w-4 ml-1 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </Button>
            {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== 'all') && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="text-sm text-gray-500"
              >
                Clear all
              </Button>
            )}
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <div className="space-y-2">
                  {filterOptions.type.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.type.includes(type)}
                        onChange={() => toggleFilter('type', type)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <div className="space-y-2">
                  {filterOptions.department.map(dept => (
                    <label key={dept} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.department.includes(dept)}
                        onChange={() => toggleFilter('department', dept)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-600">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
                <div className="space-y-2">
                  {filterOptions.provider.map(provider => (
                    <label key={provider} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.provider.includes(provider)}
                        onChange={() => toggleFilter('provider', provider)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-600">{provider}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => toggleFilter('dateRange', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Time</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last6months">Last 6 Months</option>
                  <option value="lastyear">Last Year</option>
                </select>
              </div>
            </div>
          </div>
        )}

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
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record) => (
              <RecordItem
                key={record.id}
                {...record}
                onClick={() => setSelectedRecord(record.id)}
                isSelected={selectedRecord === record.id}
              />
            ))
          ) : (
            <Alert>
              <AlertDescription>
                No records found matching your search criteria.
              </AlertDescription>
            </Alert>
          )}
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