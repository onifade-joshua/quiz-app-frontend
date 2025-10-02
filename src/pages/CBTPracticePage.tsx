import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Brain, CheckCircle } from 'lucide-react'
import DocumentImport from '../components/cbt/DocumentImport'
import DocumentList from '../components/cbt/DocumentList'
import QuizSetup from '../components/cbt/QuizSetup'
import QuizView from '../components/cbt/QuizView'
import ResultsView from '../components/cbt/ResultsView'
import ReviewView from '../components/cbt/ReviewView'
import PaymentModal from '../components/cbt/PaymentModal'
import { useAudioPlayer } from '../components/hooks/useAudioPlayer'
import type { ImportedDocument, CBTSession, CBTAnswer, CBTResult } from '../types'
import { generateQuestions, calculateResults } from '../utils/cbtHelpers'

type ViewType = 'import' | 'documents' | 'quiz-setup' | 'quiz' | 'results' | 'review'

export default function CBTPracticePage() {
  const [currentView, setCurrentView] = useState<ViewType>('import')
  const [documents, setDocuments] = useState<ImportedDocument[]>([])
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [currentSession, setCurrentSession] = useState<CBTSession | null>(null)
  const [answers, setAnswers] = useState<Record<string, CBTAnswer>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [results, setResults] = useState<CBTResult | null>(null)
  const [isPremium, setIsPremium] = useState<boolean>(false)
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false)

  const { isPlaying, playAudio, audioRef } = useAudioPlayer()

  const handleProcessComplete = (files: Record<string, File>) => {
    const newDocuments: ImportedDocument[] = Object.entries(files).map(([type, file], index) => ({
      id: `doc-${Date.now()}-${index}`,
      title: file.name,
      type: type as ImportedDocument['type'],
      content: 'Sample content extracted from the document',
      imageUrl: (type === 'screenshot' || type === 'image') ? URL.createObjectURL(file) : undefined,
      audioUrl: type === 'audio' ? URL.createObjectURL(file) : undefined,
      textExplanation: `This document has been analyzed and contains key concepts about ${file.name.split('.')[0]}.`,
      audioExplanation: `/audio/${file.name}-explanation.mp3`,
      subject: 'General Studies',
      uploadedAt: new Date().toLocaleDateString(),
      processed: true,
      tags: ['education', 'study'],
      rawFile: file
    }))

    setDocuments(prev => [...prev, ...newDocuments])
    setCurrentView('documents')
  }

  const handleStartCBT = () => {
    if (!isPremium) {
      setShowPaymentModal(true)
    } else {
      setCurrentView('quiz-setup')
    }
  }

  const handlePaymentSuccess = () => {
    setIsPremium(true)
    setShowPaymentModal(false)
    setCurrentView('quiz-setup')
  }

  const handleStartQuiz = (difficulty: 'mixed' | 'easy' | 'hard', duration: number, questionCount: number) => {
    const questions = generateQuestions(selectedDocuments, difficulty, questionCount)

    const session: CBTSession = {
      id: Date.now().toString(),
      title: `CBT Practice - ${new Date().toLocaleDateString()}`,
      documentIds: selectedDocuments,
      questions,
      difficulty,
      timeLimit: duration,
      totalQuestions: questions.length,
      status: 'in_progress',
      startedAt: new Date().toISOString(),
      userId: "demo-user"   
    }

    setCurrentSession(session)
    setAnswers({})
    setFlaggedQuestions(new Set())
    setCurrentView('quiz')
  }

  const handleAnswerSelect = (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        selectedAnswer: answer,
        timeSpent: 0,
        answered: true,
        flagged: flaggedQuestions.has(questionId),
      },
    }))
  }

  const handleToggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      newSet.has(questionId) ? newSet.delete(questionId) : newSet.add(questionId)
      return newSet
    })
  }

  const handleQuizComplete = (timeRemaining: number, autoSubmitted: boolean) => {
    if (!currentSession) return
    const result = calculateResults(currentSession, answers, timeRemaining, autoSubmitted)
    setResults(result)
    setCurrentView('results')
  }

  const resetQuiz = () => {
    setCurrentSession(null)
    setAnswers({})
    setResults(null)
    setFlaggedQuestions(new Set())
    setSelectedDocuments([])
    setCurrentView('documents')
  }

  const handleDocumentSelect = (id: string) => {
    setSelectedDocuments(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const viewTitles: Record<ViewType, string> = {
    import: 'Upload your study materials',
    documents: 'Select documents for practice',
    'quiz-setup': 'Configure your test settings',
    quiz: 'Complete your practice test',
    results: 'View your test results',
    review: 'Review answers and explanations'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-slate-900 truncate">CBT Practice System</h1>
                <p className="text-slate-600 text-xs sm:text-sm truncate">{viewTitles[currentView]}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isPremium && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-sm">
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold text-white hidden sm:inline">PREMIUM</span>
                  <span className="text-xs font-semibold text-white sm:hidden">PRO</span>
                </div>
              )}

              <div className="hidden md:flex items-center space-x-2">
                {['import', 'documents', 'quiz-setup', 'quiz', 'results', 'review'].map((view, index) => (
                  <div
                    key={view}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentView === view
                        ? 'bg-blue-600 scale-125'
                        : ['import', 'documents', 'quiz-setup', 'quiz', 'results', 'review'].indexOf(currentView) > index
                        ? 'bg-green-500'
                        : 'bg-slate-300'
                    }`}
                    title={view}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          {currentView === 'import' && (
            <motion.div key="import" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DocumentImport onProcessComplete={handleProcessComplete} />
            </motion.div>
          )}

          {currentView === 'documents' && (
            <motion.div key="documents" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <DocumentList
                documents={documents}
                selectedDocuments={selectedDocuments}
                onDocumentSelect={handleDocumentSelect}
                onStartCBT={handleStartCBT}
                onImportMore={() => setCurrentView('import')}
                isPlaying={isPlaying}
                onPlayAudio={playAudio}
              />
            </motion.div>
          )}

          {currentView === 'quiz-setup' && (
            <motion.div key="quiz-setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <QuizSetup
                selectedCount={selectedDocuments.length}
                onStart={handleStartQuiz}
                onBack={() => setCurrentView('documents')}
              />
            </motion.div>
          )}

          {currentView === 'quiz' && currentSession && (
            <motion.div key="quiz" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <QuizView
                session={currentSession}
                answers={answers}
                onAnswerSelect={handleAnswerSelect}
                onToggleFlag={handleToggleFlag}
                onSubmit={handleQuizComplete}
                flaggedQuestions={flaggedQuestions}
              />
            </motion.div>
          )}

          {currentView === 'results' && results && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ResultsView
                results={results}
                onReview={() => setCurrentView('review')}
                onRetake={resetQuiz}
                onBack={() => setCurrentView('documents')}
              />
            </motion.div>
          )}

          {currentView === 'review' && results && (
            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <ReviewView
                results={results}
                isPlaying={isPlaying}
                onPlayAudio={playAudio}
                onRetake={resetQuiz}
                onBack={() => setCurrentView('results')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <audio ref={audioRef} onEnded={() => {}} className="hidden" />

      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}