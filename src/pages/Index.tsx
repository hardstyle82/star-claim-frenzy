
import React, { useState, useEffect } from 'react';
import { StarIcon, UsersIcon, ArrowUpIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import ClaimButton from '@/components/ClaimButton';
import FakePlayersBlock from '@/components/FakePlayersBlock';
import DailyBonus from '@/components/DailyBonus';
import ReferralSystem from '@/components/ReferralSystem';
import PlayerRanking from '@/components/PlayerRanking';
import WinModal from '@/components/WinModal';
import AuthModal from '@/components/AuthModal';
import SupportBot from '@/components/SupportBot';
import OnlineStats from '@/components/OnlineStats';
import SocialShare from '@/components/SocialShare';
import { useAuth } from '@/hooks/useAuth';
import { useUserStats } from '@/hooks/useUserStats';

const Index = () => {
  const { user, signOut } = useAuth();
  const { stats, updateStats, addWin } = useUserStats();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [claimCount, setClaimCount] = useState(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [lastWin, setLastWin] = useState({ type: '', amount: 0 });

  // Таймер кулдауна
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cooldownTime > 0) {
      interval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            setIsOnCooldown(false);
            setClaimCount(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldownTime]);

  const handleClaim = async () => {
    if (!user) {
      setShowAuthModal(true);
      toast({
        title: "Требуется регистрация!",
        description: "Зарегистрируйтесь или войдите в аккаунт для начала игры",
        variant: "destructive",
      });
      return;
    }

    if (!isSubscribed || isOnCooldown) return;

    const newClaimCount = claimCount + 1;
    setClaimCount(newClaimCount);

    // Генерация выигрыша
    const random = Math.random();
    let win;
    
    if (random < 0.01) { // 1% шанс на премиум
      win = { type: 'premium', amount: 1 };
      setLastWin(win);
      await updateStats({ 
        premium_progress: stats.premium_progress + 1,
        total_claims: stats.total_claims + 1
      });
    } else {
      const starsWon = Math.floor(Math.random() * 5) + 1;
      win = { type: 'stars', amount: starsWon };
      setLastWin(win);
      await updateStats({ 
        stars: stats.stars + starsWon,
        premium_progress: stats.premium_progress + 1,
        total_claims: stats.total_claims + 1
      });
    }

    await addWin(win.type, win.amount);
    setShowWinModal(true);

    // Проверка кулдауна после 5 нажатий
    if (newClaimCount >= 5) {
      setIsOnCooldown(true);
      setCooldownTime(35);
    }

    toast({
      title: "🎉 Поздравляем!",
      description: win.type === 'premium' 
        ? "Вы выиграли Премиум Телеграм!" 
        : `Вы выиграли ${win.amount} звёзд!`,
    });
  };

  const handlePremiumClaim = () => {
    if (stats.stars >= 1000 && stats.premium_progress >= 1000) {
      window.open('https://www.youtube.com/watch?v=O1L8DOup1J0', '_blank');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-yellow-400 to-green-600 relative overflow-hidden">
      {/* Улучшенный денежный фон с долларами */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 text-8xl animate-pulse text-green-800">💵</div>
        <div className="absolute top-32 right-20 text-6xl animate-bounce text-yellow-700">💰</div>
        <div className="absolute bottom-20 left-32 text-7xl animate-pulse text-green-700">💸</div>
        <div className="absolute bottom-40 right-10 text-5xl animate-bounce text-yellow-800">🤑</div>
        <div className="absolute top-1/2 left-1/4 text-9xl animate-pulse text-green-600">💲</div>
        <div className="absolute top-1/3 right-1/3 text-6xl animate-bounce text-yellow-600">💵</div>
        <div className="absolute top-20 left-1/3 text-7xl animate-pulse text-green-800">🏦</div>
        <div className="absolute bottom-32 right-1/4 text-6xl animate-bounce text-yellow-700">💰</div>
        <div className="absolute top-1/4 left-1/2 text-5xl animate-pulse text-green-700">💸</div>
        <div className="absolute bottom-60 left-20 text-8xl animate-bounce text-yellow-800">💲</div>
        <div className="absolute top-60 right-40 text-4xl animate-pulse text-green-600">🤑</div>
        <div className="absolute bottom-80 left-60 text-6xl animate-bounce text-yellow-600">💵</div>
        <div className="absolute top-40 right-60 text-5xl animate-pulse text-green-800">🏦</div>
        <div className="absolute bottom-20 right-80 text-7xl animate-bounce text-yellow-700">💰</div>
        <div className="absolute top-80 left-40 text-4xl animate-pulse text-green-700">💸</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 max-w-6xl">
        {/* Заголовок с улучшенной анимацией */}
        <div className="text-center mb-8">
          <div className="flex justify-between items-start mb-4">
            <div></div>
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-bold text-white animate-pulse drop-shadow-2xl">
                💰 STAR CLICKER 💰
              </h1>
              <div className="text-2xl md:text-3xl font-bold text-yellow-300 animate-bounce mt-2">
                🎯 ЗАРАБОТАЙ РЕАЛЬНЫЕ ДЕНЬГИ! 🎯
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {user ? (
                <>
                  <Badge variant="secondary" className="text-sm bg-green-600 text-white">
                    👤 {user.email?.split('@')[0]}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={signOut}
                    className="text-xs bg-red-500 text-white border-red-600 hover:bg-red-600"
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold animate-pulse"
                  size="lg"
                >
                  🔑 ВОЙТИ И ИГРАТЬ
                </Button>
              )}
            </div>
          </div>
          <p className="text-xl md:text-2xl text-white/95 font-semibold drop-shadow-lg">
            Получай звёзды и Премиум Телеграм бесплатно!
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-red-500/90 rounded-lg border-2 border-red-600">
              <p className="text-white font-bold text-lg">
                ⚠️ Для игры необходима регистрация! ⚠️
              </p>
              <p className="text-white/90">
                Зарегистрируйтесь бесплатно и начните зарабатывать прямо сейчас!
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Левая колонка - основная игра */}
          <div className="lg:col-span-2 space-y-6">
            {/* Прогресс-бары */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-yellow-400 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-yellow-400 to-green-500">
                <CardTitle className="flex items-center gap-2 text-white">
                  <StarIcon className="w-6 h-6" />
                  🏆 ПРОГРЕСС ВЫИГРЫШЕЙ 🏆
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">💰 Звёзды для вывода</span>
                    <span className="font-bold text-green-600">{stats.stars}/1000 ⭐</span>
                  </div>
                  <Progress value={(stats.stars / 1000) * 100} className="h-4" />
                  <Button 
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-3"
                    onClick={() => window.open('https://www.youtube.com/@madnessgames_?sub_confirmation=1', '_blank')}
                    disabled={stats.stars < 1000}
                  >
                    💸 ЗАБРАТЬ ${Math.floor(stats.stars / 100)} USD!
                  </Button>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">👑 Прогресс для Премиум</span>
                    <span className="font-bold text-purple-600">{stats.premium_progress}/1000</span>
                  </div>
                  <Progress value={(stats.premium_progress / 1000) * 100} className="h-4" />
                  <Button 
                    className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
                    onClick={handlePremiumClaim}
                    disabled={stats.stars < 1000 || stats.premium_progress < 1000}
                  >
                    👑 ПОЛУЧИТЬ ПРЕМИУМ TELEGRAM
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Основная кнопка CLAIM */}
            <Card className="bg-white/95 backdrop-blur-sm border-2 border-yellow-400 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-3xl font-bold mb-2 text-green-600">
                    Ваши звёзды: {stats.stars} ⭐
                  </div>
                  <div className="text-xl font-semibold text-green-700 mb-2">
                    💵 Ваш баланс: ${Math.floor(stats.stars / 100)} USD
                  </div>
                  {isOnCooldown && (
                    <div className="text-lg text-red-600 font-semibold animate-pulse">
                      ⏰ Следующий клик через: {formatTime(cooldownTime)}
                    </div>
                  )}
                </div>

                <ClaimButton 
                  isSubscribed={user ? isSubscribed : false}
                  isOnCooldown={isOnCooldown}
                  onClaim={handleClaim}
                />

                {user && !isSubscribed && (
                  <div className="mt-4">
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6"
                      onClick={() => {
                        window.open('https://t.me/zarabotay_depin', '_blank');
                        setIsSubscribed(true);
                      }}
                    >
                      📱 ПОДПИСАТЬСЯ НА КАНАЛ!
                    </Button>
                    <p className="text-sm text-red-600 mt-2 font-semibold">
                      ⚠️ Подпишитесь на канал для активации кнопки CLAIM
                    </p>
                  </div>
                )}

                {!user && (
                  <div className="mt-4 p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      🚫 Игра заблокирована
                    </p>
                    <p className="text-gray-700 mb-3">
                      Войдите в аккаунт или зарегистрируйтесь для начала игры
                    </p>
                    <Button
                      onClick={() => setShowAuthModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold"
                    >
                      🔓 РАЗБЛОКИРОВАТЬ ИГРУ
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ежедневный бонус, рефералы и статистика онлайн */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DailyBonus onBonus={(amount) => updateStats({ stars: stats.stars + amount })} />
              <ReferralSystem />
            </div>
            
            {/* Блок статистики онлайн */}
            <OnlineStats />
          </div>

          {/* Правая колонка */}
          <div className="space-y-6">
            {/* Фейковые игроки */}
            <FakePlayersBlock />
            
            {/* Рейтинг игроков */}
            <PlayerRanking />
          </div>
        </div>

        {/* Футер с социальными сетями */}
        <div className="mt-12">
          <SocialShare />
        </div>
      </div>

      {/* Модальные окна и компоненты */}
      <WinModal 
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        win={lastWin}
      />
      
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
      
      <SupportBot />
    </div>
  );
};

export default Index;
