import React, { useEffect, useRef, useState } from 'react';
import { usePodcast } from '../../context/PodcastContext';
import { Play, Pause, Volume2, Volume1, VolumeX, X, Maximize2 } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

interface AudioPlayerProps {
  episode: {
    id: string;
    title: string;
    imageUrl: string;
    audioUrl: string;
  };
  isPlaying: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ episode, isPlaying }) => {
  const { togglePlayPause } = usePodcast();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback failed:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, episode.audioUrl]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      if (audioRef.current.duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      setIsMuted(newMuteState);
      audioRef.current.volume = newMuteState ? 0 : volume;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleExpandPlayer = () => {
    setIsExpanded(!isExpanded);
  };

  // Small player shown at the bottom of the screen
  const compactPlayer = (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-30 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3 flex-1">
            <img 
              src={episode.imageUrl} 
              alt={episode.title} 
              className="h-12 w-12 object-cover rounded"
            />
            <div className="truncate">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{episode.title}</p>
              <div className="hidden sm:flex items-center space-x-2">
                <div className="relative w-32 sm:w-48 md:w-80 lg:w-96">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTime(currentTime)} / {duration ? formatTime(duration) : '0:00'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            
            <button
              onClick={toggleExpandPlayer}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
              aria-label="Expand player"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={episode.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => togglePlayPause()}
      />
    </div>
  );

  // Full-screen player with visualizer
  const expandedPlayer = (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleExpandPlayer}
          className="p-2 rounded-full bg-gray-800/60 text-white hover:bg-gray-700/60 transition-colors"
          aria-label="Close player"
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="relative flex-1 flex flex-col items-center justify-center p-6">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <AudioVisualizer isPlaying={isPlaying} />
        </div>
        
        <div className="z-10 max-w-md w-full bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <div className="flex flex-col items-center space-y-6">
            <img 
              src={episode.imageUrl} 
              alt={episode.title} 
              className="w-48 h-48 sm:w-64 sm:h-64 object-cover rounded-lg shadow-lg"
            />
            
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-1">{episode.title}</h2>
              <p className="text-gray-300 text-sm">EcoVoices Podcast</p>
            </div>
            
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-300">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="p-2 text-gray-300 hover:text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? (
                      <VolumeX size={18} />
                    ) : volume > 0.5 ? (
                      <Volume2 size={18} />
                    ) : (
                      <Volume1 size={18} />
                    )}
                  </button>
                  
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                  />
                </div>
                
                <button
                  onClick={togglePlayPause}
                  className="p-4 rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return isExpanded ? expandedPlayer : compactPlayer;
};

export default AudioPlayer;