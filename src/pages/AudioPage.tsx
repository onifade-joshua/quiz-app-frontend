import { useState } from "react"
import { motion } from "framer-motion"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Download,
  Share2,
  BookOpen,
  Clock,
  Star,
  Filter,
  Search,
  Headphones,
  ArrowLeft,
  Heart,
  MoreHorizontal,
  Shuffle,
  Repeat,
  List,
  Grid3X3,
  ChevronDown,
  TrendingUp,
  Award,
  Menu,
  X,
} from "lucide-react"

// import { Navbar } from "../components/common/Navbar"

// Simple Navbar component for demo purposes
// const Navbar = () => {
//   return (
//     <nav className="bg-white border-b border-slate-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <span className="text-xl font-bold text-purple-600">EduAudio</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="text-slate-600 hover:text-slate-900">Profile</button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

// TypeScript interfaces for component props
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
}

interface MobilePlayerProps {
  currentAudio: AudioExplanation
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  formatTime: (time: number) => string
  handlePlayPause: () => void
  handleTimeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleMute: () => void
  nextTrack: () => void
  previousTrack: () => void
  setShowPlayer: (show: boolean) => void
}

interface DesktopPlayerProps {
  currentAudio: AudioExplanation
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  formatTime: (time: number) => string
  handlePlayPause: () => void
  handleTimeUpdate: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  toggleMute: () => void
  nextTrack: () => void
  previousTrack: () => void
}

