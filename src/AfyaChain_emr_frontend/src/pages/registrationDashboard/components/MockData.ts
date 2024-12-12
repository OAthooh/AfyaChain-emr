import { Patient } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    visitType: 'outpatient',
    status: 'waiting',
    department: 'General Medicine',
    registrationTime: '2024-03-10T09:00:00',
  },
  {
    id: 'P002',
    name: 'Jane Smith',
    visitType: 'inpatient',
    status: 'with-doctor',
    department: 'Surgery',
    registrationTime: '2024-03-10T08:30:00',
    doctor: 'Dr. Wilson',
  },
  // Add more mock data as needed
];