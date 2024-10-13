import React, { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';

const LoadingPage: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex flex-col items-center justify-center text-white">
      <div className="text-center mb-12">
        <Crown size={80} className="text-yellow-400 mx-auto mb-6 animate-pulse" />
        <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Chessbet.org
        </h1>
        <p className="text-2xl text-gray-300 italic">Where Strategy Meets Fortune</p>
      </div>
      <div className="w-80 bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-lg text-gray-300">Loading game servers...</p>
      <p className="text-3xl font-bold mt-2">{progress}%</p>
    </div>
  );
};

export default LoadingPage;