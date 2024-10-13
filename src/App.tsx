import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MainMenu from './components/MainMenu';
import Play from './components/Play';
import Practice from './components/Practice';
import Tournaments from './components/Tournaments';
import Leaderboards from './components/Leaderboards';
import LoadingPage from './components/LoadingPage';
import AuthModal from './components/AuthModal';
import GameHistory from './components/GameHistory';
import DepositOffers from './components/DepositOffers';
import DailyTasks from './components/DailyTasks';
import Certificates from './components/Certificates';
import FairPlay from './components/FairPlay';
import Settings from './components/Settings';
import About from './components/About';
import Wallet from './components/Wallet';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(['main']);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate 3 seconds of loading time

    return () => clearTimeout(timer);
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    setHistory(prev => [...prev.slice(0, currentHistoryIndex + 1), page]);
    setCurrentHistoryIndex(prev => prev + 1);
  };

  const goBack = () => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(prev => prev - 1);
      setCurrentPage(history[currentHistoryIndex - 1]);
    }
  };

  const goForward = () => {
    if (currentHistoryIndex < history.length - 1) {
      setCurrentHistoryIndex(prev => prev + 1);
      setCurrentPage(history[currentHistoryIndex + 1]);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'main':
        return <MainMenu setCurrentPage={navigateTo} />;
      case 'play':
        return <Play />;
      case 'practice':
        return <Practice />;
      case 'tournaments':
        return <Tournaments />;
      case 'leaderboards':
        return <Leaderboards />;
      case 'gameHistory':
        return <GameHistory />;
      case 'depositOffers':
        return <DepositOffers />;
      case 'dailyTasks':
        return <DailyTasks />;
      case 'certificates':
        return <Certificates />;
      case 'fairPlay':
        return <FairPlay />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      case 'wallet':
        return <Wallet />;
      default:
        return <MainMenu setCurrentPage={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        setCurrentPage={navigateTo} 
        openAuthModal={() => setIsAuthModalOpen(true)}
        canGoBack={currentHistoryIndex > 0}
        canGoForward={currentHistoryIndex < history.length - 1}
        onNavigateBack={goBack}
        onNavigateForward={goForward}
      />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Chessbet.org. All rights reserved.</p>
      </footer>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default App;