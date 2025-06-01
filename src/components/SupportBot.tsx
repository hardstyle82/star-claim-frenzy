
import React, { useState } from 'react';
import { MessageCircleIcon, XIcon, SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupportBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привет! Я Макс, ваш помощник. Как дела с игрой? 😊', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const botResponses = {
    'как играть': 'Зарегистрируйтесь, подпишитесь на канал, и нажимайте кнопку CLAIM! Каждые 5 кликов - кулдаун 35 секунд. 🎮',
    'не работает': 'Проверьте: 1) Вы зарегистрированы? 2) Подписаны на канал? 3) Нет кулдауна? 🔍',
    'вывод': 'Наберите 1000 звёзд и нажмите "Забрать выигрыш"! 1 звезда = $0.01 💰',
    'премиум': 'Для получения Премиум Telegram нужно 1000 звёзд и 1000 прогресса! 👑',
    'регистрация': 'Нажмите кнопку "Войти" вверху страницы и создайте аккаунт. Это бесплатно! 📝',
    'бонус': 'Ежедневный бонус доступен каждые 24 часа. Не забывайте заходить! 🎁',
    'реферал': 'Приглашайте друзей по реферальной ссылке и получайте % с их выигрышей! 👥'
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = { id: Date.now(), text: inputValue, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    // Простая логика бота
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let botResponse = 'Не совсем понял ваш вопрос. Попробуйте спросить про: игру, вывод, премиум, регистрацию или бонусы! 🤔';
      
      for (const [key, response] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      const botMessage = { id: Date.now() + 1, text: botResponse, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputValue('');
  };

  return (
    <>
      {/* Кнопка открытия чата */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl animate-bounce z-50"
      >
        <MessageCircleIcon className="w-8 h-8" />
      </Button>

      {/* Чат */}
      {isOpen && (
        <Card className="fixed bottom-24 left-6 w-80 h-96 bg-white shadow-2xl z-50 border-2 border-blue-400">
          <CardHeader className="bg-blue-600 text-white p-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">🤖 Макс - Поддержка</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-700 p-1"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="text-sm opacity-90">Онлайн • Отвечаю быстро ⚡</div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            {/* Сообщения */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs p-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-blue-100 text-blue-900 border border-blue-200'
                        : 'bg-green-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Поле ввода */}
            <div className="border-t p-3 bg-white">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Напишите ваш вопрос..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="text-sm"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <SendIcon className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                💡 Спросите про: игру, вывод, премиум
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default SupportBot;
