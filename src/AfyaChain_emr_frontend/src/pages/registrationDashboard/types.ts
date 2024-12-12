export interface Patient {
    id: string;
    name: string;
    visitType: 'inpatient' | 'outpatient';
    status: 'waiting' | 'with-doctor' | 'completed';
    department: string;
    registrationTime: string;
    doctor?: string;
  }