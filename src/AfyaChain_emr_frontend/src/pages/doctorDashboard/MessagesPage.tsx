import { useState } from 'react';
import { Search, Video, Phone, MoreVertical } from 'lucide-react';
import { MessagesList } from './components/messages/MessagesList';
import { ChatArea } from './components/messages/ChatArea';
import { ContactInfo } from './components/messages/ContactInfo';

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage?: {
    text: string;
    timestamp: string;
    unread: boolean;
  };
}

export function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Messages List Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <MessagesList
          searchQuery={searchQuery}
          selectedContact={selectedContact}
          onSelectContact={setSelectedContact}
        />
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">{selectedContact.name}</h3>
                <p className="text-xs text-gray-500">{selectedContact.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowContactInfo(!showContactInfo)}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 flex">
            <ChatArea contact={selectedContact} />
            {showContactInfo && (
              <ContactInfo contact={selectedContact} onClose={() => setShowContactInfo(false)} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  );
} 