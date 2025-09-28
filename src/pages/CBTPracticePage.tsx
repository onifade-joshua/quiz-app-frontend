import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  Camera,
  Mic,
  Upload,
  FileImage,
  Type,
  Edit3,
  Play,
  Pause,
  Download,
  Clock,
  Flag,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Target,
  Award,
  Eye,
  EyeOff,
//   Timer,
  BookOpen,
  Brain
} from 'lucide-react'

// Types for the component
interface ImportedDocument {
  id: string
  title: string
  type: 'text' | 'screenshot' | 'image' | 'audio' | 'handwritten' | 'file'
  content?: string
  imageUrl?: string
  textExplanation?: string
  audioExplanation?: string
  subject: string
  uploadedAt: string
  processed: boolean
  tags: string[]
}

interface CBTQuestion {
  id: string
  documentId: string
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: 'A' | 'B' | 'C' | 'D'
  explanation: string
  audioExplanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject: string
  topic: string
  timeAllotted: number
  points: number
}

interface CBTSession {
  id: string
  title: string
  documentIds: string[]
  questions: CBTQuestion[]
  difficulty: 'mixed' | 'easy' | 'medium' | 'hard'
  timeLimit: number
  totalQuestions: number
  status: 'not_started' | 'in_progress' | 'completed' | 'auto_submitted'
  startedAt: string
}

interface CBTAnswer {
  selectedAnswer: 'A' | 'B' | 'C' | 'D'
  timeSpent: number
  answered: boolean
  flagged: boolean
}

interface CBTResult {
  sessionId: string
  answers: Array<{
    questionId: string
    question: CBTQuestion
    userAnswer: 'A' | 'B' | 'C' | 'D' | null
    correctAnswer: 'A' | 'B' | 'C' | 'D'
    isCorrect: boolean
    explanation: string
    audioExplanation?: string
    timeSpent: number
  }>
  score: number
  percentage: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unanswered: number
  timeSpent: number
  completedAt: string
  autoSubmitted: boolean
  breakdown: {
    easy: { correct: number; total: number }
    medium: { correct: number; total: number }
    hard: { correct: number; total: number }
  }
}

interface DocumentType {
  title: string
  description: string
  icon: typeof Type
  color: string
}

// Mock data - replace with actual API calls
const mockDocuments: ImportedDocument[] = [
  {
    id: '1',
    title: 'Organic Chemistry Chapter 12',
    type: 'text',
    content: 'Chemical bonding and molecular structure...',
    textExplanation: 'This chapter covers the fundamental concepts of chemical bonding...',
    audioExplanation: '/audio/chemistry-ch12.mp3',
    subject: 'Chemistry',
    uploadedAt: '2024-01-15',
    processed: true,
    tags: ['chemistry', 'bonding', 'molecules']
  },
  {
    id: '2',
    title: 'Mathematics Screenshot',
    type: 'screenshot',
    imageUrl: '/images/math-screenshot.png',
    textExplanation: 'This equation demonstrates the quadratic formula...',
    audioExplanation: '/audio/math-quadratic.mp3',
    subject: 'Mathematics',
    uploadedAt: '2024-01-14',
    processed: true,
    tags: ['mathematics', 'algebra', 'quadratic']
  }
]

const mockQuestions: CBTQuestion[] = [
  {
    id: '1',
    documentId: '1',
    question: 'What is the primary type of bonding in sodium chloride?',
    options: {
      A: 'Ionic bonding',
      B: 'Covalent bonding',
      C: 'Metallic bonding',
      D: 'Van der Waals forces'
    },
    correctAnswer: 'A',
    explanation: 'Sodium chloride forms ionic bonds due to the transfer of electrons from sodium to chlorine.',
    audioExplanation: '/audio/ionic-bonding-explanation.mp3',
    difficulty: 'medium',
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    timeAllotted: 120,
    points: 2
  },
  {
    id: '2',
    documentId: '2',
    question: 'What is the discriminant of the quadratic equation x² + 5x + 6 = 0?',
    options: {
      A: '1',
      B: '25',
      C: '11',
      D: '-11'
    },
    correctAnswer: 'A',
    explanation: 'The discriminant is b² - 4ac = 25 - 24 = 1',
    difficulty: 'hard',
    subject: 'Mathematics',
    topic: 'Quadratic Equations',
    timeAllotted: 180,
    points: 3
  }
]

