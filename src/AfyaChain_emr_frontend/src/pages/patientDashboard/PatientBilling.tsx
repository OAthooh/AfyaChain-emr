// src/pages/patientDashboard/PatientBilling.tsx
import { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  AlertCircle, 
  Calendar,
  Receipt,
  Shield
} from 'lucide-react';
import { Card } from '../../components/ui/card';

interface Bill {
  id: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  provider: string;
}

interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber: string;
  coverageType: string;
  copay: number;
  deductible: number;
  deductibleMet: number;
}

export function PatientBilling() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Insurance</h1>
        
        <div className="flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700">
            <CreditCard className="h-4 w-4 mr-1" /> Make Payment
          </button>
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-1" /> Download Statements
          </button>
        </div>
      </div>

      {/* Account Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Outstanding Balance</h3>
            <AlertCircle className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">Kshs. 523.50</p>
          <button className="mt-4 w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            Pay Now
          </button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Next Payment Due</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">Oct 30</p>
          <p className="mt-1 text-sm text-gray-500">Kshs. 150.00 payment plan installment</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Deductible Status</h3>
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <p className="mt-2 text-3xl font-bold text-gray-900">75%</p>
          <p className="mt-1 text-sm text-gray-500">Kshs. 3,000 of Kshs.4,000 met</p>
        </Card>
      </div>

      {/* Recent Bills */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bills</h2>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Bills</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
        <div className="space-y-4">
          {recentBills.map((bill) => (
            <BillItem key={bill.id} {...bill} />
          ))}
        </div>
      </Card>

      {/* Insurance Information */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Insurance Information</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">Update Info</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InsuranceCard insurance={primaryInsurance} type="Primary" />
          <PaymentMethodCard />
        </div>
      </Card>

      {/* Payment History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
        </div>
        <div className="space-y-4">
          {paymentHistory.map((payment, index) => (
            <PaymentHistoryItem key={index} {...payment} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function BillItem({ dueDate, amount, status, description, provider }: Bill) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <Receipt className={`h-8 w-8 ${
          status === 'paid' ? 'text-green-500' :
          status === 'overdue' ? 'text-red-500' :
          'text-blue-500'
        }`} />
        <div>
          <p className="text-sm font-medium text-gray-900">{description}</p>
          <p className="text-xs text-gray-500">{provider}</p>
          <p className="text-xs text-gray-500">Due: {dueDate}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="text-sm font-medium text-gray-900">${amount.toFixed(2)}</p>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'paid' ? 'bg-green-100 text-green-800' :
          status === 'overdue' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}

function InsuranceCard({ insurance, type }: { insurance: InsuranceInfo; type: string }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">{type} Insurance</h3>
        <Shield className="h-5 w-5 text-blue-500" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-900">{insurance.provider}</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Policy Number</p>
            <p className="font-medium">{insurance.policyNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Group Number</p>
            <p className="font-medium">{insurance.groupNumber}</p>
          </div>
          <div>
            <p className="text-gray-500">Copay</p>
            <p className="font-medium">Kshs. {insurance.copay}</p>
          </div>
          <div>
            <p className="text-gray-500">Deductible</p>
            <p className="font-medium">Kshs. {insurance.deductible}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethodCard() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
        <CreditCard className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
        <p className="text-sm text-gray-500">Expires 12/24</p>
        <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
          Change payment method
        </button>
      </div>
    </div>
  );
}

function PaymentHistoryItem({ date, amount, method, reference }: {
  date: string;
  amount: number;
  method: string;
  reference: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <p className="text-sm font-medium text-gray-900">Kshs. {amount.toFixed(2)} Payment</p>
        <p className="text-xs text-gray-500">{method}</p>
        <p className="text-xs text-gray-500">Ref: {reference}</p>
      </div>
      <p className="text-sm text-gray-500">{date}</p>
    </div>
  );
}

// Sample data
const recentBills: Bill[] = [
  {
    id: '1',
    date: '2024-10-01',
    dueDate: '2024-10-30',
    amount: 150.00,
    status: 'pending',
    description: 'Office Visit - General Checkup',
    provider: 'Dr. Sarah Smith'
  },
  // Add more bills...
];

const primaryInsurance: InsuranceInfo = {
  provider: 'Blue Cross Blue Shield',
  policyNumber: '123456789',
  groupNumber: 'GRP123456',
  coverageType: 'PPO',
  copay: 25,
  deductible: 4000,
  deductibleMet: 3000
};

const paymentHistory = [
  {
    date: 'Oct 1, 2024',
    amount: 150.00,
    method: 'Visa ending in 4242',
    reference: 'PAY-123456'
  },
  // Add more payment history...
];