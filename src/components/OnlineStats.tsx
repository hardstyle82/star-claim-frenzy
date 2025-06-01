
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersIcon, UserPlusIcon, TrendingUpIcon } from 'lucide-react';

const OnlineStats: React.FC = () => {
  const [onlineCount, setOnlineCount] = useState(3278);
  const [dailyRegistrations, setDailyRegistrations] = useState(41);

  useEffect(() => {
    // Update online count every 20 seconds
    const onlineInterval = setInterval(() => {
      const newCount = Math.floor(Math.random() * (3361 - 3278 + 1)) + 3278;
      setOnlineCount(newCount);
    }, 20000);

    // Update daily registrations every 10 minutes
    const registrationInterval = setInterval(() => {
      const newRegs = Math.floor(Math.random() * (53 - 41 + 1)) + 41;
      setDailyRegistrations(newRegs);
    }, 600000); // 10 minutes

    return () => {
      clearInterval(onlineInterval);
      clearInterval(registrationInterval);
    };
  }, []);

  return (
    <Card className="bg-gradient-to-r from-green-100 to-yellow-100 border-2 border-green-400 shadow-xl">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-green-700 flex items-center gap-2">
          <TrendingUpIcon className="w-5 h-5" />
          🔥 ГОРЯЧАЯ СТАТИСТИКА 🔥
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <UsersIcon className="w-6 h-6 text-green-600 animate-pulse" />
          <div>
            <div className="text-xl font-bold text-green-600">{onlineCount.toLocaleString()}</div>
            <div className="text-sm text-green-700 font-semibold">👥 Сейчас онлайн</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <UserPlusIcon className="w-6 h-6 text-blue-600 animate-bounce" />
          <div>
            <div className="text-xl font-bold text-blue-600">{dailyRegistrations}</div>
            <div className="text-sm text-blue-700 font-semibold">🆕 Зарегистрировалось сегодня</div>
          </div>
        </div>

        <div className="text-center p-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm font-semibold text-yellow-700">
            💡 Присоединяйтесь к тысячам игроков!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineStats;
