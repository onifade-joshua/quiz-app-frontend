import React from 'react'
import { motion } from 'framer-motion'
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
  const progress = (questionNumber / totalQuestions) * 100

  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-6 max-w-4xl mx-auto border border-gray-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500 tracking-wide">
            Question {questionNumber} of {totalQuestions}
          </span>
          <div className="bg-gray-200 rounded-full h-2 w-40 overflow-hidden">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 leading-snug">
          {question.question}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((optionNum) => {
          const isSelected = selectedAnswer === optionNum
          return (
            <motion.label
              key={optionNum}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-primary-500 bg-primary-50 shadow-sm'
                  : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
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
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors duration-200 ${
                  isSelected
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}
              >
                {isSelected && (
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                )}
              </div>
              <span className="text-gray-900 text-base leading-relaxed flex-1">
                {question[`option${optionNum}` as keyof Question]}
              </span>
            </motion.label>
          )
        })}
      </div>
    </motion.div>
  )
}
