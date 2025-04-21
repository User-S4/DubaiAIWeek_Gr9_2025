import React from 'react';
import { Link } from 'react-router-dom';
import { usePodcast } from '../../context/PodcastContext';

interface SeriesCardProps {
  seriesName: string;
}

const seriesImages: Record<string, string> = {
  'Clean Energy Solutions': 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Blue Planet Initiatives': 'https://images.pexels.com/photos/1656579/pexels-photo-1656579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Green Infrastructure': 'https://images.pexels.com/photos/1198576/pexels-photo-1198576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Sustainable Food Systems': 'https://images.pexels.com/photos/2508603/pexels-photo-2508603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Zero Waste Future': 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Social Sustainability': 'https://images.pexels.com/photos/2990650/pexels-photo-2990650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  'Biodiversity Protection': 'https://images.pexels.com/photos/635352/pexels-photo-635352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
};

const seriesDescriptions: Record<string, string> = {
  'Clean Energy Solutions': 'Exploring innovations in renewable energy and sustainable power technologies.',
  'Blue Planet Initiatives': 'Diving into ocean conservation projects and marine ecosystem protection strategies.',
  'Green Infrastructure': 'Examining sustainable building practices and environmentally conscious urban design.',
  'Sustainable Food Systems': 'Investigating regenerative agriculture and food production methods that protect our planet.',
  'Zero Waste Future': 'Showcasing circular economy innovations and strategies to eliminate waste.',
  'Social Sustainability': 'Highlighting social justice aspects of environmental movements and equitable climate solutions.',
  'Biodiversity Protection': 'Focusing on wildlife conservation efforts and biodiversity preservation worldwide.',
};

const SeriesCard: React.FC<SeriesCardProps> = ({ seriesName }) => {
  const { getSeriesEpisodes } = usePodcast();
  const episodeCount = getSeriesEpisodes(seriesName).length;
  
  return (
    <Link to={`/episodes?series=${encodeURIComponent(seriesName)}`} className="group">
      <div className="relative h-60 rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <img
          src={seriesImages[seriesName] || 'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={seriesName}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold mb-1 group-hover:text-primary-300 transition-colors">
            {seriesName}
          </h3>
          
          <p className="text-white/80 text-sm mb-2 line-clamp-2">
            {seriesDescriptions[seriesName] || 'A collection of episodes on sustainable solutions and environmental innovations.'}
          </p>
          
          <span className="text-xs font-medium text-primary-300 bg-primary-900/50 py-1 px-2 rounded-full w-fit">
            {episodeCount} episode{episodeCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SeriesCard;