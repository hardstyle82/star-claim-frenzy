
import React from 'react';
import { Button } from '@/components/ui/button';

const SocialShare: React.FC = () => {
  const shareUrl = window.location.href;
  const shareText = '🎯 Играю в Star Clicker и выигрываю звёзды! Присоединяйся!';

  const handleShare = (platform: string) => {
    let url = '';
    
    switch (platform) {
      case 'telegram':
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'vk':
        url = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        📱 Поделиться в социальных сетях
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button
          onClick={() => handleShare('telegram')}
          className="bg-blue-500 hover:bg-blue-600 text-white"
          size="sm"
        >
          📱 Telegram
        </Button>
        <Button
          onClick={() => handleShare('vk')}
          className="bg-blue-700 hover:bg-blue-800 text-white"
          size="sm"
        >
          🌐 VK
        </Button>
        <Button
          onClick={() => handleShare('twitter')}
          className="bg-sky-500 hover:bg-sky-600 text-white"
          size="sm"
        >
          🐦 Twitter
        </Button>
        <Button
          onClick={() => handleShare('facebook')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          📘 Facebook
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
