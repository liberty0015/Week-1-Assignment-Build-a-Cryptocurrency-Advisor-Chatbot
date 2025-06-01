import { Cryptocurrency } from '../types';

const cryptoDatabase: Record<string, Cryptocurrency> = {
  "Bitcoin": {
    name: "Bitcoin",
    priceTrend: "rising",
    marketCap: "high",
    energyUse: "high",
    sustainabilityScore: 3,
    description: "The original cryptocurrency that started it all. Known for its store of value properties and high energy consumption.",
    icon: "bitcoin"
  },
  "Ethereum": {
    name: "Ethereum",
    priceTrend: "stable",
    marketCap: "high",
    energyUse: "medium",
    sustainabilityScore: 6,
    description: "The leading smart contract platform transitioning to a more energy-efficient proof-of-stake model.",
    icon: "ethereum"
  },
  "Cardano": {
    name: "Cardano",
    priceTrend: "rising",
    marketCap: "medium",
    energyUse: "low",
    sustainabilityScore: 8,
    description: "A proof-of-stake blockchain platform focused on sustainability and academic research.",
    icon: "binary"
  },
  "Solana": {
    name: "Solana",
    priceTrend: "rising",
    marketCap: "medium",
    energyUse: "low",
    sustainabilityScore: 7,
    description: "A high-performance blockchain with fast transaction speeds and low fees.",
    icon: "circle"
  },
  "Polkadot": {
    name: "Polkadot",
    priceTrend: "stable",
    marketCap: "medium",
    energyUse: "low",
    sustainabilityScore: 7.5,
    description: "A multi-chain network that enables different blockchains to transfer messages and value.",
    icon: "circle-dot"
  },
  "Ripple": {
    name: "Ripple",
    priceTrend: "falling",
    marketCap: "medium",
    energyUse: "low",
    sustainabilityScore: 6.5,
    description: "A digital payment protocol and cryptocurrency focused on international money transfers.",
    icon: "waves"
  },
  "Algorand": {
    name: "Algorand",
    priceTrend: "stable",
    marketCap: "low",
    energyUse: "low",
    sustainabilityScore: 9,
    description: "A carbon-negative blockchain platform with a focus on sustainability and scalability.",
    icon: "leaf"
  }
};

export default cryptoDatabase;

export const getCryptoByName = (name: string): Cryptocurrency | undefined => {
  const lowerName = name.toLowerCase();
  const crypto = Object.values(cryptoDatabase).find(
    crypto => crypto.name.toLowerCase() === lowerName
  );
  return crypto;
};

export const getCryptosByPriceTrend = (trend: string): Cryptocurrency[] => {
  return Object.values(cryptoDatabase).filter(
    crypto => crypto.priceTrend.toLowerCase() === trend.toLowerCase()
  );
};

export const getMostSustainableCrypto = (): Cryptocurrency => {
  return Object.values(cryptoDatabase).reduce((prev, current) => 
    prev.sustainabilityScore > current.sustainabilityScore ? prev : current
  );
};

export const getLeastSustainableCrypto = (): Cryptocurrency => {
  return Object.values(cryptoDatabase).reduce((prev, current) => 
    prev.sustainabilityScore < current.sustainabilityScore ? prev : current
  );
};

export const getAllCryptos = (): Cryptocurrency[] => {
  return Object.values(cryptoDatabase);
};