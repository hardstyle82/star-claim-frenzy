
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersIcon, UserPlusIcon } from 'lucide-react';

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
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">📊 Статистика</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <UsersIcon className="w-5 h-5 text-green-600" />
          <div>
            <div className="text-lg font-bold text-green-600">{onlineCount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Сейчас онлайн</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <UserPlusIcon className="w-5 h-5 text-blue-600" />
          <div>
            <div className="text-lg font-bold text-blue-600">{dailyRegistrations}</div>
            <div className="text-sm text-gray-600">Зарегистрировалось сегодня</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnlineStats;
