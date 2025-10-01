import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import type { CBTSession, CBTAnswer } from '../../types'
import { formatTime } from '../../utils/cbtHelpers'
import { useCBTTimer } from '../hooks/useCBTTimer'

interface QuizViewProps {
  session: CBTSession
  answers: Record<string, CBTAnswer>
  onAnswerSelect: (questionId: string, answer: 'A' | 'B' | 'C' | 'D') => void
  onToggleFlag: (questionId: string) => void
  onSubmit: (timeRemaining: number, autoSubmitted: boolean) => void
  flaggedQuestions: Set<string>
}

export default function QuizView({
  session,
  answers,
  onAnswerSelect,
  onToggleFlag,
  onSubmit,
  flaggedQuestions
}: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const handleAutoSubmit = () => {
    onSubmit(0, true)
  }

  const { timeRemaining } = useCBTTimer(
    session.timeLimit * 60,
    true,
    handleAutoSubmit
  )

  const currentQuestion = session.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / session.questions.length) * 100
  const answeredCount = Object.keys(answers).length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-4 sm:mb-6 sticky top-16 sm:top-20 z-40">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
              Question {currentQuestionIndex + 1} of {session.questions.length}
            </span>
            <span className="text-xs sm:text-sm text-slate-600">
              {answeredCount} answered
            </span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className={`flex items-center px-2 sm:px-3 py-2 rounded-lg font-medium text-sm sm:text-base ${
              timeRemaining < 300 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
            }`}>
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              {formatTime(timeRemaining)}
            </div>
            
            <button
              onClick={() => onSubmit(timeRemaining, false)}
              className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Submit Test</span>
              <span className="sm:hidden">Submit</span>
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

      {/* Question Card */}
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 mb-4 sm:mb-6"
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2 py-1 text-xs rounded-full ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs sm:text-sm text-slate-500">{currentQuestion.subject}</span>
            </div>
            <h2 className="text-base sm:text-lg font-semibold text-slate-900">
              {currentQuestion.question}
            </h2>
          </div>
          <button
            onClick={() => onToggleFlag(currentQuestion.id)}
            className={`ml-2 sm:ml-4 p-2 rounded-lg transition-colors flex-shrink-0 ${
              flaggedQuestions.has(currentQuestion.id)
                ? 'bg-red-100 text-red-600'
                : 'bg-slate-100 text-slate-400 hover:text-slate-600'
            }`}
          >
            <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid gap-2 sm:gap-3">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <motion.button
              key={key}
              onClick={() => onAnswerSelect(currentQuestion.id, key as 'A' | 'B' | 'C' | 'D')}
              className={`p-3 sm:p-4 text-left rounded-xl border-2 transition-all ${
                answers[currentQuestion.id]?.selectedAnswer === key
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center">
                <span className="font-semibold text-slate-900 mr-2 sm:mr-3 text-base sm:text-lg">{key}.</span>
                <span className="flex-1 text-sm sm:text-base">{value}</span>
                {answers[currentQuestion.id]?.selectedAnswer === key && (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 ml-2" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-4 sm:mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <button
            onClick={() => setCurrentQuestionIndex(Math.min(session.questions.length - 1, currentQuestionIndex + 1))}
            disabled={currentQuestionIndex === session.questions.length - 1}
            className="flex items-center px-3 sm:px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
          </button>
        </div>

        {/* Question Grid */}
        <div className="flex flex-wrap gap-2 justify-center">
          {session.questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                index === currentQuestionIndex
                  ? 'bg-blue-600 text-white'
                  : answers[q.id]
                  ? 'bg-green-100 text-green-800'
                  : flaggedQuestions.has(q.id)
                  ? 'bg-red-100 text-red-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Floating Stats */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 bg-white rounded-xl p-3 sm:p-4 shadow-lg border border-slate-200 z-40"
      >
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
          <div className="flex items-center">
            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mr-1" />
            <span>{answeredCount}</span>
          </div>
          <div className="flex items-center">
            <Flag className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mr-1" />
            <span>{flaggedQuestions.size}</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}