export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachments?: {
    id: string;
    type: 'image' | 'document' | 'scan';
    url: string;
    name: string;
    size: string;
  }[];
  isRead: boolean;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  department?: string;
  lastMessage?: {
    text: string;
    timestamp: string;
    unread: boolean;
  };
} 