import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronDown, ChevronUp, Home, RotateCcw, CheckCircle, BookOpen } from 'lucide-react'

interface TheoryResult {
  questionId: string
  question: string
  userAnswer: string
  suggestedAnswer: string
  points: number
  topic?: string
}

interface TheoryResultsViewProps {
  results: TheoryResult[]
  onRetry: () => void
  onBack: () => void
}

export default function TheoryResultsView({ results, onRetry, onBack }: TheoryResultsViewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const totalPoints = results.reduce((sum, r) => sum + r.points, 0)
  const answeredCount = results.filter(r => r.userAnswer.trim().length > 0).length

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 sm:p-8 shadow-lg mb-6 text-white"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4"
          >
            <FileText className="w-8 h-8" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl font-bold mb-2"
          >
            Practice Complete!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-purple-100"
          >
            Review your answers and compare with suggested responses
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold">{results.length}</div>
            <div className="text-sm text-purple-100 mt-1">Questions</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold">{answeredCount}</div>
            <div className="text-sm text-purple-100 mt-1">Answered</div>
          </div>
          <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl">
            <div className="text-3xl font-bold">{totalPoints}</div>
            <div className="text-sm text-purple-100 mt-1">Total Marks</div>
          </div>
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3"
      >
        <BookOpen className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">
          Compare your answers with the suggested responses below. Use these as a guide to improve your understanding and writing skills.
        </p>
      </motion.div>

      {/* Questions and Answers */}
      <div className="space-y-4 mb-6">
        {results.map((result, index) => {
          const isExpanded = expandedIndex === index
          const hasUserAnswer = result.userAnswer.trim().length > 0

          return (
            <motion.div
              key={result.questionId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
            >
              {/* Question Header */}
              <button
                onClick={() => toggleExpand(index)}
                className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm ${
                    hasUserAnswer 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 line-clamp-2 text-sm sm:text-base">
                      {result.question}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {result.topic && (
                        <span className="text-xs text-slate-500">{result.topic}</span>
                      )}
                      <span className="text-xs font-semibold text-blue-600">
                        {result.points} marks
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  {hasUserAnswer && (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-slate-200"
                  >
                    <div className="px-4 sm:px-6 py-6">
                      {/* Your Answer */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm font-semibold text-slate-900">Your Answer:</span>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                          {hasUserAnswer ? (
                            <p className="text-slate-800 whitespace-pre-wrap text-sm leading-relaxed">
                              {result.userAnswer}
                            </p>
                          ) : (
                            <p className="text-slate-400 italic text-sm">No answer provided</p>
                          )}
                        </div>
                        {hasUserAnswer && (
                          <div className="mt-2 text-xs text-slate-500">
                            {result.userAnswer.length} characters • ~{Math.ceil(result.userAnswer.length / 5)} words
                          </div>
                        )}
                      </div>

                      {/* Suggested Answer */}
                      {result.suggestedAnswer && (
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="text-sm font-semibold text-slate-900">Suggested Answer:</span>
                          </div>
                          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                            <p className="text-slate-800 whitespace-pre-wrap text-sm leading-relaxed">
                              {result.suggestedAnswer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4"
      >
        <button
          onClick={onBack}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors font-medium"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-medium shadow-sm"
        >
          <RotateCcw className="w-5 h-5" />
          Practice Again
        </button>
      </motion.div>
    </div>
  )
}