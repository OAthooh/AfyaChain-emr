import React, { useState } from 'react';
import { FileText, Download, Search, Filter, Calendar } from 'lucide-react';

interface Report {
    id: string;
    date: string;
    type: 'Lab Test' | 'Imaging' | 'Diagnosis' | 'Treatment Plan' | 'Progress Note';
    title: string;
    doctor: string;
    department: string;
    status: 'completed' | 'pending' | 'reviewed';
    summary: string;
    fileUrl: string;
    fileName: string;
}

// Report Service
async function downloadReport(fileUrl: string): Promise<Blob> {
    const response = await fetch(`/api/reports/download${fileUrl}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // If using JWT
        },
    });

    if (!response.ok) {
        throw new Error('Failed to download report');
    }

    return response.blob();
}

export function ReportsRecords() {
    const [reports] = useState<Report[]>([
        {
            id: 'REP001',
            date: '2024-03-15',
            type: 'Lab Test',
            title: 'Complete Blood Count',
            doctor: 'Dr. Sarah Smith',
            department: 'Hematology',
            status: 'completed',
            summary: 'Normal blood cell counts, no abnormalities detected',
            fileUrl: '/reports/cbc-001.pdf',
            fileName: 'CBC_Report_15Mar2024.pdf'
        },
        {
            id: 'REP002',
            date: '2024-03-10',
            type: 'Imaging',
            title: 'Chest X-Ray',
            doctor: 'Dr. James Wilson',
            department: 'Radiology',
            status: 'reviewed',
            summary: 'Clear lung fields, normal heart size',
            fileUrl: '/reports/xray-002.pdf',
            fileName: 'Chest_XRay_10Mar2024.pdf'
        },
        {
            id: 'REP003',
            date: '2024-03-05',
            type: 'Diagnosis',
            title: 'Annual Physical Examination',
            doctor: 'Dr. Emily Brown',
            department: 'Internal Medicine',
            status: 'completed',
            summary: 'Overall health status is good. Regular exercise recommended.',
            fileUrl: '/reports/physical-003.pdf',
            fileName: 'Annual_Physical_05Mar2024.pdf'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [isDownloading, setIsDownloading] = useState(false);

    const getStatusColor = (status: Report['status']) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'reviewed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const handleDownload = async (fileUrl: string, fileName: string) => {
        try {
            setIsDownloading(true);
            const blob = await downloadReport(fileUrl);

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;

            // Trigger download
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            alert('Report downloaded successfully');
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download report. Please try again later.');
        } finally {
            setIsDownloading(false);
        }
    };

    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.department.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = filterType === 'all' || report.type === filterType;

        return matchesSearch && matchesType;
    });

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1>
                <p className="text-gray-600">View and download your medical reports and test results</p>
            </div>

            {/* Filters and Search */}
            <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-1 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search reports..."
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
                        <option value="Lab Test">Lab Tests</option>
                        <option value="Imaging">Imaging</option>
                        <option value="Diagnosis">Diagnosis</option>
                        <option value="Treatment Plan">Treatment Plans</option>
                        <option value="Progress Note">Progress Notes</option>
                    </select>

                    <select
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="all">All Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                    </select>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                                <p className="text-sm text-gray-500">{report.type}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                {report.status}
                            </span>
                        </div>

                        <div className="space-y-2 mb-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                {report.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                                <FileText className="h-4 w-4 mr-2" />
                                {report.doctor} - {report.department}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">
                            {report.summary}
                        </p>

                        <button
                            onClick={() => handleDownload(report.fileUrl, report.fileName)}
                            disabled={isDownloading}
                            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Download className="h-4 w-4 mr-2 group-hover:text-blue-500" />
                            <span className="group-hover:text-blue-500">
                                {isDownloading ? 'Downloading...' : 'Download Report'}
                            </span>
                        </button>
                    </div>
                ))}
            </div>

            {filteredReports.length === 0 && (
                <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Found</h3>
                    <p className="text-gray-500">No medical reports match your current filters.</p>
                </div>
            )}
        </div>
    );
}