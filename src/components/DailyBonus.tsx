
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface DailyBonusProps {
  onBonus: (amount: number) => void;
}

const DailyBonus: React.FC<DailyBonusProps> = ({ onBonus }) => {
  const [canClaim, setCanClaim] = useState(true);
  const [timeUntilNext, setTimeUntilNext] = useState('');

  useEffect(() => {
    const lastClaim = localStorage.getItem('lastDailyBonus');
    if (lastClaim) {
      const lastClaimDate = new Date(lastClaim);
      const now = new Date();
      const timeDiff = now.getTime() - lastClaimDate.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);

      if (hoursDiff < 24) {
        setCanClaim(false);
        const nextClaim = new Date(lastClaimDate.getTime() + 24 * 60 * 60 * 1000);
        
        const updateTimer = () => {
          const timeLeft = nextClaim.getTime() - new Date().getTime();
          if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 3600));
            const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
            setTimeUntilNext(`${hours}ч ${minutes}м`);
          } else {
            setCanClaim(true);
            setTimeUntilNext('');
          }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const claimDailyBonus = () => {
    if (!canClaim) return;

    const bonusAmount = Math.floor(Math.random() * 20) + 10; // 10-30 звёзд
    onBonus(bonusAmount);
    localStorage.setItem('lastDailyBonus', new Date().toISOString());
    setCanClaim(false);

    toast({
      title: "Ежедневный бонус!",
      description: `Вы получили ${bonusAmount} звёзд!`,
    });
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">🎁 Ежедневный бонус</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={claimDailyBonus}
          disabled={!canClaim}
        >
          {canClaim ? '🎁 Забрать' : `⏰ ${timeUntilNext}`}
        </Button>
        <p className="text-xs text-gray-600 mt-2 text-center">
          {canClaim ? 'Получите до 30 звёзд!' : 'Возвращайтесь завтра'}
        </p>
      </CardContent>
    </Card>
  );
};

export default DailyBonus;
