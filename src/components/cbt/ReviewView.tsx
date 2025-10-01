import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  RotateCcw,
  Volume2,
  Pause,
  Download
} from 'lucide-react'
import type { CBTResult } from '../../types'
import { downloadQuestionExplanation, formatTime } from '../../utils/cbtHelpers'

interface ReviewViewProps {
  results: CBTResult
  isPlaying: Record<string, boolean>
  onPlayAudio: (url: string, id: string) => void
  onRetake: () => void
  onBack: () => void
}

export default function ReviewView({ results, isPlaying, onPlayAudio, onRetake, onBack }: ReviewViewProps) {
  const [showExplanations, setShowExplanations] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-4 sm:space-y-6"
    >
      {/* Review Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Review Your Answers</h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center font-medium">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {results.correctAnswers} Correct
              </span>
              <span className="bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm flex items-center font-medium">
                <XCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                {results.incorrectAnswers} Wrong
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowExplanations(!showExplanations)}
              className={`flex items-center px-3 sm:px-4 py-2 rounded-lg transition-colors font-medium text-xs sm:text-sm ${
                showExplanations
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {showExplanations ? <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> : <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />}
              <span className="hidden sm:inline">{showExplanations ? 'Hide' : 'Show'} Explanations</span>
              <span className="sm:hidden">{showExplanations ? 'Hide' : 'Show'}</span>
            </button>
            <button
              onClick={onBack}
              className="flex items-center px-3 sm:px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium text-xs sm:text-sm"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </div>

      {/* Review Questions */}
      <div className="space-y-4 sm:space-y-6">
        {results.answers.map((answer, index) => (
          <motion.div
            key={answer.questionId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border-l-4 ${
              answer.isCorrect ? 'border-l-green-500' : 'border-l-red-500'
            }`}
          >
            {/* Question Header */}
            <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="bg-slate-100 text-slate-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  Question {index + 1}
                </span>
                {answer.isCorrect ? (
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  answer.question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                  answer.question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {answer.question.difficulty}
                </span>
              </div>
              <span className="text-xs sm:text-sm text-slate-500">{answer.question.subject}</span>
            </div>

            {/* Question */}
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-4">
              {answer.question.question}
            </h3>

            {/* Options */}
            <div className="grid gap-2 mb-4">
              {Object.entries(answer.question.options).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-2 sm:p-3 rounded-lg border ${
                    key === answer.correctAnswer && key === answer.userAnswer
                      ? 'bg-green-50 border-green-500'
                    : key === answer.correctAnswer
                      ? 'bg-green-50 border-green-500'
                    : key === answer.userAnswer
                      ? 'bg-red-50 border-red-500'
                    : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-2 sm:mr-3 text-sm sm:text-base">{key}.</span>
                    <span className="flex-1 text-xs sm:text-sm">{value}</span>
                    {key === answer.correctAnswer && (
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 ml-2" />
                    )}
                    {key === answer.userAnswer && key !== answer.correctAnswer && (
                      <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 ml-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Answer Summary */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 p-3 bg-slate-50 rounded-lg text-xs sm:text-sm">
              <div>
                <span className="text-slate-600">Your Answer: </span>
                <span className={`font-semibold ${
                  answer.userAnswer ? (answer.isCorrect ? 'text-green-600' : 'text-red-600') : 'text-slate-400'
                }`}>
                  {answer.userAnswer || 'Not Answered'}
                </span>
              </div>
              <div>
                <span className="text-slate-600">Correct Answer: </span>
                <span className="font-semibold text-green-600">{answer.correctAnswer}</span>
              </div>
              <div>
                <span className="text-slate-600">Time Spent: </span>
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
                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center text-sm sm:text-base">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" />
                    Explanation
                  </h4>
                  <p className="text-slate-700 mb-4 leading-relaxed text-xs sm:text-sm">{answer.explanation}</p>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {answer.audioExplanation && (
                      <button
                        onClick={() => onPlayAudio(answer.audioExplanation!, `review-${answer.questionId}`)}
                        className="flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-xs sm:text-sm font-medium"
                      >
                        {isPlaying[`review-${answer.questionId}`] ? (
                          <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        ) : (
                          <Volume2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        )}
                        {isPlaying[`review-${answer.questionId}`] ? 'Pause' : 'Play'} Audio
                      </button>
                    )}
                    
                    <button
                      onClick={() => downloadQuestionExplanation(answer.question, answer.userAnswer, index)}
                      className="flex items-center px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs sm:text-sm font-medium"
                    >
                      <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Download
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Review Summary */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 sticky bottom-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600">{results.correctAnswers}</div>
              <div className="text-xs sm:text-sm text-slate-600">Correct</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-red-600">{results.incorrectAnswers}</div>
              <div className="text-xs sm:text-sm text-slate-600">Wrong</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-slate-400">{results.unanswered}</div>
              <div className="text-xs sm:text-sm text-slate-600">Skipped</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600">{results.percentage}%</div>
              <div className="text-xs sm:text-sm text-slate-600">Score</div>
            </div>
          </div>
          
          <button
            onClick={onRetake}
            className="flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    </motion.div>
  )
}