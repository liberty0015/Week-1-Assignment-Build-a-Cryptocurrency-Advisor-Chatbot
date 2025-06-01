import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType, MessageHistoryType } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { processMessage, createMessage } from '../utils/chatbotLogic';
import { getAllCryptos } from '../data/cryptoData';
import CryptoGrid from './CryptoGrid';
import { Bot } from 'lucide-react';

const TYPING_DELAY = 1500;

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<MessageHistoryType>([]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showAllCryptos, setShowAllCryptos] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const welcomeMessage = createMessage('bot', 
      "👋 Hi there! I'm CryptoAdvisor, your friendly AI assistant for cryptocurrency advice. I can help you find sustainable and profitable crypto investments. What would you like to know today? (Type 'help' for suggestions)"
    );
    
    setMessages([welcomeMessage]);
  }, []);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (text: string) => {
    const userMessage = createMessage('user', text);
    setMessages(prev => [...prev, userMessage]);
    
    setIsBotTyping(true);
    
    if (text.toLowerCase().includes('show all cryptos')) {
      setShowAllCryptos(true);
    }
    
    setTimeout(() => {
      const botResponse = processMessage(text);
      setMessages(prev => [...prev, botResponse]);
      setIsBotTyping(false);
    }, TYPING_DELAY);
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Bot size={28} className="mr-2" />
          <h1 className="text-xl font-bold">CryptoAdvisor</h1>
          <p className="ml-3 text-sm opacity-90">Your AI-Powered Financial Sidekick</p>
        </div>
      </header>
      
      <div className="container mx-auto flex flex-col md:flex-row flex-1 overflow-hidden p-4 gap-4">
        <div className="flex-1 flex flex-col bg-gray-100 rounded-lg shadow-md overflow-hidden min-h-[300px]">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            
            {isBotTyping && (
              <div className="flex items-center text-gray-500 mb-4">
                <div className="bg-emerald-500 text-white h-8 w-8 rounded-full flex items-center justify-center mr-2">
                  <Bot size={16} />
                </div>
                <div className="bg-white py-2 px-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="animate-bounce delay-0 h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="animate-bounce delay-150 h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div className="animate-bounce delay-300 h-2 w-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} isBotTyping={isBotTyping} />
        </div>
        
        {showAllCryptos && (
          <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-md overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Cryptocurrency Database</h2>
              <button 
                onClick={() => setShowAllCryptos(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Hide
              </button>
            </div>
            <CryptoGrid cryptos={getAllCryptos()} />
          </div>
        )}
      </div>
      
      <footer className="bg-gray-800 text-white py-2 px-4 text-center text-sm">
        <p>Isaac libertys cryptoAdvisor Bot &copy; 2025  • This is not financial advice. Always do your own research.</p>
      </footer>
    </div>
  );
};

export default ChatInterface;