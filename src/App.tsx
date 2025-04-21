import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import EpisodesPage from './pages/EpisodesPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage';
import SeriesPage from './pages/SeriesPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { PodcastProvider } from './context/PodcastContext';

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <PodcastProvider>
      <div className="min-h-screen transition-colors duration-300 ease-in-out">
        <button 
          onClick={toggleTheme}
          className="fixed z-50 bottom-4 right-4 p-3 rounded-full bg-primary-500 text-white shadow-lg hover:bg-primary-600 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
        
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="episodes" element={<EpisodesPage />} />
            <Route path="episodes/:id" element={<EpisodeDetailPage />} />
            <Route path="series" element={<SeriesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </PodcastProvider>
  );
}

export default App;