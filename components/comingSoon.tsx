"use client";
import React from 'react';
import { Card } from '@/components/ui/card';
import { Clock, Sparkles, Construction, Stars } from 'lucide-react';

const ComingSoon = ({width}:{
    width?: string
}) => {
  const [bounce, setBounce] = React.useState(false);
  const customWidth = width ? width : '70';
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[400px] w-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 bg-gradient-to-b from-pink-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 dark:border-purple-800/30">
        <div className="relative">
          <Construction 
            className={`w-16 h-16 mx-auto text-purple-500 dark:text-purple-400 ${bounce ? 'animate-float' : ''}`}
          />
          <Sparkles 
            className="w-6 h-6 text-yellow-400 dark:text-yellow-300 absolute -top-2 -right-2 animate-pulse"
          />
          <div className="absolute -left-2 top-2 animate-pulse delay-300">
            <Stars className="w-5 h-5 text-blue-400 dark:text-blue-300" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
            Coming Soon!
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're working hard to bring you something amazing! 
            Stay tuned for exciting new features.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-2 text-purple-500 dark:text-purple-400">
          <Clock className="w-5 h-5 animate-spin-slow" />
          <span className="text-sm">Under Construction</span>
        </div>

        <div className="pt-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-purple-500 dark:bg-purple-400 h-2 rounded-full animate-progress relative overflow-hidden"
              style={{ width: `${customWidth}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-center space-x-1">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-purple-300 dark:bg-purple-700 animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ComingSoon;