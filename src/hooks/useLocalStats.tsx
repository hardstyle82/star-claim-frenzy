import { useState, useEffect } from 'react';

interface LocalStats {
  stars: number;
  premium_progress: number;
  total_claims: number;
  last_daily_bonus?: string;
}

export const useLocalStats = () => {
  const [stats, setStats] = useState<LocalStats>({
    stars: 0,
    premium_progress: 0,
    total_claims: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Загружаем статистику из localStorage
    const savedStats = localStorage.getItem('starClickerStats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setStats(parsedStats);
      } catch (error) {
        console.error('Error parsing saved stats:', error);
      }
    }
    setLoading(false);
  }, []);

  const updateStats = (newStats: Partial<LocalStats>) => {
    const updatedStats = { ...stats, ...newStats };
    setStats(updatedStats);
    
    // Сохраняем в localStorage
    localStorage.setItem('starClickerStats', JSON.stringify(updatedStats));
  };

  const addWin = (winType: string, amount: number) => {
    // Просто логируем выигрыш
    console.log(`Win: ${winType} - ${amount}`);
  };

  return {
    stats,
    loading,
    updateStats,
    addWin,
    refetch: () => {}, // Заглушка для совместимости
  };
};