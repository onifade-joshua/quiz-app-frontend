import React from 'react'
import type { QuizResult } from '../../types'
import { formatTime, calculatePercentage } from '../../utils/helpers'
import { Button } from '../common/Button'

interface QuizResultsProps {
  result: QuizResult
  onRetakeQuiz: () => void
  onBackToQuestions: () => void
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  result,
  onRetakeQuiz,
  onBackToQuestions
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
    <div className="card max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="text-6xl mb-4">
          {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : '📖'}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Quiz Complete!
        </h2>
        <p className="text-lg text-gray-600">
          {getScoreMessage(percentage)}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className={`text-4xl font-bold ${getScoreColor(percentage)} mb-2`}>
              {percentage}%
            </div>
            <div className="text-sm text-gray-600">Overall Score</div>
          </div>
          
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          
          <div>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {formatTime(result.timeElapsed)}
            </div>
            <div className="text-sm text-gray-600">Time Taken</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button onClick={onRetakeQuiz} size="lg">
          Retake Quiz
        </Button>
        <Button onClick={onBackToQuestions} variant="secondary" size="lg">
          Back to Questions
        </Button>
      </div>
    </div>
  )
}