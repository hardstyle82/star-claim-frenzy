
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Ошибка",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isLogin ? "🎉 Добро пожаловать!" : "🎉 Регистрация успешна!",
          description: isLogin 
            ? "Теперь вы можете играть и зарабатывать!" 
            : "Проверьте email для подтверждения аккаунта",
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-yellow-400">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {isLogin ? '🔑 Вход в игру' : '⭐ Бесплатная регистрация'}
          </DialogTitle>
          <div className="text-center text-lg font-semibold text-green-600">
            💰 Начни зарабатывать прямо сейчас! 💰
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-semibold">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 border-gray-300 focus:border-green-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="password" className="font-semibold">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-2 border-gray-300 focus:border-green-500"
              placeholder="Минимум 6 символов"
              minLength={6}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3" 
            disabled={loading}
          >
            {loading ? '⏳ Загрузка...' : (isLogin ? '🚀 ВОЙТИ И ИГРАТЬ' : '🎯 ЗАРЕГИСТРИРОВАТЬСЯ')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full font-semibold"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? '💫 Нет аккаунта? Регистрация' : '🔙 Есть аккаунт? Вход'}
          </Button>
          
          {!isLogin && (
            <div className="text-center p-3 bg-yellow-100 rounded-lg border border-yellow-300">
              <p className="text-sm font-semibold text-gray-700">
                🎁 При регистрации вы получите бонус +100 звёзд!
              </p>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
