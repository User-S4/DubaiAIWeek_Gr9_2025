import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Play, ArrowLeft, Share2 } from 'lucide-react';
import { usePodcast } from '../context/PodcastContext';
import EpisodeCard from '../components/episodes/EpisodeCard';

const EpisodeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { episodes, playEpisode, currentEpisode, isPlaying } = usePodcast();
  const [episode, setEpisode] = useState(episodes.find(ep => ep.id === id));
  const [relatedEpisodes, setRelatedEpisodes] = useState<typeof episodes>([]);
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    // Find the current episode
    const foundEpisode = episodes.find(ep => ep.id === id);
    setEpisode(foundEpisode);
    
    // Find related episodes (same series)
    if (foundEpisode) {
      const related = episodes
        .filter(ep => ep.series === foundEpisode.series && ep.id !== foundEpisode.id)
        .slice(0, 3);
      setRelatedEpisodes(related);
    }
  }, [episodes, id]);
  
  if (!episode) {
    return (
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Episode Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            The episode you're looking for couldn't be found.
          </p>
          <Link 
            to="/episodes"
            className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Back to Episodes
          </Link>
        </div>
      </div>
    );
  }
  
  const formattedDate = new Date(episode.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const isCurrentlyPlaying = currentEpisode?.id === episode.id && isPlaying;
  
  const handlePlayClick = () => {
    playEpisode(episode);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Episode Hero */}
      <div className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900 pt-16 pb-20">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {/* Background pattern */}
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path 
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              strokeDasharray="10,10" 
              className="text-white"
            />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link 
            to="/episodes"
            className="inline-flex items-center text-primary-300 hover:text-primary-200 transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Episodes
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-600/30 text-primary-300 text-sm font-medium mb-4">
                {episode.series}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
                {episode.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-white/80 space-x-4 mb-6">
                <span className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  {formattedDate}
                </span>
                <span className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  {episode.duration}
                </span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePlayClick}
                  className="flex items-center space-x-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-full transition-colors shadow-md"
                >
                  {isCurrentlyPlaying ? (
                    <>
                      <span className="relative flex h-3 w-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                      Now Playing
                    </>
                  ) : (
                    <>
                      <Play size={18} className="mr-2" />
                      Play Episode
                    </>
                  )}
                </button>
                
                <button 
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full transition-colors"
                >
                  <Share2 size={18} />
                  <span className="hidden sm:inline">Share</span>
                </button>
                
                {copySuccess && (
                  <span className="text-primary-300 text-sm">
                    Link copied!
                  </span>
                )}
              </div>
            </div>
            
            <div className="hidden md:block">
              <img 
                src={episode.imageUrl} 
                alt={episode.title} 
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Episode Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Episode Summary
            </h2>
            
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              <p className="text-gray-600 dark:text-gray-300">
                {episode.description}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                In this thought-provoking episode, we delve deeper into the complexities of sustainable solutions and explore practical approaches that individuals, communities, and organizations can implement to drive meaningful change. Our conversation spans technological innovations, policy frameworks, and grassroots initiatives that are collectively shaping a more sustainable future.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 mt-4">
                The discussion highlights both the challenges and opportunities in transitioning to more sustainable practices, emphasizing the interconnected nature of environmental, social, and economic systems. Through real-world examples and expert insights, we provide listeners with actionable takeaways and inspiration for their own sustainability journeys.
              </p>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Discussion Points
              </h3>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  Current innovations and breakthroughs in the field
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  Challenges to widespread adoption and implementation
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  The role of policy and regulation in driving change
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  Community-based approaches and local initiatives
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  Practical steps listeners can take in their own lives
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-4">
                Additional Resources
              </h3>
              
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Research paper: "Sustainable Innovations in the 21st Century"
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Book recommendation: "The Future of Sustainability"
                  </a>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 mr-2"></span>
                  <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Interactive toolkit: Sustainable Solutions Guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              More from this Series
            </h3>
            
            <div className="space-y-6">
              {relatedEpisodes.length > 0 ? (
                relatedEpisodes.map(relatedEp => (
                  <div key={relatedEp.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
                    <Link 
                      to={`/episodes/${relatedEp.id}`}
                      className="flex items-start space-x-4"
                    >
                      <img 
                        src={relatedEp.imageUrl} 
                        alt={relatedEp.title} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                          {relatedEp.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {relatedEp.duration}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No related episodes found.
                </p>
              )}
              
              <Link 
                to={`/episodes?series=${encodeURIComponent(episode.series)}`}
                className="inline-block text-primary-600 dark:text-primary-400 font-medium hover:underline"
              >
                View all in this series
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetailPage;