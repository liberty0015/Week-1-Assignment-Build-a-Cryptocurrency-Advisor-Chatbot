import React from 'react';
import { Cryptocurrency } from '../types';
import CryptoCard from './CryptoCard';

interface CryptoGridProps {
  cryptos: Cryptocurrency[];
}

const CryptoGrid: React.FC<CryptoGridProps> = ({ cryptos }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cryptos.map((crypto) => (
        <CryptoCard key={crypto.name} crypto={crypto} />
      ))}
    </div>
  );
};

export default CryptoGrid;