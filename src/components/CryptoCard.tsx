import React from 'react';
import { Cryptocurrency } from '../types';
import { 
  TrendingUp, 
  TrendingDown, 
  MinusCircle, 
  Activity, 
  DollarSign, 
  Zap, 
  Leaf,
  Bitcoin,
  CircleDot,
  Circle,
  Binary,
  Waves
} from 'lucide-react';

interface CryptoCardProps {
  crypto: Cryptocurrency;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const renderTrendIcon = () => {
    switch(crypto.priceTrend) {
      case 'rising':
        return <TrendingUp className="text-green-500" />;
      case 'falling':
        return <TrendingDown className="text-red-500" />;
      case 'stable':
        return <MinusCircle className="text-gray-500" />;
      default:
        return <Activity />;
    }
  };
  
  const renderCryptoIcon = () => {
    switch(crypto.icon) {
      case 'bitcoin':
        return <Bitcoin size={36} />;
      case 'ethereum':
        return <Zap size={36} />;
      case 'binary':
        return <Binary size={36} />;
      case 'circle-dot':
        return <CircleDot size={36} />;
      case 'circle':
        return <Circle size={36} />;
      case 'waves':
        return <Waves size={36} />;
      case 'leaf':
        return <Leaf size={36} />;
      default:
        return <DollarSign size={36} />;
    }
  };
  
  const getSustainabilityColor = () => {
    if (crypto.sustainabilityScore >= 7) return 'bg-green-500';
    if (crypto.sustainabilityScore >= 5) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="p-2 bg-gray-100 rounded-full mr-3">
            {renderCryptoIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold">{crypto.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              {renderTrendIcon()}
              <span className="ml-1 capitalize">{crypto.priceTrend}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-sm text-gray-600 mb-1">
            Market Cap: <span className="font-medium capitalize">{crypto.marketCap}</span>
          </div>
          <div className="text-sm text-gray-600">
            Energy Use: <span className="font-medium capitalize">{crypto.energyUse}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="flex items-center mb-1">
          <span className="text-sm mr-2">Sustainability:</span>
          <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getSustainabilityColor()}`} 
              style={{ width: `${crypto.sustainabilityScore * 10}%` }}
            ></div>
          </div>
          <span className="text-sm ml-2">{crypto.sustainabilityScore}/10</span>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-700">{crypto.description}</p>
    </div>
  );
};

export default CryptoCard;