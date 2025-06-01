
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';

const SupportBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Привет! Я бот поддержки. Как могу помочь?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');

  const faqResponses: { [key: string]: string } = {
    'как играть': 'Подпишитесь на канал и нажимайте кнопку CLAIM для получения звёзд! Соберите 1000 звёзд для вывода.',
    'вывод': 'Для вывода нужно собрать 1000 звёзд. После этого нажмите кнопку "Забрать выигрыш".',
    'премиум': 'Премиум Телеграм можно получить при достижении 1000 очков прогресса и 1000 звёзд.',
    'рефералы': 'За каждого приглашённого друга вы получаете +50 звёзд! Поделитесь своей реферальной ссылкой.',
    'кулдаун': 'После 5 нажатий кнопки CLAIM активируется кулдаун на 35 секунд.',
    'бонус': 'Ежедневный бонус можно получить каждые 24 часа. Не забывайте заходить каждый день!'
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.toLowerCase();
    setMessages(prev => [...prev, { text: inputValue, isBot: false }]);
    setInputValue('');

    // Find matching response
    let botResponse = 'Извините, я не понял ваш вопрос. Попробуйте спросить о: как играть, вывод, премиум, рефералы, кулдаун, бонус';
    
    for (const [keyword, response] of Object.entries(faqResponses)) {
      if (userMessage.includes(keyword)) {
        botResponse = response;
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 w-80">
      <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg">🤖 Поддержка</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-48 overflow-y-auto space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm ${
                  message.isBot
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900 ml-4'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Задайте вопрос..."
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-sm"
            />
            <Button size="sm" onClick={handleSendMessage}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportBot;
