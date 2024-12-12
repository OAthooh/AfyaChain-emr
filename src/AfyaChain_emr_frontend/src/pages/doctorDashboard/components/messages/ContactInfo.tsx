import { X, Phone, Video, Mail, MapPin, Clock, FileText } from 'lucide-react';
import { Contact } from '../../types/messages';

interface ContactInfoProps {
  contact: Contact;
  onClose: () => void;
}

interface ContactDetail {
  icon: typeof Phone;
  label: string;
  value: string;
}

export function ContactInfo({ contact, onClose }: ContactInfoProps) {
  const contactDetails: ContactDetail[] = [
    {
      icon: Phone,
      label: 'Phone',
      value: '+254 123 456 789',
    },
    {
      icon: Mail,
      label: 'Email',
      value: `${contact.name.toLowerCase().replace(' ', '.')}@example.com`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Nairobi, Kenya',
    },
    {
      icon: Clock,
      label: 'Local Time',
      value: new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Africa/Nairobi',
      }),
    },
  ];

  const sharedFiles = [
    {
      name: 'Lab Results.pdf',
      type: 'PDF',
      size: '2.4 MB',
      date: '2 days ago',
    },
    {
      name: 'Prescription.pdf',
      type: 'PDF',
      size: '1.1 MB',
      date: '1 week ago',
    },
    {
      name: 'X-Ray Scan.jpg',
      type: 'Image',
      size: '3.8 MB',
      date: '2 weeks ago',
    },
  ];

  return (
    <div className="w-80 border-l border-gray-200 bg-white overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Contact Info</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="h-24 w-24 rounded-full mx-auto mb-4"
          />
          <h4 className="text-xl font-semibold text-gray-900">{contact.name}</h4>
          <p className="text-sm text-gray-500">{contact.role}</p>
          <div className="flex justify-center space-x-2 mt-4">
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
              <Phone className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
              <Video className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
              <Mail className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h5 className="text-sm font-medium text-gray-500 mb-3">Contact Details</h5>
            <div className="space-y-3">
              {contactDetails.map((detail) => (
                <div key={detail.label} className="flex items-center text-sm">
                  <detail.icon className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="text-gray-500">{detail.label}</p>
                    <p className="text-gray-900">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-sm font-medium text-gray-500 mb-3">Shared Files</h5>
            <div className="space-y-2">
              {sharedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <FileText className="h-10 w-10 text-gray-400 mr-3" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.size} • {file.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 