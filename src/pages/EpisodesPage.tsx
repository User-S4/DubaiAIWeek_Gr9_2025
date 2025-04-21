import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePodcast } from '../context/PodcastContext';
import EpisodeCard from '../components/episodes/EpisodeCard';
import { Search, Filter } from 'lucide-react';

const EpisodesPage = () => {
  const { episodes, getAllSeries } = usePodcast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEpisodes, setFilteredEpisodes] = useState(episodes);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get the series filter from URL params
  const seriesFilter = searchParams.get('series') || '';
  const allSeries = getAllSeries();

  useEffect(() => {
    let result = [...episodes];
    
    // Apply series filter
    if (seriesFilter) {
      result = result.filter(episode => episode.series === seriesFilter);
    }
    
    // Apply search filter
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        episode => 
          episode.title.toLowerCase().includes(lowerSearchTerm) ||
          episode.description.toLowerCase().includes(lowerSearchTerm) ||
          episode.series.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredEpisodes(result);
  }, [episodes, seriesFilter, searchTerm]);

  const handleSeriesFilterChange = (series: string) => {
    if (series === '') {
      searchParams.delete('series');
    } else {
      searchParams.set('series', series);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header and Filters */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            All Episodes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Explore our complete collection of sustainability conversations
          </p>
          
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="md:col-span-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search episodes..."
                  className="w-full px-4 py-3 pl-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="relative">
              <select
                className="w-full px-4 py-3 pl-10 appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                value={seriesFilter}
                onChange={(e) => handleSeriesFilterChange(e.target.value)}
              >
                <option value="">All Series</option>
                {allSeries.map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Episodes Grid */}
        {filteredEpisodes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No episodes found matching your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                handleSeriesFilterChange('');
              }}
              className="mt-4 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EpisodesPage;