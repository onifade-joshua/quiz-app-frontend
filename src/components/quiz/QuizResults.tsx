import React from 'react'
import type { QuizResult } from '../../types'
import { formatTime, calculatePercentage } from '../../utils/helpers'
import { Button } from '../common/Button'
import { motion } from 'framer-motion'

interface QuizResultsProps {
  result: QuizResult
  onRetakeQuiz: () => void
  onBackToQuestions: () => void
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  onRetakeQuiz,
  onBackToQuestions,
}) => {
  const percentage = calculatePercentage(result.correctAnswers, result.totalQuestions)

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! 🎉'
    if (percentage >= 80) return 'Great job! 👏'
    if (percentage >= 70) return 'Good work! 👍'
    if (percentage >= 60) return 'Not bad! 📚'
    return 'Keep practicing! 💪'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto text-center pt-6 px-4 sm:px-0"
    >
      {/* Trophy / Status */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        className="mb-8"
      >
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : '📖'}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Quiz Complete!
        </h2>
        <p className="text-lg text-gray-600">{getScoreMessage(percentage)}</p>
      </motion.div>

      {/* Score Details */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Overall Score */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="stroke-gray-200"
                  strokeWidth="8"
                  fill="none"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="42"
                  className="stroke-green-500"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={2 * Math.PI * 42 * (1 - percentage / 100)}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - percentage / 100) }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <span
                className={`absolute inset-0 flex items-center justify-center text-xl font-bold ${getScoreColor(
                  percentage
                )}`}
              >
                {percentage}%
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">Overall Score</div>
          </div>

          {/* Correct Answers */}
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>

          {/* Time Taken */}
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatTime(result.timeElapsed)}
            </div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex justify-center space-x-4"
      >
        <Button onClick={onRetakeQuiz} size="lg">
          🔄 Retake Quiz
        </Button>
        <Button onClick={onBackToQuestions} variant="secondary" size="lg">
          📋 Back to Questions
        </Button>
      </motion.div>
    </motion.div>
  )
}
