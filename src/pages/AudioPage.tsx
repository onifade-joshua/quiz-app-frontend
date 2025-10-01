import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, BookOpen, X } from "lucide-react"

// Types
interface AudioExplanation {
  id: number
  title: string
  subject: string
  instructor: string
  duration: string
  difficulty: string
  rating: number
  plays: number
  description: string
  thumbnail: string
  isNew?: boolean
  isPopular?: boolean
  tags: string[]
  audioUrl: string
}

interface MobilePlayerProps {
  currentAudio: AudioExplanation
  isPlaying: boolean
  currentTime: number
  duration: number
  handlePlayPause: () => void
  handleTimeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  nextTrack: () => void
  previousTrack: () => void
  setShowPlayer: React.Dispatch<React.SetStateAction<boolean>>
  formatTime: (time: number) => string
}

interface DesktopPlayerProps {
  currentAudio: AudioExplanation
  isPlaying: boolean
  currentTime: number
  duration: number
  handlePlayPause: () => void
  handleTimeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  nextTrack: () => void
  previousTrack: () => void
  formatTime: (time: number) => string
}

// Main component
export default function AudioExplanationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)

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
      description: "Deep dive into organic reaction mechanisms with step-by-step explanations",
      thumbnail: "chemistry",
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
      description: "Master various integration techniques with practical examples",
      thumbnail: "mathematics",
      isPopular: true,
      tags: ["Calculus", "Integration", "Problem Solving"],
      audioUrl: "/audio/calculus.mp3",
    },
  ]

  const currentAudio = audioExplanations[currentTrack]

  // Load new track
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentAudio.audioUrl
      audioRef.current.load()
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }, [currentTrack])

  // Play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.play()
      else audioRef.current.pause()
    }
  }, [isPlaying])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => setIsPlaying(!isPlaying)
  const handleTimeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) audioRef.current.currentTime = newTime
  }

  const nextTrack = () => setCurrentTrack((prev) => (prev + 1) % audioExplanations.length)
  const previousTrack = () => setCurrentTrack((prev) => (prev - 1 + audioExplanations.length) % audioExplanations.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />

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
      />

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
        />
      )}
    </div>
  )
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
}: DesktopPlayerProps) {
  return (
    <div className="w-full p-4 rounded-xl bg-white border shadow-sm flex flex-col sm:flex-row gap-3 sm:gap-6 items-center">
      <BookOpen className="w-10 h-10 text-purple-600" />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-slate-900 truncate">{currentAudio.title}</h3>
        <p className="text-slate-600 text-sm">{currentAudio.instructor}</p>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button onClick={previousTrack}><SkipBack /></button>
        <button onClick={handlePlayPause} className="p-2 bg-purple-600 rounded-full text-white">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={nextTrack}><SkipForward /></button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleTimeUpdate}
          className="w-full sm:w-40"
        />
        <span className="text-xs">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </div>
  )
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
  formatTime
}: MobilePlayerProps) {
  return (
    <div className="p-4 bg-white border-t rounded-t-xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium truncate">{currentAudio.title}</h3>
        <button onClick={() => setShowPlayer(false)}><X /></button>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button onClick={previousTrack}><SkipBack /></button>
        <button onClick={handlePlayPause} className="p-3 bg-purple-600 rounded-full text-white">
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={nextTrack}><SkipForward /></button>
      </div>
      <div className="mt-2 flex flex-col">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleTimeUpdate}
          className="w-full"
        />
        <span className="text-xs text-center">{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>
    </div>
  )
}
