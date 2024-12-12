// src/pages/patientDashboard/components/integration/DeviceSync.tsx
import { useState } from 'react';
import { 
  Smartphone, 
  Watch, 
  Activity, 
  Heart, 
  RefreshCw,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Card } from '../../../../components/ui/card';

interface ConnectedDevice {
  id: string;
  name: string;
  type: 'smartwatch' | 'phone' | 'fitness_tracker' | 'medical_device';
  lastSync: string;
  batteryLevel: number;
  status: 'connected' | 'disconnected' | 'syncing';
  metrics: string[];
}

export function DeviceSync() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSync = () => {
    setIsRefreshing(true);
    // Simulate sync process
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Connected Devices</h2>
        <button 
          onClick={handleSync}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
          Sync Devices
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectedDevices.map((device) => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>

      {/* Available Integrations */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <IntegrationButton
            icon={Watch}
            name="Apple Health"
            description="Connect Apple Watch and iPhone health data"
          />
          <IntegrationButton
            icon={Activity}
            name="Fitbit"
            description="Sync your Fitbit device data"
          />
          <IntegrationButton
            icon={Heart}
            name="Health Devices"
            description="Connect other medical devices"
          />
        </div>
      </Card>

      {/* Sync History */}
      <Card className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sync History</h3>
        <div className="space-y-4">
          {syncHistory.map((entry, index) => (
            <SyncHistoryItem key={index} {...entry} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function DeviceCard({ device }: { device: ConnectedDevice }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${
            device.status === 'connected' ? 'bg-green-100' :
            device.status === 'syncing' ? 'bg-blue-100' :
            'bg-gray-100'
          }`}>
            <Smartphone className={`h-6 w-6 ${
              device.status === 'connected' ? 'text-green-600' :
              device.status === 'syncing' ? 'text-blue-600' :
              'text-gray-600'
            }`} />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900">{device.name}</h3>
            <p className="text-xs text-gray-500">Last sync: {device.lastSync}</p>
          </div>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          device.status === 'connected' ? 'bg-green-100 text-green-800' :
          device.status === 'syncing' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {device.status}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Battery</span>
          <span className={`font-medium ${
            device.batteryLevel > 20 ? 'text-green-600' : 'text-red-600'
          }`}>
            {device.batteryLevel}%
          </span>
        </div>
        <div className="mt-2">
          <div className="text-xs text-gray-500 mb-1">Synced metrics</div>
          <div className="flex flex-wrap gap-2">
            {device.metrics.map((metric, index) => (
              <span 
                key={index}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
              >
                {metric}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function IntegrationButton({ 
    icon: Icon, 
    name, 
    description 
  }: {
    icon: any;
    name: string;
    description: string;
  }) {
    return (
      <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
        <Icon className="h-8 w-8 text-blue-600 mb-2" />
        <h4 className="text-sm font-medium text-gray-900">{name}</h4>
        <p className="text-xs text-gray-500 text-center mt-1">{description}</p>
      </button>
    );
  }
  
  function SyncHistoryItem({ 
    deviceName, 
    timestamp, 
    status, 
    details 
  }: {
    deviceName: string;
    timestamp: string;
    status: 'success' | 'failed';
    details: string;
  }) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          {status === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{deviceName}</p>
            <p className="text-xs text-gray-500">{details}</p>
          </div>
        </div>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
    );
  }
  
  // Sample data
  const connectedDevices: ConnectedDevice[] = [
    {
      id: '1',
      name: 'Apple Watch Series 7',
      type: 'smartwatch',
      lastSync: '2 minutes ago',
      batteryLevel: 75,
      status: 'connected',
      metrics: ['Heart Rate', 'Steps', 'Sleep', 'ECG']
    },
    {
      id: '2',
      name: 'Fitbit Charge 5',
      type: 'fitness_tracker',
      lastSync: '1 hour ago',
      batteryLevel: 45,
      status: 'connected',
      metrics: ['Activity', 'Sleep', 'Heart Rate']
    },
    {
      id: '3',
      name: 'Blood Pressure Monitor',
      type: 'medical_device',
      lastSync: '1 day ago',
      batteryLevel: 90,
      status: 'disconnected',
      metrics: ['Blood Pressure', 'Pulse']
    }
  ];
  
  const syncHistory = [
    {
      deviceName: 'Apple Watch Series 7',
      timestamp: '2 minutes ago',
      status: 'success' as const,
      details: 'Successfully synced 24 hours of health data'
    },
    {
      deviceName: 'Fitbit Charge 5',
      timestamp: '1 hour ago',
      status: 'success' as const,
      details: 'Synced activity and sleep data'
    },
    {
      deviceName: 'Blood Pressure Monitor',
      timestamp: '1 day ago',
      status: 'failed' as const,
      details: 'Connection failed. Please try again.'
    }
  ];
  
  // Add types for API responses
  export interface DeviceSyncResponse {
    success: boolean;
    lastSync: string;
    syncedData: {
      type: string;
      count: number;
    }[];
    errors?: string[];
  }
  
  // Add mock API functions
  export async function syncDevices(): Promise<DeviceSyncResponse> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          lastSync: new Date().toISOString(),
          syncedData: [
            { type: 'heart_rate', count: 144 },
            { type: 'steps', count: 8750 },
            { type: 'sleep', count: 8 }
          ]
        });
      }, 2000);
    });
  }
  
  export async function connectDevice(_deviceId: string): Promise<{success: boolean}> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  }
  
  // Health metric types
  export interface HealthMetricData {
    timestamp: string;
    type: 'heart_rate' | 'steps' | 'sleep' | 'blood_pressure' | 'weight';
    value: number;
    unit: string;
  }
  
  // Device settings interface
  export interface DeviceSettings {
    id: string;
    syncInterval: number; // in minutes
    metrics: string[];
    notifications: boolean;
    autoSync: boolean;
  }
  
  // Default device settings
  export const defaultDeviceSettings: DeviceSettings = {
    id: '',
    syncInterval: 60,
    metrics: ['heart_rate', 'steps', 'sleep'],
    notifications: true,
    autoSync: true
  };