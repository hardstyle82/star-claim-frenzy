
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PlayerRanking: React.FC = () => {
  const topPlayers = [
    { name: 'CryptoKing', stars: 15420, wins: 847 },
    { name: 'StarHunter', stars: 12890, wins: 731 },
    { name: 'DiamondMiner', stars: 11567, wins: 692 },
    { name: 'GoldRush', stars: 10234, wins: 615 },
    { name: 'MoneyMaker', stars: 9876, wins: 578 },
    { name: 'LuckyStrike', stars: 8945, wins: 534 },
    { name: 'CoinCollector', stars: 7823, wins: 489 },
    { name: 'WealthBuilder', stars: 6754, wins: 423 },
  ];

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">🏆 Топ игроков</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8">#</TableHead>
              <TableHead>Игрок</TableHead>
              <TableHead className="text-right">Звёзды</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topPlayers.map((player, index) => (
              <TableRow key={index}>
                <TableCell>
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {player.name}
                  {index < 3 && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {index === 0 ? 'TOP' : index === 1 ? 'PRO' : 'VIP'}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right font-bold text-yellow-600">
                  {player.stars.toLocaleString()} ⭐
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PlayerRanking;
