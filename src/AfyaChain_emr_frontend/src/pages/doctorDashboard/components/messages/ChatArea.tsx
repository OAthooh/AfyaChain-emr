import { useState, useRef, useEffect } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';
import { Contact, Message } from '../../types/messages';

// Mock messages - replace with actual API call
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'doctor',
    text: 'Good morning! How are you feeling today?',
    timestamp: '10:00 AM',
    isRead: true,
  },
  {
    id: '2',
    senderId: 'patient',
    text: 'Much better, thank you. The new medication seems to be working.',
    timestamp: '10:05 AM',
    isRead: true,
  },
  // Add more mock messages
];

interface ChatAreaProps {
  contact: Contact;
}

export function ChatArea({ contact }: ChatAreaProps) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'doctor',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === contact.id ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.senderId === 'doctor'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.senderId === 'doctor' ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Smile className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 