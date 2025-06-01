
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FakePlayer {
  id: number;
  name: string;
  avatar: string;
  lastWin: string;
  amount: number;
  timestamp: Date;
}

const FakePlayersBlock: React.FC = () => {
  const [players, setPlayers] = useState<FakePlayer[]>([]);

  const generateFakePlayer = (): FakePlayer => {
    const names = [
      'Александр', 'Дмитрий', 'Михаил', 'Сергей', 'Андрей', 'Николай', 'Владимир',
      'Анна', 'Елена', 'Ольга', 'Татьяна', 'Мария', 'Наталья', 'Ирина',
      'Максим', 'Артём', 'Денис', 'Игорь', 'Алексей', 'Роман', 'Виктор',
      'Светлана', 'Юлия', 'Екатерина', 'Людмила', 'Галина', 'Валентина',
      'Павел', 'Евгений', 'Константин', 'Станислав', 'Валерий', 'Леонид',
      'Вероника', 'Кристина', 'Дарья', 'Полина'
    ];

    const avatars = ['👤', '👨', '👩', '🧑', '👨‍💼', '👩‍💼', '🧔', '👨‍🎓', '👩‍🎓'];
    const winTypes = ['⭐ звёзд', '👑 Премиум'];
    
    const isStars = Math.random() > 0.05;
    const winType = isStars ? '⭐ звёзд' : '👑 Премиум';
    const amount = isStars ? Math.floor(Math.random() * 5) + 1 : 1;

    return {
      id: Math.random(),
      name: names[Math.floor(Math.random() * names.length)],
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      lastWin: winType,
      amount,
      timestamp: new Date()
    };
  };

  useEffect(() => {
    // Инициализация 35 игроков
    const initialPlayers = Array.from({ length: 35 }, generateFakePlayer);
    setPlayers(initialPlayers);

    // Автообновление каждые 3-5 секунд
    const interval = setInterval(() => {
      setPlayers(prev => {
        const newPlayers = [...prev];
        const randomIndex = Math.floor(Math.random() * newPlayers.length);
        newPlayers[randomIndex] = generateFakePlayer();
        return newPlayers.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      });
    }, Math.random() * 2000 + 3000); // 3-5 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🎮 Последние выигрыши
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {players.slice(0, 15).map(player => (
            <div key={player.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-lg">{player.avatar}</span>
                <span className="font-medium text-sm">{player.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {player.amount} {player.lastWin}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FakePlayersBlock;
