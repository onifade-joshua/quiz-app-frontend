import React from 'react'
import type { Question } from '../../types'

interface QuizQuestionProps {
  question: Question
  selectedAnswer?: number
  onAnswerSelect: (answer: number) => void
  questionNumber: number
  totalQuestions: number
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions
}) => {
  return (
    <div className="card max-w-4xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="bg-gray-200 rounded-full h-2 w-32">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {[1, 2, 3, 4].map((optionNum) => {
          const isSelected = selectedAnswer === optionNum
          return (
            <label
              key={optionNum}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="answer"
                value={optionNum}
                checked={isSelected}
                onChange={() => onAnswerSelect(optionNum)}
                className="sr-only"
              />
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                isSelected
                  ? 'border-primary-500 bg-primary-500'
                  : 'border-gray-300'
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="text-gray-900 flex-1">
                {question[`option${optionNum}` as keyof Question]}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}