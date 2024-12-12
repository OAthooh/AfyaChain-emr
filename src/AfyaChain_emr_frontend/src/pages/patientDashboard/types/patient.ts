// src/pages/patientdashboard/types/patient.ts

// Base patient information
export interface Patient {
    id: string;
    mrn: string;  // Medical Record Number
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    photo?: string;
    primaryLanguage: string;
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    occupation?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // Contact information
  export interface PatientContact {
    id: string;
    patientId: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    emergencyContacts: EmergencyContact[];
  }
  
  export interface EmergencyContact {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    isAwareOfMedicalHistory: boolean;
  }
  
  // Insurance information
  export interface Insurance {
    id: string;
    patientId: string;
    provider: string;
    policyNumber: string;
    groupNumber: string;
    effectiveDate: string;
    expirationDate: string;
    isPrimary: boolean;
    coverageType: 'full' | 'partial';
    copayAmount: number;
  }
  
  // Medical history
  export interface MedicalHistory {
    conditions: MedicalCondition[];
    surgeries: Surgery[];
    familyHistory: FamilyHistory[];
    allergies: Allergy[];
    immunizations: Immunization[];
    socialHistory: SocialHistory;
  }
  
  export interface MedicalCondition {
    id: string;
    name: string;
    diagnosisDate: string;
    status: 'active' | 'resolved' | 'chronic';
    severity: 'mild' | 'moderate' | 'severe';
    notes?: string;
    treatedBy: string; // Doctor ID
  }
  
  export interface Surgery {
    id: string;
    procedure: string;
    date: string;
    hospital: string;
    surgeon: string;
    outcome: string;
    complications?: string[];
    followUpRequired: boolean;
  }
  
  export interface FamilyHistory {
    condition: string;
    relationship: string;
    ageAtDiagnosis?: number;
    notes?: string;
  }
  
  export interface Allergy {
    id: string;
    allergen: string;
    type: 'food' | 'medication' | 'environmental';
    severity: 'mild' | 'moderate' | 'severe';
    reaction: string[];
    diagnosed: string;
    notes?: string;
  }
  
  export interface Immunization {
    id: string;
    vaccine: string;
    date: string;
    dueDate?: string;
    administrator: string;
    lotNumber?: string;
    location: string;
  }
  
  export interface SocialHistory {
    smokingStatus: 'never' | 'former' | 'current' | 'passive';
    alcoholUse: 'none' | 'occasional' | 'moderate' | 'heavy';
    exerciseFrequency: 'none' | 'occasional' | 'regular' | 'frequent';
    occupation?: string;
    dietaryRestrictions?: string[];
  }
  
  // Vital signs and measurements
  export interface VitalSigns {
    id: string;
    dateRecorded: string;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    heartRate: number;
    respiratoryRate: number;
    temperature: number;
    oxygenSaturation: number;
    height: number;
    weight: number;
    bmi: number;
    painLevel?: number;
  }
  
  // Medications
  export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    prescribedBy: string;
    status: 'active' | 'discontinued' | 'completed';
    pharmacy?: Pharmacy;
    instructions: string;
    sideEffects?: string[];
    reason: string;
    isRefillRequired: boolean;
    refillsRemaining: number;
  }
  
  export interface Pharmacy {
    id: string;
    name: string;
    address: string;
    phone: string;
    fax?: string;
    email?: string;
    hours?: string;
  }
  
  // Appointments
  export interface Appointment {
    id: string;
    patientId: string;
    providerId: string;
    dateTime: string;
    type: 'routine' | 'followUp' | 'urgent' | 'telehealth';
    status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'noShow';
    reason: string;
    notes?: string;
    department: string;
    location: string;
    duration: number;
    reminders: AppointmentReminder[];
  }
  
  export interface AppointmentReminder {
    id: string;
    appointmentId: string;
    type: 'email' | 'sms' | 'push';
    scheduledFor: string;
    sent: boolean;
    sentAt?: string;
  }
  
  // Test Results
  export interface TestResult {
    id: string;
    patientId: string;
    testName: string;
    testType: 'laboratory' | 'imaging' | 'pathology' | 'other';
    orderedBy: string;
    orderedDate: string;
    performedDate: string;
    status: 'pending' | 'completed' | 'cancelled';
    results: TestResultValue[];
    interpretation?: string;
    attachments?: TestAttachment[];
    criticalFlag?: boolean;
  }
  
  export interface TestResultValue {
    name: string;
    value: string | number;
    unit?: string;
    referenceRange?: string;
    flag?: 'normal' | 'abnormal' | 'critical';
  }
  
  export interface TestAttachment {
    id: string;
    type: 'image' | 'document' | 'report';
    url: string;
    name: string;
    contentType: string;
    size: number;
    uploadedAt: string;
  }
  
  // Billing
  export interface Bill {
    id: string;
    patientId: string;
    date: string;
    dueDate: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue' | 'cancelled';
    items: BillItem[];
    payments: Payment[];
    insurance?: InsuranceClaim;
  }
  
  export interface BillItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
    serviceDate: string;
    category: string;
    code?: string;
  }
  
  export interface Payment {
    id: string;
    date: string;
    amount: number;
    method: 'credit' | 'debit' | 'cash' | 'insurance' | 'other';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    reference?: string;
  }
  
  export interface InsuranceClaim {
    id: string;
    status: 'submitted' | 'processing' | 'approved' | 'denied';
    submissionDate: string;
    responseDate?: string;
    amount?: number;
    reason?: string;
  }
  
  // Messages
  export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    subject: string;
    content: string;
    timestamp: string;
    read: boolean;
    priority: 'normal' | 'urgent';
    category: 'general' | 'medical' | 'billing' | 'appointment';
    attachments?: MessageAttachment[];
  }
  
  export interface MessageAttachment {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }
  
  // Health Goals and Care Plans
  export interface HealthGoal {
    id: string;
    patientId: string;
    category: 'weight' | 'exercise' | 'diet' | 'smoking' | 'other';
    description: string;
    target: string;
    startDate: string;
    targetDate: string;
    status: 'active' | 'completed' | 'abandoned';
    progress: number;
    notes?: string;
    reminders?: HealthGoalReminder[];
  }
  
  export interface HealthGoalReminder {
    id: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string;
    enabled: boolean;
    lastSent?: string;
  }
  
  // Care Team
  export interface CareTeamMember {
    id: string;
    name: string;
    role: string;
    specialty?: string;
    department: string;
    contactInfo: {
      email: string;
      phone: string;
    };
    primary: boolean;
  }