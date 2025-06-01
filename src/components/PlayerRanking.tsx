
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const PlayerRanking: React.FC = () => {
  const topPlayers = [
    { rank: 1, name: 'Александр В.', avatar: '👑', stars: 15420, wins: '2 Премиум' },
    { rank: 2, name: 'Мария К.', avatar: '💎', stars: 12850, wins: '1 Премиум' },
    { rank: 3, name: 'Дмитрий П.', avatar: '🔥', stars: 9670, wins: '945 звёзд' },
    { rank: 4, name: 'Елена С.', avatar: '⚡', stars: 8320, wins: '823 звезды' },
    { rank: 5, name: 'Михаил Т.', avatar: '🚀', stars: 7140, wins: '714 звёзд' },
    { rank: 6, name: 'Анна Л.', avatar: '🌟', stars: 6580, wins: '658 звёзд' },
    { rank: 7, name: 'Сергей М.', avatar: '💫', stars: 5920, wins: '592 звезды' },
    { rank: 8, name: 'Ольга В.', avatar: '✨', stars: 5340, wins: '534 звезды' },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-600';
      case 2: return 'text-gray-600';
      case 3: return 'text-orange-600';
      default: return 'text-gray-800';
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🏆 Топ игроков
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topPlayers.map(player => (
            <div key={player.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`font-bold text-lg ${getRankColor(player.rank)}`}>
                  #{player.rank}
                </div>
                <span className="text-xl">{player.avatar}</span>
                <div>
                  <div className="font-medium text-sm">{player.name}</div>
                  <div className="text-xs text-gray-600">{player.stars} ⭐</div>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {player.wins}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerRanking;
