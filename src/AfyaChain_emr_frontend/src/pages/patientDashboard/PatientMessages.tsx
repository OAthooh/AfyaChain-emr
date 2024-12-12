// src/pages/patientDashboard/PatientMessages.tsx
import { useState } from 'react';
import { Search, Send, Paperclip, Phone, Video, MoreVertical, Circle } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy';
  lastMessage?: {
    content: string;
    timestamp: string;
    unread: boolean;
  };
}

export function PatientMessages() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Handle message sending
    setMessageText('');
  };

  return (
    <div className="h-[calc(100vh-10rem)] flex rounded-lg overflow-hidden bg-white border border-gray-200">
      {/* Contacts List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              isSelected={selectedContact?.id === contact.id}
              onClick={() => setSelectedContact(contact)}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src={selectedContact.avatar}
                alt={selectedContact.name}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {selectedContact.name}
                </h3>
                <p className="text-xs text-gray-500">{selectedContact.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <Video className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isSent={message.senderId === 'patient'}
              />
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-blue-600">
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="text-blue-600 hover:text-blue-700"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
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

function ContactItem({ contact, isSelected, onClick }: {
  contact: Contact;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 ${
        isSelected ? 'bg-blue-50' : ''
      }`}
    >
      <div className="relative">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="h-10 w-10 rounded-full"
        />
        <span className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
          contact.status === 'online' ? 'bg-green-400' :
          contact.status === 'busy' ? 'bg-red-400' :
          'bg-gray-400'
        }`} />
      </div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
        <p className="text-xs text-gray-500">{contact.role}</p>
      </div>
      {contact.lastMessage?.unread && (
        <Circle className="h-2 w-2 fill-blue-600 text-blue-600" />
      )}
    </button>
  );
}

function MessageBubble({ message, isSent }: {
  message: Message;
  isSent: boolean;
}) {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-sm px-4 py-2 rounded-lg ${
        isSent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
      }`}>
        <p className="text-sm">{message.content}</p>
        <p className={`text-xs mt-1 ${isSent ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}

// Sample data
const contacts: Contact[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    role: 'Primary Care Physician',
    avatar: 'https://example.com/avatar1.jpg',
    status: 'online',
    lastMessage: {
      content: 'How are you feeling today?',
      timestamp: '10:30 AM',
      unread: true,
    },
  },
  // Add more contacts...
];

const messages: Message[] = [
  {
    id: '1',
    senderId: 'doctor',
    content: 'How are you feeling today?',
    timestamp: '10:30 AM',
    isRead: true,
  },
  {
    id: '2',
    senderId: 'patient',
    content: 'Much better, thank you. The new medication seems to be working.',
    timestamp: '10:32 AM',
    isRead: true,
  },
  // Add more messages...
];