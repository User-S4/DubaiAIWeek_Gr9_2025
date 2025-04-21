import React from 'react';
import { usePodcast } from '../context/PodcastContext';
import SeriesCard from '../components/series/SeriesCard';

const SeriesPage = () => {
  const { getAllSeries } = usePodcast();
  const allSeries = getAllSeries();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Podcast Series
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our thematic collections of episodes covering different aspects of global sustainability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allSeries.map((seriesName) => (
            <SeriesCard key={seriesName} seriesName={seriesName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesPage;