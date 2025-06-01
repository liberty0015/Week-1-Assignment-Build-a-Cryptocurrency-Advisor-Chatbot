import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  return (
    <div 
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fadeIn`}
    >
      <div 
        className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}
      >
        <div 
          className={`flex items-center justify-center h-10 w-10 rounded-full mr-2 ${
            isBot 
              ? 'bg-emerald-500 text-white' 
              : 'bg-indigo-500 text-white'
          }`}
        >
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
        
        <div
          className={`py-3 px-4 rounded-2xl ${
            isBot 
              ? 'bg-white text-gray-800 border border-gray-200' 
              : 'bg-indigo-500 text-white'
          }`}
        >
          {message.text.split('\n').map((text, index) => (
            <p key={index} className={`${index > 0 ? 'mt-2' : ''}`}>
              {text}
            </p>
          ))}
          <div className="text-xs mt-1 opacity-70">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;