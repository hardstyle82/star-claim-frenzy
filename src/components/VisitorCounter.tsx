import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EyeIcon, UsersIcon, CalendarIcon } from 'lucide-react';

const VisitorCounter: React.FC = () => {
  const [todayVisitors, setTodayVisitors] = useState(1247);
  const [totalVisitors, setTotalVisitors] = useState(89543);
  const [onlineNow, setOnlineNow] = useState(342);

  useEffect(() => {
    // Имитация обновления счётчиков
    const interval = setInterval(() => {
      setTodayVisitors(prev => prev + Math.floor(Math.random() * 3));
      setTotalVisitors(prev => prev + Math.floor(Math.random() * 5));
      setOnlineNow(prev => {
        const change = Math.floor(Math.random() * 11) - 5; // от -5 до +5
        return Math.max(300, prev + change);
      });
    }, 30000); // Обновление каждые 30 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 mb-4">
      <div className="flex justify-center items-center gap-4 text-center">
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-3 h-3 text-yellow-300" />
          <span className="text-xs font-semibold text-white">Сегодня:</span>
          <span className="text-sm font-bold text-yellow-300">
            {todayVisitors.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <EyeIcon className="w-3 h-3 text-green-300" />
          <span className="text-xs font-semibold text-white">Всего:</span>
          <span className="text-sm font-bold text-green-300">
            {totalVisitors.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-1">
          <UsersIcon className="w-3 h-3 text-blue-300 animate-pulse" />
          <span className="text-xs font-semibold text-white">Онлайн:</span>
          <span className="text-sm font-bold text-blue-300">
            {onlineNow.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisitorCounter;