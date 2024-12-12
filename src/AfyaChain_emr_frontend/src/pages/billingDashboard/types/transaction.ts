export interface Transaction {
  // Transaction Identification
  id: string;
  date: string;
  
  // Patient Information
  patientId: string;
  patientName: string;
  patientContact?: {
    email: string;
    phone: string;
  };

  // Service Details
  serviceDetails: {
    description: string;
    department: string;
    serviceCode: string;
  };

  // Financial Information
  financial: {
    amount: number;
    currency: string;
    tax: number;
    discount: number;
    netTotal: number;
  };

  // Payment Information
  payment: {
    method: 'Cash' | 'Credit Card' | 'Insurance' | 'M-Pesa' | 'Bank Transfer';
    status: 'completed' | 'pending' | 'failed' | 'partially_paid';
    confirmationNumber?: string;
  };

  // Associated Billing Information
  billing: {
    invoiceId: string;
    staffId: string;
    staffName: string;
  };

  // Insurance Details
  insurance?: {
    provider: string;
    policyNumber: string;
    claimStatus: 'approved' | 'denied' | 'pending';
  };

  // Additional Information
  remarks?: string;
  attachments?: Array<{
    id: string;
    type: 'receipt' | 'insurance_claim' | 'prescription';
    url: string;
  }>;
}

export interface TransactionFilters {
  dateRange: string;
  status: string;
  paymentMethod: string;
  department: string;
  insuranceProvider: string;
  search: string;
  sortBy: 'date' | 'amount' | 'status';
  sortOrder: 'asc' | 'desc';
} 