import { Transaction } from '../types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: 'TRX-001',
    date: '2024-03-15T10:30:00Z',
    patientId: 'PT-001',
    patientName: 'John Doe',
    patientContact: {
      email: 'john.doe@email.com',
      phone: '+254 712 345 678',
    },
    serviceDetails: {
      description: 'General Consultation',
      department: 'General Medicine',
      serviceCode: 'CONS-001',
    },
    financial: {
      amount: 2500,
      currency: 'KES',
      tax: 400,
      discount: 0,
      netTotal: 2900,
    },
    payment: {
      method: 'M-Pesa',
      status: 'completed',
      confirmationNumber: 'MPE123456789',
    },
    billing: {
      invoiceId: 'INV-001',
      staffId: 'STF-001',
      staffName: 'Jane Smith',
    },
    remarks: 'Regular checkup',
  },
  {
    id: 'TRX-002',
    date: '2024-03-14T14:15:00Z',
    patientId: 'PT-002',
    patientName: 'Sarah Johnson',
    patientContact: {
      email: 'sarah.j@email.com',
      phone: '+254 723 456 789',
    },
    serviceDetails: {
      description: 'X-Ray Chest',
      department: 'Radiology',
      serviceCode: 'RAD-001',
    },
    financial: {
      amount: 5000,
      currency: 'KES',
      tax: 800,
      discount: 500,
      netTotal: 5300,
    },
    payment: {
      method: 'Insurance',
      status: 'pending',
    },
    billing: {
      invoiceId: 'INV-002',
      staffId: 'STF-002',
      staffName: 'Robert Wilson',
    },
    insurance: {
      provider: 'AAR Insurance',
      policyNumber: 'AAR-123456',
      claimStatus: 'pending',
    },
    remarks: 'Insurance claim in process',
  },
  // Add more mock transactions...
];

export const departments = [
  'General Medicine',
  'Radiology',
  'Laboratory',
  'Pharmacy',
  'Cardiology',
  'Pediatrics',
  'Orthopedics',
];

export const insuranceProviders = [
  'AAR Insurance',
  'Jubilee Insurance',
  'NHIF',
  'Madison Insurance',
  'UAP Insurance',
];

export const paymentMethods = [
  'Cash',
  'Credit Card',
  'Insurance',
  'M-Pesa',
  'Bank Transfer',
];