import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { podcastData } from '../data/podcastData';

interface Episode {
  id: string;
  title: string;
  description: string;
  duration: string;
  date: string;
  imageUrl: string;
  audioUrl: string;
  series: string;
}

interface PodcastContextType {
  episodes: Episode[];
  currentEpisode: Episode | null;
  isPlaying: boolean;
  playEpisode: (episode: Episode) => void;
  pauseEpisode: () => void;
  togglePlayPause: () => void;
  getSeriesEpisodes: (seriesName: string) => Episode[];
  getAllSeries: () => string[];
}

const PodcastContext = createContext<PodcastContextType | undefined>(undefined);

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [episodes] = useState<Episode[]>(podcastData);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playEpisode = useCallback((episode: Episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(true);
  }, []);

  const pauseEpisode = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const getSeriesEpisodes = useCallback(
    (seriesName: string) => {
      return episodes.filter(episode => episode.series === seriesName);
    },
    [episodes]
  );

  const getAllSeries = useCallback(() => {
    const seriesSet = new Set<string>();
    episodes.forEach(episode => {
      seriesSet.add(episode.series);
    });
    return Array.from(seriesSet);
  }, [episodes]);

  const value = {
    episodes,
    currentEpisode,
    isPlaying,
    playEpisode,
    pauseEpisode,
    togglePlayPause,
    getSeriesEpisodes,
    getAllSeries,
  };

  return <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>;
}

export function usePodcast() {
  const context = useContext(PodcastContext);
  if (context === undefined) {
    throw new Error('usePodcast must be used within a PodcastProvider');
  }
  return context;
}