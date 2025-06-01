import React, { useState, FormEvent } from 'react';
import { ArrowRight } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isBotTyping: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isBotTyping }) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isBotTyping) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const exampleQuestions = [
    "Which cryptocurrencies are trending up?",
    "What's the most sustainable crypto?",
    "Should I invest in Bitcoin for long-term?",
    "Tell me about Ethereum"
  ];
  
  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {exampleQuestions.map((question, index) => (
          <button
            key={index}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-full transition-colors"
            onClick={() => onSendMessage(question)}
            disabled={isBotTyping}
          >
            {question}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={isBotTyping ? "CryptoAdvisor is typing..." : "Ask about cryptocurrency..."}
          className="flex-1 py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          disabled={isBotTyping}
        />
        <button
          type="submit"
          className={`bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-3 transition-colors ${
            !message.trim() || isBotTyping ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!message.trim() || isBotTyping}
        >
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;