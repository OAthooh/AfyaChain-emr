import { useState } from 'react';
import { 
  CreditCard, 
  FileText, 
  Percent, 
  Bell, 
  Globe, 
  Download,
  History,
  Plus,
  Trash2,
  Edit2
} from 'lucide-react';

interface TabProps {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface PaymentMethod {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive';
}

interface TaxRate {
  id: number;
  name: string;
  rate: number;
  applicableTo: string[];
  status: 'active' | 'inactive';
}

interface NotificationSetting {
  id: number;
  type: string;
  enabled: boolean;
  recipients: string[];
  frequency: string;
}

const tabs: TabProps[] = [
  { id: 'payment-methods', label: 'Payment Methods', icon: CreditCard },
  { id: 'invoice-templates', label: 'Invoice Templates', icon: FileText },
  { id: 'tax-settings', label: 'Tax Settings', icon: Percent },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'currency-locale', label: 'Currency & Locale', icon: Globe },
  { id: 'export-settings', label: 'Export Settings', icon: Download },
  { id: 'audit-logs', label: 'Audit Logs', icon: History },
];

export function BillingSettings() {
  const [activeTab, setActiveTab] = useState('payment-methods');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, name: 'Cash', description: 'Cash payments', status: 'active' },
    { id: 2, name: 'Credit Card', description: 'Visa/Mastercard payments', status: 'active' },
    { id: 3, name: 'Insurance', description: 'Insurance claims', status: 'active' },
    { id: 4, name: 'Mobile Money', description: 'M-Pesa payments', status: 'active' },
  ]);

  const [taxRates, setTaxRates] = useState<TaxRate[]>([
    { 
      id: 1, 
      name: 'VAT', 
      rate: 16, 
      applicableTo: ['Consultation', 'Laboratory'], 
      status: 'active' 
    },
    { 
      id: 2, 
      name: 'Service Tax', 
      rate: 5, 
      applicableTo: ['Pharmacy', 'Radiology'], 
      status: 'active' 
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 1,
      type: 'Invoice Due',
      enabled: true,
      recipients: ['billing@hospital.com'],
      frequency: '7_days_before'
    },
    {
      id: 2,
      type: 'Payment Received',
      enabled: true,
      recipients: ['accounts@hospital.com'],
      frequency: 'immediate'
    },
  ]);

  const [currency, setCurrency] = useState('KES');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [exportFormat, setExportFormat] = useState('pdf');

  const handleDeletePaymentMethod = (id: number) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleTogglePaymentMethodStatus = (id: number) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === id
          ? { ...method, status: method.status === 'active' ? 'inactive' : 'active' }
          : method
      )
    );
  };

  const handleDeleteTaxRate = (id: number) => {
    setTaxRates(rates => rates.filter(rate => rate.id !== id));
  };

  const handleToggleTaxStatus = (id: number) => {
    setTaxRates(rates =>
      rates.map(rate =>
        rate.id === id
          ? { ...rate, status: rate.status === 'active' ? 'inactive' : 'active' }
          : rate
      )
    );
  };

  const renderPaymentMethodsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-1" />
          Add Payment Method
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentMethods.map((method) => (
              <tr key={method.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {method.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {method.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleTogglePaymentMethodStatus(method.id)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      method.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {method.status.charAt(0).toUpperCase() + method.status.slice(1)}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDeletePaymentMethod(method.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTaxSettingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Tax Settings</h2>
        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-1" />
          Add Tax Rate
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate (%)
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicable To
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {taxRates.map((tax) => (
              <tr key={tax.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {tax.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tax.rate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {tax.applicableTo.join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tax.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tax.status.charAt(0).toUpperCase() + tax.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900 mr-4">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Notification Settings</h2>
      </div>

      <div className="space-y-4">
        {notificationSettings.map((setting) => (
          <div key={setting.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{setting.type}</h3>
                <p className="text-sm text-gray-500">Recipients: {setting.recipients.join(', ')}</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting.enabled}
                    className="sr-only peer"
                    onChange={() => {
                      setNotificationSettings(settings =>
                        settings.map(s =>
                          s.id === setting.id ? { ...s, enabled: !s.enabled } : s
                        )
                      );
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCurrencyLocaleTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Currency & Locale Settings</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="KES">KES - Kenyan Shilling</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date Format</label>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderExportSettingsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Export Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Default Export Format</label>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Include in Exports</h3>
          <div className="space-y-2">
            {['Transaction ID', 'Patient Details', 'Payment Method', 'Tax Details'].map((field) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">{field}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing Settings</h1>
        <p className="text-gray-600">Configure billing preferences and payment settings</p>
      </div>

      <div className="flex space-x-6">
        {/* Sidebar Navigation */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {activeTab === 'payment-methods' && renderPaymentMethodsTab()}
            {activeTab === 'tax-settings' && renderTaxSettingsTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'currency-locale' && renderCurrencyLocaleTab()}
            {activeTab === 'export-settings' && renderExportSettingsTab()}
          </div>
        </div>
      </div>
    </div>
  );
}