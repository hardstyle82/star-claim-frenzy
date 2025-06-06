
import React from 'react';
import { Button } from '@/components/ui/button';

interface ClaimButtonProps {
  isSubscribed: boolean;
  isOnCooldown: boolean;
  onClaim: () => void;
}

const ClaimButton: React.FC<ClaimButtonProps> = ({ isSubscribed, isOnCooldown, onClaim }) => {
  const isDisabled = !isSubscribed || isOnCooldown;

  return (
    <Button
      size="lg"
      className={`
        text-2xl md:text-3xl font-bold py-8 px-12 rounded-2xl transition-all duration-300 transform
        ${isDisabled 
          ? 'bg-gray-400 cursor-not-allowed text-gray-600' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 hover:scale-105 shadow-2xl text-black animate-pulse'
        }
      `}
      onClick={onClaim}
      disabled={isDisabled}
    >
      {isOnCooldown ? '⏳ ОЖИДАНИЕ...' : '🎯 CLAIM & WIN!'}
    </Button>
  );
};

export default ClaimButton;
