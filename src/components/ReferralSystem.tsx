
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const ReferralSystem: React.FC = () => {
  const [referrals, setReferrals] = useState(0);
  const [referralCode, setReferralCode] = useState('STAR123');

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Ссылка скопирована!",
      description: "Поделитесь с друзьями и получайте бонусы!",
    });
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">👥 Рефералы</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{referrals}</div>
          <div className="text-sm text-gray-600">приглашённых друзей</div>
        </div>
        
        <div className="space-y-2">
          <Input 
            value={`${window.location.origin}?ref=${referralCode}`}
            readOnly
            className="text-xs"
          />
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={copyReferralLink}
          >
            📋 Копировать ссылку
          </Button>
        </div>
        
        <p className="text-xs text-gray-600 text-center">
          За каждого друга +50 звёзд!
        </p>
      </CardContent>
    </Card>
  );
};

export default ReferralSystem;