export default function AudioExplanationPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration] = useState(300) // 5 minutes default
  const [volume, setVolume] = useState(70)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [showPlayer, setShowPlayer] = useState(false)

  // Mock audio data
  const audioExplanations = [
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
      tags: ["Organic Chemistry", "Mechanisms", "Advanced"]
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
      tags: ["Calculus", "Integration", "Problem Solving"]
    },
    {
      id: 3,
      title: "Physics: Quantum Mechanics Basics",
      subject: "Physics",
      instructor: "Dr. Emily Rodriguez",
      duration: "28:33",
      difficulty: "Advanced",
      rating: 4.7,
      plays: 950,
      description: "Introduction to quantum mechanics principles and applications",
      thumbnail: "physics",
      tags: ["Quantum", "Physics", "Theory"]
    },
    {
      id: 4,
      title: "Biology: Cell Structure and Function",
      subject: "Biology",
      instructor: "Dr. James Wilson",
      duration: "18:20",
      difficulty: "Beginner",
      rating: 4.6,
      plays: 3200,
      description: "Comprehensive overview of cellular biology and organelles",
      thumbnail: "biology",
      tags: ["Cell Biology", "Structure", "Function"]
    },
    {
      id: 5,
      title: "Economics: Market Dynamics",
      subject: "Economics",
      instructor: "Prof. Lisa Thompson",
      duration: "25:10",
      difficulty: "Intermediate",
      rating: 4.5,
      plays: 1800,
      description: "Understanding supply and demand in modern markets",
      thumbnail: "economics",
      tags: ["Market", "Supply", "Demand"]
    },
    {
      id: 6,
      title: "History: World War II Analysis",
      subject: "History",
      instructor: "Dr. Robert Brown",
      duration: "35:45",
      difficulty: "Intermediate",
      rating: 4.8,
      plays: 2100,
      description: "Historical analysis of major WWII events and their impact",
      thumbnail: "history",
      tags: ["World War", "History", "Analysis"]
    }
  ]

  const subjects = ["All", "Chemistry", "Mathematics", "Physics", "Biology", "Economics", "History"]
  const sortOptions = ["Most Recent", "Most Popular", "Highest Rated", "Duration"]

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const playTrack = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)
    setCurrentTime(0)
    setShowPlayer(true)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % audioExplanations.length)
  }

  const previousTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + audioExplanations.length) % audioExplanations.length)
  }

  const filteredExplanations = audioExplanations.filter(explanation => {
    const matchesSearch = explanation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         explanation.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         explanation.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = filter === "all" || 
                         filter === explanation.subject.toLowerCase() ||
                         filter === explanation.difficulty.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  const currentAudio = audioExplanations[currentTrack]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
   
      
      {/* Header */}
      <motion.div
        className="bg-white border-b border-slate-200 sticky top-0 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <button className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2 sm:gap-3">
                <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                <span className="truncate">Audio Explanations</span>
              </h1>
              <p className="text-slate-600 mt-1 text-xs sm:text-sm hidden sm:block">
                Listen to expert explanations and enhance your understanding
              </p>
            </div>
            <button 
              className="lg:hidden p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3 h-3 sm:w-4 sm:h-4" />
                <input
                  type="text"
                  placeholder="Search audio explanations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-slate-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
              
              <div className="flex items-center gap-2 justify-between sm:justify-start">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm sm:text-base"
                >
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4" />
                  Filters
                  <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="flex items-center border border-slate-200 rounded-lg sm:rounded-xl">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 sm:p-2 ${viewMode === "grid" ? "bg-purple-100 text-purple-600" : "text-slate-600 hover:bg-slate-50"} transition-colors`}
                  >
                    <Grid3X3 className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 sm:p-2 ${viewMode === "list" ? "bg-purple-100 text-purple-600" : "text-slate-600 hover:bg-slate-50"} transition-colors`}
                  >
                    <List className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>

                <select className="px-2 sm:px-3 py-1.5 sm:py-2 border border-slate-200 rounded-lg sm:rounded-xl bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Pills */}
            {showFilters && (
              <motion.div
                className="flex flex-wrap gap-1 sm:gap-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <span className="text-xs sm:text-sm text-slate-600 font-medium py-1">Subject:</span>
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => setFilter(subject === "All" ? "all" : subject.toLowerCase())}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      filter === (subject === "All" ? "all" : subject.toLowerCase())
                        ? "bg-purple-100 text-purple-700"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowSidebar(false)}>
          <motion.div
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Menu</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-32">
              <SidebarContent />
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 pb-32 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Desktop Player */}
            <motion.div
              className="hidden lg:block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <DesktopPlayer 
                currentAudio={currentAudio}
                isPlaying={isPlaying}
                currentTime={currentTime}
                duration={duration}
                volume={volume}
                isMuted={isMuted}
                formatTime={formatTime}
                handlePlayPause={handlePlayPause}
                handleTimeUpdate={handleTimeUpdate}
                handleVolumeChange={handleVolumeChange}
                toggleMute={toggleMute}
                nextTrack={nextTrack}
                previousTrack={previousTrack}
              />
            </motion.div>

            {/* Audio Library */}
            <motion.div
              className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="p-3 sm:p-4 lg:p-6 border-b border-slate-100">
                <h2 className="text-base sm:text-lg font-semibold text-slate-900">Audio Library</h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  {filteredExplanations.length} explanations available
                </p>
              </div>

              <div className="p-3 sm:p-4 lg:p-6">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {filteredExplanations.map((audio, index) => (
                      <motion.div
                        key={audio.id}
                        className={`border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer ${
                          currentTrack === index
                            ? "border-purple-200 bg-purple-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        onClick={() => playTrack(index)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            audio.subject === "Chemistry" ? "bg-blue-100" :
                            audio.subject === "Mathematics" ? "bg-green-100" :
                            audio.subject === "Physics" ? "bg-purple-100" :
                            audio.subject === "Biology" ? "bg-red-100" :
                            audio.subject === "Economics" ? "bg-yellow-100" :
                            "bg-indigo-100"
                          }`}>
                            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-1">
                              <h3 className="font-medium text-slate-900 text-xs sm:text-sm leading-tight">
                                {audio.title}
                              </h3>
                              <div className="flex gap-1 flex-shrink-0">
                                {audio.isNew && (
                                  <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                                {audio.isPopular && (
                                  <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                                    Popular
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-slate-600 text-xs mt-1">{audio.instructor}</p>
                            <div className="flex items-center gap-2 sm:gap-3 mt-2">
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {audio.duration}
                              </span>
                              <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500" />
                                {audio.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {filteredExplanations.map((audio, index) => (
                      <motion.div
                        key={audio.id}
                        className={`flex items-center gap-2 sm:gap-3 lg:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border hover:shadow-md transition-all cursor-pointer ${
                          currentTrack === index
                            ? "border-purple-200 bg-purple-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        onClick={() => playTrack(index)}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          audio.subject === "Chemistry" ? "bg-blue-100" :
                          audio.subject === "Mathematics" ? "bg-green-100" :
                          audio.subject === "Physics" ? "bg-purple-100" :
                          audio.subject === "Biology" ? "bg-red-100" :
                          audio.subject === "Economics" ? "bg-yellow-100" :
                          "bg-indigo-100"
                        }`}>
                          <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-1 sm:gap-2 mb-1">
                            <h3 className="font-medium text-slate-900 text-xs sm:text-sm lg:text-base flex-1 min-w-0 leading-tight">
                              {audio.title}
                            </h3>
                            <div className="flex gap-1 flex-shrink-0">
                              {audio.isNew && (
                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                  New
                                </span>
                              )}
                              {audio.isPopular && (
                                <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm">{audio.instructor}</p>
                          <p className="text-slate-500 text-xs mt-1 line-clamp-1 hidden sm:block">{audio.description}</p>
                        </div>

                        <div className="hidden sm:flex items-center gap-3 lg:gap-4 text-xs sm:text-sm text-slate-500 flex-shrink-0">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {audio.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                            {audio.rating}
                          </span>
                          <span className="hidden lg:flex items-center gap-1">
                            <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                            {audio.plays}
                          </span>
                        </div>

                        <button className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0">
                          <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Desktop Sidebar */}
          <motion.div
            className="hidden lg:block space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SidebarContent />
          </motion.div>
        </div>
      </div>

      {/* Mobile Player */}
      {showPlayer && (
        <motion.div
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 30 }}
        >
          <MobilePlayer 
            currentAudio={currentAudio}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            isMuted={isMuted}
            formatTime={formatTime}
            handlePlayPause={handlePlayPause}
            handleTimeUpdate={handleTimeUpdate}
            handleVolumeChange={handleVolumeChange}
            toggleMute={toggleMute}
            nextTrack={nextTrack}
            previousTrack={previousTrack}
            setShowPlayer={setShowPlayer}
          />
        </motion.div>
      )}
    </div>
  )
}

// Mobile Player Component
function MobilePlayer({ 
  currentAudio, 
  isPlaying, 
  currentTime, 
  duration, 
  volume, 
  isMuted, 
  formatTime, 
  handlePlayPause, 
  handleTimeUpdate, 
  handleVolumeChange, 
  toggleMute, 
  nextTrack, 
  previousTrack,
  setShowPlayer 
}: MobilePlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!isExpanded) {
    return (
      <div 
        className="p-3 flex items-center gap-3 cursor-pointer"
        onClick={() => setIsExpanded(true)}
      >
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-slate-900 text-sm truncate">{currentAudio.title}</h3>
          <p className="text-slate-600 text-xs truncate">{currentAudio.instructor}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handlePlayPause()
          }}
          className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            setShowPlayer(false)
          }}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4 text-slate-600" />
        </button>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(false)}
          className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Share2 className="w-5 h-5 text-slate-400" />
          </button>
          <button
            onClick={() => setShowPlayer(false)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 text-lg leading-tight">{currentAudio.title}</h3>
          <p className="text-slate-600 text-sm mt-1">{currentAudio.instructor}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {currentAudio.subject}
            </span>
            <span className="text-xs text-slate-500">{currentAudio.duration}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeUpdate}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(currentTime / duration) * 100}%, #e2e8f0 ${(currentTime / duration) * 100}%, #e2e8f0 100%)`
          }}
        />
        <div className="flex justify-between text-sm text-slate-500 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Shuffle className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={previousTrack}
          className="p-3 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SkipBack className="w-6 h-6 text-slate-600" />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="p-3 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SkipForward className="w-6 h-6 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Repeat className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <button onClick={toggleMute}>
          {isMuted || volume === 0 ? (
            <VolumeX className="w-5 h-5 text-slate-600" />
          ) : (
            <Volume2 className="w-5 h-5 text-slate-600" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${isMuted ? 0 : volume}%, #e2e8f0 ${isMuted ? 0 : volume}%, #e2e8f0 100%)`
          }}
        />
        <span className="text-sm text-slate-500 min-w-8">{isMuted ? 0 : volume}</span>
      </div>
    </div>
  )
}

// Desktop Player Component
function DesktopPlayer({ 
  currentAudio, 
  isPlaying, 
  currentTime, 
  duration, 
  volume, 
  isMuted, 
  formatTime, 
  handlePlayPause, 
  handleTimeUpdate, 
  handleVolumeChange, 
  toggleMute, 
  nextTrack, 
  previousTrack 
}: DesktopPlayerProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Now Playing</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{currentAudio.title}</h3>
          <p className="text-slate-600 text-sm">{currentAudio.instructor}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {currentAudio.subject}
            </span>
            <span className="text-xs text-slate-500">{currentAudio.duration}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Heart className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Share2 className="w-5 h-5 text-slate-400" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <Download className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleTimeUpdate}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${(currentTime / duration) * 100}%, #e2e8f0 ${(currentTime / duration) * 100}%, #e2e8f0 100%)`
          }}
        />
        <div className="flex justify-between text-sm text-slate-500 mt-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Shuffle className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={previousTrack}
          className="p-3 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SkipBack className="w-6 h-6 text-slate-600" />
        </button>
        <button
          onClick={handlePlayPause}
          className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </button>
        <button
          onClick={nextTrack}
          className="p-3 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <SkipForward className="w-6 h-6 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <Repeat className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-3">
        <button onClick={toggleMute}>
          {isMuted || volume === 0 ? (
            <VolumeX className="w-5 h-5 text-slate-600" />
          ) : (
            <Volume2 className="w-5 h-5 text-slate-600" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="100"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="flex-1 max-w-32 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #9333ea 0%, #9333ea ${isMuted ? 0 : volume}%, #e2e8f0 ${isMuted ? 0 : volume}%, #e2e8f0 100%)`
          }}
        />
        <span className="text-sm text-slate-500 min-w-8">{isMuted ? 0 : volume}</span>
      </div>
    </div>
  )
}

