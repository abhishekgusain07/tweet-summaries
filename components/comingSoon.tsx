"use client";
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Sparkles, Construction } from 'lucide-react';

const ComingSoon = () => {
  const [bounce, setBounce] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[400px] w-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 bg-gradient-to-b from-pink-50 to-purple-50">
        <div className="relative">
          <Construction 
            className={`w-16 h-16 mx-auto text-purple-500 ${bounce ? 'animate-bounce' : ''}`}
          />
          <Sparkles 
            className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse"
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-700">
            Coming Soon!
          </h2>
          <p className="text-gray-600">
            We're working hard to bring you something amazing! 
            Stay tuned for exciting new features.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-purple-500">
          <Clock className="w-5 h-5 animate-spin-slow" />
          <span className="text-sm">Under Construction</span>
        </div>

        <div className="pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full animate-progress"
              style={{ width: '70%' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComingSoon;