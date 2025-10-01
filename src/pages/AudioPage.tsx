import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  // BookOpen,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";

// Types
interface AudioExplanation {
  id: number;
  title: string;
  subject: string;
  instructor: string;
  duration: string;
  difficulty: string;
  rating: number;
  plays: number;
  description: string;
  thumbnail: string;
  isNew?: boolean;
  isPopular?: boolean;
  tags: string[];
  audioUrl: string;
}

interface MobilePlayerProps {
  currentAudio: AudioExplanation;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  handlePlayPause: () => void;
  handleTimeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  formatTime: (time: number) => string;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface DesktopPlayerProps {
  currentAudio: AudioExplanation;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  handlePlayPause: () => void;
  handleTimeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  formatTime: (time: number) => string;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AudioExplanationPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mock audio data
  const audioExplanations: AudioExplanation[] = [
    {
      id: 1,
      title: "Organic Chemistry: Reaction Mechanisms",
      subject: "Chemistry",
      instructor: "Dr. Sarah Johnson",
      duration: "15:42",
      difficulty: "Advanced",
      rating: 4.8,
      plays: 1200,
      description:
        "Deep dive into organic reaction mechanisms with step-by-step explanations",
      thumbnail: "/thumbnails/chemistry.png",
      isNew: true,
      tags: ["Organic Chemistry", "Mechanisms", "Advanced"],
      audioUrl: "/audio/chemistry.mp3",
    },
    {
      id: 2,
      title: "Calculus: Integration Techniques",
      subject: "Mathematics",
      instructor: "Prof. Michael Chen",
      duration: "22:15",
      difficulty: "Intermediate",
      rating: 4.9,
      plays: 2800,
      description:
        "Master various integration techniques with practical examples",
      thumbnail: "/thumbnails/mathematics.png",
      isPopular: true,
      tags: ["Calculus", "Integration", "Problem Solving"],
      audioUrl: "/audio/calculus.mp3",
    },
  ];

  const currentAudio = audioExplanations[currentTrack];

  // Load new track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentAudio.audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentTrack]);

  // Play/pause and volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
      if (isPlaying) audioRef.current.play();
      else audioRef.current.pause();
    }
  }, [isPlaying, volume, isMuted]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  const handleTimeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const nextTrack = () =>
    setCurrentTrack((prev) => (prev + 1) % audioExplanations.length);
  const previousTrack = () =>
    setCurrentTrack(
      (prev) => (prev - 1 + audioExplanations.length) % audioExplanations.length
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 p-4">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />

      {/* Track list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {audioExplanations.map((audio, idx) => (
          <div
            key={audio.id}
            className={`p-4 rounded-xl shadow-md border flex flex-col gap-2 cursor-pointer transform transition hover:scale-105 ${
              idx === currentTrack ? "border-purple-600 bg-purple-50" : "bg-white"
            }`}
            onClick={() => setCurrentTrack(idx)}
          >
            <img
              src={audio.thumbnail}
              alt={audio.title}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="font-semibold text-slate-900 truncate">{audio.title}</h3>
            <p className="text-sm text-slate-600">{audio.instructor}</p>
            <div className="flex items-center gap-2 mt-1">
              {audio.isNew && (
                <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              {audio.isPopular && (
                <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
                  POPULAR
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop player */}
      <div className="hidden md:block">
        <DesktopPlayer
          currentAudio={currentAudio}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          handlePlayPause={handlePlayPause}
          handleTimeUpdate={handleTimeUpdate}
          nextTrack={nextTrack}
          previousTrack={previousTrack}
          formatTime={formatTime}
          isMuted={isMuted}
          toggleMute={toggleMute}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
      </div>

      {/* Mobile player */}
      {showPlayer && (
        <MobilePlayer
          currentAudio={currentAudio}
          isPlaying={isPlaying}
          currentTime={currentTime}
          duration={duration}
          handlePlayPause={handlePlayPause}
          handleTimeUpdate={handleTimeUpdate}
          nextTrack={nextTrack}
          previousTrack={previousTrack}
          setShowPlayer={setShowPlayer}
          formatTime={formatTime}
          isMuted={isMuted}
          toggleMute={toggleMute}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
        />
      )}

      {/* Mobile sticky button to show player */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <button
          className="p-3 bg-purple-600 text-white rounded-full shadow-lg"
          onClick={() => setShowPlayer(true)}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
    </div>
  );
}

// Desktop Player
function DesktopPlayer({
  currentAudio,
  isPlaying,
  currentTime,
  duration,
  formatTime,
  handlePlayPause,
  handleTimeUpdate,
  nextTrack,
  previousTrack,
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange,
}: DesktopPlayerProps) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg border flex flex-col sm:flex-row items-center gap-4">
      <img
        src={currentAudio.thumbnail}
        alt={currentAudio.title}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <h3 className="font-semibold text-slate-900 truncate">{currentAudio.title}</h3>
        <p className="text-sm text-slate-600 truncate">{currentAudio.instructor}</p>
        <div className="flex items-center gap-2 mt-1">
          {currentAudio.isNew && (
            <span className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded-full">
              NEW
            </span>
          )}
          {currentAudio.isPopular && (
            <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
              POPULAR
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <button onClick={previousTrack}>
            <SkipBack />
          </button>
          <button
            onClick={handlePlayPause}
            className="p-2 bg-purple-600 rounded-full text-white"
          >
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={nextTrack}>
            <SkipForward />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleTimeUpdate}
            className="w-full sm:w-40"
          />
          <span className="text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <button onClick={toggleMute}>{isMuted ? <VolumeX /> : <Volume2 />}</button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}

// Mobile Player
function MobilePlayer({
  currentAudio,
  isPlaying,
  handlePlayPause,
  currentTime,
  duration,
  handleTimeUpdate,
  nextTrack,
  previousTrack,
  setShowPlayer,
  formatTime,
  isMuted,
  toggleMute,
  volume,
  handleVolumeChange,
}: MobilePlayerProps) {
  return (
    <div className="p-4 bg-white border-t rounded-t-xl shadow-lg fixed bottom-0 left-0 w-full z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium truncate">{currentAudio.title}</h3>
        <button onClick={() => setShowPlayer(false)}>
          <X />
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 mb-2">
        <button onClick={previousTrack}>
          <SkipBack />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-3 bg-purple-600 rounded-full text-white"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={nextTrack}>
          <SkipForward />
        </button>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <button onClick={toggleMute}>{isMuted ? <VolumeX /> : <Volume2 />}</button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="flex-1"
        />
      </div>
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleTimeUpdate}
        className="w-full mb-1"
      />
      <span className="text-xs text-center block">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </div>
  );
}
