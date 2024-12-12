import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, TrendingUp, Users, Calendar, Download, Filter, Search, RefreshCw } from 'lucide-react';
import * as XLSX from 'xlsx';

interface AnalyticsRecord {
  id: string;
  category: 'Patient' | 'Treatment' | 'Financial' | 'Operations' | 'Staff';
  title: string;
  description: string;
  period: string;
  lastUpdated: string;
  metrics: {
    name: string;
    value: number;
    trend: number;
    unit: string;
  }[];
  charts: {
    type: 'bar' | 'line' | 'pie';
    title: string;
    data: any;
  }[];
  insights: {
    type: 'positive' | 'negative' | 'neutral';
    message: string;
  }[];
  recommendations: string[];
}

export function AnalyticsRecords() {
  const [records, setRecords] = useState<AnalyticsRecord[]>([
    {
      id: 'ANLY001',
      category: 'Patient',
      title: 'Patient Demographics Analysis',
      description: 'Analysis of patient population demographics and trends',
      period: 'Jan 2024 - Mar 2024',
      lastUpdated: '2024-03-15',
      metrics: [
        {
          name: 'Total Patients',
          value: 1250,
          trend: 15,
          unit: 'patients'
        },
        {
          name: 'Average Age',
          value: 42,
          trend: -2,
          unit: 'years'
        },
        {
          name: 'Gender Ratio (M:F)',
          value: 0.95,
          trend: 0.05,
          unit: 'ratio'
        }
      ],
      charts: [
        {
          type: 'pie',
          title: 'Age Distribution',
          data: {}
        },
        {
          type: 'line',
          title: 'Patient Growth Trend',
          data: {}
        }
      ],
      insights: [
        {
          type: 'positive',
          message: '15% increase in new patient registrations'
        },
        {
          type: 'neutral',
          message: 'Stable gender distribution across age groups'
        }
      ],
      recommendations: [
        'Expand geriatric care services',
        'Implement targeted outreach programs'
      ]
    },
    {
      id: 'ANLY002',
      category: 'Treatment',
      title: 'Treatment Outcomes Analysis',
      description: 'Analysis of treatment effectiveness and patient outcomes',
      period: 'Jan 2024 - Mar 2024',
      lastUpdated: '2024-03-15',
      metrics: [
        {
          name: 'Success Rate',
          value: 87.5,
          trend: 3.5,
          unit: '%'
        },
        {
          name: 'Average Recovery Time',
          value: 12,
          trend: -2,
          unit: 'days'
        },
        {
          name: 'Readmission Rate',
          value: 4.2,
          trend: -0.8,
          unit: '%'
        }
      ],
      charts: [
        {
          type: 'bar',
          title: 'Treatment Success by Department',
          data: {}
        },
        {
          type: 'line',
          title: 'Recovery Time Trends',
          data: {}
        }
      ],
      insights: [
        {
          type: 'positive',
          message: 'Decreased average recovery time by 2 days'
        },
        {
          type: 'positive',
          message: 'Lower readmission rates across all departments'
        }
      ],
      recommendations: [
        'Implement standardized follow-up protocols',
        'Enhance post-treatment care guidelines'
      ]
    },
    {
      id: 'ANLY003',
      category: 'Financial',
      title: 'Financial Performance Analysis',
      description: 'Analysis of revenue, costs, and financial efficiency',
      period: 'Jan 2024 - Mar 2024',
      lastUpdated: '2024-03-15',
      metrics: [
        {
          name: 'Revenue',
          value: 2500000,
          trend: 12,
          unit: 'USD'
        },
        {
          name: 'Cost per Patient',
          value: 1200,
          trend: -5,
          unit: 'USD'
        },
        {
          name: 'Collection Rate',
          value: 92,
          trend: 3,
          unit: '%'
        }
      ],
      charts: [
        {
          type: 'line',
          title: 'Revenue Trends',
          data: {}
        },
        {
          type: 'bar',
          title: 'Cost Distribution',
          data: {}
        }
      ],
      insights: [
        {
          type: 'positive',
          message: '12% increase in quarterly revenue'
        },
        {
          type: 'positive',
          message: 'Improved collection rate by 3%'
        }
      ],
      recommendations: [
        'Optimize billing processes',
        'Implement cost-saving measures in high-expense areas'
      ]
    },
    {
      id: 'ANLY004',
      category: 'Operations',
      title: 'Operational Efficiency Analysis',
      description: 'Analysis of hospital operations and resource utilization',
      period: 'Jan 2024 - Mar 2024',
      lastUpdated: '2024-03-15',
      metrics: [
        {
          name: 'Bed Occupancy Rate',
          value: 78,
          trend: 5,
          unit: '%'
        },
        {
          name: 'Average Wait Time',
          value: 25,
          trend: -10,
          unit: 'minutes'
        },
        {
          name: 'Resource Utilization',
          value: 85,
          trend: 3,
          unit: '%'
        }
      ],
      charts: [
        {
          type: 'line',
          title: 'Occupancy Trends',
          data: {}
        },
        {
          type: 'bar',
          title: 'Wait Time by Department',
          data: {}
        }
      ],
      insights: [
        {
          type: 'positive',
          message: 'Reduced average wait time by 10 minutes'
        },
        {
          type: 'neutral',
          message: 'Stable resource utilization across departments'
        }
      ],
      recommendations: [
        'Implement automated scheduling system',
        'Optimize staff allocation during peak hours'
      ]
    },
    {
      id: 'ANLY005',
      category: 'Staff',
      title: 'Staff Performance Analysis',
      description: 'Analysis of staff productivity and satisfaction',
      period: 'Jan 2024 - Mar 2024',
      lastUpdated: '2024-03-15',
      metrics: [
        {
          name: 'Staff Satisfaction',
          value: 85,
          trend: 5,
          unit: '%'
        },
        {
          name: 'Productivity Rate',
          value: 92,
          trend: 3,
          unit: '%'
        },
        {
          name: 'Training Completion',
          value: 95,
          trend: 2,
          unit: '%'
        }
      ],
      charts: [
        {
          type: 'pie',
          title: 'Staff Distribution',
          data: {}
        },
        {
          type: 'line',
          title: 'Productivity Trends',
          data: {}
        }
      ],
      insights: [
        {
          type: 'positive',
          message: 'Improved staff satisfaction scores'
        },
        {
          type: 'positive',
          message: 'High training completion rate'
        }
      ],
      recommendations: [
        'Implement regular feedback sessions',
        'Enhance professional development programs'
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('quarter');
  const [isExporting, setIsExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const exportData = records.map(record => ({
        ID: record.id,
        Category: record.category,
        Title: record.title,
        Period: record.period,
        'Last Updated': record.lastUpdated,
        Metrics: record.metrics.map(m => `${m.name}: ${m.value}${m.unit}`).join('; '),
        Insights: record.insights.map(i => i.message).join('; '),
        Recommendations: record.recommendations.join('; ')
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      const colWidths = [
        { wch: 10 }, { wch: 15 }, { wch: 30 }, { wch: 20 },
        { wch: 15 }, { wch: 50 }, { wch: 50 }, { wch: 50 }
      ];
      ws['!cols'] = colWidths;
      XLSX.utils.book_append_sheet(wb, ws, 'Analytics Report');
      
      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `analytics_report_${date}.xlsx`);
      alert('Export completed successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const updatedRecords = records.map(record => ({
        ...record,
        lastUpdated: new Date().toISOString().split('T')[0],
        metrics: record.metrics.map(metric => ({
          ...metric,
          value: updateMetricValue(metric.value, metric.unit),
          trend: updateTrendValue(metric.trend)
        }))
      }));

      setRecords(updatedRecords);
      alert('Data refreshed successfully!');
    } catch (error) {
      console.error('Refresh failed:', error);
      alert('Refresh failed. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const updateMetricValue = (currentValue: number, unit: string): number => {
    const randomChange = Math.random() * 0.2 - 0.1;
    let newValue = currentValue * (1 + randomChange);

    switch (unit) {
      case 'patients':
      case 'years':
        return Math.round(newValue);
      case '%':
        return Math.round(newValue * 10) / 10;
      case 'USD':
        return Math.round(newValue);
      default:
        return Math.round(newValue * 100) / 100;
    }
  };

  const updateTrendValue = (currentTrend: number): number => {
    const randomChange = Math.random() * 2 - 1;
    return Math.round((currentTrend + randomChange) * 10) / 10;
  };

  const getInsightColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
        return 'text-gray-600';
    }
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || record.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Records</h1>
        <p className="text-gray-600">Track and analyze hospital performance metrics</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search analytics..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Patient">Patient</option>
          <option value="Treatment">Treatment</option>
          <option value="Financial">Financial</option>
          <option value="Operations">Operations</option>
          <option value="Staff">Staff</option>
        </select>

        <select
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
        >
          <option value="month">Monthly</option>
          <option value="quarter">Quarterly</option>
          <option value="year">Yearly</option>
        </select>

        <button
          className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg ${
            isExporting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          onClick={handleExport}
          disabled={isExporting}
        >
          <Download className={`h-4 w-4 mr-2 ${isExporting ? 'animate-bounce' : ''}`} />
          {isExporting ? 'Exporting...' : 'Export Data'}
        </button>

        <button
          className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
          }`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{record.title}</h3>
                  <p className="text-sm text-gray-500">{record.description}</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {record.category}
                </span>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                <span className="mr-4">Period: {record.period}</span>
                <span>Last Updated: {record.lastUpdated}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {record.metrics.map((metric, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">{metric.name}</h4>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      {metric.value.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500 ml-1">
                        {metric.unit}
                      </span>
                    </span>
                    <span className={`flex items-center ${getTrendColor(metric.trend)}`}>
                      {metric.trend > 0 ? '↑' : metric.trend < 0 ? '↓' : '→'}
                      {Math.abs(metric.trend).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {record.charts.map((chart, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 h-64">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{chart.title}</h4>
                  <div className="flex items-center justify-center h-48 bg-gray-100 rounded">
                    <span className="text-gray-400">Chart Visualization</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                <div className="space-y-2">
                  {record.insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-2 ${getInsightColor(insight.type)}`}
                    >
                      <span>•</span>
                      <span>{insight.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                <div className="space-y-2">
                  {record.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500">•</span>
                      <span className="text-gray-600">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="text-center py-12">
          <BarChart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Analytics Records Found</h3>
          <p className="text-gray-500">No records match your current search criteria.</p>
        </div>
      )}
    </div>
  );
}