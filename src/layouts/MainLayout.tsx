import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AudioPlayer from '../components/player/AudioPlayer';
import { usePodcast } from '../context/PodcastContext';

const MainLayout = () => {
  const { currentEpisode, isPlaying } = usePodcast();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {currentEpisode && (
        <AudioPlayer
          episode={currentEpisode}
          isPlaying={isPlaying}
        />
      )}
    </div>
  );
};

export default MainLayout;