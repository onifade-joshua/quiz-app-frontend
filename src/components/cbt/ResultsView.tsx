import { motion } from 'framer-motion'
import { Award, Eye, RotateCcw, ArrowLeft } from 'lucide-react'
import type { CBTResult } from '../../types'
import { formatTime } from '../../utils/cbtHelpers'

interface ResultsViewProps {
  results: CBTResult
  onReview: () => void
  onRetake: () => void
  onBack: () => void
}

export default function ResultsView({ results, onReview, onRetake, onBack }: ResultsViewProps) {
  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return { text: 'Excellent!', color: 'text-green-600' }
    if (percentage >= 75) return { text: 'Great Job!', color: 'text-blue-600' }
    if (percentage >= 60) return { text: 'Good Effort!', color: 'text-yellow-600' }
    return { text: 'Keep Practicing!', color: 'text-orange-600' }
  }

  const performance = getPerformanceMessage(results.percentage)

  // defensive: avoid division by zero
  const totalQ = results.totalQuestions || results.answers.length || 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Results Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
        <div className="text-center">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Test Completed!</h1>
          <p className={`text-2xl font-semibold mb-1`}>{performance.text}</p>
          {results.autoSubmitted && (
            <p className="text-blue-100 text-sm">Auto-submitted due to time limit</p>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-4xl font-bold">{results.percentage}%</div>
            <div className="text-blue-100 text-sm mt-1">Score</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{results.correctAnswers}</div>
            <div className="text-blue-100 text-sm mt-1">Correct</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{results.incorrectAnswers}</div>
            <div className="text-blue-100 text-sm mt-1">Wrong</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold">{formatTime(results.timeSpent)}</div>
            <div className="text-blue-100 text-sm mt-1">Time Taken</div>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Breakdown</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Correct Answers</span>
              <span className="text-sm font-semibold text-green-600">
                {results.correctAnswers}/{totalQ}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(results.correctAnswers / totalQ) * 100}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Incorrect Answers</span>
              <span className="text-sm font-semibold text-red-600">
                {results.incorrectAnswers}/{totalQ}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(results.incorrectAnswers / totalQ) * 100}%` }}
              />
            </div>
          </div>

          {results.unanswered > 0 && (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Unanswered</span>
                <span className="text-sm font-semibold text-slate-600">
                  {results.unanswered}/{totalQ}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-slate-400 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(results.unanswered / totalQ) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onReview}
            className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Eye className="w-5 h-5 mr-2" />
            Review All Answers
          </button>
          <button
            onClick={onRetake}
            className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Test
          </button>
          <button
            onClick={onBack}
            className="flex items-center px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Documents
          </button>
        </div>
      </div>

      {/* Study Tips */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Study Tips</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Review your incorrect answers to understand where you went wrong</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Listen to audio explanations for better comprehension</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>Practice regularly to improve your performance</span>
          </li>
        </ul>
      </div>
    </motion.div>
  )
}
