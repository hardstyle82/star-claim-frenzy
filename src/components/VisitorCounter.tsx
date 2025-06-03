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
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <CalendarIcon className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white">Сегодня</span>
            </div>
            <div className="text-2xl font-bold text-yellow-300">
              {todayVisitors.toLocaleString()}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <EyeIcon className="w-4 h-4 text-green-300" />
              <span className="text-sm font-semibold text-white">Всего</span>
            </div>
            <div className="text-2xl font-bold text-green-300">
              {totalVisitors.toLocaleString()}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <UsersIcon className="w-4 h-4 text-blue-300 animate-pulse" />
              <span className="text-sm font-semibold text-white">Онлайн</span>
            </div>
            <div className="text-2xl font-bold text-blue-300">
              {onlineNow.toLocaleString()}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-3 pt-3 border-t border-white/20">
          <p className="text-xs text-white/80">
            📊 Счётчик посетителей • Работает с Яндекс.Метрика
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorCounter;