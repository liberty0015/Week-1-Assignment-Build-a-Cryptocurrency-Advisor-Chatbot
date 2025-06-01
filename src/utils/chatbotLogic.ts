import cryptoDatabase, { 
  getCryptoByName, 
  getCryptosByPriceTrend, 
  getMostSustainableCrypto,
  getAllCryptos
} from '../data/cryptoData';
import { ChatMessage, Cryptocurrency } from '../types';
import { v4 as uuidv4 } from 'uuid';

const BOT_NAME = "CryptoAdvisor";

export const createMessage = (sender: 'user' | 'bot', text: string): ChatMessage => {
  return {
    id: uuidv4(),
    sender,
    text,
    timestamp: new Date()
  };
};

export const processMessage = (message: string): ChatMessage => {
  const lowerMessage = message.toLowerCase();
  let response = "";

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    response = `Hey there! I'm ${BOT_NAME}, your friendly crypto advisor. Ask me about cryptocurrency trends, sustainability scores, or specific coins like Bitcoin or Ethereum!`;
  }
  
  else if (lowerMessage.includes('help') || lowerMessage === '?') {
    response = `I can help you with cryptocurrency information! Try asking:
- Which cryptocurrencies are trending up?
- What's the most sustainable cryptocurrency?
- Tell me about Bitcoin/Ethereum/etc.
- Which crypto has the highest market cap?
- What crypto should I invest in for long-term growth?`;
  }
  
  else if (
    lowerMessage.includes('trending up') || 
    lowerMessage.includes('rising') || 
    (lowerMessage.includes('which') && lowerMessage.includes('trending'))
  ) {
    const risingCryptos = getCryptosByPriceTrend('rising');
    if (risingCryptos.length > 0) {
      const cryptoNames = risingCryptos.map(c => c.name).join(', ');
      response = `Currently trending upward: ${cryptoNames} 📈. Would you like more details about any of these?`;
    } else {
      response = "I don't see any cryptocurrencies trending up at the moment. Market might be in a correction phase.";
    }
  }
  
  else if (
    lowerMessage.includes('tell me about') || 
    lowerMessage.includes('what is') || 
    lowerMessage.includes('info on')
  ) {
    const cryptoNames = Object.keys(cryptoDatabase);
    const mentionedCrypto = cryptoNames.find(name => 
      lowerMessage.includes(name.toLowerCase())
    );
    
    if (mentionedCrypto) {
      const crypto = getCryptoByName(mentionedCrypto);
      if (crypto) {
        response = `${crypto.name}: Currently ${crypto.priceTrend} with ${crypto.marketCap} market cap. 
Energy usage: ${crypto.energyUse}, Sustainability score: ${crypto.sustainabilityScore}/10.
${crypto.description}`;
      }
    } else {
      response = "I didn't catch which cryptocurrency you're asking about. Could you specify?";
    }
  }
  
  else if (
    lowerMessage.includes('sustainable') || 
    lowerMessage.includes('green') || 
    lowerMessage.includes('eco-friendly')
  ) {
    const sustainableCrypto = getMostSustainableCrypto();
    response = `The most sustainable cryptocurrency in my database is ${sustainableCrypto.name} with a sustainability score of ${sustainableCrypto.sustainabilityScore}/10. It has ${sustainableCrypto.energyUse} energy usage and a ${sustainableCrypto.marketCap} market cap. ${sustainableCrypto.description} 🌱`;
  }
  
  else if (
    lowerMessage.includes('invest') || 
    lowerMessage.includes('buy') || 
    lowerMessage.includes('recommendation')
  ) {
    if (lowerMessage.includes('long') || lowerMessage.includes('term')) {
      const candidates = Object.values(cryptoDatabase).filter(crypto => 
        (crypto.sustainabilityScore >= 7 && crypto.priceTrend !== 'falling') || 
        (crypto.marketCap === 'high' && crypto.priceTrend !== 'falling')
      );
      
      if (candidates.length > 0) {
        const recommendation = candidates.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore)[0];
        response = `For long-term investment, I'd suggest looking into ${recommendation.name}. It has a sustainability score of ${recommendation.sustainabilityScore}/10 and its price trend is ${recommendation.priceTrend}. ${recommendation.description} 📈

⚠️ Disclaimer: This is not financial advice. Always do your own research before investing!`;
      } else {
        response = "Based on current data, I don't have a clear long-term recommendation. Consider diversifying and doing more research.";
      }
    } 
    else if (lowerMessage.includes('short') || lowerMessage.includes('quick')) {
      const risingHighMarketCap = Object.values(cryptoDatabase).filter(crypto => 
        crypto.priceTrend === 'rising' && crypto.marketCap === 'high'
      );
      
      if (risingHighMarketCap.length > 0) {
        const recommendation = risingHighMarketCap[0];
        response = `For shorter-term trades, ${recommendation.name} might be worth watching as it's currently trending up and has a high market cap. But remember - short-term trading carries significant risk! 📊

⚠️ Disclaimer: This is not financial advice. Always do your own research before investing!`;
      } else {
        response = "I don't recommend short-term trading as it's highly risky. If you're new to crypto, consider a long-term strategy instead.";
      }
    } 
    else {
      response = `When considering crypto investments, look at both profitability and sustainability factors:

1. For profitability: Consider market cap, price trends, and adoption rate
2. For sustainability: Consider energy usage and long-term project viability

Some balanced options include Ethereum (transitioning to more sustainable model) and Cardano (designed with sustainability in mind).

⚠️ Disclaimer: This is not financial advice. Always do your own research before investing!`;
    }
  }
  
  else if (
    lowerMessage.includes('list all') || 
    lowerMessage.includes('show all') || 
    lowerMessage.includes('what cryptocurrencies')
  ) {
    const allCryptos = getAllCryptos();
    const cryptoList = allCryptos.map(c => c.name).join(', ');
    response = `Here are all the cryptocurrencies in my database: ${cryptoList}. What would you like to know about any of them?`;
  }
  
  else {
    response = "I'm not sure I understand that question. Try asking about cryptocurrency trends, sustainability scores, or specific coins like Bitcoin or Ethereum. Type 'help' to see what I can do!";
  }
  
  return createMessage('bot', response);
};