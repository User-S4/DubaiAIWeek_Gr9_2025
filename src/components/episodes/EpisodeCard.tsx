import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Calendar, Clock } from 'lucide-react';
import { usePodcast } from '../../context/PodcastContext';

interface EpisodeCardProps {
  episode: {
    id: string;
    title: string;
    description: string;
    duration: string;
    date: string;
    imageUrl: string;
    audioUrl: string;
    series: string;
  };
  featured?: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, featured = false }) => {
  const { playEpisode, currentEpisode, isPlaying } = usePodcast();
  
  const isCurrentlyPlaying = 
    currentEpisode?.id === episode.id && isPlaying;

  const formattedDate = new Date(episode.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playEpisode(episode);
  };

  if (featured) {
    return (
      <div className="relative group overflow-hidden rounded-xl shadow-md bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-xl h-full">
        <div className="relative h-80 overflow-hidden">
          <img
            src={episode.imageUrl}
            alt={episode.title}
            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-6 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary-300 bg-primary-900/50 py-1 px-2 rounded-full">
                  {episode.series}
                </span>
                <div className="flex items-center text-xs text-white/80 space-x-3">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {episode.duration}
                  </span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 leading-tight">
                {episode.title}
              </h2>
              <p className="text-white/80 text-sm line-clamp-2 mb-4">
                {episode.description}
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayClick}
                  className="flex items-center justify-center space-x-2 py-2 px-4 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                  {isCurrentlyPlaying ? (
                    <>
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                      Playing
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      <span>Play Episode</span>
                    </>
                  )}
                </button>
                <Link
                  to={`/episodes/${episode.id}`}
                  className="text-white hover:text-primary-300 transition-colors text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      <div className="relative">
        <img
          src={episode.imageUrl}
          alt={episode.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handlePlayClick}
          className="absolute bottom-3 right-3 p-3 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg transition-colors"
          aria-label="Play episode"
        >
          {isCurrentlyPlaying ? (
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
            </span>
          ) : (
            <Play size={18} />
          )}
        </button>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 py-1 px-2 rounded-full">
            {episode.series}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          <Link to={`/episodes/${episode.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {episode.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-1">
          {episode.description}
        </p>
        
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3 mt-auto">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {formattedDate}
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {episode.duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;