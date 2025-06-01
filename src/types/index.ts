export interface Cryptocurrency {
  name: string;
  priceTrend: 'rising' | 'falling' | 'stable';
  marketCap: 'high' | 'medium' | 'low';
  energyUse: 'high' | 'medium' | 'low';
  sustainabilityScore: number;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export type MessageHistoryType = ChatMessage[];