// Sidebar Content Component
function SidebarContent() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 text-sm sm:text-base">Your Progress</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-xs sm:text-sm">Hours Listened</span>
            <span className="font-semibold text-slate-900 text-sm sm:text-base">47.2h</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-xs sm:text-sm">Explanations Completed</span>
            <span className="font-semibold text-slate-900 text-sm sm:text-base">89</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-xs sm:text-sm">Favorite Subject</span>
            <span className="font-semibold text-slate-900 text-sm sm:text-base">Physics</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-600 text-xs sm:text-sm">Streak</span>
            <span className="font-semibold text-slate-900 flex items-center gap-1 text-sm sm:text-base">
              12 days <span className="text-orange-500">🔥</span>
            </span>
          </div>
        </div>
      </div>

      {/* Trending Topics */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          Trending Topics
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {[
            { topic: "Quantum Computing", plays: "+45%", color: "text-green-600" },
            { topic: "Organic Synthesis", plays: "+32%", color: "text-blue-600" },
            { topic: "Calculus Applications", plays: "+28%", color: "text-purple-600" },
            { topic: "Genetic Engineering", plays: "+21%", color: "text-red-600" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-slate-700 text-xs sm:text-sm">{item.topic}</span>
              <span className={`text-xs sm:text-sm font-medium ${item.color}`}>{item.plays}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recently Played */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          Recently Played
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {[
            { title: "Organic Chemistry: Reaction Mechanisms", subject: "Chemistry" },
            { title: "Calculus: Integration Techniques", subject: "Mathematics" },
            { title: "Physics: Quantum Mechanics Basics", subject: "Physics" },
            { title: "Biology: Cell Structure and Function", subject: "Biology" }
          ].map((audio, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-medium text-slate-900 truncate">
                  {audio.title}
                </h4>
                <p className="text-xs text-slate-600">{audio.subject}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
          Recent Achievements
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {[
            { title: "Audio Enthusiast", desc: "Listen to 50 explanations", icon: "🎧" },
            { title: "Subject Master", desc: "Complete all Physics content", icon: "🏆" },
            { title: "Streak Champion", desc: "10-day listening streak", icon: "🔥" },
          ].map((achievement, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 bg-purple-50 rounded-lg">
              <span className="text-lg sm:text-2xl flex-shrink-0">{achievement.icon}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-medium text-slate-900">{achievement.title}</h4>
                <p className="text-xs text-slate-600">{achievement.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}