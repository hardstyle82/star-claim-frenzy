
import React, { useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import confetti from 'canvas-confetti';

interface Win {
  type: string;
  amount: number;
}

interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  win: Win;
}

const WinModal: React.FC<WinModalProps> = ({ isOpen, onClose, win }) => {
  useEffect(() => {
    if (isOpen) {
      // Запуск конфетти
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          startVelocity: 30,
          spread: 360,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          }
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();

      // Автозакрытие через 3 секунды
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-white text-center">
        <div className="py-8">
          <div className="text-6xl mb-4 animate-bounce">
            {win.type === 'premium' ? '👑' : '⭐'}
          </div>
          <h2 className="text-3xl font-bold mb-2">ПОЗДРАВЛЯЕМ!</h2>
          <p className="text-xl">
            Вы выиграли{' '}
            {win.type === 'premium' 
              ? 'Премиум Телеграм!' 
              : `${win.amount} звёзд!`
            }
          </p>
          <div className="mt-6 text-lg animate-pulse">
            🎉 Отличная игра! 🎉
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinModal;
