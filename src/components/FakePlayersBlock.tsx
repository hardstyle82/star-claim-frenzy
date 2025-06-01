
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FakePlayersBlock: React.FC = () => {
  const [recentWins, setRecentWins] = useState([
    { player: 'BitcoinMaster', amount: 50, time: 'только что' },
    { player: 'EtherealGamer', amount: 25, time: '2 мин назад' },
    { player: 'StellarPlayer', amount: 75, time: '5 мин назад' },
  ]);

  const englishNicknames = [
    'CryptoWolf', 'DiamondHands', 'MoonWalker', 'GoldDigger', 'StarSeeker',
    'CoinMaster', 'LuckyTrader', 'MoneyFlow', 'WealthHunter', 'FortuneSeeker',
    'CashKing', 'SilverBullet', 'PowerPlayer', 'RichMiner', 'ProfitMaker',
    'BankRoller', 'TreasureHunter', 'ValueSeeker', 'BonusCollector', 'JackpotJoe'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const randomPlayer = englishNicknames[Math.floor(Math.random() * englishNicknames.length)];
      const randomAmount = Math.floor(Math.random() * 100) + 10;
      
      setRecentWins(prev => [
        { player: randomPlayer, amount: randomAmount, time: 'только что' },
        ...prev.slice(0, 4).map(win => ({
          ...win,
          time: win.time === 'только что' ? '2 мин назад' : 
                win.time === '2 мин назад' ? '5 мин назад' : '10 мин назад'
        }))
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">🎉 Последние выигрыши</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentWins.map((win, index) => (
            <div 
              key={index}
              className="flex justify-between items-center p-2 bg-green-50 rounded-lg"
            >
              <div>
                <div className="font-semibold text-green-800">{win.player}</div>
                <div className="text-xs text-green-600">{win.time}</div>
              </div>
              <div className="text-lg font-bold text-green-700">
                +{win.amount} ⭐
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FakePlayersBlock;