export default function CBTPracticePage() {
  const [currentView, setCurrentView] = useState<'documents' | 'quiz-setup' | 'quiz' | 'results' | 'review'>('documents')
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [currentSession, setCurrentSession] = useState<CBTSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<string, CBTAnswer>>({})
  const [timeRemaining, setTimeRemaining] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [quizStarted, setQuizStarted] = useState<boolean>(false)
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
  const [results, setResults] = useState<CBTResult | null>(null)
  const [showExplanations, setShowExplanations] = useState<boolean>(false)
  
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Document import types
  const documentTypes: DocumentType[] = [
    { title: 'Text Import', description: 'Import and analyze text documents', icon: Type, color: 'bg-blue-100 text-blue-600' },
    { title: 'Screenshot Analysis', description: 'Capture and process screenshots', icon: Camera, color: 'bg-green-100 text-green-600' },
    { title: 'Image Upload', description: 'Upload images for text extraction', icon: FileImage, color: 'bg-purple-100 text-purple-600' },
    { title: 'Audio Recording', description: 'Record and transcribe audio notes', icon: Mic, color: 'bg-red-100 text-red-600' },
    { title: 'Handwritten Notes', description: 'Convert handwritten text to digital', icon: Edit3, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'File Upload', description: 'Import PDF, Word, and other files', icon: Upload, color: 'bg-indigo-100 text-indigo-600' }
  ]

  // Timer functionality
  useEffect(() => {
    if (quizStarted && !quizCompleted && timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeRemaining, quizStarted, quizCompleted])

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return hours > 0 
      ? `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
      : `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const handleDocumentSelect = (docId: string): void => {
    setSelectedDocuments(prev => 
      prev.includes(docId) 
        ? prev.filter(id => id !== docId)
        : [...prev, docId]
    )
  }

  const startQuiz = (difficulty: 'mixed' | 'easy' | 'medium' | 'hard' = 'mixed'): void => {
    const questions = mockQuestions.filter(q => 
      selectedDocuments.includes(q.documentId)
    )
    
    const session: CBTSession = {
      id: Date.now().toString(),
      title: `CBT Practice - ${new Date().toLocaleDateString()}`,
      documentIds: selectedDocuments,
      questions,
      difficulty,
      timeLimit: questions.length * 2, // 2 minutes per question
      totalQuestions: questions.length,
      status: 'in_progress',
      startedAt: new Date().toISOString()
    }

    setCurrentSession(session)
    setTimeRemaining(session.timeLimit * 60) // Convert to seconds
    setQuizStarted(true)
    setCurrentView('quiz')
  }

  const handleAnswerSelect = (questionId: string, answer: 'A' | 'B' | 'C' | 'D'): void => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        selectedAnswer: answer,
        timeSpent: 0,
        answered: true,
        flagged: flaggedQuestions.has(questionId)
      }
    }))
  }

  const toggleFlag = (questionId: string): void => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleAutoSubmit = (): void => {
    setQuizCompleted(true)
    setQuizStarted(false)
    calculateResults(true)
  }

  const handleManualSubmit = (): void => {
    setQuizCompleted(true)
    setQuizStarted(false)
    calculateResults(false)
  }

  const calculateResults = (autoSubmitted: boolean = false): void => {
    if (!currentSession) return
    
    const questions = currentSession.questions
    let correct = 0
    let totalPoints = 0
    let earnedPoints = 0

    const detailedAnswers = questions.map(question => {
      const userAnswer = answers[question.id]
      const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer
      
      totalPoints += question.points
      if (isCorrect) {
        correct++
        earnedPoints += question.points
      }

      return {
        questionId: question.id,
        question,
        userAnswer: userAnswer?.selectedAnswer || null,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
        audioExplanation: question.audioExplanation,
        timeSpent: userAnswer?.timeSpent || 0
      }
    })

    const result: CBTResult = {
      sessionId: currentSession.id,
      answers: detailedAnswers,
      score: earnedPoints,
      percentage: Math.round((correct / questions.length) * 100),
      totalQuestions: questions.length,
      correctAnswers: correct,
      incorrectAnswers: questions.length - correct,
      unanswered: questions.length - Object.keys(answers).length,
      timeSpent: (currentSession.timeLimit * 60) - timeRemaining,
      completedAt: new Date().toISOString(),
      autoSubmitted,
      breakdown: {
        easy: { correct: 0, total: 0 },
        medium: { correct: 0, total: 0 },
        hard: { correct: 0, total: 0 }
      }
    }

    // Calculate difficulty breakdown
    detailedAnswers.forEach(({ question, isCorrect }) => {
      result.breakdown[question.difficulty].total++
      if (isCorrect) {
        result.breakdown[question.difficulty].correct++
      }
    })

    setResults(result)
    setCurrentView('results')
  }

  const playAudio = async (audioUrl: string, id: string): Promise<void> => {
    if (isPlaying[id]) {
      audioRef.current?.pause()
      setIsPlaying(prev => ({ ...prev, [id]: false }))
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setIsPlaying(prev => ({ ...prev, [id]: true }))
      }
    }
  }

  const downloadTextExplanation = (doc: ImportedDocument): void => {
    const content = `${doc.title}\n\nExplanation:\n${doc.textExplanation}\n\nTags: ${doc.tags.join(', ')}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${doc.title}-explanation.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const resetQuiz = (): void => {
    setCurrentSession(null)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setTimeRemaining(0)
    setFlaggedQuestions(new Set())
    setQuizStarted(false)
    setQuizCompleted(false)
    setResults(null)
    setCurrentView('documents')
  }

  const renderDocumentsView = () => (
    <div className="space-y-8">
      {/* Import Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
      >
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
          <Upload className="w-6 h-6 mr-2 text-blue-600" />
          Import & Analyze Documents
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {documentTypes.map((type) => (
            <motion.button
              key={type.title}
              className={`p-4 rounded-xl border-2 border-dashed ${type.color} border-opacity-30 hover:border-opacity-50 transition-all text-left group`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <type.icon className={`w-8 h-8 mb-3 ${type.color}`} />
              <h3 className="font-semibold text-slate-900 mb-1">{type.title}</h3>
              <p className="text-sm text-slate-600">{type.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Imported Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-green-600" />
            Your Documents ({mockDocuments.length})
          </h2>
          <button
            onClick={() => selectedDocuments.length > 0 && setCurrentView('quiz-setup')}
            disabled={selectedDocuments.length === 0}
            className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center ${
              selectedDocuments.length > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Brain className="w-5 h-5 mr-2" />
            Start CBT Practice ({selectedDocuments.length})
          </button>
        </div>

        <div className="grid gap-4">
          {mockDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedDocuments.includes(doc.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleDocumentSelect(doc.id)}
              whileHover={{ y: -2 }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      checked={selectedDocuments.includes(doc.id)}
                      onChange={() => handleDocumentSelect(doc.id)}
                      className="mr-3 w-4 h-4 text-blue-600"
                    />
                    <h3 className="font-semibold text-slate-900">{doc.title}</h3>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      doc.type === 'text' ? 'bg-blue-100 text-blue-800' :
                      doc.type === 'screenshot' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {doc.type}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-3">{doc.textExplanation?.slice(0, 150)}...</p>
                  
                  <div className="flex items-center space-x-4">
                    {doc.audioExplanation && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          playAudio(doc.audioExplanation!, doc.id)
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                      >
                        {isPlaying[doc.id] ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                        Audio Explanation
                      </button>
                    )}
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadTextExplanation(doc)
                      }}
                      className="flex items-center text-green-600 hover:text-green-800 text-sm"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download Text
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-sm text-slate-500">{doc.subject}</span>
                  <p className="text-xs text-slate-400">{doc.uploadedAt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )

  const renderQuizSetup = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-8">
          <Target className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">CBT Practice Setup</h2>
          <p className="text-slate-600">Configure your practice session</p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Selected Documents ({selectedDocuments.length})</h3>
            <div className="space-y-2">
              {selectedDocuments.map(docId => {
                const doc = mockDocuments.find(d => d.id === docId)
                return (
                  <div key={docId} className="flex items-center p-3 bg-slate-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-slate-800">{doc?.title}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Difficulty Level</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['mixed', 'easy', 'medium', 'hard'] as const).map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => startQuiz(difficulty)}
                  className={`p-4 rounded-xl border-2 text-center transition-all ${
                    difficulty === 'mixed' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : difficulty === 'easy'
                      ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
                      : difficulty === 'medium'
                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                      : 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  <div className="font-semibold capitalize">{difficulty}</div>
                  <div className="text-sm mt-1">
                    {difficulty === 'mixed' && 'All difficulty levels'}
                    {difficulty === 'easy' && 'Basic concepts'}
                    {difficulty === 'medium' && 'Intermediate level'}
                    {difficulty === 'hard' && 'Advanced topics'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentView('documents')}
              className="flex-1 py-3 px-6 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50"
            >
              Back to Documents
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderQuizView = () => {
    if (!currentSession) return null
    
    const currentQuestion = currentSession.questions[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / currentSession.questions.length) * 100

    return (
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-slate-900">CBT Practice</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Question {currentQuestionIndex + 1} of {currentSession.questions.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center px-3 py-2 rounded-lg ${
                timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
              }`}>
                <Clock className="w-4 h-4 mr-2" />
                {formatTime(timeRemaining)}
              </div>
              
              <button
                onClick={handleManualSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Submit Quiz
              </button>
            </div>
          </div>
          
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6"
        >
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900 flex-1">
              {currentQuestion?.question}
            </h2>
            <button
              onClick={() => currentQuestion && toggleFlag(currentQuestion.id)}
              className={`ml-4 p-2 rounded-lg transition-colors ${
                currentQuestion && flaggedQuestions.has(currentQuestion.id)
                  ? 'bg-red-100 text-red-600'
                  : 'bg-slate-100 text-slate-400 hover:text-slate-600'
              }`}
            >
              <Flag className="w-5 h-5" />
            </button>
          </div>

          <div className="grid gap-3">
            {currentQuestion && Object.entries(currentQuestion.options).map(([key, value]) => (
              <motion.button
                key={key}
                onClick={() => handleAnswerSelect(currentQuestion.id, key as 'A' | 'B' | 'C' | 'D')}
                className={`p-4 text-left rounded-xl border-2 transition-all ${
                  answers[currentQuestion.id]?.selectedAnswer === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                whileHover={{ x: 4 }}
              >
                <span className="font-semibold text-slate-900 mr-3">{key}.</span>
                {value}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            <div className="flex items-center space-x-2">
              {currentSession.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  className={`w-8 h-8 rounded-full text-sm transition-colors ${
                    index === currentQuestionIndex
                      ? 'bg-blue-600 text-white'
                      : answers[currentSession.questions[index]?.id]
                      ? 'bg-green-100 text-green-800'
                      : flaggedQuestions.has(currentSession.questions[index]?.id)
                      ? 'bg-red-100 text-red-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentQuestionIndex(Math.min(currentSession.questions.length - 1, currentQuestionIndex + 1))}
              disabled={currentQuestionIndex === currentSession.questions.length - 1}
              className="flex items-center px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderResultsView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Results Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
          {results?.autoSubmitted && (
            <p className="text-blue-100">Auto-submitted due to time limit</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold">{results?.percentage}%</div>
            <div className="text-blue-100">Overall Score</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{results?.correctAnswers}</div>
            <div className="text-blue-100">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{results?.incorrectAnswers}</div>
            <div className="text-blue-100">Incorrect</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{formatTime(results?.timeSpent || 0)}</div>
            <div className="text-blue-100">Time Taken</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setCurrentView('review')}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            <Eye className="w-5 h-5 mr-2" />
            Review Answers
          </button>
          <button
            onClick={resetQuiz}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            New Practice
          </button>
          <button
            onClick={() => setCurrentView('documents')}
            className="flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Documents
          </button>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance by Difficulty</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(results?.breakdown || {}).map(([difficulty, stats]) => (
            <div key={difficulty} className="p-4 bg-slate-50 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium capitalize">{difficulty}</span>
                <span className="text-sm text-slate-600">
                  {stats.correct}/{stats.total}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    difficulty === 'easy' ? 'bg-green-500' :
                    difficulty === 'medium' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${stats.total > 0 ? (stats.correct / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )

  const renderReviewView = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Review Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-slate-900">Review Answers</h1>
            <div className="flex space-x-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                {results?.correctAnswers} Correct
              </span>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm flex items-center">
                <XCircle className="w-4 h-4 mr-1" />
                {results?.incorrectAnswers} Wrong
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                showExplanations
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {showExplanations ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showExplanations ? 'Hide' : 'Show'} Explanations
            </button>
            <button
              onClick={() => setCurrentView('results')}
              className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Results
            </button>
          </div>
        </div>
      </div>

      {/* Review Questions */}
      <div className="space-y-6">
        {results?.answers.map((answer, index) => (
          <motion.div
            key={answer.questionId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${
              answer.isCorrect ? 'border-l-green-500' : 'border-l-red-500'
            }`}
          >
            {/* Question Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                  Question {index + 1}
                </span>
                {answer.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  answer.question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  answer.question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {answer.question.difficulty}
                </span>
              </div>
              <span className="text-sm text-slate-500">{answer.question.subject}</span>
            </div>

            {/* Question */}
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              {answer.question.question}
            </h3>

            {/* Options */}
            <div className="grid gap-2 mb-4">
              {Object.entries(answer.question.options).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-3 rounded-lg border ${
                    key === answer.correctAnswer && key === answer.userAnswer
                      ? 'bg-green-50 border-green-500 text-green-800' // Correct answer selected
                    : key === answer.correctAnswer
                      ? 'bg-green-50 border-green-500 text-green-800' // Correct answer not selected
                    : key === answer.userAnswer
                      ? 'bg-red-50 border-red-500 text-red-800' // Wrong answer selected
                    : 'bg-slate-50 border-slate-200 text-slate-600' // Other options
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-3">{key}.</span>
                    <span>{value}</span>
                    {key === answer.correctAnswer && (
                      <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
                    )}
                    {key === answer.userAnswer && key !== answer.correctAnswer && (
                      <XCircle className="w-4 h-4 ml-auto text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Summary */}
            <div className="flex items-center space-x-4 mb-4 p-3 bg-slate-50 rounded-lg">
              <div>
                <span className="text-sm text-slate-600">Your Answer: </span>
                <span className={`font-semibold ${
                  answer.userAnswer ? (answer.isCorrect ? 'text-green-600' : 'text-red-600') : 'text-slate-400'
                }`}>
                  {answer.userAnswer || 'Not Answered'}
                </span>
              </div>
              <div>
                <span className="text-sm text-slate-600">Correct Answer: </span>
                <span className="font-semibold text-green-600">{answer.correctAnswer}</span>
              </div>
              <div>
                <span className="text-sm text-slate-600">Time: </span>
                <span className="font-semibold text-slate-800">{formatTime(answer.timeSpent)}</span>
              </div>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanations && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-200 pt-4"
                >
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                    Explanation
                  </h4>
                  <p className="text-slate-700 mb-4">{answer.explanation}</p>
                  
                  {answer.audioExplanation && (
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => playAudio(answer.audioExplanation!, `review-${answer.questionId}`)}
                        className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        {isPlaying[`review-${answer.questionId}`] ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isPlaying[`review-${answer.questionId}`] ? 'Pause' : 'Play'} Audio Explanation
                      </button>
                      
                      <button
                        onClick={() => {
                          const a = document.createElement('a')
                          a.href = answer.audioExplanation!
                          a.download = `explanation-question-${index + 1}.mp3`
                          a.click()
                        }}
                        className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Audio
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Review Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{results?.correctAnswers}</div>
              <div className="text-sm text-slate-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{results?.incorrectAnswers}</div>
              <div className="text-sm text-slate-600">Wrong</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-400">{results?.unanswered}</div>
              <div className="text-sm text-slate-600">Unanswered</div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={resetQuiz}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Try Again
            </button>
            <button
              onClick={() => setCurrentView('documents')}
              className="flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Documents
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Brain className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">CBT Practice</h1>
                <p className="text-slate-600 text-sm">
                  {currentView === 'documents' && 'Import documents and start practicing'}
                  {currentView === 'quiz-setup' && 'Configure your practice session'}
                  {currentView === 'quiz' && 'Answer questions within the time limit'}
                  {currentView === 'results' && 'View your performance results'}
                  {currentView === 'review' && 'Review your answers and explanations'}
                </p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              {['documents', 'quiz-setup', 'quiz', 'results', 'review'].map((view, index) => (
                <div
                  key={view}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentView === view
                      ? 'bg-blue-600'
                      : index < ['documents', 'quiz-setup', 'quiz', 'results', 'review'].indexOf(currentView)
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'documents' && (
            <motion.div
              key="documents"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderDocumentsView()}
            </motion.div>
          )}
          
          {currentView === 'quiz-setup' && (
            <motion.div
              key="quiz-setup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderQuizSetup()}
            </motion.div>
          )}
          
          {currentView === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderQuizView()}
            </motion.div>
          )}
          
          {currentView === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderResultsView()}
            </motion.div>
          )}
          
          {currentView === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {renderReviewView()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying({})}
        onPause={() => setIsPlaying({})}
        className="hidden"
      />

      {/* Quick Stats Overlay (when quiz is active) */}
      {quizStarted && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-slate-200 z-40"
        >
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
              <span>{Object.keys(answers).length} answered</span>
            </div>
            <div className="flex items-center">
              <Flag className="w-4 h-4 text-red-600 mr-1" />
              <span>{flaggedQuestions.size} flagged</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-blue-600 mr-1" />
              <span>{formatTime(timeRemaining)} left</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}