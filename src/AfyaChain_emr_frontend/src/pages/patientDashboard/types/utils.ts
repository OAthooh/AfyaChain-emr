// src/pages/patientdashboard/types/utils.ts

// Common status types
export enum RecordStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled'
  }
  
  // Date range options for filtering
  export enum DateRangeFilter {
    TODAY = 'today',
    LAST_7_DAYS = 'last7Days',
    LAST_30_DAYS = 'last30Days',
    LAST_90_DAYS = 'last90Days',
    LAST_YEAR = 'lastYear',
    CUSTOM = 'custom'
  }
  
  // Common severity levels
  export enum SeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
    CRITICAL = 'critical'
  }
  
  // Permission types for access control
  export enum PermissionType {
    VIEW = 'view',
    EDIT = 'edit',
    DELETE = 'delete',
    SHARE = 'share',
    PRINT = 'print'
  }
  
  // Types for API responses
  export interface ApiResponse<T> {
    data: T;
    status: 'success' | 'error';
    message?: string;
    timestamp: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
  
  // Filter types for different sections
  export interface DateRange {
    startDate: string;
    endDate: string;
  }
  
  export interface BaseFilter {
    search?: string;
    dateRange?: DateRange | DateRangeFilter;
    status?: RecordStatus;
  }
  
  export interface AppointmentFilter extends BaseFilter {
    type?: string;
    provider?: string;
    department?: string;
  }
  
  export interface MedicationFilter extends BaseFilter {
    type?: string;
    prescriber?: string;
    active?: boolean;
  }
  
  export interface TestResultFilter extends BaseFilter {
    type?: string;
    orderedBy?: string;
    criticalOnly?: boolean;
  }
  
  // Common UI component props
  export interface Modal {
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface FilterProps<T> {
    filters: T;
    onFilterChange: (filters: T) => void;
  }
  
  export interface TableColumn<T> {
    key: keyof T;
    title: string;
    render?: (value: any, record: T) => React.ReactNode;
    sortable?: boolean;
    width?: string | number;
  }
  
  // Types for health tracking
  export interface HealthMetric {
    id: string;
    type: string;
    value: number;
    unit: string;
    timestamp: string;
    notes?: string;
  }
  
  export interface HealthTarget {
    metricType: string;
    targetValue: number;
    targetDate: string;
    progress: number;
  }
  
  // Types for notifications
  export interface Notification {
    id: string;
    type: 'alert' | 'reminder' | 'update' | 'message';
    title: string;
    description: string;
    timestamp: string;
    read: boolean;
    action?: {
      type: string;
      link?: string;
      callback?: () => void;
    };
  }
  
  // Types for document management
  export interface Document {
    id: string;
    type: 'report' | 'prescription' | 'lab_result' | 'imaging' | 'consent' | 'other';
    title: string;
    description?: string;
    fileUrl: string;
    fileType: string;
    fileSize: number;
    uploadedBy: string;
    uploadedAt: string;
    tags?: string[];
    metadata?: Record<string, any>;
  }
  
  // Auth and access control
  export interface AccessControl {
    userId: string;
    resourceType: string;
    resourceId: string;
    permissions: PermissionType[];
    grantedBy: string;
    grantedAt: string;
    expiresAt?: string;
  }
  
  // Audit trail
  export interface AuditLog {
    id: string;
    userId: string;
    action: string;
    resourceType: string;
    resourceId: string;
    timestamp: string;
    details: Record<string, any>;
    ipAddress: string;
  }