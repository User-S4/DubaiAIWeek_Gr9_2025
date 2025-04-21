import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, ArrowRight } from 'lucide-react';
import { usePodcast } from '../context/PodcastContext';
import EpisodeCard from '../components/episodes/EpisodeCard';

const HomePage = () => {
  const { episodes, getAllSeries } = usePodcast();
  const [latestEpisodes, setLatestEpisodes] = useState(episodes.slice(0, 4));
  const allSeries = getAllSeries();

  // Sort episodes by date (newest first)
  useEffect(() => {
    const sortedEpisodes = [...episodes].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    setLatestEpisodes(sortedEpisodes.slice(0, 4));
  }, [episodes]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              strokeDasharray="10,10" 
              className="text-white"
            />
            {[...Array(10)].map((_, i) => (
              <line 
                key={i} 
                x1="0" 
                y1={i * 10} 
                x2="100" 
                y2={i * 10} 
                stroke="currentColor" 
                strokeWidth="0.2" 
                className="text-white"
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <line 
                key={i} 
                x1={i * 10} 
                y1="0" 
                x2={i * 10} 
                y2="100" 
                stroke="currentColor" 
                strokeWidth="0.2" 
                className="text-white"
              />
            ))}
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-white/10 p-3">
                <Leaf className="h-10 w-10 text-primary-300" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-6 leading-tight">
              Amplifying <span className="text-primary-300">Sustainable</span> Voices
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Join us as we explore innovative solutions to our planet's greatest challenges through inspiring conversations with leading thinkers and changemakers.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/episodes"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-colors shadow-md"
              >
                Browse Episodes
              </Link>
              <Link 
                to="/about"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors"
              >
                About TheFifthElement
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Latest Episodes */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Latest Episodes
            </h2>
            <Link 
              to="/episodes"
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <span className="mr-2">View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Featured Episode
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {(() => {
              const featured = episodes.find(e => e.title === 'The Green Future; Sun Tech');
              return featured ? (
                <EpisodeCard episode={featured} featured={true} />
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">Featured episode not found.</div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Series Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
              Explore Series
            </h2>
            <Link 
              to="/series"
              className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              <span className="mr-2">View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allSeries.slice(0, 3).map((series) => (
              <div key={series} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Link 
                  to={`/episodes?series=${encodeURIComponent(series)}`}
                  className="block h-full"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{series}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {episodes.filter(ep => ep.series === series).length} episodes
                    </p>
                    <span className="text-primary-600 dark:text-primary-400 flex items-center">
                      Browse Series
                      <ArrowRight size={16} className="ml-2" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-800 dark:bg-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Stay Updated</h2>
            <p className="text-white/80 mb-8">
              Subscribe to our newsletter to receive the latest episodes and sustainability insights directly in your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 bg-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow text-white placeholder:text-white/60"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 rounded-full font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;