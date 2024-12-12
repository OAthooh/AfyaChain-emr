import { useState } from 'react';
import { Contact } from '../../types/messages';
import { Badge } from '../../../../components/ui/Badge';

interface MessagesListProps {
  searchQuery: string;
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

// Mock data - replace with actual API call
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Jane Smith',
    role: 'Patient',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    status: 'online',
    lastMessage: {
      text: 'Thank you doctor, I will follow the prescription as advised.',
      timestamp: '10:30 AM',
      unread: true,
    },
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Cardiologist',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    status: 'away',
    lastMessage: {
      text: 'Could you review the ECG results for patient #1234?',
      timestamp: 'Yesterday',
      unread: false,
    },
  },
  // Add more mock contacts as needed
];

export function MessagesList({ searchQuery, selectedContact, onSelectContact }: MessagesListProps) {
  const [filter, setFilter] = useState<'all' | 'patients' | 'staff'>('all');

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
      (filter === 'patients' && contact.role === 'Patient') ||
      (filter === 'staff' && contact.role !== 'Patient');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 py-2 border-b border-gray-200">
        <div className="flex space-x-2">
          {(['all', 'patients', 'staff'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                filter === filterOption
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {filteredContacts.map((contact) => (
          <button
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 focus:outline-none ${
              selectedContact?.id === contact.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                  contact.status === 'online' ? 'bg-green-400' :
                  contact.status === 'away' ? 'bg-yellow-400' :
                  'bg-gray-400'
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {contact.name}
                </p>
                {contact.lastMessage && (
                  <p className="text-xs text-gray-500">
                    {contact.lastMessage.timestamp}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-baseline">
                <p className="text-xs text-gray-500 truncate">
                  {contact.role}
                </p>
                {contact.lastMessage?.unread && (
                  <Badge variant="blue" size="sm">New</Badge>
                )}
              </div>
              {contact.lastMessage && (
                <p className="text-sm text-gray-600 truncate">
                  {contact.lastMessage.text}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 