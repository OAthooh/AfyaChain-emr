import React, { useState } from 'react';
import { Shield, Clock, AlertCircle, CheckCircle, XCircle, FileText, Search, Eye, X } from 'lucide-react';

interface ComplianceRecord {
  id: string;
  type: 'Consent' | 'Privacy' | 'Treatment' | 'Disclosure' | 'Policy';
  title: string;
  description: string;
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'Requires Update';
  dateIssued: string;
  expiryDate: string;
  lastReviewDate: string;
  reviewedBy: string;
  documents: {
    name: string;
    url: string;
    type: string;
  }[];
  requirements: {
    description: string;
    status: 'Met' | 'Not Met' | 'Pending';
  }[];
  notes: string;
}

export function ComplianceRecords() {
  const [records] = useState<ComplianceRecord[]>([
    {
      id: 'COMP001',
      type: 'Consent',
      title: 'Patient Treatment Consent',
      description: 'General consent for medical treatment and procedures',
      status: 'Compliant',
      dateIssued: '2024-01-15',
      expiryDate: '2025-01-15',
      lastReviewDate: '2024-01-15',
      reviewedBy: 'Dr. Sarah Smith',
      documents: [
        {
          name: 'Treatment Consent Form',
          url: '/documents/consent-form.pdf',
          type: 'PDF'
        }
      ],
      requirements: [
        {
          description: 'Patient signature obtained',
          status: 'Met'
        },
        {
          description: 'Witness signature obtained',
          status: 'Met'
        }
      ],
      notes: 'All requirements met and properly documented'
    },
    {
      id: 'COMP002',
      type: 'Privacy',
      title: 'HIPAA Compliance',
      description: 'Privacy and security compliance documentation',
      status: 'Requires Update',
      dateIssued: '2023-06-01',
      expiryDate: '2024-06-01',
      lastReviewDate: '2024-02-15',
      reviewedBy: 'Dr. James Wilson',
      documents: [
        {
          name: 'Privacy Policy Document',
          url: '/documents/privacy-policy.pdf',
          type: 'PDF'
        }
      ],
      requirements: [
        {
          description: 'Annual staff training completed',
          status: 'Pending'
        },
        {
          description: 'Security assessment conducted',
          status: 'Not Met'
        }
      ],
      notes: 'Updates required for new regulations'
    },
    {
      id: 'COMP003',
      type: 'Treatment',
      title: 'Standard Treatment Protocol',
      description: 'Guidelines and protocols for standard medical treatments',
      status: 'Compliant',
      dateIssued: '2024-01-01',
      expiryDate: '2025-01-01',
      lastReviewDate: '2024-01-01',
      reviewedBy: 'Dr. Michael Chen',
      documents: [
        {
          name: 'Treatment Guidelines',
          url: '/documents/treatment-guidelines.pdf',
          type: 'PDF'
        },
        {
          name: 'Clinical Procedures Manual',
          url: '/documents/clinical-procedures.pdf',
          type: 'PDF'
        }
      ],
      requirements: [
        {
          description: 'Staff training on procedures completed',
          status: 'Met'
        },
        {
          description: 'Equipment certification current',
          status: 'Met'
        },
        {
          description: 'Emergency protocols in place',
          status: 'Met'
        }
      ],
      notes: 'All treatment protocols are up to date and staff is fully trained'
    },
    {
      id: 'COMP004',
      type: 'Disclosure',
      title: 'Information Disclosure Protocol',
      description: 'Procedures for handling patient information disclosure requests',
      status: 'Pending Review',
      dateIssued: '2023-12-01',
      expiryDate: '2024-12-01',
      lastReviewDate: '2024-02-20',
      reviewedBy: 'Dr. Lisa Wong',
      documents: [
        {
          name: 'Disclosure Request Form',
          url: '/documents/disclosure-form.pdf',
          type: 'PDF'
        },
        {
          name: 'Information Release Guidelines',
          url: '/documents/release-guidelines.pdf',
          type: 'PDF'
        }
      ],
      requirements: [
        {
          description: 'Patient authorization forms updated',
          status: 'Met'
        },
        {
          description: 'Staff training on new disclosure procedures',
          status: 'Pending'
        },
        {
          description: 'Digital release system implementation',
          status: 'Not Met'
        }
      ],
      notes: 'Pending review of new digital release system implementation'
    },
    {
      id: 'COMP005',
      type: 'Policy',
      title: 'Hospital Operations Policy',
      description: 'General hospital operations and administrative policies',
      status: 'Requires Update',
      dateIssued: '2023-09-15',
      expiryDate: '2024-09-15',
      lastReviewDate: '2024-03-01',
      reviewedBy: 'Dr. Robert Johnson',
      documents: [
        {
          name: 'Operations Manual',
          url: '/documents/operations-manual.pdf',
          type: 'PDF'
        },
        {
          name: 'Staff Handbook',
          url: '/documents/staff-handbook.pdf',
          type: 'PDF'
        },
        {
          name: 'Emergency Procedures',
          url: '/documents/emergency-procedures.pdf',
          type: 'PDF'
        }
      ],
      requirements: [
        {
          description: 'Annual policy review completed',
          status: 'Met'
        },
        {
          description: 'Staff acknowledgment forms collected',
          status: 'Pending'
        },
        {
          description: 'Updated COVID-19 protocols',
          status: 'Not Met'
        },
        {
          description: 'Department-specific guidelines updated',
          status: 'Pending'
        }
      ],
      notes: 'Policy updates required to reflect new COVID-19 protocols and departmental changes'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<{ name: string; url: string } | null>(null);

  const getStatusColor = (status: ComplianceRecord['status']) => {
    switch (status) {
      case 'Compliant':
        return 'bg-green-100 text-green-800';
      case 'Non-Compliant':
        return 'bg-red-100 text-red-800';
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Requires Update':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRequirementStatusColor = (status: 'Met' | 'Not Met' | 'Pending') => {
    switch (status) {
      case 'Met':
        return 'text-green-500';
      case 'Not Met':
        return 'text-red-500';
      case 'Pending':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || record.type === filterType;
    
    return matchesSearch && matchesType;
  });

  const handlePreview = (document: { name: string; url: string }) => {
    setSelectedDocument(document);
    setIsPreviewOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Records</h1>
        <p className="text-gray-600">Track and manage compliance documentation and requirements</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search compliance records..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="Consent">Consent</option>
          <option value="Privacy">Privacy</option>
          <option value="Treatment">Treatment</option>
          <option value="Disclosure">Disclosure</option>
          <option value="Policy">Policy</option>
        </select>
      </div>

      {/* Compliance Records Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">{record.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Compliance Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Issued: {record.dateIssued}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <AlertCircle className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Expires: {record.expiryDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <FileText className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-600">Last Review: {record.lastReviewDate}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Documents</h4>
                  <div className="space-y-2">
                    {record.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm text-gray-600">{doc.name}</span>
                        <button
                          onClick={() => handlePreview(doc)}
                          className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements</h4>
                  <div className="space-y-2">
                    {record.requirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-start justify-between p-2 bg-gray-50 rounded"
                      >
                        <span className="text-sm text-gray-600">{req.description}</span>
                        <span className={`flex items-center ${getRequirementStatusColor(req.status)}`}>
                          {req.status === 'Met' && <CheckCircle className="h-4 w-4 mr-1" />}
                          {req.status === 'Not Met' && <XCircle className="h-4 w-4 mr-1" />}
                          {req.status === 'Pending' && <Clock className="h-4 w-4 mr-1" />}
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {record.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {isPreviewOpen && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{selectedDocument.name}</h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={selectedDocument.url}
                className="w-full h-full border-0"
                title="Document Preview"
              />
            </div>
          </div>
        </div>
      )}

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Compliance Records Found</h3>
          <p className="text-gray-500">No records match your current search criteria.</p>
        </div>
      )}
    </div>
  );
}