'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Heart,
  Plus,
  MoreHorizontal,
  SkipBack,
  SkipForward,
} from 'lucide-react';

export interface Song {
  title: string;
  artists: string;
  duration: number;
  albumArt: string;
  audioSrc: string;
  poster: string;
}

interface SpotifyCardProps {
  songs?: Song[];
  onSongChange?: (index: number) => void;
}

export const defaultSongs: Song[] = [
  {
    title: 'Perfect',
    artists: 'Ed Sheeran',
    duration: 263,
    albumArt: '/screenshots/audio_perfect.jpg',
    audioSrc: '/sounds/Perfect_Trim.mp3',
    poster: '/images/perfect_img.png',
  },
  {
    title: 'Saptasagar',
    artists: 'For Shreya',
    duration: 240,
    albumArt: '/screenshots/audio_saptasagar.png',
    audioSrc: '/sounds/Saptasa_Trim.mp3',
    poster: '/images/Saptaa.png',
  },
];

export function SpotifyCard({ songs = defaultSongs, onSongChange }: SpotifyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [isDraggingProgress, setIsDraggingProgress] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [audioDuration, setAudioDuration] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const cardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const currentSong = songs[currentSongIndex];
  const songDuration = audioDuration || currentSong.duration;
  const currentTime = (animationProgress / 100) * songDuration;

  useEffect(() => {
    onSongChange?.(currentSongIndex);
  }, [currentSongIndex, onSongChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setAnimationProgress(0);
    setAudioDuration(null);
    audio.currentTime = 0;
    audio.load();

    const handleLoadedMetadata = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setAudioDuration(audio.duration);
      }
    };

    const updateProgress = () => {
      if (!audio.duration || !Number.isFinite(audio.duration)) return;
      setAnimationProgress((audio.currentTime / audio.duration) * 100);
    };

    const handleEnded = () => {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, songs.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    }
  }, [currentSongIndex, isPlaying]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target as Node)
      ) {
        setShowContextMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePlay = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const handlePreviousSong = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(newIndex);
    setAnimationProgress(0);
    setIsPlaying(true);
  };

  const handleNextSong = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(newIndex);
    setAnimationProgress(0);
    setIsPlaying(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleVolumeChange = (e: MouseEvent | React.MouseEvent) => {
    if (!volumeBarRef.current) return;
    const rect = volumeBarRef.current.getBoundingClientRect();
    let newVolume = ((e.clientX - rect.left) / rect.width) * 100;
    newVolume = Math.max(0, Math.min(100, newVolume));
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      audioRef.current.muted = newVolume === 0;
    }
  };

  const handleVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingVolume(true);
    handleVolumeChange(e);
    const onMove = (ev: MouseEvent) => handleVolumeChange(ev);
    const onUp = () => {
      setIsDraggingVolume(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const handleProgressChange = (e: MouseEvent | React.MouseEvent) => {
    if (!progressBarRef.current || !audioRef.current) return;
    const audio = audioRef.current;
    if (!audio.duration || !Number.isFinite(audio.duration)) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    audio.currentTime = percent * audio.duration;
    setAnimationProgress(percent * 100);
  };

  const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDraggingProgress(true);
    handleProgressChange(e);
    const onMove = (ev: MouseEvent) => handleProgressChange(ev);
    const onUp = () => {
      setIsDraggingProgress(false);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) audioRef.current.muted = nextMuted;
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || !Number.isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu(true);
  };

  return (
    <div
      ref={cardRef}
      className="w-full rounded-xl overflow-hidden relative cursor-pointer group"
      style={{
        background:
          'radial-gradient(25% 40% at 50% 30%, rgba(147, 51, 234, 0.18), rgba(20, 8, 35, 0.98))',
        boxShadow:
          '0px 1px 0px 0px rgba(255,255,255,0.08) inset, 0px 0px 25px 5px rgba(168,85,247,0.08), 0px 0px 40px 20px rgba(168,85,247,0.04), 0 0 0 1px rgba(255,255,255,0.05) inset, 0 10px 30px -5px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowContextMenu(false); }}
      onMouseMove={handleMouseMove}
      onContextMenu={handleContextMenu}
    >
      <audio ref={audioRef} src={currentSong.audioSrc} preload="metadata" />

      <div
        className="absolute w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(168,85,247,0.16) 0%, transparent 60%)`,
          filter: 'blur(25px)',
        }}
      />

      <div className="p-5 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div
              className="w-14 h-14 rounded-xl mr-3 flex items-center justify-center overflow-hidden bg-black/90 relative"
              style={{
                boxShadow: isHovered ? '0 0 15px rgba(168,85,247,0.35)' : 'none',
                transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              <img
                src={currentSong.albumArt}
                alt={currentSong.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="text-white font-medium text-lg transition-all duration-300"
              style={{ textShadow: isHovered ? '0 0 8px rgba(255,255,255,0.4)' : 'none' }}
            >
              GaaGa Radio
              <div className="text-xs font-normal opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                Two little songs, one soft memory
              </div>
            </div>
          </div>

          <button
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
              isHovered ? 'bg-purple-400 text-black shadow-lg' : 'bg-black/20 text-white/80'
            }`}
            type="button"
            aria-label="View details"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="text-gray-200 text-sm mb-4 transition-all duration-500 font-light tracking-wide">
          I dedicate the song for you, Gaaga. 
        </p>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-5 mx-2 rounded-full" />
      </div>

      <div
        className="relative w-48 h-48 sm:w-52 sm:h-52 lg:w-56 lg:h-56 mx-auto rounded-xl overflow-hidden"
        style={{
          boxShadow: isHovered
            ? '0 15px 30px -10px rgba(0,0,0,0.4), 0 0 10px rgba(168,85,247,0.25)'
            : '0 5px 15px -5px rgba(0,0,0,0.2)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <img
          src={currentSong.albumArt}
          alt={currentSong.title}
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            transform: isHovered ? 'scale(1.02)' : 'scale(1)',
            filter: isHovered ? 'brightness(1.05) contrast(1.02)' : 'brightness(1)',
          }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/70 flex items-center justify-center transition-all duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-purple-300"
            style={{
              boxShadow: '0 0 20px rgba(168,85,247,0.55)',
              transform: `scale(${isHovered ? 1 : 0})`,
              opacity: isHovered ? 1 : 0,
            }}
          >
            {isPlaying ? (
              <Pause size={20} className="text-black" />
            ) : (
              <Play size={20} className="text-black ml-1" />
            )}
          </button>

          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/60"
              onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            >
              <Heart size={14} fill={isLiked ? '#c084fc' : 'none'} stroke={isLiked ? '#c084fc' : 'white'} />
            </button>

            <button className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/60">
              <Plus size={14} className="text-white" />
            </button>

            <button
              className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-black/60"
              onClick={(e) => { e.stopPropagation(); setShowContextMenu(!showContextMenu); }}
            >
              <MoreHorizontal size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {showContextMenu && (
        <div
          ref={contextMenuRef}
          className="absolute right-6 bottom-32 bg-purple-950/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden border border-white/10 z-30 w-[200px]"
        >
          <div className="py-1.5">
            <button className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-purple-800/50 transition-all duration-200 flex items-center gap-3">
              <Heart size={15} className="text-purple-300" />
              {isLiked ? 'Remove from Liked' : 'Add to Liked'}
            </button>
            <button className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-purple-800/50 transition-all duration-200 flex items-center gap-3">
              <Plus size={15} className="text-purple-300" />
              Add to playlist
            </button>
            <div className="h-px bg-purple-500/10 my-1" />
            <button
              onClick={handleNextSong}
              className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-purple-800/50 transition-all duration-200 flex items-center gap-3"
            >
              <SkipForward size={15} className="text-purple-300" />
              Next song
            </button>
            <button
              onClick={handlePreviousSong}
              className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-purple-800/50 transition-all duration-200 flex items-center gap-3"
            >
              <SkipBack size={15} className="text-purple-300" />
              Previous song
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-1 mt-3 mb-6 h-7 items-end transition-all duration-300">
        {isPlaying &&
          [1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-1 bg-purple-400 rounded-full"
              style={{
                opacity: 0.8,
                animation: `gaaga-wave${i} 1.${i}s ease-in-out infinite`,
                filter: 'drop-shadow(0 0 2px rgba(168,85,247,0.7))',
              }}
            />
          ))}
      </div>

      <div className="bg-black/95 backdrop-blur-md p-4 transition-all duration-500 border-t border-white/5 overflow-hidden rounded-b-xl">
        <div
          ref={progressBarRef}
          className="w-full h-1.5 bg-white/10 rounded-full cursor-pointer relative mb-3 overflow-hidden"
          onMouseDown={handleProgressMouseDown}
        >
          <div
            className="h-full rounded-full transition-all duration-150"
            style={{
              width: `${animationProgress}%`,
              background: 'linear-gradient(90deg, rgba(192,132,252,0.8), rgba(236,72,153,1))',
              boxShadow: '0 0 6px rgba(168,85,247,0.5)',
            }}
          />
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="text-white flex-1 min-w-0 mr-3">
            <div className="font-medium text-xs group-hover:text-purple-300 transition-colors duration-500 truncate">
              {currentSong.title}
            </div>
            <div className="text-gray-400 text-xs mt-0.5 truncate">{currentSong.artists}</div>
          </div>
          <div className="text-xs text-gray-400 tabular-nums">
            {formatTime(currentTime)} / {formatTime(songDuration)}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
              onClick={handlePreviousSong}
            >
              <SkipBack size={14} className="text-white" />
            </button>

            <button
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-md"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause size={17} className="text-black" />
              ) : (
                <Play size={17} className="text-black ml-0.5" />
              )}
            </button>

            <button
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
              onClick={handleNextSong}
            >
              <SkipForward size={15} className="text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
              onClick={toggleMute}
            >
              <Volume2
                size={16}
                className="text-gray-400"
                style={{ opacity: isMuted || volume === 0 ? 0.5 : 1 }}
              />
            </button>

            <div
              ref={volumeBarRef}
              className="w-20 h-1.5 bg-white/20 rounded-full cursor-pointer relative group/volume hover:bg-white/30 transition-colors duration-200"
              onMouseDown={handleVolumeMouseDown}
            >
              <div
                className="h-full bg-white rounded-full group-hover/volume:bg-purple-400 transition-colors duration-300"
                style={{ width: `${isMuted ? 0 : volume}%` }}
              />
              <div
                className="absolute top-1/2 w-3 h-3 rounded-full bg-white -mt-1.5 transition-all duration-200"
                style={{
                  left: `${isMuted ? 0 : volume}%`,
                  transform: `translateX(-50%) scale(${isHovered || isDraggingVolume ? 1 : 0})`,
                  opacity: isHovered || isDraggingVolume ? 1 : 0,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-0.5 w-full absolute bottom-0 transition-all duration-500"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.7), transparent)',
          opacity: isHovered ? 1 : 0,
          filter: 'blur(1px)',
        }}
      />

      <style jsx global>{`
        @keyframes gaaga-wave1 { 0%, 100% { height: 4px; } 50% { height: 16px; } }
        @keyframes gaaga-wave2 { 0%, 100% { height: 5px; } 50% { height: 12px; } }
        @keyframes gaaga-wave3 { 0%, 100% { height: 7px; } 50% { height: 18px; } }
        @keyframes gaaga-wave4 { 0%, 100% { height: 5px; } 50% { height: 14px; } }
        @keyframes gaaga-wave5 { 0%, 100% { height: 3px; } 50% { height: 13px; } }
      `}</style>
    </div>
  );
}
