// src/pages/patientDashboard/components/integration/TelemedicineIntegration.tsx
import { useState } from 'react';
import { 
  Video,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  MessageSquare,
  Share2,
  Settings,
  User,
  Calendar,
  Clock,
  Download
} from 'lucide-react';
import { Card } from '../../../../components/ui/card';

interface ConsultationSession {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  scheduledTime: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  duration: number;
  recordingAvailable?: boolean;
  notes?: string;
}

interface TechnicalCheck {
  type: 'camera' | 'microphone' | 'speaker' | 'internet';
  status: 'success' | 'warning' | 'error';
  message: string;
}

export function TelemedicineIntegration() {
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [activeSession, setActiveSession] = useState<ConsultationSession | null>(null);
  const [showTechCheck, setShowTechCheck] = useState(false);

  const preJoinChecks: TechnicalCheck[] = [
    { type: 'camera', status: 'success', message: 'Camera working properly' },
    { type: 'microphone', status: 'success', message: 'Microphone working properly' },
    { type: 'speaker', status: 'warning', message: 'Speaker volume is low' },
    { type: 'internet', status: 'success', message: 'Internet connection is stable' }
  ];

  return (
    <div className="space-y-6">
      {/* Tech Check Modal */}
      {showTechCheck && (
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">System Check</h3>
            <button 
              onClick={() => setShowTechCheck(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </div>
          <div className="space-y-4">
            {preJoinChecks.map((check) => (
              <div key={check.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    check.status === 'success' ? 'bg-green-500' :
                    check.status === 'warning' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`} />
                  <span className="text-sm text-gray-900">{check.message}</span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Test
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Active Session */}
      {activeSession ? (
        <Card className="p-6">
          <div className="flex flex-col h-[600px]">
            {/* Video Area */}
            <div className="flex-1 bg-gray-900 rounded-lg relative mb-4">
              {/* Main Video Feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isVideoEnabled ? (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400">Doctor's Video Feed</span>
                  </div>
                ) : (
                  <Video className="h-16 w-16 text-gray-500" />
                )}
              </div>
              
              {/* Self View */}
              <div className="absolute bottom-4 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-gray-700">
                {isVideoEnabled ? (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-400">Your Video</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-8 w-8 text-gray-500" />
                  </div>
                )}
              </div>

              {/* Session Info */}
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-2">
                <p className="text-white text-sm">{activeSession.doctorName}</p>
                <p className="text-gray-300 text-xs">{activeSession.doctorSpecialty}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                  className={`p-3 rounded-full ${
                    isAudioEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isAudioEnabled ? (
                    <Mic className="h-6 w-6 text-gray-700" />
                  ) : (
                    <MicOff className="h-6 w-6 text-white" />
                  )}
                </button>
                <button
                  onClick={() => setIsVideoEnabled(!isVideoEnabled)}
                  className={`p-3 rounded-full ${
                    isVideoEnabled ? 'bg-gray-200 hover:bg-gray-300' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {isVideoEnabled ? (
                    <Video className="h-6 w-6 text-gray-700" />
                  ) : (
                    <VideoOff className="h-6 w-6 text-white" />
                  )}
                </button>
                <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
                  <Settings className="h-6 w-6 text-gray-700" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
                  <Share2 className="h-6 w-6 text-gray-700" />
                </button>
                <button className="p-3 rounded-full bg-gray-200 hover:bg-gray-300">
                  <MessageSquare className="h-6 w-6 text-gray-700" />
                </button>
                <button 
                  onClick={() => setActiveSession(null)}
                  className="p-3 rounded-full bg-red-500 hover:bg-red-600"
                >
                  <Phone className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upcoming Consultations */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Consultations</h2>
            <div className="space-y-4">
              {upcomingConsultations.map((consultation) => (
                <ConsultationCard 
                  key={consultation.id}
                  consultation={consultation}
                  onJoin={(session) => {
                    setShowTechCheck(true);
                    setActiveSession(session);
                  }}
                />
              ))}
            </div>
          </Card>

          {/* Quick Join */}
          <Card className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Join</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Enter consultation code"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Join
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Previous Consultations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Consultation History</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Export Records
          </button>
        </div>
        <div className="space-y-4">
          {previousConsultations.map((consultation) => (
            <ConsultationHistoryItem key={consultation.id} consultation={consultation} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function ConsultationCard({ 
  consultation, 
  onJoin 
}: { 
  consultation: ConsultationSession;
  onJoin: (session: ConsultationSession) => void;
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{consultation.doctorName}</h3>
          <p className="text-xs text-gray-500">{consultation.doctorSpecialty}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <p className="text-xs text-gray-500">{consultation.scheduledTime}</p>
            <Clock className="h-4 w-4 text-gray-400 ml-2" />
            <p className="text-xs text-gray-500">{consultation.duration} min</p>
          </div>
        </div>
        <button
          onClick={() => onJoin(consultation)}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          Join
        </button>
      </div>
    </div>
  );
}

function ConsultationHistoryItem({ consultation }: { consultation: ConsultationSession }) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{consultation.doctorName}</h3>
          <p className="text-xs text-gray-500">{consultation.doctorSpecialty}</p>
          <div className="flex items-center space-x-2 mt-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <p className="text-xs text-gray-500">{consultation.scheduledTime}</p>
            <Clock className="h-4 w-4 text-gray-400 ml-2" />
            <p className="text-xs text-gray-500">{consultation.duration} min</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            consultation.status === 'completed' ? 'bg-green-100 text-green-800' :
            consultation.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
          </span>
          {consultation.recordingAvailable && (
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              <Download className="h-4 w-4 mr-1" /> Recording
            </button>
          )}
        </div>
      </div>
      {consultation.notes && (
        <p className="mt-2 text-sm text-gray-600">{consultation.notes}</p>
      )}
    </div>
  );
}

// Sample data
const upcomingConsultations: ConsultationSession[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Smith',
    doctorSpecialty: 'Cardiologist',
    scheduledTime: 'Today, 2:30 PM',
    status: 'scheduled',
    duration: 30
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chang',
    doctorSpecialty: 'General Physician',
    scheduledTime: 'Tomorrow, 10:00 AM',
    status: 'scheduled',
    duration: 45
  }
];

const previousConsultations: ConsultationSession[] = [
  {
    id: '3',
    doctorName: 'Dr. James Wilson',
    doctorSpecialty: 'Neurologist',
    scheduledTime: 'Oct 1, 2024',
    status: 'completed',
    duration: 30,
    recordingAvailable: true,
    notes: 'Follow-up appointment scheduled for next month.'
  },
  {
    id: '4',
    doctorName: 'Dr. Emily Brown',
    doctorSpecialty: 'Dermatologist',
    scheduledTime: 'Sep 28, 2024',
    status: 'cancelled',
    duration: 20,
    notes: 'Cancelled due to doctor emergency.'
  }
];